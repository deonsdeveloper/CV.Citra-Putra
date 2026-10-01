import React, { useState, useEffect, useRef } from 'react';
import { SERVICES } from '../data/products';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Reusable viewport observer hook for bidirectional scroll reveal
function useInView(options = { threshold: 0.12 }) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      // Dynamically toggle inView so text animations replay whenever scrolling back into view
      setIsInView(entry.isIntersecting);
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isInView];
}

function ServiceRow({ service, index, onNavigate, t, trans }) {
  const [rowRef, inView] = useInView({ threshold: 0.15 });
  const isEven = index % 2 === 0;
  const points = trans(service.points) || [];

  const handleConsultClick = () => {
    if (onNavigate) {
      onNavigate('contact');
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={rowRef}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
        isEven ? '' : 'lg:flex-row-reverse'
      } ${inView ? 'bca-active' : ''}`}
    >
      {/* Image Column */}
      <div className={`lg:col-span-6 ${isEven ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}>
        <div className="relative rounded-3xl overflow-hidden shadow-float border border-slate-200 group">
          <img
            src={service.image}
            alt={trans(service.title)}
            className={`w-full h-[380px] sm:h-[440px] object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              inView ? 'scale-100 opacity-100' : 'scale-105 opacity-90'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/30 via-transparent to-transparent" />
        </div>
      </div>

      {/* Text Column with BCA Mask Reveal Stagger */}
      <div className={`lg:col-span-6 space-y-6 ${isEven ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}`}>
        <div className="flex items-center gap-4">
          <div className="bca-mask">
            <span className="bca-reveal font-serif font-bold text-5xl text-teal-600/30">
              {service.number}
            </span>
          </div>
          <div className="bca-mask">
            <span className="bca-reveal text-xs font-bold uppercase tracking-widest text-teal-600" style={{ transitionDelay: '60ms' }}>
              {t('serv_tag')}
            </span>
          </div>
        </div>

        {/* Title with Mask Reveal */}
        <div className="bca-mask">
          <h2 className="bca-reveal text-3xl sm:text-4xl font-bold font-serif text-navy-900 leading-tight" style={{ transitionDelay: '100ms' }}>
            {trans(service.title)}
          </h2>
        </div>

        <div className="bca-mask">
          <p className="bca-reveal text-sm sm:text-base text-slate-600 font-light leading-relaxed" style={{ transitionDelay: '160ms' }}>
            {trans(service.description)}
          </p>
        </div>

        {/* Checklist Points with Staggered Mask Cascade */}
        <div className="space-y-3 pt-2">
          {Array.isArray(points) && points.map((pt, idx) => (
            <div
              key={idx}
              className="bca-mask"
            >
              <div
                className="bca-reveal flex items-start gap-3"
                style={{ transitionDelay: `${200 + idx * 70}ms` }}
              >
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-navy-900">{pt}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bca-mask pt-2">
          <div className="bca-reveal" style={{ transitionDelay: `${220 + (points.length || 0) * 70}ms` }}>
            <button
              onClick={handleConsultClick}
              className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-semibold px-7 py-3 rounded-full text-sm transition-all duration-300 shadow-md cursor-pointer group transform hover:-translate-y-0.5"
            >
              <span>{t('serv_btn_consult')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services({ onNavigate }) {
  const { t, trans } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track global scroll progress for top progress indicator
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentProgress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
          setScrollProgress(Math.min(Math.max(currentProgress, 0), 100));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full pt-20 bg-bone-100 min-h-screen relative">

      {/* Header Banner: Static Solid Navy Background + BCA Mask Reveal */}
      <div className="bg-navy-900 text-white py-20 bg-noise relative overflow-hidden bca-active">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4 relative z-10">
          <div className="bca-mask">
            <span className="bca-reveal text-xs font-semibold uppercase tracking-[0.25em] text-teal-400 block">
              {t('serv_page_badge')}
            </span>
          </div>
          <div className="bca-mask">
            <h1 className="bca-reveal text-4xl sm:text-5xl font-bold font-serif" style={{ transitionDelay: '80ms' }}>
              {t('serv_page_title')}
            </h1>
          </div>
          <div className="bca-mask">
            <p className="bca-reveal text-base text-slate-300 font-light max-w-2xl mx-auto" style={{ transitionDelay: '160ms' }}>
              {t('serv_page_desc')}
            </p>
          </div>
        </div>
      </div>

      {/* Alternating Service Feature Sections with Scroll Stagger */}
      <div className="py-20 space-y-24 max-w-7xl mx-auto px-6 lg:px-12">
        {SERVICES.map((service, index) => (
          <ServiceRow
            key={service.id}
            service={service}
            index={index}
            onNavigate={onNavigate}
            t={t}
            trans={trans}
          />
        ))}
      </div>
    </div>
  );
}
