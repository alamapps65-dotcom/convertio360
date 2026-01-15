import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    category: 'Getting Started',
    question: 'How do I convert a file using Convertio360?',
    answer: 'Converting files is simple: 1) Upload your file by dragging and dropping it into the upload area or clicking "Choose Files". 2) Select your desired output format from the list of 140 supported formats. 3) Click the "Convert" button. 4) Download your converted file once processing is complete. The entire process typically takes just seconds to minutes depending on file size.'
  },
  {
    category: 'Getting Started',
    question: 'Do I need to create an account to use Convertio360?',
    answer: 'No account is required for basic file conversion. You can start converting files immediately without registration. However, creating a free account provides benefits like conversion history tracking, faster processing, and the ability to save your preferences.'
  },
  {
    category: 'File Formats',
    question: 'What file formats does Convertio360 support?',
    answer: 'Convertio360 supports 140 file formats across 9 major categories: Documents (PDF, DOCX, XLS, etc.), Images (JPG, PNG, SVG, etc.), Videos (MP4, AVI, MOV, etc.), Audio (MP3, WAV, FLAC, etc.), Archives (ZIP, RAR, 7Z, etc.), Presentations (PPT, PPTX, ODP, etc.), E-Books (EPUB, MOBI, AZW3, etc.), Fonts (TTF, OTF, WOFF, etc.), and Vector Graphics (AI, EPS, SVG, etc.).'
  },
  {
    category: 'File Formats',
    question: 'Can I convert between any two formats?',
    answer: 'Most conversions are supported, but some format combinations may not be compatible due to technical limitations. For example, you cannot convert an audio file directly to a document format. Our system will display only compatible output formats based on your input file type. If a conversion is not available, consider converting to an intermediate format first.'
  },
  {
    category: 'File Formats',
    question: 'Will you add support for more file formats in the future?',
    answer: 'Yes! We continuously evaluate and add new file formats based on user demand and industry trends. If you need a specific format that is not currently supported, please contact us through our feedback form. We prioritize format additions based on user requests and usage patterns.'
  },
  {
    category: 'Security & Privacy',
    question: 'Is my data secure when using Convertio360?',
    answer: 'Absolutely. We take security seriously: All files are encrypted during transmission using industry-standard SSL/TLS protocols. Files are processed on secure servers with enterprise-grade security measures. Your files are automatically deleted from our servers within one hour of conversion completion. We never access, view, or share your files with third parties. Our infrastructure is regularly audited for security compliance.'
  },
  {
    category: 'Security & Privacy',
    question: 'How long are my files stored on your servers?',
    answer: 'Uploaded files and converted outputs are stored temporarily to allow you to download them. Files are automatically and permanently deleted from our servers within one hour of upload or conversion completion, whichever comes later. This ensures your privacy while giving you adequate time to retrieve your converted files.'
  },
  {
    category: 'Security & Privacy',
    question: 'Do you collect any personal information?',
    answer: 'We collect minimal information necessary to provide our service. For non-registered users, we only collect technical data like IP addresses and browser information for security and analytics purposes. Registered users provide an email address and optional profile information. We never sell or share your personal information with third parties. See our Privacy Policy for complete details.'
  },
  {
    category: 'Technical Issues',
    question: 'What file size limits do you have?',
    answer: 'Convertio360 has no strict file size limits for conversions. However, extremely large files (over 5GB) may take longer to process and upload. For optimal performance, we recommend files under 2GB. If you regularly work with very large files, consider our enterprise plan which includes priority processing and dedicated bandwidth.'
  },
  {
    category: 'Technical Issues',
    question: 'Why is my conversion taking longer than expected?',
    answer: 'Conversion time depends on several factors: file size (larger files take longer), complexity of the conversion (some format conversions are more computationally intensive), server load (peak usage times may result in slight delays), and internet connection speed (affects upload/download times). Most conversions complete within 2 minutes. If your conversion is taking significantly longer, try refreshing the page or contact support.'
  },
  {
    category: 'Technical Issues',
    question: 'What should I do if my conversion fails?',
    answer: 'If a conversion fails, try these steps: 1) Verify your file is not corrupted by opening it in its native application. 2) Check that the file format is correctly identified. 3) Try converting to a different intermediate format first. 4) Ensure your internet connection is stable. 5) Clear your browser cache and try again. If the problem persists, contact our support team with details about the file type and error message received.'
  },
  {
    category: 'Technical Issues',
    question: 'Can I convert multiple files at once?',
    answer: 'Yes! Convertio360 supports batch conversion. Simply upload multiple files at once by selecting them together or dragging them into the upload area. Each file can be converted to a different output format if needed. Batch processing saves time when you have multiple files to convert.'
  },
  {
    category: 'Quality & Output',
    question: 'Will converting affect my file quality?',
    answer: 'Convertio360 uses high-quality conversion algorithms to preserve maximum fidelity. However, quality depends on the conversion type: Lossless conversions (like DOCX to PDF) maintain perfect quality. Lossy conversions (like WAV to MP3) may have minor quality trade-offs depending on settings. Image format conversions preserve resolution but may affect compression. Video conversions maintain resolution with codec-appropriate quality settings. We always optimize for the best balance between quality and file size.'
  },
  {
    category: 'Quality & Output',
    question: 'Can I customize conversion settings?',
    answer: 'Currently, Convertio360 uses optimized default settings for each conversion type to ensure the best results for most users. These settings are based on industry best practices and user feedback. Advanced users and enterprise customers have access to custom conversion parameters. We are working on adding more customization options for all users in future updates.'
  },
  {
    category: 'Quality & Output',
    question: 'What format should I choose for my needs?',
    answer: 'Format choice depends on your use case: For documents, PDF is universal and maintains formatting. For images, use PNG for graphics with transparency, JPG for photographs, and SVG for scalable graphics. For videos, MP4 offers the best compatibility across devices. For audio, MP3 is widely supported, while FLAC preserves original quality. For archiving, ZIP is universally compatible, while 7Z offers better compression. Check our Guides section for detailed format recommendations.'
  },
  {
    category: 'Billing & Plans',
    question: 'Is Convertio360 free to use?',
    answer: 'Yes, Convertio360 offers a free tier that includes access to all 140 file formats, standard processing speed, and file conversions up to 1GB. For users with higher volume needs or requiring faster processing, we offer premium plans with additional benefits like priority processing, no ads, batch processing, and extended file storage time.'
  },
  {
    category: 'Billing & Plans',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and various local payment methods depending on your region. All payments are processed securely through industry-leading payment processors. We do not store your payment information on our servers.'
  },
  {
    category: 'Billing & Plans',
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your subscription at any time from your account settings. There are no cancellation fees or penalties. If you cancel, you will retain premium access until the end of your current billing period. After cancellation, your account will automatically revert to the free tier, and you can continue using basic features.'
  }
];

