import React, { useState, useMemo, useEffect, useRef } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { Search, SlidersHorizontal, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Products({ onNavigate }) {
  const { t, trans } = useLanguage();
  const categoryScrollRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);

  // Auto-slide categories on mobile
  useEffect(() => {
    if (isAutoScrollPaused) return;

    const interval = setInterval(() => {
      if (categoryScrollRef.current && window.innerWidth < 1024) {
        const el = categoryScrollRef.current;
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll <= 0) return;

        const step = 140;
        if (el.scrollLeft >= maxScroll - 8) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: step, behavior: 'smooth' });
        }
      }
    }, 2400);

    return () => clearInterval(interval);
  }, [isAutoScrollPaused]);

  // Listen to external category & product selection events from Navbar Mega Menu
  useEffect(() => {
    const handleCategoryEvent = (e) => {
      if (e.detail) {
        setSelectedCategory(e.detail);
        setSearchQuery('');
        if (e.detailProduct) {
          const found = PRODUCTS.find((p) => p.id === e.detailProduct || p.code === e.detailProduct);
          if (found) setSelectedProduct(found);
        }
        window.scrollTo({ top: 300, behavior: 'smooth' });
      }
    };
    window.addEventListener('setProductCategory', handleCategoryEvent);
    return () => window.removeEventListener('setProductCategory', handleCategoryEvent);
  }, []);

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

  return (
    <div className="w-full pt-20 bg-bone-100 min-h-screen">
      {/* Header Banner */}
      <div className="bg-navy-900 text-white py-16 bg-noise relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-400">
            {t('prod_catalog_badge')}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif">
            {t('prod_catalog_heading')}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl mx-auto">
            {t('prod_catalog_desc')}
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto pt-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('prod_search_placeholder')}
                className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white text-navy-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-md text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalog Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Category Filters (Desktop: 3 cols) */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-6 shadow-soft border border-slate-100 lg:sticky lg:top-28 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-navy-900 font-bold text-sm">
              <SlidersHorizontal className="w-4 h-4 text-teal-600" />
              <span>{t('prod_sidebar_title')}</span>
            </div>

            <div
              ref={categoryScrollRef}
              onMouseEnter={() => setIsAutoScrollPaused(true)}
              onMouseLeave={() => setIsAutoScrollPaused(false)}
              onTouchStart={() => setIsAutoScrollPaused(true)}
              onTouchEnd={() => {
                setTimeout(() => setIsAutoScrollPaused(false), 2000);
              }}
              className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar scroll-smooth pb-1 lg:pb-0"
            >
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`shrink-0 lg:shrink w-auto lg:w-full text-left px-4 py-2.5 lg:py-3 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-300 flex items-center justify-between gap-3 cursor-pointer ${
                      isActive
                        ? 'bg-teal-600 text-white shadow-md'
                        : 'bg-slate-50 lg:bg-transparent text-slate-600 hover:bg-slate-100 hover:text-navy-900'
                    }`}
                  >
                    <span>{getCategoryLabel(cat.id)}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white hidden lg:inline-block" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500 space-y-2 leading-relaxed">
              <p>💡 <strong>{t('prod_dosage_info_label')}</strong> {t('prod_dosage_info_note')}</p>
            </div>
          </div>

          {/* Main Product Grid Area (Desktop: 9 cols) */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-semibold text-slate-500">
                {t('prod_showing')} <strong>{filteredProducts.length}</strong> {t('prod_products_count')}
              </span>
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="text-xs font-semibold text-teal-600 hover:underline"
                >
                  {t('prod_reset_filter')}
                </button>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center space-y-3 border border-slate-100">
                <Layers className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-lg font-bold text-navy-900">{t('prod_not_found_title')}</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {t('prod_not_found_desc')}
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                  className="px-5 py-2 rounded-full bg-navy-900 text-white text-xs font-semibold mt-2"
                >
                  {t('prod_show_all_btn')}
                </button>
              </div>
            ) : selectedCategory === 'all' && !searchQuery.trim() ? (
              <div className="space-y-12">
                {/* 5 Featured Products with Studio Photography on Top */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
                    <h2 className="text-xl font-bold font-serif text-navy-900">
                      {t('prod_featured_section_title')}
                    </h2>
                    <span className="text-xs text-teal-700 font-semibold ml-auto bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60">
                      {t('prod_featured_badge')}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts
                      .filter((p) => p.featured)
                      .map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onSelect={(p) => setSelectedProduct(p)}
                        />
                      ))}
                  </div>
                </div>

                {/* Other Products Listed Below */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                    <h2 className="text-xl font-bold font-serif text-navy-900">
                      {t('prod_other_section_title')}
                    </h2>
                    <span className="text-xs text-slate-500 font-medium ml-auto">
                      {filteredProducts.filter((p) => !p.featured).length} {t('prod_other_count_suffix')}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts
                      .filter((p) => !p.featured)
                      .map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onSelect={(p) => setSelectedProduct(p)}
                        />
                      ))}
                  </div>
                </div>
              </div>
            ) : selectedCategory === 'specialty' && !searchQuery.trim() ? (
              <div className="space-y-12">
                {/* Featured Specialty Formulation: Only CLENOL MR 220 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
                    <h2 className="text-xl font-bold font-serif text-navy-900">
                      {t('prod_specialty_main_title')}
                    </h2>
                    <span className="text-xs text-teal-700 font-semibold ml-auto bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60">
                      {filteredProducts.filter((p) => p.id === 'clenol-mr-220').length} {t('prod_featured')}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts
                      .filter((p) => p.id === 'clenol-mr-220')
                      .map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onSelect={(p) => setSelectedProduct(p)}
                        />
                      ))}
                  </div>
                </div>

                {/* Other Specialty Products Below */}
                <div className="space-y-4 pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                      <h2 className="text-xl font-bold font-serif text-navy-900">
                        {t('prod_specialty_sub_title')}
                      </h2>
                    </div>
                    <span className="text-xs text-slate-500 font-medium ml-auto">
                      {filteredProducts.filter((p) => p.id !== 'clenol-mr-220').length} {t('prod_other_count_suffix')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {t('prod_specialty_sub_desc')}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts
                      .filter((p) => p.id !== 'clenol-mr-220')
                      .map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onSelect={(p) => setSelectedProduct(p)}
                        />
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={(p) => setSelectedProduct(p)}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Detail Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
}
