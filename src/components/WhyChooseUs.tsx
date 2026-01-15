import { Zap, Grid3x3, Infinity, Layers, Shield, Lock } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Fast and Secure Conversion',
    description: 'Lightning-fast processing with enterprise-grade security for all your files'
  },
  {
    icon: Grid3x3,
    title: '140 Supported Formats',
    description: 'Convert between 140 formats across all major file categories'
  },
  {
    icon: Infinity,
    title: 'No File Size Limits',
    description: 'Upload and convert files of any size without restrictions'
  },
  {
    icon: Layers,
    title: 'Multiple File Conversion',
    description: 'Convert multiple files simultaneously to save time and effort'
  },
  {
    icon: Shield,
    title: 'Privacy & Security',
    description: 'Your files are processed securely and deleted automatically after conversion'
  },
  {
    icon: Lock,
    title: 'No Permanent Storage',
    description: 'Files are automatically removed from our servers after processing'
  }
];

export default function WhyChooseUs() {
  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          Why Choose Us
        </h2>
        <p className="text-gray-400 text-lg">
          The best file conversion experience, guaranteed
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="bg-[#1a1f2e] rounded-2xl border border-gray-800 p-8 hover:border-[#00FF00]/30 transition-all duration-300 hover:scale-[1.02] group"
            >
              <div className="w-16 h-16 rounded-xl bg-[#00FF00]/10 flex items-center justify-center mb-6 group-hover:bg-[#00FF00]/20 transition-colors">
                <Icon className="w-8 h-8 text-[#00FF00]" />
              </div>

              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
