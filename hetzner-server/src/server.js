import express from 'express';
import multer from 'multer';
import { createClient } from '@supabase/supabase-js';
import { convertImage } from './converters/imageConverter.js';
import { convertVideo } from './converters/videoConverter.js';
import { convertDocument } from './converters/documentConverter.js';
import fs from 'fs/promises';
import path from 'path';

const app = express();
const upload = multer({ dest: '/tmp/uploads/' });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const PORT = process.env.PORT || 3001;

async function updateJobStatus(jobId, status, data = {}) {
  try {
    await supabase
      .from('conversion_jobs')
      .update({ status, ...data, updated_at: new Date().toISOString() })
      .eq('id', jobId);
  } catch (error) {
    console.error('Failed to update job status:', error);
  }
}

async function detectFileType(filename) {
  const ext = path.extname(filename).toLowerCase().slice(1);

  const imageFormats = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg', 'tiff', 'ico'];
  const videoFormats = ['mp4', 'avi', 'mov', 'mkv', 'webm', 'flv', 'wmv', 'mpeg'];
  const documentFormats = ['pdf', 'docx', 'doc', 'odt', 'rtf', 'epub', 'txt', 'md'];

  if (imageFormats.includes(ext)) return 'image';
  if (videoFormats.includes(ext)) return 'video';
  if (documentFormats.includes(ext)) return 'document';

  return 'unknown';
}

app.post('/convert', upload.single('file'), async (req, res) => {
  const { outputFormat, jobId } = req.body;
  const file = req.file;

  if (!file || !outputFormat || !jobId) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  res.status(202).json({
    message: 'Conversion started',
    jobId
  });

  try {
    await updateJobStatus(jobId, 'processing', {
      started_at: new Date().toISOString()
    });

    const fileType = await detectFileType(file.originalname);
    let outputPath;

    switch (fileType) {
      case 'image':
        outputPath = await convertImage(file.path, outputFormat);
        break;
      case 'video':
        outputPath = await convertVideo(file.path, outputFormat);
        break;
      case 'document':
        outputPath = await convertDocument(file.path, outputFormat);
        break;
      default:
        throw new Error('Unsupported file type');
    }

    const outputBuffer = await fs.readFile(outputPath);
    const outputFilename = `${path.parse(file.originalname).name}.${outputFormat}`;

    await updateJobStatus(jobId, 'completed', {
      completed_at: new Date().toISOString(),
      output_filename: outputFilename,
      output_size: outputBuffer.length
    });

    await fs.unlink(file.path);
    await fs.unlink(outputPath);

  } catch (error) {
    console.error('Conversion error:', error);
    await updateJobStatus(jobId, 'failed', {
      error_message: error.message,
      completed_at: new Date().toISOString()
    });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Hetzner conversion server running on port ${PORT}`);
});
