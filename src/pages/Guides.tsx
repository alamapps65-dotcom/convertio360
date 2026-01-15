import { BookOpen, FileText, Image, Video, Music, Archive, FileCode } from 'lucide-react';

export default function Guides() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-5xl font-bold text-white mb-6">Guides & Tutorials</h1>
      <p className="text-xl text-gray-400 mb-12">
        Learn everything you need to know about file conversion and format optimization
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-[#1a1f2e] rounded-2xl border border-gray-800 p-8 hover:border-[#00FF00]/30 transition-colors">
          <div className="w-14 h-14 rounded-xl bg-[#00FF00]/10 flex items-center justify-center mb-4">
            <FileText className="w-7 h-7 text-[#00FF00]" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Document Conversion Guide</h3>
          <p className="text-gray-400 mb-4">
            Master document format conversion between PDF, DOCX, TXT, and more
          </p>
          <a href="#documents" className="text-[#00FF00] hover:underline font-medium">
            Read Guide →
          </a>
        </div>

        <div className="bg-[#1a1f2e] rounded-2xl border border-gray-800 p-8 hover:border-[#00FF00]/30 transition-colors">
          <div className="w-14 h-14 rounded-xl bg-[#00FF00]/10 flex items-center justify-center mb-4">
            <Image className="w-7 h-7 text-[#00FF00]" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Image Format Guide</h3>
          <p className="text-gray-400 mb-4">
            Learn when to use JPG, PNG, WEBP, SVG, and other image formats
          </p>
          <a href="#images" className="text-[#00FF00] hover:underline font-medium">
            Read Guide →
          </a>
        </div>

        <div className="bg-[#1a1f2e] rounded-2xl border border-gray-800 p-8 hover:border-[#00FF00]/30 transition-colors">
          <div className="w-14 h-14 rounded-xl bg-[#00FF00]/10 flex items-center justify-center mb-4">
            <Video className="w-7 h-7 text-[#00FF00]" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Video Conversion Tutorial</h3>
          <p className="text-gray-400 mb-4">
            Understanding video formats, codecs, and quality optimization
          </p>
          <a href="#video" className="text-[#00FF00] hover:underline font-medium">
            Read Guide →
          </a>
        </div>

        <div className="bg-[#1a1f2e] rounded-2xl border border-gray-800 p-8 hover:border-[#00FF00]/30 transition-colors">
          <div className="w-14 h-14 rounded-xl bg-[#00FF00]/10 flex items-center justify-center mb-4">
            <Music className="w-7 h-7 text-[#00FF00]" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Audio Format Explained</h3>
          <p className="text-gray-400 mb-4">
            Choose the right audio format for your needs and quality requirements
          </p>
          <a href="#audio" className="text-[#00FF00] hover:underline font-medium">
            Read Guide →
          </a>
        </div>
      </div>

      <div id="documents" className="bg-[#1a1f2e] rounded-2xl border border-gray-800 p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-lg bg-[#00FF00]/10 flex items-center justify-center">
            <FileText className="w-6 h-6 text-[#00FF00]" />
          </div>
          <h2 className="text-3xl font-bold text-white">Complete Document Conversion Guide</h2>
        </div>

        <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
          <p className="leading-relaxed">
            Document conversion is one of the most common file operations. Whether you're preparing documents
            for distribution, ensuring compatibility across platforms, or archiving files, choosing the right
            format is crucial.
          </p>

          <h3 className="text-2xl font-bold text-white mt-8 mb-4">PDF Format</h3>
          <p className="leading-relaxed">
            PDF (Portable Document Format) is the universal standard for document sharing. Use PDF when you need
            to preserve formatting across all devices and platforms, create documents for printing, protect content
            from editing, or ensure consistent appearance regardless of fonts installed on the reader's system.
          </p>
          <p className="leading-relaxed">
            <strong className="text-white">Best for:</strong> Final documents, forms, e-books, printable materials, legal documents
          </p>

          <h3 className="text-2xl font-bold text-white mt-8 mb-4">DOCX Format</h3>
          <p className="leading-relaxed">
            Microsoft Word's DOCX format is ideal for editable documents. Use DOCX when you need collaborative
            editing, want to preserve complex formatting, require track changes functionality, or need compatibility
            with Microsoft Office.
          </p>
          <p className="leading-relaxed">
            <strong className="text-white">Best for:</strong> Business documents, resumes, reports, collaborative writing
          </p>

          <h3 className="text-2xl font-bold text-white mt-8 mb-4">TXT and CSV Formats</h3>
          <p className="leading-relaxed">
            Plain text (TXT) is the simplest format, containing only text without formatting. CSV (Comma-Separated Values)
            is perfect for tabular data. Use these formats for maximum compatibility, data processing, programming applications,
            or when file size is critical.
          </p>
          <p className="leading-relaxed">
            <strong className="text-white">Best for:</strong> Data files, configuration files, simple notes, spreadsheet data
          </p>

          <h3 className="text-2xl font-bold text-white mt-8 mb-4">HTML Format</h3>
          <p className="leading-relaxed">
            HTML documents are web-ready and can include images, links, and styling. Convert to HTML when publishing
            content online, creating email templates, or building web applications.
          </p>

          <h3 className="text-2xl font-bold text-white mt-8 mb-4">Conversion Best Practices</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Always keep original files before converting</li>
            <li>Verify converted documents for formatting issues</li>
            <li>Use PDF for final distribution to prevent editing</li>
            <li>Consider file size when choosing formats</li>
            <li>Test documents on target devices/platforms</li>
          </ul>
        </div>
      </div>

      <div id="images" className="bg-[#1a1f2e] rounded-2xl border border-gray-800 p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-lg bg-[#00FF00]/10 flex items-center justify-center">
            <Image className="w-6 h-6 text-[#00FF00]" />
          </div>
          <h2 className="text-3xl font-bold text-white">Image Format Comparison Guide</h2>
        </div>

        <div className="space-y-6 text-gray-300">
          <p className="leading-relaxed">
            Choosing the right image format dramatically impacts quality, file size, and compatibility. Here's
            a comprehensive guide to help you select the best format for your needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-800/50 rounded-lg p-6">
              <h4 className="text-xl font-bold text-white mb-3">JPG / JPEG</h4>
              <p className="text-sm text-gray-400 mb-3">
                Best for photographs and images with many colors
              </p>
              <ul className="text-sm space-y-2">
                <li><span className="text-[#00FF00]">✓</span> Excellent compression</li>
                <li><span className="text-[#00FF00]">✓</span> Small file sizes</li>
                <li><span className="text-[#00FF00]">✓</span> Universal compatibility</li>
                <li><span className="text-red-400">✗</span> Lossy compression</li>
                <li><span className="text-red-400">✗</span> No transparency support</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-6">
              <h4 className="text-xl font-bold text-white mb-3">PNG</h4>
              <p className="text-sm text-gray-400 mb-3">
                Best for graphics, logos, and images needing transparency
              </p>
              <ul className="text-sm space-y-2">
                <li><span className="text-[#00FF00]">✓</span> Lossless compression</li>
                <li><span className="text-[#00FF00]">✓</span> Supports transparency</li>
                <li><span className="text-[#00FF00]">✓</span> Perfect for graphics</li>
                <li><span className="text-red-400">✗</span> Larger file sizes</li>
                <li><span className="text-red-400">✗</span> Not ideal for photos</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-6">
              <h4 className="text-xl font-bold text-white mb-3">WEBP</h4>
              <p className="text-sm text-gray-400 mb-3">
                Modern format offering superior compression
              </p>
              <ul className="text-sm space-y-2">
                <li><span className="text-[#00FF00]">✓</span> Excellent compression</li>
                <li><span className="text-[#00FF00]">✓</span> Supports transparency</li>
                <li><span className="text-[#00FF00]">✓</span> Smaller than JPG/PNG</li>
                <li><span className="text-red-400">✗</span> Limited legacy support</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-6">
              <h4 className="text-xl font-bold text-white mb-3">SVG</h4>
              <p className="text-sm text-gray-400 mb-3">
                Vector format that scales perfectly to any size
              </p>
              <ul className="text-sm space-y-2">
                <li><span className="text-[#00FF00]">✓</span> Infinite scalability</li>
                <li><span className="text-[#00FF00]">✓</span> Small file sizes</li>
                <li><span className="text-[#00FF00]">✓</span> Editable with code</li>
                <li><span className="text-red-400">✗</span> Only for vector graphics</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-6 mt-8">
            <h4 className="text-xl font-bold text-white mb-4">Quick Selection Guide</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-[#00FF00] font-bold min-w-[100px]">Photographs:</span>
                <span>Use JPG for web, TIFF for archival</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#00FF00] font-bold min-w-[100px]">Logos:</span>
                <span>Use SVG for web, PNG for raster</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#00FF00] font-bold min-w-[100px]">Screenshots:</span>
                <span>Use PNG for clarity</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#00FF00] font-bold min-w-[100px]">Web Graphics:</span>
                <span>Use WEBP for modern browsers, JPG/PNG for fallback</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#00FF00] font-bold min-w-[100px]">Icons:</span>
                <span>Use SVG or PNG with transparency</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="video" className="bg-[#1a1f2e] rounded-2xl border border-gray-800 p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-lg bg-[#00FF00]/10 flex items-center justify-center">
            <Video className="w-6 h-6 text-[#00FF00]" />
          </div>
          <h2 className="text-3xl font-bold text-white">Video Conversion Essentials</h2>
        </div>

        <div className="space-y-6 text-gray-300">
          <p className="leading-relaxed">
            Video conversion involves understanding containers, codecs, resolution, and bitrate. This guide helps
            you make informed decisions for your specific use case.
          </p>

          <h3 className="text-2xl font-bold text-white mt-6">Popular Video Formats</h3>

          <div className="space-y-4">
            <div className="bg-gray-800/50 rounded-lg p-6">
              <h4 className="text-lg font-bold text-white mb-2">MP4 (H.264/H.265)</h4>
              <p className="text-sm leading-relaxed mb-3">
                The most universal video format. MP4 with H.264 codec offers excellent quality and compatibility
                across all devices and platforms. H.265 provides better compression but requires more processing power.
              </p>
              <p className="text-sm"><strong className="text-white">Use for:</strong> General purpose, web videos, social media, mobile devices</p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-6">
              <h4 className="text-lg font-bold text-white mb-2">MOV</h4>
              <p className="text-sm leading-relaxed mb-3">
                Apple's QuickTime format, excellent for professional video editing and high-quality content.
                Supports high-quality codecs and is the preferred format in Apple ecosystems.
              </p>
              <p className="text-sm"><strong className="text-white">Use for:</strong> Apple devices, professional editing, high-quality archival</p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-6">
              <h4 className="text-lg font-bold text-white mb-2">WEBM</h4>
              <p className="text-sm leading-relaxed mb-3">
                Open-source format optimized for web delivery. Uses VP9 or AV1 codecs for efficient compression
                while maintaining quality. Ideal for HTML5 video streaming.
              </p>
              <p className="text-sm"><strong className="text-white">Use for:</strong> Web streaming, HTML5 video, open-source projects</p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-6">
              <h4 className="text-lg font-bold text-white mb-2">AVI</h4>
              <p className="text-sm leading-relaxed mb-3">
                Older but still widely supported format. Can contain various codecs. Generally results in larger
                file sizes but ensures maximum compatibility with legacy systems.
              </p>
              <p className="text-sm"><strong className="text-white">Use for:</strong> Legacy system compatibility, professional editing</p>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-6 mt-6">
            <h4 className="text-xl font-bold text-white mb-4">Video Conversion Tips</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#00FF00]">•</span>
                <span><strong>Resolution:</strong> Keep original resolution unless reducing for web/mobile</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00FF00]">•</span>
                <span><strong>Bitrate:</strong> Higher bitrate = better quality but larger file size</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00FF00]">•</span>
                <span><strong>Frame Rate:</strong> Match source frame rate (typically 24, 30, or 60 fps)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00FF00]">•</span>
                <span><strong>Aspect Ratio:</strong> Preserve original ratio to avoid distortion</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00FF00]">•</span>
                <span><strong>Audio:</strong> Ensure audio codec matches video container requirements</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div id="audio" className="bg-[#1a1f2e] rounded-2xl border border-gray-800 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-lg bg-[#00FF00]/10 flex items-center justify-center">
            <Music className="w-6 h-6 text-[#00FF00]" />
          </div>
          <h2 className="text-3xl font-bold text-white">Audio Format Selection Guide</h2>
        </div>

        <div className="space-y-6 text-gray-300">
          <p className="leading-relaxed">
            Audio format choice affects sound quality, file size, and compatibility. Understanding the differences
            helps you select the right format for music, podcasts, or professional audio work.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-800/50 rounded-lg p-6">
              <h4 className="text-lg font-bold text-white mb-3">Lossless Formats</h4>
              <p className="text-sm text-gray-400 mb-4">Perfect audio quality, no data loss</p>
              <ul className="text-sm space-y-2">
                <li><span className="text-[#00FF00]">•</span> FLAC</li>
                <li><span className="text-[#00FF00]">•</span> WAV</li>
                <li><span className="text-[#00FF00]">•</span> AIFF</li>
                <li><span className="text-[#00FF00]">•</span> APE</li>
              </ul>
              <p className="text-xs text-gray-500 mt-4">Use for archival, professional production, audiophile listening</p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-6">
              <h4 className="text-lg font-bold text-white mb-3">Lossy Formats</h4>
              <p className="text-sm text-gray-400 mb-4">Good quality, smaller file size</p>
              <ul className="text-sm space-y-2">
                <li><span className="text-[#00FF00]">•</span> MP3</li>
                <li><span className="text-[#00FF00]">•</span> AAC</li>
                <li><span className="text-[#00FF00]">•</span> OGG</li>
                <li><span className="text-[#00FF00]">•</span> WMA</li>
              </ul>
              <p className="text-xs text-gray-500 mt-4">Use for general listening, streaming, mobile devices</p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-6">
              <h4 className="text-lg font-bold text-white mb-3">High-Efficiency</h4>
              <p className="text-sm text-gray-400 mb-4">Best compression, modern codecs</p>
              <ul className="text-sm space-y-2">
                <li><span className="text-[#00FF00]">•</span> OPUS</li>
                <li><span className="text-[#00FF00]">•</span> M4A</li>
                <li><span className="text-[#00FF00]">•</span> AAC (HE)</li>
              </ul>
              <p className="text-xs text-gray-500 mt-4">Use for streaming, podcasts, voice recording</p>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-6 mt-6">
            <h4 className="text-xl font-bold text-white mb-4">Audio Quality Recommendations</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                <span className="font-semibold text-white">Use Case</span>
                <span className="font-semibold text-white">Recommended Format</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Music Library</span>
                <span className="text-[#00FF00]">MP3 (320kbps) or FLAC</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Podcasts</span>
                <span className="text-[#00FF00]">MP3 (128kbps) or AAC</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Professional Production</span>
                <span className="text-[#00FF00]">WAV or FLAC</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Streaming Services</span>
                <span className="text-[#00FF00]">AAC or OPUS</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Archival/Backup</span>
                <span className="text-[#00FF00]">FLAC</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
