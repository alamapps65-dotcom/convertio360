import { FormatCategory } from '../types';

export const formatCategories: FormatCategory[] = [
  {
    name: 'Archives',
    icon: 'archive',
    formats: [
      '7Z', 'ACE', 'ALZ', 'ARC', 'ARJ', 'CAB', 'CPIO', 'DEB', 'JAR', 'LHA',
      'RAR', 'RPM', 'TAR', 'TAR.GZ', 'TAR.BZ2', 'TAR.XZ', 'TBZ2', 'TGZ', 'ZIP'
    ]
  },
  {
    name: 'Audio',
    icon: 'audio',
    formats: [
      'AAC', 'AC3', 'AIFF', 'AMR', 'AU', 'APE', 'FLAC', 'M4A', 'MP3', 'OGG', 'OPUS',
      'WAV', 'WMA', 'VOC'
    ]
  },
  {
    name: 'Documents',
    icon: 'file-text',
    formats: [
      'ABW', 'AW', 'CSV', 'DBK', 'DJVU', 'DOC', 'DOCX', 'DOT', 'DOTX',
      'HTML', 'JSON', 'ODT', 'PDF', 'RTF', 'SXW', 'TXT', 'WPS', 'XLS', 'XLSX',
      'XML', 'XPS', 'OXPS'
    ]
  },
  {
    name: 'E-Books',
    icon: 'book-open',
    formats: [
      'AZW3', 'EPUB', 'FB2', 'LRF', 'MOBI', 'PDB', 'RB', 'SNB', 'TCR'
    ]
  },
  {
    name: 'Fonts',
    icon: 'type',
    formats: [
      'AFM', 'BIN', 'CFF', 'CID', 'DFONT', 'OTF', 'PFA', 'PFB', 'PS',
      'SFD', 'TTF', 'UFO', 'WOFF'
    ]
  },
  {
    name: 'Images',
    icon: 'image',
    formats: [
      'BMP', 'JPG', 'JPEG', 'PNG', 'GIF', 'TIFF', 'WEBP', 'AVIF', 'HEIC', 'HEIF',
      'SVG', 'ICO', 'PSD', 'DDS', 'EXR', 'CR2', 'NEF', 'ARW',
      'PBM', 'PNM', 'PPM'
    ]
  },
  {
    name: 'Presentations',
    icon: 'presentation',
    formats: [
      'ODP', 'POT', 'POTX', 'PPS', 'PPSX', 'PPT', 'PPTX'
    ]
  },
  {
    name: 'Vector Graphics',
    icon: 'pen-tool',
    formats: [
      'AI', 'EPS', 'SVG', 'EMF', 'WMF', 'CDR', 'CGM', 'PLT', 'SK1'
    ]
  },
  {
    name: 'Videos',
    icon: 'video',
    formats: [
      '3G2', '3GP', 'AAF', 'ASF', 'AV1', 'AVI', 'DIVX', 'DV', 'FLV',
      'M2TS', 'M4V', 'MKV', 'MOV', 'MP4', 'MPEG', 'MPG', 'MXF',
      'OGV', 'RM', 'RMVB', 'SWF', 'TS', 'VOB', 'WEBM', 'WMV', 'XVID'
    ]
  }
];

export const allFormats = formatCategories.flatMap(cat => cat.formats);

export const mostCommonFormats = [
  'PDF', 'DOCX', 'JPG', 'PNG', 'MP4', 'MP3', 'ZIP', 'GIF', 'XLSX', 'PPTX',
  'MOV', 'AVI', 'WEBP', 'SVG', 'CSV', 'TXT', 'HTML', 'EPUB', 'WEBM', 'WAV'
];

export const getFileExtension = (filename: string): string => {
  const parts = filename.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : '';
};
