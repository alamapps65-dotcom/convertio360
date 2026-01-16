import PDFDocument from 'pdfkit';
import sharp from 'sharp';
import fs from 'fs';
import fsPromises from 'fs/promises';

export async function convertDocument(inputPath, outputFormat) {
  const outputPath = `/tmp/converted_${Date.now()}.${outputFormat}`;

  try {
    if (outputFormat.toLowerCase() === 'pdf') {
      return await convertImageToPDF(inputPath, outputPath);
    }

    throw new Error(`Unsupported output format: ${outputFormat}`);
  } catch (error) {
    throw new Error(`Document conversion failed: ${error.message}`);
  }
}

async function convertImageToPDF(inputPath, outputPath) {
  const metadata = await sharp(inputPath).metadata();
  const imageBuffer = await sharp(inputPath)
    .jpeg({ quality: 90 })
    .toBuffer();

  const doc = new PDFDocument({
    size: [metadata.width, metadata.height],
    margin: 0,
    autoFirstPage: false
  });

  const writeStream = fs.createWriteStream(outputPath);
  doc.pipe(writeStream);

  doc.addPage({
    size: [metadata.width, metadata.height],
    margin: 0
  });

  doc.image(imageBuffer, 0, 0, {
    width: metadata.width,
    height: metadata.height
  });

  doc.end();

  return new Promise((resolve, reject) => {
    writeStream.on('finish', () => resolve(outputPath));
    writeStream.on('error', reject);
  });
}
