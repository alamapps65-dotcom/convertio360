export interface ConversionHistory {
  id: string;
  file_name: string;
  from_format: string;
  to_format: string;
  file_size: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: string;
  completed_at: string | null;
}

export interface UploadedFile {
  file: File;
  id: string;
  name: string;
  size: number;
  format: string;
}

export interface FormatCategory {
  name: string;
  formats: string[];
  icon: string;
}
