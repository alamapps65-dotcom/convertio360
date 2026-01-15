import { Building2, Users, Target, Award } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold text-white mb-6">About Convertio360</h1>
      <p className="text-xl text-gray-400 mb-12">
        Your trusted partner for seamless file conversion across 140 formats
      </p>

      <div className="prose prose-invert max-w-none">
        <div className="bg-[#1a1f2e] rounded-2xl border border-gray-800 p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Our Story</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Founded in 2024, Convertio360 emerged from a simple observation: people waste countless hours
            struggling with incompatible file formats. Whether you're a creative professional needing to
            convert design files, a business user managing documents, or a content creator working with
            media files, format conversion shouldn't be complicated.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            We built Convertio360 to eliminate this friction. Our platform supports 140 carefully selected
            file formats spanning documents, images, videos, audio files, archives, fonts, presentations,
            and more. Every format we support is chosen based on real-world usage data and user feedback.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Today, Convertio360 processes thousands of file conversions daily, helping users across industries
            work more efficiently. Our commitment to speed, security, and simplicity drives everything we do.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#1a1f2e] rounded-2xl border border-gray-800 p-8">
            <div className="w-12 h-12 rounded-lg bg-[#00FF00]/10 flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-[#00FF00]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Our Mission</h3>
            <p className="text-gray-300 leading-relaxed">
              To provide the fastest, most secure, and user-friendly file conversion service on the internet.
              We believe file format barriers should never slow down creativity or productivity.
            </p>
          </div>

          <div className="bg-[#1a1f2e] rounded-2xl border border-gray-800 p-8">
            <div className="w-12 h-12 rounded-lg bg-[#00FF00]/10 flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-[#00FF00]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Our Values</h3>
            <p className="text-gray-300 leading-relaxed">
              Security first, user privacy paramount, and unwavering commitment to quality. We process files
              securely and delete them immediately after conversion. Your data is yours alone.
            </p>
          </div>
        </div>

        <div className="bg-[#1a1f2e] rounded-2xl border border-gray-800 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-[#00FF00]/10 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-[#00FF00]" />
            </div>
            <h2 className="text-3xl font-bold text-white">What Makes Us Different</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Lightning-Fast Processing</h3>
              <p className="text-gray-300 leading-relaxed">
                Our infrastructure is optimized for speed. Most conversions complete in seconds, not minutes.
                We use advanced algorithms and distributed computing to ensure rapid processing even during
                peak usage times.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Enterprise-Grade Security</h3>
              <p className="text-gray-300 leading-relaxed">
                Every file is encrypted during transmission and processing. Our servers are hardened against
                attacks, and we maintain SOC 2 compliance standards. Files are automatically deleted within
                one hour of conversion completion.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">No File Size Restrictions</h3>
              <p className="text-gray-300 leading-relaxed">
                Unlike competitors who impose arbitrary limits, we support files of any size. Whether you're
                converting a small document or a multi-gigabyte video project, Convertio360 handles it with ease.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Continuous Format Support</h3>
              <p className="text-gray-300 leading-relaxed">
                We regularly update our conversion engines to support new file formats and improve existing ones.
                Our team monitors industry trends and user requests to ensure we support the formats you need most.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#1a1f2e] rounded-2xl border border-gray-800 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-[#00FF00]/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-[#00FF00]" />
            </div>
            <h2 className="text-3xl font-bold text-white">Who We Serve</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Creative Professionals</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Designers, photographers, and video editors who need reliable conversion between professional
                formats like PSD, RAW, AI, and various video codecs.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Business Users</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Professionals managing documents, presentations, and spreadsheets across different software
                platforms and needing seamless format compatibility.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Developers & Engineers</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Technical users working with data formats, configuration files, and specialized file types
                who need quick, reliable conversion tools.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Students & Educators</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Academic users who frequently need to convert research materials, presentations, and
                multimedia content for different platforms and requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
