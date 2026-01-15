import ffmpeg from 'fluent-ffmpeg';
import { promisify } from 'util';

export async function convertVideo(inputPath, outputFormat) {
  const outputPath = `/tmp/converted_${Date.now()}.${outputFormat}`;

  return new Promise((resolve, reject) => {
    let command = ffmpeg(inputPath);

    switch (outputFormat.toLowerCase()) {
      case 'mp4':
        command = command
          .videoCodec('libx264')
          .audioCodec('aac')
          .format('mp4');
        break;
      case 'webm':
        command = command
          .videoCodec('libvpx')
          .audioCodec('libvorbis')
          .format('webm');
        break;
      case 'avi':
        command = command
          .videoCodec('mpeg4')
          .audioCodec('mp3')
          .format('avi');
        break;
      case 'mov':
        command = command
          .videoCodec('libx264')
          .audioCodec('aac')
          .format('mov');
        break;
      case 'mkv':
        command = command
          .videoCodec('libx264')
          .audioCodec('aac')
          .format('matroska');
        break;
      case 'flv':
        command = command
          .videoCodec('flv')
          .audioCodec('mp3')
          .format('flv');
        break;
      case 'gif':
        command = command
          .fps(10)
          .size('480x?')
          .format('gif');
        break;
      default:
        reject(new Error(`Unsupported output format: ${outputFormat}`));
        return;
    }

    command
      .on('end', () => resolve(outputPath))
      .on('error', (err) => reject(new Error(`Video conversion failed: ${err.message}`)))
      .save(outputPath);
  });
}
