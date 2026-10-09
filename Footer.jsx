import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, MapPin, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer({ onNavigate }) {
  const { t } = useLanguage();
  const [openAccordions, setOpenAccordions] = useState({});

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleNavClick = (pageId) => {
    if (onNavigate) {
      onNavigate(pageId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (catId) => {
    if (onNavigate) {
      onNavigate('products');
    }
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent('setProductCategory', {
          detail: catId,
        })
      );
    }, 60);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: t('nav_home') },
    { id: 'about', label: t('nav_about') },
    { id: 'products', label: t('nav_products') },
    { id: 'services', label: t('nav_services') },
    { id: 'resources', label: t('nav_resources') },
    { id: 'contact', label: t('nav_contact') },
  ];

  const categories = [
    { id: 'water-treatment', label: t('cat_water') },
    { id: 'cleaning', label: t('cat_cleaning') },
    { id: 'rust', label: t('cat_rust') },
    { id: 'electrical', label: t('cat_electrical') },
    { id: 'specialty', label: t('cat_specialty') },
  ];

  return (
    <footer className="bg-white text-navy-900 pt-16 md:pt-20 pb-10 border-t border-slate-200 relative overflow-hidden">
      {/* Background noise & light wash */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* ============================================================
            DESKTOP & TABLET VIEW (Standard Multi-Column Grid)
            ============================================================ */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-200">
          
          {/* Column 1: Brand & Overview (Spans 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center">
              <img
                src="/assets/logo.png"
                alt="CV. Citra Putra Mandiri Logo"
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </div>

            <p className="text-sm text-slate-600 font-normal leading-relaxed">
              {t('footer_brand_desc')}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/628129483381"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Official"
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-emerald-600 hover:text-white text-navy-900 flex items-center justify-center transition-colors shadow-sm"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="mailto:citraputramandiri@yahoo.co.id"
                aria-label="Email Official"
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-teal-600 hover:text-white text-navy-900 flex items-center justify-center transition-colors shadow-sm"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif font-bold text-base text-navy-900">{t('footer_menu_title')}</h4>
            <ul className="space-y-2.5 text-sm text-slate-700 font-medium">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className="hover:text-teal-700 transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Product Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif font-bold text-base text-navy-900">{t('footer_categories_title')}</h4>
            <ul className="space-y-2.5 text-sm text-slate-700 font-medium">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryClick(cat.id)}
                    className="hover:text-teal-700 transition-colors text-left cursor-pointer"
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Brief (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif font-bold text-base text-navy-900">{t('footer_hq_title')}</h4>
            <ul className="space-y-3 text-xs text-slate-700 font-medium">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>{t('contact_address_val')}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-600 shrink-0" />
                <span>08129483381 / Bustiar</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-600 shrink-0" />
                <span>citraputramandiri@yahoo.co.id</span>
              </li>
            </ul>
          </div>

        </div>

        {/* ============================================================
            MOBILE VIEW (Apple-Style Collapsible Accordions)
            ============================================================ */}
        <div className="md:hidden pb-10 space-y-6">
          {/* Brand Header */}
          <div className="space-y-4 pb-2">
            <img
              src="/assets/logo.png"
              alt="CV. Citra Putra Mandiri Logo"
              className="h-11 w-auto object-contain"
            />
            <p className="text-xs text-slate-600 font-normal leading-relaxed">
              {t('footer_brand_desc')}
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://wa.me/628129483381"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Official"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-emerald-600 hover:text-white text-navy-900 flex items-center justify-center transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="mailto:citraputramandiri@yahoo.co.id"
                aria-label="Email Official"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-teal-600 hover:text-white text-navy-900 flex items-center justify-center transition-colors shadow-xs"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Apple-Style Accordion List */}
          <div className="border-t border-slate-200">
            
            {/* Accordion 1: Menu Utama */}
            <div className="border-b border-slate-200">
              <button
                type="button"
                onClick={() => toggleAccordion('menu')}
                className="w-full py-3.5 flex items-center justify-between text-left text-[13px] font-semibold text-navy-900 cursor-pointer select-none"
                aria-expanded={Boolean(openAccordions.menu)}
              >
                <span>{t('footer_menu_title')}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                    openAccordions.menu ? 'rotate-180 text-teal-600' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openAccordions.menu ? 'max-h-72 opacity-100 pb-3.5' : 'max-h-0 opacity-0'
                }`}
              >
                <ul className="space-y-2.5 text-xs text-slate-600 font-medium pl-1">
                  {navLinks.map((link) => (
                    <li key={link.id}>
                      <button
                        onClick={() => handleNavClick(link.id)}
                        className="hover:text-teal-700 transition-colors cursor-pointer text-left block w-full py-0.5"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Accordion 2: Kategori Solusi */}
            <div className="border-b border-slate-200">
              <button
                type="button"
                onClick={() => toggleAccordion('categories')}
                className="w-full py-3.5 flex items-center justify-between text-left text-[13px] font-semibold text-navy-900 cursor-pointer select-none"
                aria-expanded={Boolean(openAccordions.categories)}
              >
                <span>{t('footer_categories_title')}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                    openAccordions.categories ? 'rotate-180 text-teal-600' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openAccordions.categories ? 'max-h-72 opacity-100 pb-3.5' : 'max-h-0 opacity-0'
                }`}
              >
                <ul className="space-y-2.5 text-xs text-slate-600 font-medium pl-1">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <button
                        onClick={() => handleCategoryClick(cat.id)}
                        className="hover:text-teal-700 transition-colors text-left cursor-pointer block w-full py-0.5"
                      >
                        {cat.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Accordion 3: Kantor Pusat & Kontak */}
            <div className="border-b border-slate-200">
              <button
                type="button"
                onClick={() => toggleAccordion('hq')}
                className="w-full py-3.5 flex items-center justify-between text-left text-[13px] font-semibold text-navy-900 cursor-pointer select-none"
                aria-expanded={Boolean(openAccordions.hq)}
              >
                <span>{t('footer_hq_title')}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                    openAccordions.hq ? 'rotate-180 text-teal-600' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openAccordions.hq ? 'max-h-72 opacity-100 pb-3.5' : 'max-h-0 opacity-0'
                }`}
              >
                <ul className="space-y-2.5 text-xs text-slate-600 font-medium pl-1">
                  <li className="flex items-start gap-2.5 pt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{t('contact_address_val')}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Phone className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <a href="tel:08129483381" className="hover:text-teal-700 transition-colors">
                      08129483381 / Bustiar
                    </a>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Mail className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <a href="mailto:citraputramandiri@yahoo.co.id" className="hover:text-teal-700 transition-colors">
                      citraputramandiri@yahoo.co.id
                    </a>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 md:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 font-medium">
          <p>{t('footer_copyright')}</p>
          <div className="flex gap-6">
            <span className="hover:text-navy-900 cursor-pointer">{t('footer_terms')}</span>
            <span className="hover:text-navy-900 cursor-pointer">{t('footer_privacy')}</span>
            <button onClick={() => handleNavClick('resources')} className="hover:text-teal-600 transition-colors cursor-pointer">
              {t('footer_msds_link')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
