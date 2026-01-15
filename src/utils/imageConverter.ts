export type ImageFormat = 'png' | 'jpg' | 'jpeg' | 'webp' | 'bmp' | 'gif' | 'ico';

export async function convertImage(
  file: File,
  targetFormat: ImageFormat,
  quality: number = 0.95
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Failed to get canvas context'));
      return;
    }

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      if (targetFormat === 'jpg' || targetFormat === 'jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);

      let mimeType = `image/${targetFormat}`;
      if (targetFormat === 'jpg') mimeType = 'image/jpeg';

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to convert image'));
          }
        },
        mimeType,
        quality
      );
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = URL.createObjectURL(file);
  });
}

export function isImageConversionSupported(fromFormat: string, toFormat: string): boolean {
  const supportedFormats = ['png', 'jpg', 'jpeg', 'webp', 'bmp', 'gif', 'ico'];
  return (
    supportedFormats.includes(fromFormat.toLowerCase()) &&
    supportedFormats.includes(toFormat.toLowerCase())
  );
}
