import React, { useState, useMemo, useEffect, useRef } from 'react';
import { PRODUCTS, CATEGORIES, APPLICATION_GUIDES } from '../data/products';
import { generateProductPDF } from '../utils/pdfGenerator';
import {
  FileText,
  Search,
  Download,
  Eye,
  BookOpen,
  CheckCircle2,
  ShieldAlert,
  SlidersHorizontal,
  X,
  Send,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  FileCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AnimatedWordReveal } from '../components/AnimatedText';

export default function Resources({ onNavigate }) {
  const { t, trans } = useLanguage();
  const categoryScrollRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('msds-tds'); // 'msds-tds' | 'guides'
  const [previewDocument, setPreviewDocument] = useState(null);
  const [requestModalProduct, setRequestModalProduct] = useState(null);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [expandedGuide, setExpandedGuide] = useState(null);

  const getCategoryLabel = (catId) => {
    switch (catId) {
      case 'all': return t('cat_all');
      case 'water-treatment': return t('cat_water');
      case 'cleaning': return t('cat_cleaning');
      case 'rust': return t('cat_rust');
      case 'electrical': return t('cat_electrical');
      case 'specialty': return t('cat_specialty');
      default: return catId;
    }
  };

  const [requestForm, setRequestForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    notes: '',
  });

  // Body scroll lock & Escape key listener for open modals
  useEffect(() => {
    const isAnyModalOpen = Boolean(previewDocument || requestModalProduct);
    if (!isAnyModalOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setPreviewDocument(null);
        setRequestModalProduct(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [previewDocument, requestModalProduct]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const desc = trans(product.description).toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        desc.includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, trans]);

  const handleDownload = (product, type) => {
    generateProductPDF(product, type);
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();

    const trimmedName = requestForm.name.trim();
    const trimmedEmail = requestForm.email.trim();
    const trimmedCompany = requestForm.company.trim();
    const trimmedPhone = requestForm.phone.trim();
    const trimmedNotes = requestForm.notes.trim();

    if (!trimmedName || !trimmedEmail || !trimmedCompany) {
      alert('Mohon isi Nama, Email, dan Perusahaan Anda.');
      return;
    }

    const message = `Halo CV. Citra Putra Mandiri,\n\nSaya ingin meminta dokumen fisik / resmi TDS & MSDS:\n- Produk: ${requestModalProduct?.name} (${requestModalProduct?.code})\n- Nama: ${trimmedName}\n- Perusahaan: ${trimmedCompany}\n- Email: ${trimmedEmail}\n- No. HP: ${trimmedPhone || '-'}\n- Catatan: ${trimmedNotes || '-'}`;

    const waUrl = `https://wa.me/62811808006?text=${encodeURIComponent(message)}`;

    try {
      fetch('/api/request-docs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          company: trimmedCompany,
          email: trimmedEmail,
          phone: trimmedPhone,
          notes: trimmedNotes,
          productCode: requestModalProduct?.code || 'Umum',
          productName: requestModalProduct?.name || 'Dokumen MSDS/TDS General',
        }),
      }).catch(() => {});
    } catch (_) {}

    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setRequestSubmitted(true);
    setTimeout(() => {
      setRequestSubmitted(false);
      setRequestModalProduct(null);
      setRequestForm({ name: '', company: '', email: '', phone: '', notes: '' });
    }, 1500);
  };

  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);

  // Auto-slide category pills periodically on mobile & desktop
  useEffect(() => {
    if (isAutoScrollPaused) return;

    const interval = setInterval(() => {
      if (categoryScrollRef.current) {
        const el = categoryScrollRef.current;
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll <= 0) return;

        const step = window.innerWidth < 768 ? 140 : 200;
        if (el.scrollLeft >= maxScroll - 8) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: step, behavior: 'smooth' });
        }
      }
    }, 2400);

    return () => clearInterval(interval);
  }, [isAutoScrollPaused]);

  const scrollCategories = (direction) => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full pt-20 bg-bone-100 min-h-screen">
      {/* Header Banner */}
      <div className="bg-navy-900 text-white py-16 sm:py-20 bg-noise relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-400">
            {t('res_page_badge')}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif">
            {t('res_page_title')}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl mx-auto">
            {t('res_page_desc')}
          </p>

          {/* Tab Selection */}
          <div className="pt-6 flex justify-center gap-3">
            <button
              onClick={() => setActiveTab('msds-tds')}
              className={`px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeTab === 'msds-tds'
                  ? 'bg-teal-500 text-white shadow-glow'
                  : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/20'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>{t('res_tab_docs')}</span>
            </button>

            <button
              onClick={() => setActiveTab('guides')}
              className={`px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeTab === 'guides'
                  ? 'bg-teal-500 text-white shadow-glow'
                  : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/20'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{t('res_tab_guides')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        {activeTab === 'msds-tds' ? (
          <div className="space-y-8">
            {/* Search & Sliding Filter Header */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-soft border border-slate-100 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              {/* Search input */}
              <div className="relative w-full lg:w-80 shrink-0">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('res_search_ph')}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Category Sliding Strip */}
              <div className="relative flex items-center w-full lg:max-w-[calc(100%-340px)] overflow-hidden">
                {/* Left Arrow Button */}
                <button
                  onClick={() => scrollCategories('left')}
                  aria-label="Geser kategori ke kiri"
                  className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm border border-slate-200 text-slate-700 hover:text-teal-700 hover:bg-slate-50 transition-all shrink-0 mr-1.5 z-10 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Sliding Category Container without ugly scrollbar */}
                <div
                  ref={categoryScrollRef}
                  onMouseEnter={() => setIsAutoScrollPaused(true)}
                  onMouseLeave={() => setIsAutoScrollPaused(false)}
                  onTouchStart={() => setIsAutoScrollPaused(true)}
                  onTouchEnd={() => {
                    setTimeout(() => setIsAutoScrollPaused(false), 2000);
                  }}
                  className="flex items-center gap-2 overflow-x-auto w-full no-scrollbar scroll-smooth py-1 px-0.5"
                  style={{ WebkitOverflowScrolling: 'touch' }}
                >
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                        selectedCategory === cat.id
                          ? 'bg-teal-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {getCategoryLabel(cat.id)}
                    </button>
                  ))}
                </div>

                {/* Right Arrow Button */}
                <button
                  onClick={() => scrollCategories('right')}
                  aria-label="Geser kategori ke kanan"
                  className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm border border-slate-200 text-slate-700 hover:text-teal-700 hover:bg-slate-50 transition-all shrink-0 ml-1.5 z-10 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* MSDS Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl p-6 shadow-soft border border-slate-100/90 hover:shadow-medium transition-all duration-300 flex flex-col justify-between space-y-4 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                        {product.code}
                      </span>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                        {product.categoryName}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-lg text-navy-900 group-hover:text-teal-600 transition-colors">
                      {product.name}
                    </h3>
                    
                    <p className="text-xs text-slate-500 font-light mt-1 line-clamp-2">
                      {trans(product.description)}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-600 space-y-1">
                      <p><strong>{t('prod_packaging')}:</strong> {product.packaging}</p>
                      <p><strong>Status:</strong> {t('res_doc_available')}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => setPreviewDocument(product)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-700 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{t('res_preview_btn')}</span>
                    </button>

                    <button
                      onClick={() => handleDownload(product, 'TDS')}
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-teal-400" />
                      <span>{t('res_doc_download_btn')}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Request Official Signed MSDS Banner */}
            <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-teal-900 text-white rounded-3xl p-8 sm:p-10 shadow-medium flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
                  {t('res_doc_request_btn')}
                </span>
                <h3 className="text-2xl font-serif font-bold">
                  {t('res_modal_title')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light">
                  {t('res_modal_desc')}
                </p>
              </div>
              <button
                onClick={() => setRequestModalProduct({ code: 'SEMUA', name: 'Dokumen MSDS Resmi Audit' })}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-600 text-navy-900 font-semibold text-sm transition-all shadow-lg shrink-0 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>{t('res_doc_request_btn')}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Application Guides Tab */
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center space-y-3 mb-10">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-600">
                {t('res_guide_section_badge')}
              </span>
              <h2 className="text-3xl font-serif font-bold text-navy-900">
                {t('res_guide_section_title')}
              </h2>
              <p className="text-sm text-slate-600 font-light">
                {t('res_guide_section_desc')}
              </p>
            </div>

            <div className="space-y-6">
              {APPLICATION_GUIDES.map((guide) => {
                const isExpanded = expandedGuide === guide.id;
                return (
                  <div
                    key={guide.id}
                    className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-100 space-y-4 transition-all duration-300"
                  >
                    <div
                      onClick={() => setExpandedGuide(isExpanded ? null : guide.id)}
                      className="flex items-start justify-between cursor-pointer gap-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-teal-50 text-teal-700 uppercase tracking-wider">
                            {guide.category}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">
                            {guide.readTime}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold font-serif text-navy-900 hover:text-teal-600 transition-colors">
                          {trans(guide.title)}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 font-light">
                          {trans(guide.summary)}
                        </p>
                      </div>

                      <div className="p-2 rounded-full bg-slate-50 text-slate-500 shrink-0">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="pt-4 border-t border-slate-100 space-y-5 animate-fadeIn">
                        <div>
                          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                            {t('res_tab_guides')} - Formulations:
                          </h4>
                          <div className="flex gap-2">
                            {guide.recommendedProducts.map((pCode, idx) => (
                              <span key={idx} className="px-3 py-1 bg-navy-900 text-white rounded-lg text-xs font-semibold">
                                {pCode}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                            {t('res_tab_guides')} - Steps:
                          </h4>
                          <ol className="space-y-3">
                            {(trans(guide.steps) || []).map((step, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                                <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                                  {idx + 1}
                                </span>
                                <span className="leading-relaxed">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* MSDS Preview Modal */}
      {previewDocument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm"
            onClick={() => setPreviewDocument(null)}
          />
          <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 border border-slate-100 my-8">
            <button
              onClick={() => setPreviewDocument(null)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-navy-900 rounded-full hover:bg-slate-100"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <ShieldAlert className="w-8 h-8 text-teal-600" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
                    {t('res_preview_title')}
                  </span>
                  <h2 className="text-2xl font-serif font-bold text-navy-900">
                    {previewDocument.code} — {previewDocument.name}
                  </h2>
                </div>
              </div>

              <div className="space-y-4 text-xs text-slate-700 bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-200">
                  <div>
                    <span className="font-semibold block text-slate-500">{t('res_preview_manufacturer')}:</span>
                    <span className="font-bold text-navy-900">CV. CITRA PUTRA MANDIRI</span>
                  </div>
                  <div>
                    <span className="font-semibold block text-slate-500">{t('res_preview_category')}:</span>
                    <span className="font-bold text-navy-900">{previewDocument.categoryName}</span>
                  </div>
                </div>

                <div>
                  <span className="font-semibold block text-slate-500 mb-1">{t('res_preview_hazard')}:</span>
                  <p className="leading-relaxed text-slate-600">
                    {t('res_preview_hazard_desc')}
                  </p>
                </div>

                <div>
                  <span className="font-semibold block text-slate-500 mb-1">{t('res_preview_first_aid')}:</span>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600">
                    <li>{t('res_preview_fa_eye')}</li>
                    <li>{t('res_preview_fa_skin')}</li>
                    <li>{t('res_preview_fa_storage')}</li>
                  </ul>
                </div>

                <div>
                  <span className="font-semibold block text-slate-500 mb-1">{t('res_preview_pkg')}:</span>
                  <p className="text-navy-900 font-medium">{previewDocument.packaging}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handleDownload(previewDocument, 'MSDS');
                    setPreviewDocument(null);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl text-sm transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>{t('res_preview_download')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Official Signed MSDS Request Modal */}
      {requestModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm"
            onClick={() => setRequestModalProduct(null)}
          />
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 border border-slate-100 my-8">
            <button
              onClick={() => setRequestModalProduct(null)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-navy-900 rounded-full hover:bg-slate-100"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-serif font-bold text-navy-900 mb-2">
              {t('res_modal_title')}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {t('res_modal_desc')}
            </p>

            {requestSubmitted ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{t('res_success_msg')}</span>
              </div>
            ) : (
              <form onSubmit={handleRequestSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{t('res_form_name')}</label>
                  <input
                    type="text"
                    required
                    value={requestForm.name}
                    onChange={(e) => setRequestForm({ ...requestForm, name: e.target.value })}
                    placeholder="Bapak / Ibu Ahmad"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{t('res_form_company')}</label>
                  <input
                    type="text"
                    required
                    value={requestForm.company}
                    onChange={(e) => setRequestForm({ ...requestForm, company: e.target.value })}
                    placeholder="PT Industri Utama"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">{t('res_form_email')}</label>
                    <input
                      type="email"
                      required
                      value={requestForm.email}
                      onChange={(e) => setRequestForm({ ...requestForm, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">{t('res_form_phone')}</label>
                    <input
                      type="tel"
                      required
                      value={requestForm.phone}
                      onChange={(e) => setRequestForm({ ...requestForm, phone: e.target.value })}
                      placeholder="0812-3456-7890"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{t('res_form_notes')}</label>
                  <textarea
                    rows={3}
                    value={requestForm.notes}
                    onChange={(e) => setRequestForm({ ...requestForm, notes: e.target.value })}
                    placeholder="Catatan khusus kebutuhan audit K3/ISO..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-navy-900 hover:bg-navy-800 text-white font-semibold rounded-xl transition-colors text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-teal-400" />
                  <span>{t('res_form_submit')}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
