import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AboutSection({ onNavigate }) {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMoreClick = () => {
    if (onNavigate) {
      onNavigate('about');
    } else {
      const section = document.getElementById('about-page');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const points = [
    t('about_point_1'),
    t('about_point_2'),
    t('about_point_3'),
    t('about_point_4'),
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-bone-100 relative overflow-hidden">
      {/* Background decoration blur */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-navy-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column — 3D Anti-Gravity Chemical Showcase (Seamless Transparent Background) */}
          <div className="lg:col-span-7 relative flex items-center justify-center py-4">
            {/* Ambient soft glow aura */}
            <div className="absolute w-80 h-80 sm:w-96 sm:h-96 bg-gradient-to-tr from-teal-500/10 via-blue-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            {/* 3D Showcase Image Frame (Border-free & Transparent Background) */}
            <div
              className={`relative z-10 w-full max-w-lg aspect-square flex items-center justify-center p-2 group animate-float-gentle transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                inView ? 'opacity-100 scale-100' : 'opacity-90 scale-95'
              }`}
            >
              <img
                src="/assets/hero/fotoproduk1-clean.png"
                alt="Formulasi Kimia Industri CV. Citra Putra Mandiri"
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column — Editorial Text Block with BCA Digital Mask Reveal */}
          <div className="lg:col-span-5 space-y-6">
            {/* Section Label */}
            <div className="bca-mask">
              <div
                className={`bca-reveal text-xs font-semibold uppercase tracking-[0.25em] text-teal-600 ${
                  inView ? 'bca-active' : ''
                }`}
                style={{ transitionDelay: '50ms' }}
              >
                {t('about_tag')}
              </div>
            </div>

            {/* Headline with Line Mask */}
            <div className="bca-mask">
              <h2
                className={`bca-reveal text-3xl sm:text-4xl lg:text-[44px] font-bold font-serif text-navy-900 leading-[1.25] pb-2 ${
                  inView ? 'bca-active' : ''
                }`}
                style={{ transitionDelay: '120ms' }}
              >
                {t('about_headline_part1')}{' '}
                <span className="text-teal-700">{t('about_headline_part2')}</span>
              </h2>
            </div>

            {/* Editorial Body */}
            <div className="bca-mask">
              <p
                className={`bca-reveal text-base text-slate-600 leading-relaxed font-light ${
                  inView ? 'bca-active' : ''
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                {t('about_desc_main')}
              </p>
            </div>

            {/* Minimal Minimalist Bullet Points (Teal Dots) */}
            <div className="space-y-3.5 pt-2">
              {points.map((item, idx) => (
                <div key={idx} className="bca-mask">
                  <div
                    className={`bca-reveal flex items-start gap-3 ${
                      inView ? 'bca-active' : ''
                    }`}
                    style={{ transitionDelay: `${idx * 70 + 280}ms` }}
                  >
                    <span className="w-2 h-2 rounded-full bg-teal-600 mt-2 shrink-0" />
                    <span className="text-sm font-medium text-slate-800">{item}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Read More Link */}
            <div className="pt-4 bca-mask">
              <div
                className={`bca-reveal ${
                  inView ? 'bca-active' : ''
                }`}
                style={{ transitionDelay: '580ms' }}
              >
                <button
                  onClick={handleMoreClick}
                  className="inline-flex items-center gap-3 font-semibold text-navy-900 hover:text-teal-600 transition-colors group cursor-pointer text-base"
                >
                  <span>{t('about_more_btn')}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform text-teal-600" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
