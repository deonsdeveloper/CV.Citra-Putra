import React, { useState } from 'react';
import { ArrowUpRight, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ProductCard({ product, onSelect, isFeatured = false }) {
  const { trans } = useLanguage();
  const [imgError, setImgError] = useState(false);
  const hasValidImage = Boolean(product.image) && !imgError;

  return (
    <div
      onClick={() => onSelect(product)}
      className={`group bg-white rounded-2xl p-6 sm:p-7 shadow-soft border border-slate-100/80 cursor-pointer transition-all duration-500 hover:shadow-medium hover:-translate-y-1.5 flex flex-col justify-between relative overflow-hidden ${
        isFeatured ? 'md:col-span-2 md:row-span-2 border-teal-500/20 bg-gradient-to-br from-white via-white to-teal-50/20' : ''
      }`}
    >
      {/* Decorative hover gradient border glow */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-500 via-amber-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Top Header Row */}
        <div className="flex items-center justify-between mb-3">
          {/* Product Code — Pure text */}
          <span className="text-xs font-bold text-teal-600 tracking-wider uppercase font-sans">
            {product.code}
          </span>
          <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-teal-600 group-hover:text-white flex items-center justify-center text-slate-400 transition-colors duration-300">
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
          </div>
        </div>

        {/* Product Image — Only shown for products that have an image, with transparent blend */}
        {hasValidImage && (
          <div className="w-full aspect-square bg-transparent flex items-center justify-center relative my-2 overflow-hidden">
            <img
              src={product.image}
              alt={`${product.code} - ${product.name}`}
              onError={() => setImgError(true)}
              className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}

        {/* Product Title */}
        <h3 className={`font-bold font-sans text-navy-900 group-hover:text-teal-600 transition-colors leading-tight mb-2.5 ${
          isFeatured ? 'text-2xl lg:text-3xl font-serif' : 'text-lg lg:text-xl'
        }`}>
          {product.name}
        </h3>

        {/* Description */}
        <p className={`text-slate-600 font-light leading-relaxed mb-4 ${
          isFeatured ? 'text-sm lg:text-base line-clamp-4' : 'text-xs lg:text-sm line-clamp-3'
        }`}>
          {trans(product.description)}
        </p>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-slate-100/80 space-y-2">
        <div className="text-[11px] font-medium text-slate-500 flex items-center justify-between">
          <span className="truncate">{product.packaging}</span>
          {product.msdsAvailable && (
            <span className="inline-flex items-center gap-1 text-[10px] text-teal-600 font-semibold shrink-0">
              <FileText className="w-3 h-3" /> MSDS Ready
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
