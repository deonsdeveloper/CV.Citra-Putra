import React, { useState, useEffect, useRef } from 'react';
import { Menu, ChevronDown, Globe, Check, ArrowRight, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import MobileMenu from './MobileMenu';

export default function Navbar({ activePage, onNavigate }) {
  const { lang, setLang, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  
  const langRef = useRef(null);
  const enterTimeoutRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  const navItems = [
    { id: 'home', label: t('nav_home') },
    { id: 'about', label: t('nav_about') },
    { id: 'products', label: t('nav_products') },
    { id: 'services', label: t('nav_services') },
    { id: 'resources', label: t('nav_resources') },
  ];

  const productCategories = [
    { id: 'all', name: t('cat_all') || 'Semua Produk' },
    { id: 'water-treatment', name: t('cat_water') || 'Cooling & Boiler Treatment' },
    { id: 'cleaning', name: t('cat_cleaning') || 'Cleaning & Degreasing' },
    { id: 'rust', name: t('cat_rust') || 'Rust Treatment & Protection' },
    { id: 'electrical', name: t('cat_electrical') || 'Electrical & Insulation' },
    { id: 'specialty', name: t('cat_specialty') || 'Specialty Chemicals' },
  ];

  const featuredProducts = [
    { id: 'clenol-mr-220', code: 'CLENOL MR 220', name: 'Mould Release Agent', cat: 'specialty' },
    { id: 'clenol-ct-031', code: 'CLENOL CT-031', name: 'Corrosion Inhibitor Closed Loop', cat: 'water-treatment' },
    { id: 'clenol-bt-330', code: 'CLENOL BT 330', name: 'Boiler Scale & Alkalinity Control', cat: 'water-treatment' },
    { id: 'clenol-bt-331', code: 'CLENOL BT 331', name: 'Oxygen Scavenger & Inhibitor', cat: 'water-treatment' },
    { id: 'clenol-ct-032', code: 'CLENOL CT-032', name: 'Slimicide & Biocide Bacteria', cat: 'water-treatment' },
    { id: 'r-1011', code: 'R 1011', name: 'Coil Cleaner AC & Chiller', cat: 'cleaning' },
  ];

  const quickResources = [
    { label: t('mega_msds_tds') || 'Dokumen Resmi MSDS & TDS', page: 'resources', tab: 'msds-tds' },
    { label: t('mega_boiler_guide') || 'Panduan Descaling Boiler', page: 'resources', tab: 'guides' },
    { label: t('mega_oem') || 'Formulasi Custom OEM Mesin', page: 'services', section: 'custom-formulation' },
    { label: t('mega_water_test') || 'Uji Analisis Sampel Air', page: 'services', section: 'water-treatment-service' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangDropdownOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsProductsMenuOpen(false);
        setLangDropdownOpen(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
      if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const handleMouseEnterProducts = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
    enterTimeoutRef.current = setTimeout(() => {
      setIsProductsMenuOpen(true);
    }, 120);
  };

  const handleMouseLeaveProducts = () => {
    if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsProductsMenuOpen(false);
    }, 320);
  };

  const isTransparent = activePage === 'home' && !isScrolled;

  const handleNavClick = (pageId) => {
    if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsProductsMenuOpen(false);
    onNavigate(pageId);
    if (activePage === 'home') {
      const section = document.getElementById(pageId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCategorySelect = (catId) => {
    setIsProductsMenuOpen(false);
    onNavigate('products');
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('setProductCategory', {
        detail: catId
      }));
    }, 60);
  };

  const handleProductSelect = (catId, productId) => {
    setIsProductsMenuOpen(false);
    onNavigate('products');
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('setProductCategory', {
        detail: catId,
        detailProduct: productId
      }));
    }, 60);
  };

  const handleResourceSelect = (item) => {
    setIsProductsMenuOpen(false);
    onNavigate(item.page);
    if (item.section) {
      setTimeout(() => {
        const el = document.getElementById(item.section);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleSelectLang = (newLang) => {
    setLang(newLang);
    setLangDropdownOpen(false);
  };

  return (
    <>
      {/* Dimmed Apple-style backdrop blur overlay */}
      <div
        className={`fixed inset-0 top-0 bg-black/25 z-30 transition-all duration-300 ${
          isProductsMenuOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{
          backdropFilter: isProductsMenuOpen ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isProductsMenuOpen ? 'blur(16px)' : 'none',
        }}
        onClick={() => setIsProductsMenuOpen(false)}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ease-in-out ${
          isTransparent
            ? 'bg-gradient-to-b from-navy-950/85 via-navy-900/50 to-transparent text-white py-6 sm:py-7'
            : 'bg-white/95 backdrop-blur-md text-navy-900 shadow-sm border-b border-slate-100 py-3 sm:py-3.5'
        }`}
        onMouseLeave={handleMouseLeaveProducts}
      >
        <div className="w-full pl-3 sm:pl-6 pr-4 sm:pr-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left cursor-pointer group focus:outline-none shrink-0"
          >
            <img
              src="/assets/logo.png"
              alt="CV. Citra Putra Mandiri Logo"
              className={`w-auto object-contain transition-all duration-300 ease-in-out ${
                isTransparent
                  ? 'h-14 sm:h-16 lg:h-20 brightness-0 invert drop-shadow-lg'
                  : 'h-9 sm:h-10 lg:h-11'
              }`}
            />
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              const isProductItem = item.id === 'products';

              return (
                <div
                  key={item.id}
                  className="relative py-1"
                  onMouseEnter={isProductItem ? handleMouseEnterProducts : () => {
                    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                    setIsProductsMenuOpen(false);
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`text-sm font-medium transition-all duration-200 cursor-pointer relative py-2 flex items-center gap-1 select-none ${
                      isTransparent
                        ? isActive || (isProductItem && isProductsMenuOpen)
                          ? 'text-teal-400 font-semibold'
                          : 'text-white/90 hover:text-teal-300'
                        : isActive || (isProductItem && isProductsMenuOpen)
                        ? 'text-teal-600 font-semibold'
                        : 'text-slate-700 hover:text-teal-600'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isProductItem && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 opacity-70 transition-transform duration-300 ease-out ${
                          isProductsMenuOpen ? 'rotate-180 text-teal-500' : ''
                        }`}
                      />
                    )}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500 rounded-full" />
                    )}
                  </button>
                </div>
              );
            })}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-5">
            {/* Interactive Language Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className={`flex items-center gap-1.5 text-xs font-semibold tracking-wide cursor-pointer py-1.5 px-2.5 rounded-lg transition-all duration-200 ${
                  isTransparent
                    ? 'text-white/90 hover:text-teal-300 hover:bg-white/10'
                    : 'text-slate-700 hover:text-navy-900 hover:bg-slate-100'
                } ${langDropdownOpen ? (isTransparent ? 'bg-white/15 text-teal-300' : 'bg-slate-100 text-navy-950') : ''}`}
                aria-label="Pilih Bahasa / Select Language"
                aria-expanded={langDropdownOpen}
              >
                <Globe className="w-3.5 h-3.5 opacity-80" />
                <span>{lang === 'id' ? 'Indonesia' : 'English'}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 opacity-70 transition-transform duration-300 ease-out ${
                    langDropdownOpen ? 'rotate-180 text-teal-500' : ''
                  }`}
                />
              </button>

              {/* Language Dropdown Menu Popup with Ultra-Smooth Animation */}
              <div
                style={{
                  transition:
                    'opacity 280ms cubic-bezier(0.16, 1, 0.3, 1), transform 280ms cubic-bezier(0.16, 1, 0.3, 1), visibility 280ms',
                }}
                className={`absolute right-0 mt-2 w-44 bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_16px_40px_-8px_rgba(0,0,0,0.18)] border border-slate-100/90 p-1.5 z-50 text-navy-900 text-xs font-medium origin-top-right select-none ${
                  langDropdownOpen
                    ? 'opacity-100 translate-y-0 scale-100 visible pointer-events-auto'
                    : 'opacity-0 -translate-y-2 scale-95 invisible pointer-events-none'
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleSelectLang('id')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                    lang === 'id'
                      ? 'text-teal-800 font-bold bg-teal-50/80 shadow-xs'
                      : 'text-slate-700 hover:text-navy-950 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className={`text-[11px] font-extrabold font-sans tracking-wide px-1.5 py-0.5 rounded transition-colors ${
                        lang === 'id'
                          ? 'text-teal-700 bg-teal-100/60'
                          : 'text-slate-500 bg-slate-100'
                      }`}
                    >
                      ID
                    </span>
                    <span className="text-xs">Indonesia</span>
                  </span>
                  {lang === 'id' && (
                    <Check className="w-3.5 h-3.5 text-teal-600 stroke-[2.5] animate-in fade-in zoom-in-75 duration-200" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectLang('en')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                    lang === 'en'
                      ? 'text-teal-800 font-bold bg-teal-50/80 shadow-xs'
                      : 'text-slate-700 hover:text-navy-950 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className={`text-[11px] font-extrabold font-sans tracking-wide px-1.5 py-0.5 rounded transition-colors ${
                        lang === 'en'
                          ? 'text-teal-700 bg-teal-100/60'
                          : 'text-slate-500 bg-slate-100'
                      }`}
                    >
                      GB
                    </span>
                    <span className="text-xs">English</span>
                  </span>
                  {lang === 'en' && (
                    <Check className="w-3.5 h-3.5 text-teal-600 stroke-[2.5] animate-in fade-in zoom-in-75 duration-200" />
                  )}
                </button>
              </div>
            </div>

            {/* HUBUNGI KAMI / CONTACT US Button */}
            <button
              onClick={() => handleNavClick('contact')}
              className={`inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-sm ${
                isTransparent
                  ? 'bg-transparent border border-white/70 text-white hover:bg-white/15 hover:border-white backdrop-blur-sm'
                  : 'bg-navy-900 hover:bg-navy-800 text-white border border-navy-900'
              }`}
            >
              <span>{t('nav_contact')}</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Buka menu navigasi"
            className={`p-2 rounded-lg lg:hidden transition-colors cursor-pointer ${
              isTransparent ? 'text-white hover:bg-white/10' : 'text-navy-900 hover:bg-slate-100'
            }`}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* ============================================================
            APPLE-STYLE MEGA MENU DROPDOWN (PRODUK) - ULTRA-SMOOTH CASCADING
            ============================================================ */}
        <div
          onMouseEnter={handleMouseEnterProducts}
          onMouseLeave={handleMouseLeaveProducts}
          style={{
            backgroundColor: isTransparent ? '#071A2B' : '#FFFFFF',
            transition:
              'opacity 480ms cubic-bezier(0.16, 1, 0.3, 1), transform 480ms cubic-bezier(0.16, 1, 0.3, 1), visibility 480ms',
          }}
          className={`hidden lg:block absolute top-full left-0 right-0 w-full origin-top shadow-[0_30px_60px_-15px_rgba(0,0,0,0.35)] py-10 px-8 sm:px-12 lg:px-20 z-50 ${
            isTransparent
              ? 'text-white border-b border-[#1E3A5F]'
              : 'text-navy-900 border-b border-slate-200'
          } ${
            isProductsMenuOpen
              ? 'opacity-100 translate-y-0 scale-100 visible pointer-events-auto'
              : 'opacity-0 -translate-y-2 scale-[0.995] invisible pointer-events-none'
          }`}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-12 gap-10">
            
            {/* Column 1: JELAJAHI PRODUK (Apple Big Headline Style - Stagger 1) */}
            <div
              style={{
                transition:
                  'opacity 520ms cubic-bezier(0.16, 1, 0.3, 1) 40ms, transform 520ms cubic-bezier(0.16, 1, 0.3, 1) 40ms',
                transform: isProductsMenuOpen ? 'translateY(0)' : 'translateY(-8px)',
                opacity: isProductsMenuOpen ? 1 : 0,
              }}
              className="col-span-4 space-y-4"
            >
              <span className={`text-[11px] font-bold uppercase tracking-[0.2em] block ${
                isTransparent ? 'text-teal-400' : 'text-teal-700 font-semibold'
              }`}>
                {t('mega_explore_title')}
              </span>
              
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => handleCategorySelect('all')}
                  className={`group flex items-center gap-2 text-2xl sm:text-[26px] font-bold font-serif hover:text-teal-600 transition-all duration-200 text-left cursor-pointer ${
                    isTransparent ? 'text-white hover:text-teal-300' : 'text-navy-900 hover:text-teal-600'
                  }`}
                >
                  <span>{t('mega_explore_all')}</span>
                  <ChevronRight className="w-5 h-5 text-teal-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </button>

                <div className="pt-2 space-y-1">
                  {productCategories.filter(c => c.id !== 'all').map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategorySelect(cat.id)}
                      className={`group flex items-center justify-between w-full px-2.5 py-1.5 rounded-xl text-sm sm:text-base font-medium transition-all duration-200 text-left cursor-pointer hover:translate-x-1 ${
                        isTransparent
                          ? 'text-slate-300 hover:text-teal-300 hover:bg-white/5'
                          : 'text-slate-700 hover:text-teal-600 hover:bg-teal-50/50'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <ChevronRight className="w-4 h-4 text-teal-600 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </button>
                  ))}
                </div>
              </div>

              <div className={`pt-4 border-t ${isTransparent ? 'border-slate-800' : 'border-slate-200'}`}>
                <button
                  type="button"
                  onClick={() => handleCategorySelect('all')}
                  className="inline-flex items-center gap-2 text-xs font-bold text-teal-600 hover:text-teal-700 transition-all duration-200 cursor-pointer group"
                >
                  <span>{t('mega_view_catalog')}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>

            {/* Column 2: FORMULASI UNGGULAN (Featured Products List - Stagger 2) */}
            <div
              style={{
                transition:
                  'opacity 560ms cubic-bezier(0.16, 1, 0.3, 1) 90ms, transform 560ms cubic-bezier(0.16, 1, 0.3, 1) 90ms',
                transform: isProductsMenuOpen ? 'translateY(0)' : 'translateY(-8px)',
                opacity: isProductsMenuOpen ? 1 : 0,
              }}
              className={`col-span-5 space-y-4 border-l pl-8 ${
                isTransparent ? 'border-slate-800/80' : 'border-slate-200'
              }`}
            >
              <span className={`text-[11px] font-bold uppercase tracking-[0.2em] block ${
                isTransparent ? 'text-teal-400' : 'text-teal-700 font-semibold'
              }`}>
                {t('mega_featured_title')}
              </span>

              <div className="grid grid-cols-1 gap-2.5">
                {featuredProducts.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleProductSelect(p.cat, p.id)}
                    className={`group flex items-center justify-between p-3 rounded-2xl transition-all duration-200 text-left cursor-pointer border active:scale-[0.99] ${
                      isTransparent
                        ? 'hover:bg-slate-800/80 border-slate-800 hover:border-slate-700 hover:shadow-xs'
                        : 'hover:bg-teal-50/70 border-slate-100 hover:border-teal-200 bg-white hover:shadow-xs'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <span className={`text-xs font-semibold transition-colors ${
                        isTransparent ? 'text-slate-200 group-hover:text-white' : 'text-slate-800 group-hover:text-teal-900'
                      }`}>
                        {p.name}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all duration-200" />
                  </button>
                ))}
              </div>
            </div>

            {/* Column 3: LAYANAN & DOKUMEN (Resources & Quick Actions - Stagger 3) */}
            <div
              style={{
                transition:
                  'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) 140ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 140ms',
                transform: isProductsMenuOpen ? 'translateY(0)' : 'translateY(-8px)',
                opacity: isProductsMenuOpen ? 1 : 0,
              }}
              className={`col-span-3 space-y-4 border-l pl-8 ${
                isTransparent ? 'border-slate-800/80' : 'border-slate-200'
              }`}
            >
              <span className={`text-[11px] font-bold uppercase tracking-[0.2em] block ${
                isTransparent ? 'text-teal-400' : 'text-teal-700 font-semibold'
              }`}>
                {t('mega_solutions_title')}
              </span>

              <div className="space-y-1.5">
                {quickResources.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleResourceSelect(item)}
                    className={`group flex items-start px-2.5 py-1.5 rounded-xl text-xs transition-all duration-200 text-left cursor-pointer leading-relaxed w-full hover:translate-x-1 ${
                      isTransparent
                        ? 'text-slate-300 hover:text-teal-300 hover:bg-white/5'
                        : 'text-slate-700 hover:text-teal-700 hover:bg-teal-50/50 font-medium'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}

                <a
                  href="https://wa.me/628129483381?text=Halo%20CV.%20Citra%20Putra%20Mandiri,%20saya%20ingin%20konsultasi%20produk%20kimia%20industri"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsProductsMenuOpen(false)}
                  className={`group flex items-start px-2.5 py-1.5 rounded-xl text-xs text-teal-600 hover:text-teal-700 font-bold transition-all duration-200 text-left cursor-pointer leading-relaxed w-full pt-2 hover:translate-x-1 ${
                    isTransparent ? 'hover:bg-white/5' : 'hover:bg-teal-50/50'
                  }`}
                >
                  <span>{t('mega_wa_support')}</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
        activePage={activePage}
        onNavigate={onNavigate}
      />
    </>
  );
}


