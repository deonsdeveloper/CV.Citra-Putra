import React, { useState, useEffect } from 'react';
import { X, Globe, ChevronUp, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function MobileMenu({ isOpen, onClose, navItems, activePage, onNavigate }) {
  const { lang, setLang, t } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNavClick = (pageId) => {
    onNavigate(pageId);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu Navigasi Mobile"
      className="fixed inset-0 z-50 lg:hidden w-full h-full bg-white flex flex-col justify-between p-6 sm:p-8 overflow-y-auto transition-all duration-300 ease-out"
    >
      <div>
        {/* Header: Logo Left, Plain Close Right */}
        <div className="flex items-center justify-between pb-6 pt-1 border-b border-slate-100 animate-slide-up-fade">
          <img
            src="/assets/logo.png"
            alt="CV. Citra Putra Mandiri"
            className="h-10 sm:h-12 w-auto object-contain"
          />
          <button
            onClick={onClose}
            aria-label="Tutup menu navigasi"
            className="p-2 -mr-2 text-slate-700 hover:text-navy-950 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
          >
            <X className="w-6 h-6 stroke-[1.75]" />
          </button>
        </div>

        {/* Main Navigation (Typography-First, Fullscreen Staggered Entrance) */}
        <div className="pt-6">
          <div
            className="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase mb-3 font-sans animate-slide-up-fade"
            style={{ animationDelay: '40ms' }}
          >
            {t('mobile_nav_heading') || 'MENU UTAMA'}
          </div>

          <nav className="flex flex-col space-y-0.5">
            {navItems.map((item, index) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{ animationDelay: `${index * 60 + 80}ms` }}
                  className={`w-full text-left py-3 flex items-center justify-between text-2xl sm:text-3xl font-serif transition-colors cursor-pointer animate-slide-up-fade ${
                    isActive
                      ? 'text-teal-700 font-bold'
                      : 'text-navy-900 hover:text-teal-600 font-medium'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Language Selector (Tuku-Inspired Minimal Globe + Pill Container) */}
        <div
          className="mt-6 pt-5 border-t border-slate-100/80 animate-slide-up-fade"
          style={{ animationDelay: `${navItems.length * 60 + 120}ms` }}
        >
          {/* Globe Trigger Button */}
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-2 text-navy-950 font-bold text-xl hover:text-teal-700 transition-colors cursor-pointer mb-2.5 min-h-[40px]"
            aria-label="Pilih Bahasa / Select Language"
          >
            <Globe className="w-5 h-5 text-navy-950 stroke-[2]" />
            <span className="italic font-serif font-black tracking-tight">{lang.toUpperCase()}</span>
            {isLangOpen ? (
              <ChevronUp className="w-4 h-4 text-navy-950 stroke-[2.5]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-navy-950 stroke-[2.5]" />
            )}
          </button>

          {/* Transparent Pill Container for Language Options */}
          {isLangOpen && (
            <div className="w-full max-w-[240px] bg-transparent border border-slate-200 rounded-2xl p-1 flex items-center justify-center gap-1.5 animate-slide-up-fade">
              <button
                onClick={() => setLang('en')}
                className={`flex-1 py-1.5 text-center font-bold text-sm tracking-wide transition-all rounded-xl cursor-pointer min-h-[34px] ${
                  lang === 'en'
                    ? 'text-teal-700 bg-teal-50/90 font-extrabold shadow-xs'
                    : 'text-slate-500 hover:text-navy-950 font-medium'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('id')}
                className={`flex-1 py-1.5 text-center font-bold text-sm tracking-wide transition-all rounded-xl cursor-pointer min-h-[34px] ${
                  lang === 'id'
                    ? 'text-teal-700 bg-teal-50/90 font-extrabold shadow-xs'
                    : 'text-slate-500 hover:text-navy-950 font-medium'
                }`}
              >
                ID
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
