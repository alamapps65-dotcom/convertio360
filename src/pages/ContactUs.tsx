import { Mail, MessageSquare, Clock, MapPin } from 'lucide-react';

export default function ContactUs() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold text-white mb-6">Contact Us</h1>
      <p className="text-xl text-gray-400 mb-12">
        We're here to help. Reach out with any questions, feedback, or support needs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-[#1a1f2e] rounded-2xl border border-gray-800 p-8 hover:border-[#00FF00]/30 transition-colors">
          <div className="w-14 h-14 rounded-xl bg-[#00FF00]/10 flex items-center justify-center mb-4">
            <Mail className="w-7 h-7 text-[#00FF00]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Email Support</h3>
          <p className="text-gray-400 mb-4">
            For general inquiries and support requests
          </p>
          <a href="mailto:support@convertio360.com" className="text-[#00FF00] hover:underline">
            support@convertio360.com
          </a>
        </div>

        <div className="bg-[#1a1f2e] rounded-2xl border border-gray-800 p-8 hover:border-[#00FF00]/30 transition-colors">
          <div className="w-14 h-14 rounded-xl bg-[#00FF00]/10 flex items-center justify-center mb-4">
            <MessageSquare className="w-7 h-7 text-[#00FF00]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Business Inquiries</h3>
          <p className="text-gray-400 mb-4">
            For partnerships and enterprise solutions
          </p>
          <a href="mailto:business@convertio360.com" className="text-[#00FF00] hover:underline">
            business@convertio360.com
          </a>
        </div>

        <div className="bg-[#1a1f2e] rounded-2xl border border-gray-800 p-8 hover:border-[#00FF00]/30 transition-colors">
          <div className="w-14 h-14 rounded-xl bg-[#00FF00]/10 flex items-center justify-center mb-4">
            <Clock className="w-7 h-7 text-[#00FF00]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Support Hours</h3>
          <p className="text-gray-400">
            Monday - Friday: 9:00 AM - 6:00 PM EST<br />
            Saturday: 10:00 AM - 4:00 PM EST<br />
            Sunday: Closed
          </p>
        </div>

        <div className="bg-[#1a1f2e] rounded-2xl border border-gray-800 p-8 hover:border-[#00FF00]/30 transition-colors">
          <div className="w-14 h-14 rounded-xl bg-[#00FF00]/10 flex items-center justify-center mb-4">
            <MapPin className="w-7 h-7 text-[#00FF00]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Location</h3>
          <p className="text-gray-400">
            Convertio360 HQ<br />
            123 Tech Boulevard<br />
            San Francisco, CA 94105<br />
            United States
          </p>
        </div>
      </div>

      <div className="bg-[#1a1f2e] rounded-2xl border border-gray-800 p-8 mb-8">
        <h2 className="text-3xl font-bold text-white mb-6">Send Us a Message</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF00] transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF00] transition-colors"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF00] transition-colors"
              placeholder="How can we help?"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              required
              rows={6}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF00] transition-colors resize-none"
              placeholder="Tell us more about your inquiry..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#00FF00] text-black font-semibold rounded-lg hover:bg-[#00FF00]/90 transition-all hover:scale-[1.02]"
          >
            Send Message
          </button>
        </form>
      </div>

      <div className="bg-[#1a1f2e] rounded-2xl border border-gray-800 p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Topics</h2>
        <p className="text-gray-400 mb-6">
          Before reaching out, you might find answers to common questions in our FAQ section:
        </p>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-[#00FF00] mt-1">•</span>
            <span>Conversion process and supported formats</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00FF00] mt-1">•</span>
            <span>File security and privacy policies</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00FF00] mt-1">•</span>
            <span>Account management and billing questions</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00FF00] mt-1">•</span>
            <span>Technical troubleshooting and error resolution</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
