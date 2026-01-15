import sharp from 'sharp';
import path from 'path';

export async function convertImage(inputPath, outputFormat) {
  const outputPath = `/tmp/converted_${Date.now()}.${outputFormat}`;

  try {
    let image = sharp(inputPath);

    switch (outputFormat.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
        await image.jpeg({ quality: 90 }).toFile(outputPath);
        break;
      case 'png':
        await image.png({ compressionLevel: 9 }).toFile(outputPath);
        break;
      case 'webp':
        await image.webp({ quality: 90 }).toFile(outputPath);
        break;
      case 'gif':
        await image.gif().toFile(outputPath);
        break;
      case 'bmp':
        await image.toFormat('bmp').toFile(outputPath);
        break;
      case 'tiff':
        await image.tiff().toFile(outputPath);
        break;
      case 'avif':
        await image.avif({ quality: 90 }).toFile(outputPath);
        break;
      default:
        throw new Error(`Unsupported output format: ${outputFormat}`);
    }

    return outputPath;
  } catch (error) {
    throw new Error(`Image conversion failed: ${error.message}`);
  }
}
