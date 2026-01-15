import { Calendar, User, ArrowRight } from 'lucide-react';

interface BlogPost {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    title: 'Understanding File Compression: A Complete Guide',
    excerpt: 'Learn how file compression works, the difference between lossy and lossless compression, and when to use each type. This comprehensive guide covers algorithms, practical applications, and optimization techniques for different file types.',
    author: 'Sarah Chen',
    date: '2026-01-10',
    category: 'Technical',
    readTime: '8 min read'
  },
  {
    title: 'Best Practices for Converting Videos for Social Media',
    excerpt: 'Each social platform has specific video requirements. Discover the optimal formats, resolutions, and aspect ratios for YouTube, Instagram, TikTok, Facebook, and Twitter to ensure your content looks professional and loads quickly.',
    author: 'Michael Rodriguez',
    date: '2026-01-08',
    category: 'Video',
    readTime: '6 min read'
  },
  {
    title: 'Why PDF Remains the Standard for Document Sharing',
    excerpt: 'Despite numerous new formats, PDF continues to dominate professional document sharing. Explore the history of PDF, its technical advantages, security features, and why it remains indispensable in business and legal contexts.',
    author: 'Emily Watson',
    date: '2026-01-05',
    category: 'Documents',
    readTime: '5 min read'
  },
  {
    title: 'The Evolution of Image Formats: From GIF to AVIF',
    excerpt: 'Image formats have evolved dramatically over the past three decades. This article traces the development from early formats like GIF and JPG to modern solutions like WEBP and AVIF, explaining the technical innovations behind each.',
    author: 'David Kim',
    date: '2026-01-03',
    category: 'Images',
    readTime: '10 min read'
  },
  {
    title: 'Audio Quality vs File Size: Finding the Perfect Balance',
    excerpt: 'Choosing the right audio format and bitrate affects both quality and file size. Learn about different audio codecs, bitrate recommendations for various use cases, and how to maintain quality while minimizing storage requirements.',
    author: 'Lisa Thompson',
    date: '2025-12-28',
    category: 'Audio',
    readTime: '7 min read'
  },
  {
    title: 'File Security: Protecting Your Documents During Conversion',
    excerpt: 'When converting sensitive files online, security is paramount. This guide covers encryption standards, secure file handling practices, privacy considerations, and what to look for in a trustworthy conversion service.',
    author: 'James Martinez',
    date: '2025-12-25',
    category: 'Security',
    readTime: '9 min read'
  },
  {
    title: 'The Future of File Formats: What Comes Next',
    excerpt: 'Technology never stands still, and neither do file formats. Explore emerging formats powered by AI, improved compression algorithms, and new standards that promise better quality, smaller sizes, and enhanced functionality.',
    author: 'Rachel Green',
    date: '2025-12-20',
    category: 'Industry Trends',
    readTime: '6 min read'
  },
  {
    title: 'Batch Processing: Converting Multiple Files Efficiently',
    excerpt: 'When you need to convert dozens or hundreds of files, batch processing saves hours. Learn strategies for organizing files, choosing appropriate formats, automating workflows, and managing large-scale conversion projects.',
    author: 'Alex Johnson',
    date: '2025-12-15',
    category: 'Productivity',
    readTime: '8 min read'
  },
  {
    title: 'Vector vs Raster: Choosing the Right Image Type',
    excerpt: 'Understanding the fundamental difference between vector and raster graphics is crucial for designers. This article explains when to use each type, conversion considerations, and how to work with both formats effectively.',
    author: 'Sophie Anderson',
    date: '2025-12-10',
    category: 'Design',
    readTime: '7 min read'
  }
];

export default function Blog() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-5xl font-bold text-white mb-6">Blog</h1>
      <p className="text-xl text-gray-400 mb-12">
        Expert insights, tutorials, and industry news about file conversion and digital formats
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post, index) => (
          <article
            key={index}
            className="bg-[#1a1f2e] rounded-2xl border border-gray-800 overflow-hidden hover:border-[#00FF00]/30 transition-all hover:scale-[1.02] group"
          >
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-[#00FF00]/10 text-[#00FF00] text-xs font-semibold rounded-full">
                  {post.category}
                </span>
                <span className="text-gray-500 text-xs">{post.readTime}</span>
              </div>

              <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#00FF00] transition-colors">
                {post.title}
              </h2>

              <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.date)}</span>
                </div>
              </div>

              <button className="mt-4 flex items-center gap-2 text-[#00FF00] text-sm font-medium hover:gap-3 transition-all">
                Read Article
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 bg-[#1a1f2e] rounded-2xl border border-gray-800 p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
        <p className="text-gray-400 mb-6">
          Subscribe to our newsletter for the latest articles, tips, and file conversion insights delivered to your inbox.
        </p>
        <div className="flex gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF00] transition-colors"
          />
          <button className="px-6 py-3 bg-[#00FF00] text-black font-semibold rounded-lg hover:bg-[#00FF00]/90 transition-all hover:scale-105">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
