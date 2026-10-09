import React from 'react';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function FeaturedProducts({ onSelectProduct, onNavigate }) {
  const { t } = useLanguage();
  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 5);

  const handleSeeAll = () => {
    if (onNavigate) {
      onNavigate('products');
    }
  };

  return (
    <section id="products" className="py-24 bg-bone-100 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-600">
              {t('feat_tag')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-navy-900 leading-tight">
              {t('feat_title')}
            </h2>
          </div>
          <button
            onClick={handleSeeAll}
            className="inline-flex items-center gap-2 font-semibold text-navy-900 hover:text-teal-600 transition-colors group cursor-pointer shrink-0 text-base"
          >
            <span>
              {t('feat_see_all')} ({PRODUCTS.length}) {t('feat_products_suffix')}
            </span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform text-teal-600" />
          </button>
        </div>

        {/* Uniform Grid for All 5 Featured Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
