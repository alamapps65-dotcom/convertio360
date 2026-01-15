import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import FAQ from './pages/FAQ';
import Guides from './pages/Guides';
import Blog from './pages/Blog';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import CookiesPolicy from './pages/CookiesPolicy';

type Page = 'home' | 'about' | 'contact' | 'faq' | 'guides' | 'blog' | 'privacy' | 'terms' | 'cookies';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    const hash = window.location.hash.slice(1) as Page;
    if (hash) setCurrentPage(hash);

    const handleHashChange = () => {
      const newHash = window.location.hash.slice(1) as Page;
      setCurrentPage(newHash || 'home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (page: Page) => {
    window.location.hash = page;
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'about': return <AboutUs />;
      case 'contact': return <ContactUs />;
      case 'faq': return <FAQ />;
      case 'guides': return <Guides />;
      case 'blog': return <Blog />;
      case 'privacy': return <PrivacyPolicy />;
      case 'terms': return <TermsConditions />;
      case 'cookies': return <CookiesPolicy />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1419] text-white">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00FF00]/5 to-transparent pointer-events-none"></div>

        <header className="relative border-b border-gray-800 bg-[#0f1419]/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('home')}>
              <div className="w-10 h-10 rounded-lg bg-[#00FF00] flex items-center justify-center">
                <FileText className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Convertio360
                </h1>
                <p className="text-sm text-gray-400">
                  Convert between 140 formats instantly
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="relative min-h-[calc(100vh-400px)]">
          {renderPage()}
        </div>

        <footer className="relative border-t border-gray-800 bg-[#0f1419]/80 backdrop-blur-sm mt-20">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <div>
                <h3 className="text-white font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><button onClick={() => navigate('about')} className="text-gray-400 hover:text-[#00FF00] transition-colors text-sm">About Us</button></li>
                  <li><button onClick={() => navigate('contact')} className="text-gray-400 hover:text-[#00FF00] transition-colors text-sm">Contact Us</button></li>
                  <li><button onClick={() => navigate('faq')} className="text-gray-400 hover:text-[#00FF00] transition-colors text-sm">FAQ</button></li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><button onClick={() => navigate('guides')} className="text-gray-400 hover:text-[#00FF00] transition-colors text-sm">Guides & Tutorials</button></li>
                  <li><button onClick={() => navigate('home')} className="text-gray-400 hover:text-[#00FF00] transition-colors text-sm">Supported Formats</button></li>
                  <li><button onClick={() => navigate('blog')} className="text-gray-400 hover:text-[#00FF00] transition-colors text-sm">Blog</button></li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><button onClick={() => navigate('privacy')} className="text-gray-400 hover:text-[#00FF00] transition-colors text-sm">Privacy Policy</button></li>
                  <li><button onClick={() => navigate('terms')} className="text-gray-400 hover:text-[#00FF00] transition-colors text-sm">Terms & Conditions</button></li>
                  <li><button onClick={() => navigate('cookies')} className="text-gray-400 hover:text-[#00FF00] transition-colors text-sm">Cookies Policy</button></li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4">Info</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Fast, simple, and secure file conversion tools - powered by your peace of mind.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                  <p className="text-gray-400 font-semibold">Convertio360</p>
                  <p className="text-gray-600 text-sm mt-1">© 2026 Convertio360. All rights reserved.</p>
                </div>
                <p className="text-gray-600 text-sm mt-4 md:mt-0">
                  Your files are processed securely and automatically deleted after conversion
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
