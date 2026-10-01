import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Services from './pages/Services';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import { MessageCircle, ArrowUp } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return ['home', 'about', 'products', 'services', 'resources', 'contact'].includes(hash) ? hash : 'home';
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'about', 'products', 'services', 'resources', 'contact'].includes(hash)) {
        setActivePage(hash);
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigateTo = (pageId) => {
    setActivePage(pageId);
    window.location.hash = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    if (activePage !== 'home') {
      navigateTo('home');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-bone-100 text-navy-900 font-sans selection:bg-teal-500 selection:text-white">
        {/* Navigation Header */}
        <Navbar activePage={activePage} onNavigate={navigateTo} />

        {/* Main Page View Content */}
        <main className="flex-grow">
          {activePage === 'home' && <Home onNavigate={navigateTo} />}
          {activePage === 'about' && <About onNavigate={navigateTo} />}
          {activePage === 'products' && <Products onNavigate={navigateTo} />}
          {activePage === 'services' && <Services onNavigate={navigateTo} />}
          {activePage === 'resources' && <Resources onNavigate={navigateTo} />}
          {activePage === 'contact' && <Contact onNavigate={navigateTo} />}
        </main>

        {/* Footer */}
        <Footer onNavigate={navigateTo} />

        {/* Floating Action Buttons (Scroll to Top + Connect With Us Pill) - Only visible on Home Page */}
        {activePage === 'home' && (
          <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 animate-in fade-in duration-300">
            {showScrollTop && (
              <button
                onClick={scrollToTop}
                aria-label="Kembali ke tampilan utama"
                title="Kembali ke Tampilan Utama"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-teal-400/60 hover:border-teal-300 flex items-center justify-center transition-all duration-300 transform hover:scale-110 cursor-pointer group shadow-sm"
              >
                <ArrowUp className="w-4 h-4 text-teal-400 group-hover:text-teal-300 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            )}

            <a
              href="https://wa.me/628129483381?text=Halo%20CV.%20Citra%20Putra%20Mandiri,%20saya%20ingin%20konsultasi%20bahan%20kimia%20industri"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect With Us via WhatsApp"
              className="relative inline-flex items-center gap-3 bg-gradient-to-r from-[#2563EB] to-[#0D9488] hover:from-[#1D4ED8] hover:to-[#0F766E] text-white pl-3.5 pr-6 py-2.5 rounded-full shadow-[0_10px_28px_rgba(37,99,235,0.35)] hover:shadow-[0_14px_35px_rgba(37,99,235,0.5)] transition-all duration-300 transform hover:scale-105 cursor-pointer group select-none"
            >
              {/* Pure Logo Mark (No White Background) */}
              <img
                src="/assets/logo-mark.png"
                alt="CV. Citra Putra Mandiri"
                className="w-8 h-8 sm:w-9 sm:h-9 object-contain shrink-0 drop-shadow-md group-hover:scale-110 transition-transform"
              />

              {/* Text: Connect With Us (No Clipping Guaranteed) */}
              <div className="flex flex-col text-left leading-tight whitespace-nowrap">
                <span className="text-xs sm:text-sm font-bold tracking-tight text-white drop-shadow-xs whitespace-nowrap">Connect</span>
                <span className="text-xs sm:text-sm font-bold tracking-tight text-white drop-shadow-xs whitespace-nowrap">With Us</span>
              </div>

              {/* Red Notification Badge */}
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center shadow-md border-2 border-white animate-pulse pointer-events-none">
                1
              </span>
            </a>
          </div>
        )}
      </div>
    </LanguageProvider>
  );
}
