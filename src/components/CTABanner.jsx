import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';

export default function CTABanner({ onNavigate }) {
  const handleClick = () => {
    if (onNavigate) {
      onNavigate('contact');
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-navy-600 text-white relative overflow-hidden">
      {/* Background Organic Blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-6">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-300">
          Konsultasi & Penawaran Spesiial
        </span>

        {/* 3 Line Headline for Visual Rhythm */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif leading-[1.15] text-white">
          Mari Berkolaborasi<br />
          untuk Industri yang<br />
          <span className="text-amber-400 italic font-normal">Lebih Baik</span>
        </h2>

        <p className="text-base sm:text-lg text-slate-200 font-light max-w-xl mx-auto leading-relaxed">
          Hubungi tim teknis kami untuk konsultasi produk, analisa sampel air gratis, dan penawaran khusus sesuai kebutuhan fasilitas pabrik Anda.
        </p>

        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <button
            onClick={handleClick}
            className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold px-9 py-4 rounded-full shadow-lg hover:shadow-amber-500/30 transition-all duration-300 transform hover:-translate-y-0.5 text-base cursor-pointer group"
          >
            <span>Hubungi Kami Sekarang</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="https://wa.me/628129483381?text=Halo%20CV.%20Citra%20Putra%20Mandiri,%20saya%20ingin%20diskusi%20kebutuhan%20kimia%20industri"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 cursor-pointer shadow-md"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Diskusi WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
