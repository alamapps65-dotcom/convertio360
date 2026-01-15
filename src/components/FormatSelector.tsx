import { useState } from 'react';
import { ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { UploadedFile } from '../types';
import { formatCategories, allFormats } from '../data/formats';

interface FormatSelectorProps {
  files: UploadedFile[];
  onConvert: (fileId: string, toFormat: string) => Promise<void>;
}

interface FileConversion {
  fileId: string;
  toFormat: string;
  isConverting: boolean;
  isComplete: boolean;
}

export default function FormatSelector({ files, onConvert }: FormatSelectorProps) {
  const [conversions, setConversions] = useState<Record<string, FileConversion>>({});
  const [searchTerm, setSearchTerm] = useState('');

  const handleFormatSelect = (fileId: string, format: string) => {
    setConversions(prev => ({
      ...prev,
      [fileId]: { fileId, toFormat: format, isConverting: false, isComplete: false }
    }));
  };

  const handleConvert = async (fileId: string) => {
    const conversion = conversions[fileId];
    const file = files.find(f => f.id === fileId);
    if (!conversion || !file) return;

    setConversions(prev => ({
      ...prev,
      [fileId]: { ...prev[fileId], isConverting: true }
    }));

    try {
      await onConvert(fileId, conversion.toFormat);

      setConversions(prev => ({
        ...prev,
        [fileId]: { ...prev[fileId], isConverting: false, isComplete: true }
      }));
    } catch (error) {
      setConversions(prev => ({
        ...prev,
        [fileId]: { ...prev[fileId], isConverting: false, isComplete: false }
      }));
    }
  };

  const filteredFormats = searchTerm
    ? allFormats.filter(f => f.toLowerCase().includes(searchTerm.toLowerCase()))
    : allFormats;

  if (files.length === 0) return null;

  return (
    <div className="space-y-6">
      {files.map(file => {
        const conversion = conversions[file.id];

        return (
          <div
            key={file.id}
            className="bg-[#1a1f2e] rounded-xl border border-gray-800 p-6"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="px-4 py-2 bg-gray-800 rounded-lg">
                <span className="text-[#00FF00] font-semibold">{file.format}</span>
              </div>

              <ArrowRight className="w-5 h-5 text-gray-600" />

              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search format..."
                  value={conversion?.toFormat || searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    handleFormatSelect(file.id, e.target.value);
                  }}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF00]"
                  disabled={conversion?.isConverting || conversion?.isComplete}
                />

                {searchTerm && filteredFormats.length > 0 && !conversion?.toFormat && (
                  <div className="absolute z-10 mt-2 w-full max-w-md bg-gray-800 border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                    {filteredFormats.slice(0, 10).map(format => (
                      <button
                        key={format}
                        onClick={() => {
                          handleFormatSelect(file.id, format);
                          setSearchTerm('');
                        }}
                        className="w-full px-4 py-2 text-left text-white hover:bg-[#00FF00]/10 transition-colors"
                      >
                        {format}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 mb-6">
              {formatCategories.flatMap(cat => cat.formats).slice(0, 20).map(format => (
                <button
                  key={format}
                  onClick={() => handleFormatSelect(file.id, format)}
                  disabled={conversion?.isConverting || conversion?.isComplete}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    conversion?.toFormat === format
                      ? 'bg-[#00FF00] text-black'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {format}
                </button>
              ))}
            </div>

            {conversion?.isComplete ? (
              <div className="w-full py-3 bg-[#00FF00]/10 border-2 border-[#00FF00] text-[#00FF00] font-semibold rounded-lg flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Converted & Downloaded!
              </div>
            ) : (
              <button
                onClick={() => handleConvert(file.id)}
                disabled={!conversion?.toFormat || conversion?.isConverting}
                className="w-full py-3 bg-[#00FF00] text-black font-semibold rounded-lg hover:bg-[#00FF00]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {conversion?.isConverting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Converting...
                  </>
                ) : (
                  'Convert'
                )}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
