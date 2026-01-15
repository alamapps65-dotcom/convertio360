import { useState } from 'react';
import { Archive, AudioLines, FileText, BookOpen, Type, Image, Presentation, PenTool, Video, Zap } from 'lucide-react';
import { formatCategories, mostCommonFormats } from '../data/formats';
import { getClientSideFormats } from '../utils/fileConverter';

const iconMap: Record<string, any> = {
  'archive': Archive,
  'audio': AudioLines,
  'file-text': FileText,
  'book-open': BookOpen,
  'type': Type,
  'image': Image,
  'presentation': Presentation,
  'pen-tool': PenTool,
  'video': Video
};

export default function SupportedFormats() {
  const [activeTab, setActiveTab] = useState<'common' | 'all'>('common');
  const clientSideFormats = getClientSideFormats();

  const isClientSide = (format: string) => {
    return clientSideFormats.includes(format.toLowerCase());
  };

  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          Supported Formats
        </h2>
        <p className="text-gray-400 text-lg">
          Convert between 140 file formats across all categories
        </p>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400">
          <Zap className="w-4 h-4 text-[#00FF00]" />
          <span>Instant conversion available for images and text formats</span>
        </div>
      </div>

      <div className="flex gap-4 mb-8 justify-center">
        <button
          onClick={() => setActiveTab('common')}
          className={`px-8 py-3 rounded-lg font-semibold transition-all ${
            activeTab === 'common'
              ? 'bg-[#00FF00] text-black'
              : 'bg-[#1a1f2e] text-gray-400 hover:bg-gray-800'
          }`}
        >
          Most Common
        </button>
        <button
          onClick={() => setActiveTab('all')}
          className={`px-8 py-3 rounded-lg font-semibold transition-all ${
            activeTab === 'all'
              ? 'bg-[#00FF00] text-black'
              : 'bg-[#1a1f2e] text-gray-400 hover:bg-gray-800'
          }`}
        >
          All Formats
        </button>
      </div>

      {activeTab === 'common' && (
        <div className="bg-[#1a1f2e] rounded-2xl border border-gray-800 p-8">
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-3">
            {mostCommonFormats.map(format => (
              <div
                key={format}
                className="aspect-square flex flex-col items-center justify-center bg-gray-800 rounded-lg hover:bg-[#00FF00]/10 hover:border-[#00FF00] border border-transparent transition-all cursor-pointer group relative"
              >
                <span className="text-gray-300 font-semibold text-sm group-hover:text-[#00FF00] transition-colors">
                  {format}
                </span>
                {isClientSide(format) && (
                  <Zap className="w-3 h-3 text-[#00FF00] absolute top-1 right-1" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'all' && (
        <div className="space-y-6">
          {formatCategories.map(category => {
            const Icon = iconMap[category.icon];
            return (
              <div
                key={category.name}
                className="bg-[#1a1f2e] rounded-2xl border border-gray-800 p-6 hover:border-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#00FF00]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#00FF00]" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {category.name}
                  </h3>
                  <span className="ml-auto text-gray-500 text-sm">
                    {category.formats.length} formats
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.formats.map(format => (
                    <span
                      key={format}
                      className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-700 hover:text-[#00FF00] transition-all cursor-pointer relative inline-flex items-center gap-1"
                    >
                      {format}
                      {isClientSide(format) && (
                        <Zap className="w-3 h-3 text-[#00FF00]" />
                      )}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
