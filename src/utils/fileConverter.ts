import { convertImage, isImageConversionSupported, ImageFormat } from './imageConverter';
import { convertText, isTextConversionSupported, TextFormat } from './textConverter';

export interface ConversionResult {
  blob: Blob;
  fileName: string;
}

export interface ConversionSupport {
  supported: boolean;
  type: 'client' | 'server' | 'none';
  message?: string;
}

export async function convertFile(
  file: File,
  toFormat: string
): Promise<ConversionResult> {
  const fromFormat = file.name.split('.').pop()?.toLowerCase() || '';
  const targetFormat = toFormat.toLowerCase();

  if (isImageConversionSupported(fromFormat, targetFormat)) {
    const blob = await convertImage(file, targetFormat as ImageFormat);
    const fileName = file.name.replace(/\.[^.]+$/, `.${targetFormat}`);
    return { blob, fileName };
  }

  if (isTextConversionSupported(fromFormat, targetFormat)) {
    const blob = await convertText(file, targetFormat as TextFormat);
    const fileName = file.name.replace(/\.[^.]+$/, `.${targetFormat}`);
    return { blob, fileName };
  }

  throw new Error(`Conversion from ${fromFormat} to ${targetFormat} is not supported`);
}

export function checkConversionSupport(
  fromFormat: string,
  toFormat: string
): ConversionSupport {
  const from = fromFormat.toLowerCase();
  const to = toFormat.toLowerCase();

  if (from === to) {
    return {
      supported: false,
      type: 'none',
      message: 'Source and target formats are the same'
    };
  }

  if (isImageConversionSupported(from, to)) {
    return {
      supported: true,
      type: 'client',
      message: 'Instant conversion in your browser'
    };
  }

  if (isTextConversionSupported(from, to)) {
    return {
      supported: true,
      type: 'client',
      message: 'Instant conversion in your browser'
    };
  }

  const serverSideFormats = [
    'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx',
    'mp4', 'avi', 'mov', 'mkv', 'webm',
    'mp3', 'wav', 'aac', 'ogg', 'flac',
    'zip', 'rar', 'tar', '7z',
    'epub', 'mobi', 'azw3'
  ];

  if (serverSideFormats.includes(from) || serverSideFormats.includes(to)) {
    return {
      supported: false,
      type: 'server',
      message: 'Requires server-side processing (not available in free version)'
    };
  }

  return {
    supported: false,
    type: 'none',
    message: 'Conversion not supported'
  };
}

export function downloadFile(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function getClientSideFormats(): string[] {
  return [
    'png', 'jpg', 'jpeg', 'webp', 'bmp', 'gif', 'ico',
    'txt', 'csv', 'json', 'xml', 'html'
  ];
}

export function getServerSideFormats(): string[] {
  return [
    'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx',
    'mp4', 'avi', 'mov', 'mkv', 'webm',
    'mp3', 'wav', 'aac', 'ogg', 'flac',
    'zip', 'rar', 'tar', '7z',
    'epub', 'mobi', 'azw3', 'odt', 'rtf'
  ];
}
