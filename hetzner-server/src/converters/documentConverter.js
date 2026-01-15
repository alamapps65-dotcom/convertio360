import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';

const execAsync = promisify(exec);

export async function convertDocument(inputPath, outputFormat) {
  const outputPath = `/tmp/converted_${Date.now()}.${outputFormat}`;

  try {
    switch (outputFormat.toLowerCase()) {
      case 'pdf':
        await execAsync(`libreoffice --headless --convert-to pdf --outdir /tmp ${inputPath}`);
        const pdfPath = inputPath.replace(/\.[^/.]+$/, '.pdf');
        await fs.rename(pdfPath, outputPath);
        break;

      case 'docx':
        await execAsync(`pandoc ${inputPath} -o ${outputPath}`);
        break;

      case 'txt':
        await execAsync(`pandoc ${inputPath} -t plain -o ${outputPath}`);
        break;

      case 'md':
        await execAsync(`pandoc ${inputPath} -t markdown -o ${outputPath}`);
        break;

      case 'html':
        await execAsync(`pandoc ${inputPath} -t html -o ${outputPath}`);
        break;

      case 'epub':
        await execAsync(`pandoc ${inputPath} -o ${outputPath}`);
        break;

      case 'rtf':
        await execAsync(`pandoc ${inputPath} -o ${outputPath}`);
        break;

      case 'odt':
        await execAsync(`libreoffice --headless --convert-to odt --outdir /tmp ${inputPath}`);
        const odtPath = inputPath.replace(/\.[^/.]+$/, '.odt');
        await fs.rename(odtPath, outputPath);
        break;

      default:
        throw new Error(`Unsupported output format: ${outputFormat}`);
    }

    return outputPath;
  } catch (error) {
    throw new Error(`Document conversion failed: ${error.message}`);
  }
}