const categories = Array.from(new Set(faqData.map(item => item.category)));

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredFAQs = selectedCategory === 'All'
    ? faqData
    : faqData.filter(item => item.category === selectedCategory);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold text-white mb-6">Frequently Asked Questions</h1>
      <p className="text-xl text-gray-400 mb-12">
        Find answers to common questions about Convertio360
      </p>

      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === 'All'
                ? 'bg-[#00FF00] text-black'
                : 'bg-[#1a1f2e] text-gray-400 hover:bg-gray-800'
            }`}
          >
            All Questions
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-[#00FF00] text-black'
                  : 'bg-[#1a1f2e] text-gray-400 hover:bg-gray-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredFAQs.map((item, index) => (
          <div
            key={index}
            className="bg-[#1a1f2e] rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-colors"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left"
            >
              <div className="flex-1">
                <span className="text-xs text-[#00FF00] font-semibold mb-2 block">
                  {item.category}
                </span>
                <h3 className="text-lg font-semibold text-white">
                  {item.question}
                </h3>
              </div>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-[#00FF00] flex-shrink-0 ml-4" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
              )}
            </button>

            {openIndex === index && (
              <div className="px-6 pb-5">
                <p className="text-gray-300 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 bg-[#1a1f2e] rounded-2xl border border-gray-800 p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Still Have Questions?</h2>
        <p className="text-gray-400 mb-6">
          Can't find the answer you're looking for? Our support team is ready to help you.
        </p>
        <a
          href="#contact"
          className="inline-block px-8 py-3 bg-[#00FF00] text-black font-semibold rounded-lg hover:bg-[#00FF00]/90 transition-all hover:scale-105"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
