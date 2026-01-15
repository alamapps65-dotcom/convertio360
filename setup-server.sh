#!/bin/bash

echo "========================================="
echo "  Hetzner Server Setup for PDF Converter"
echo "========================================="
echo ""

read -p "Enter your server IP address (from email): " SERVER_IP
read -p "Enter your server password (from email): " -s SERVER_PASSWORD
echo ""

echo ""
echo "Installing required tools..."
apt-get update > /dev/null 2>&1 || true
command -v sshpass >/dev/null 2>&1 || {
    echo "Installing sshpass..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew install hudochenkov/sshpass/sshpass
    else
        sudo apt-get install -y sshpass
    fi
}

echo ""
echo "Connecting to server and setting up..."
echo "(This will take 3-5 minutes - please wait)"
echo ""

sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no root@$SERVER_IP << 'ENDSSH'

# Update system
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq curl git > /dev/null 2>&1

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | bash - > /dev/null 2>&1
apt-get install -y -qq nodejs > /dev/null 2>&1

# Install FFmpeg for video conversion
apt-get install -y -qq ffmpeg > /dev/null 2>&1

# Install LibreOffice for document conversion
apt-get install -y -qq libreoffice libreoffice-writer libreoffice-calc > /dev/null 2>&1

# Install ImageMagick for image processing
apt-get install -y -qq imagemagick > /dev/null 2>&1

# Create app directory
mkdir -p /root/converter
cd /root/converter

# Create package.json
cat > package.json << 'EOF'
{
  "name": "file-converter-server",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node src/server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "multer": "^1.4.5-lts.1",
    "cors": "^2.8.5",
    "@supabase/supabase-js": "^2.39.0"
  }
}
EOF

# Install dependencies
npm install --silent > /dev/null 2>&1

# Create server directory structure
mkdir -p src/converters
mkdir -p uploads
mkdir -p output

# Create main server file
cat > src/server.js << 'EOF'
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const execAsync = promisify(exec);
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

async function convertPDF(inputPath, outputFormat) {
  const outputPath = inputPath.replace(/\.[^.]+$/, `.${outputFormat}`);

  if (outputFormat === 'docx' || outputFormat === 'doc') {
    await execAsync(`libreoffice --headless --convert-to ${outputFormat} --outdir ${path.dirname(outputPath)} ${inputPath}`);
    return outputPath.replace(/\.pdf$/, `.${outputFormat}`);
  } else if (outputFormat === 'txt') {
    await execAsync(`pdftotext ${inputPath} ${outputPath}`);
    return outputPath;
  }

  throw new Error(`Unsupported PDF conversion: ${outputFormat}`);
}

async function convertDocument(inputPath, outputFormat) {
  const outputPath = inputPath.replace(/\.[^.]+$/, `.${outputFormat}`);
  await execAsync(`libreoffice --headless --convert-to ${outputFormat} --outdir ${path.dirname(outputPath)} ${inputPath}`);
  return outputPath.replace(/\.[^.]+$/, `.${outputFormat}`);
}

async function convertImage(inputPath, outputFormat) {
  const outputPath = inputPath.replace(/\.[^.]+$/, `.${outputFormat}`);
  await execAsync(`convert ${inputPath} ${outputPath}`);
  return outputPath;
}

async function convertVideo(inputPath, outputFormat) {
  const outputPath = inputPath.replace(/\.[^.]+$/, `.${outputFormat}`);
  await execAsync(`ffmpeg -i ${inputPath} ${outputPath}`);
  return outputPath;
}

app.post('/convert', upload.single('file'), async (req, res) => {
  const jobId = req.body.jobId;

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const inputPath = req.file.path;
  const outputFormat = req.body.outputFormat;
  const inputFormat = path.extname(req.file.originalname).slice(1).toLowerCase();

  try {
    await supabase
      .from('conversion_jobs')
      .update({ status: 'processing' })
      .eq('id', jobId);

    let outputPath;

    if (['pdf'].includes(inputFormat)) {
      outputPath = await convertPDF(inputPath, outputFormat);
    } else if (['doc', 'docx', 'odt', 'rtf'].includes(inputFormat) || ['pdf', 'docx'].includes(outputFormat)) {
      outputPath = await convertDocument(inputPath, outputFormat);
    } else if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'].includes(inputFormat)) {
      outputPath = await convertImage(inputPath, outputFormat);
    } else if (['mp4', 'avi', 'mov', 'mkv', 'webm'].includes(inputFormat)) {
      outputPath = await convertVideo(inputPath, outputFormat);
    } else {
      throw new Error(`Unsupported conversion: ${inputFormat} to ${outputFormat}`);
    }

    const outputBuffer = fs.readFileSync(outputPath);
    const outputBase64 = outputBuffer.toString('base64');

    await supabase
      .from('conversion_jobs')
      .update({
        status: 'completed',
        output_data: outputBase64,
        completed_at: new Date().toISOString()
      })
      .eq('id', jobId);

    fs.unlinkSync(inputPath);
    fs.unlinkSync(outputPath);

    res.json({ success: true, jobId });
  } catch (error) {
    console.error('Conversion error:', error);

    if (jobId) {
      await supabase
        .from('conversion_jobs')
        .update({
          status: 'failed',
          error_message: error.message
        })
        .eq('id', jobId);
    }

    fs.unlinkSync(inputPath);
    res.status(500).json({ error: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Converter server running on port ${PORT}`);
});
EOF

# Create systemd service for auto-start
cat > /etc/systemd/system/converter.service << 'EOF'
[Unit]
Description=File Converter Service
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/root/converter
ExecStart=/usr/bin/node src/server.js
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Start the service
systemctl daemon-reload
systemctl enable converter.service
systemctl start converter.service

echo ""
echo "✓ Server setup complete!"
echo "✓ Converter service is running on port 3001"

ENDSSH

echo ""
echo "========================================="
echo "  Setup Complete!"
echo "========================================="
echo ""
echo "Your server is now ready to convert PDFs and other files!"
echo ""
echo "Server URL: http://$SERVER_IP:3001"
echo ""
echo "Next step: Update your .env file with this URL"
echo ""
