import { useCallback, useState } from 'react';
import { Upload, X, File } from 'lucide-react';
import { UploadedFile } from '../types';
import { getFileExtension } from '../data/formats';

interface FileUploadProps {
  onFilesUploaded: (files: UploadedFile[]) => void;
}

export default function FileUpload({ onFilesUploaded }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      processFiles(files);
    }
  }, []);

  const processFiles = (files: File[]) => {
    const newFiles: UploadedFile[] = files.map(file => ({
      file,
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      format: getFileExtension(file.name)
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
    onFilesUploaded([...uploadedFiles, ...newFiles]);
  };

  const removeFile = (id: string) => {
    const filtered = uploadedFiles.filter(f => f.id !== id);
    setUploadedFiles(filtered);
    onFilesUploaded(filtered);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 ${
          isDragging
            ? 'border-[#00FF00] bg-[#00FF00]/5 scale-[1.02]'
            : 'border-gray-700 bg-[#1a1f2e]'
        } ${uploadedFiles.length > 0 ? 'p-8' : 'p-16'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          onChange={handleFileInput}
          className="hidden"
          id="file-upload"
        />

        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <div className="w-20 h-20 rounded-full bg-[#00FF00]/10 flex items-center justify-center mb-6">
            <Upload className="w-10 h-10 text-[#00FF00]" />
          </div>

          <h3 className="text-2xl font-semibold text-white mb-2">
            Drop files here
          </h3>

          <p className="text-gray-400 mb-4">or</p>

          <button className="px-8 py-3 bg-[#00FF00] text-black font-semibold rounded-lg hover:bg-[#00FF00]/90 transition-all duration-200 hover:scale-105">
            Choose Files
          </button>

          <p className="text-gray-500 text-sm mt-6">
            Support for 140 file formats
          </p>
        </label>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="mt-6 space-y-3">
          {uploadedFiles.map(file => (
            <div
              key={file.id}
              className="flex items-center justify-between p-4 bg-[#1a1f2e] rounded-lg border border-gray-800 hover:border-[#00FF00]/30 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 rounded-lg bg-[#00FF00]/10 flex items-center justify-center">
                  <File className="w-6 h-6 text-[#00FF00]" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{file.name}</p>
                  <p className="text-gray-400 text-sm">
                    {file.format} • {formatFileSize(file.size)}
                  </p>
                </div>
              </div>

              <button
                onClick={() => removeFile(file.id)}
                className="p-2 hover:bg-red-500/10 rounded-lg transition-colors group"
              >
                <X className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
