import React, { useState, useEffect } from 'react';
import { X, MessageCircle, FileText, CheckCircle2, Package, Wrench, Beaker, Download } from 'lucide-react';
import { generateProductPDF } from '../utils/pdfGenerator';
import { useLanguage } from '../context/LanguageContext';

export default function ProductModal({ product, onClose, onNavigate }) {
  const { t, trans } = useLanguage();
  const [docRequested, setDocRequested] = useState(false);

  useEffect(() => {
    if (!product) return;

    // Lock body scroll when modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Escape key listener
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
  }, [product, onClose]);

  if (!product) return null;

  const waMessage = encodeURIComponent(
    `Halo CV. Citra Putra Mandiri, saya berminat dengan produk *${product.code} - ${product.name}*. Mohon informasi harga, stok, dan rekomendasi dosis aplikasi untuk pabrik kami.`
  );

  const handleDocRequest = () => {
    setDocRequested(true);
    setTimeout(() => {
      if (onNavigate) {
        onClose();
        onNavigate('resources');
      }
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-8 shadow-2xl border border-slate-100 z-10 my-auto max-h-[90vh] overflow-y-auto">
        {/* Top Accent Stripe */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-teal-500 via-amber-500 to-navy-600" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Tutup detail produk"
          className="absolute top-5 right-5 p-2.5 text-slate-400 hover:text-navy-900 rounded-full hover:bg-slate-100 transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xs font-bold text-teal-600 tracking-widest uppercase font-sans">
                {product.code}
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                {product.categoryName}
              </span>
            </div>
            <h2 id="product-modal-title" className="text-2xl sm:text-3xl font-bold font-serif text-navy-900 pr-8">
              {product.name}
            </h2>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
            {trans(product.description)}
          </p>

          {/* Product Image Frame */}
          {product.image && (
            <div className="w-full aspect-[16/9] sm:aspect-[2/1] rounded-2xl overflow-hidden bg-transparent flex items-center justify-center p-2">
              <img
                src={product.image}
                alt={`${product.code} - ${product.name}`}
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>
          )}

          {/* Specs Details List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <Package className="w-4 h-4 text-teal-600" />
                <span>{t('prod_packaging')}</span>
              </div>
              <p className="text-sm font-medium text-navy-900">{product.packaging}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <Wrench className="w-4 h-4 text-teal-600" />
                <span>{t('prod_applications')}</span>
              </div>
              <p className="text-sm font-medium text-navy-900">{trans(product.applications)}</p>
            </div>

            {product.dosage && (
              <div className="sm:col-span-2 space-y-1 pt-2 border-t border-slate-200/60">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <Beaker className="w-4 h-4 text-amber-500" />
                  <span>{t('prod_dosage')}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">{trans(product.dosage)}</p>
              </div>
            )}

            {product.physicalProperties && (
              <div className="sm:col-span-2 space-y-1 pt-2 border-t border-slate-200/60">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <FileText className="w-4 h-4 text-teal-600" />
                  <span>{t('prod_properties')}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">{trans(product.physicalProperties)}</p>
              </div>
            )}
          </div>

          {/* MSDS Status Notification */}
          {docRequested && (
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center gap-2 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Permintaan dokumen diterima! Membuka halaman kontak...</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={`https://wa.me/628129483381?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-colors shadow-md text-sm cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{t('prod_btn_consult_wa')}</span>
            </a>

            <button
              onClick={() => generateProductPDF(product, 'TDS')}
              className="inline-flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-semibold py-3.5 px-6 rounded-xl transition-colors text-sm cursor-pointer"
            >
              <Download className="w-4 h-4 text-teal-400" />
              <span>{t('prod_btn_pdf')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
