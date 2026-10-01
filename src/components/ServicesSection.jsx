import React, { useRef, useState, useEffect } from 'react';
import { SERVICES } from '../data/products';
import { Droplet, Shield, Wrench, FlaskConical, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ICON_MAP = {
  'water-treatment-service': Droplet,
  'chemical-supply': Shield,
  'maintenance-support': Wrench,
  'custom-formulation': FlaskConical,
};

export default function ServicesSection({ onNavigate }) {
  const { t, trans } = useLanguage();
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleServiceClick = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (onNavigate) {
      onNavigate('services');
    } else {
      window.location.hash = 'services';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className={`py-24 bg-sand/40 relative overflow-hidden ${
        inView ? 'bca-active' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header with BCA Digital Mask Reveal */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="bca-mask">
            <span
              className={`bca-reveal block text-xs font-semibold uppercase tracking-[0.25em] text-teal-600 ${
                inView ? 'bca-active' : ''
              }`}
              style={{ transitionDelay: '50ms' }}
            >
              {t('serv_tag')}
            </span>
          </div>

          <div className="bca-mask">
            <h2
              className={`bca-reveal text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-navy-900 leading-tight ${
                inView ? 'bca-active' : ''
              }`}
              style={{ transitionDelay: '120ms' }}
            >
              {t('serv_main_title')}
            </h2>
          </div>

          <div className="bca-mask">
            <p
              className={`bca-reveal text-base text-slate-600 font-light max-w-2xl mx-auto ${
                inView ? 'bca-active' : ''
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              {t('serv_main_desc')}
            </p>
          </div>
        </div>

        {/* Asymmetrical Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Water Treatment Solutions (Tall Card - 5 cols) */}
          {SERVICES[0] && (() => {
            const ServiceIcon = ICON_MAP[SERVICES[0].id] || Droplet;
            const points1 = trans(SERVICES[0].points) || [];
            return (
              <div
                role="button"
                tabIndex={0}
                onClick={handleServiceClick}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleServiceClick(e); }}
                className={`lg:col-span-5 bg-white rounded-3xl p-8 lg:p-10 shadow-soft border border-slate-100/80 flex flex-col justify-between hover:shadow-medium transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 group cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-teal-500/40 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-80 translate-y-6'
                }`}
                style={{ transitionDelay: '100ms' }}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                      <ServiceIcon className="w-7 h-7" />
                    </div>
                    <div className="bca-mask">
                      <span
                        className={`bca-reveal font-serif font-bold text-3xl text-slate-200 block ${
                          inView ? 'bca-active' : ''
                        }`}
                        style={{ transitionDelay: '150ms' }}
                      >
                        {SERVICES[0].number}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="bca-mask">
                      <h3
                        className={`bca-reveal text-2xl font-bold font-serif text-navy-900 mb-3 group-hover:text-teal-600 transition-colors block ${
                          inView ? 'bca-active' : ''
                        }`}
                        style={{ transitionDelay: '220ms' }}
                      >
                        {trans(SERVICES[0].title)}
                      </h3>
                    </div>
                    <div className="bca-mask">
                      <p
                        className={`bca-reveal text-sm text-slate-600 leading-relaxed block ${
                          inView ? 'bca-active' : ''
                        }`}
                        style={{ transitionDelay: '280ms' }}
                      >
                        {trans(SERVICES[0].description)}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2.5 pt-2">
                    {Array.isArray(points1) && points1.map((pt, idx) => (
                      <li key={idx} className="bca-mask">
                        <div
                          className={`bca-reveal flex items-start gap-2.5 text-xs font-medium text-slate-700 ${
                            inView ? 'bca-active' : ''
                          }`}
                          style={{ transitionDelay: `${320 + idx * 50}ms` }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                          <span>{pt}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 border-t border-slate-100 bca-mask">
                  <div
                    className={`bca-reveal ${
                      inView ? 'bca-active' : ''
                    }`}
                    style={{ transitionDelay: '550ms' }}
                  >
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleServiceClick(e); }}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-navy-900 group-hover:text-teal-600 transition-colors py-1 cursor-pointer"
                    >
                      <span>{t('serv_btn_learn_more')}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-teal-600" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Right Group: Cards 2, 3, 4 (7 cols total) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 2: Chemical Supply & Consulting */}
            {SERVICES[1] && (() => {
              const ServiceIcon = ICON_MAP[SERVICES[1].id] || Shield;
              const points2 = trans(SERVICES[1].points) || [];
              return (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={handleServiceClick}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleServiceClick(e); }}
                  className={`md:col-span-2 bg-white rounded-3xl p-8 shadow-soft border border-slate-100/80 flex flex-col justify-between hover:shadow-medium transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 group cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-teal-500/40 ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-80 translate-y-6'
                  }`}
                  style={{ transitionDelay: '180ms' }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-navy-900 transition-colors duration-300">
                        <ServiceIcon className="w-6 h-6" />
                      </div>
                      <div className="bca-mask">
                        <span
                          className={`bca-reveal font-serif font-bold text-3xl text-slate-200 block ${
                            inView ? 'bca-active' : ''
                          }`}
                          style={{ transitionDelay: '220ms' }}
                        >
                          {SERVICES[1].number}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="bca-mask">
                        <h3
                          className={`bca-reveal text-xl font-bold font-serif text-navy-900 mb-2 group-hover:text-teal-600 transition-colors block ${
                            inView ? 'bca-active' : ''
                          }`}
                          style={{ transitionDelay: '280ms' }}
                        >
                          {trans(SERVICES[1].title)}
                        </h3>
                      </div>
                      <div className="bca-mask">
                        <p
                          className={`bca-reveal text-xs text-slate-600 leading-relaxed block ${
                            inView ? 'bca-active' : ''
                          }`}
                          style={{ transitionDelay: '340ms' }}
                        >
                          {trans(SERVICES[1].description)}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      {Array.isArray(points2) && points2.map((pt, idx) => (
                        <div key={idx} className="bca-mask">
                          <div
                            className={`bca-reveal flex items-center gap-2 text-[12px] text-slate-700 ${
                              inView ? 'bca-active' : ''
                            }`}
                            style={{ transitionDelay: `${380 + idx * 40}ms` }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                            <span className="truncate">{pt}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 mt-6 bca-mask">
                    <div
                      className={`bca-reveal ${
                        inView ? 'bca-active' : ''
                      }`}
                      style={{ transitionDelay: '560ms' }}
                    >
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleServiceClick(e); }}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-navy-900 group-hover:text-teal-600 transition-colors py-1 cursor-pointer"
                      >
                        <span>{t('serv_btn_learn_more')}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-teal-600" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Card 3: Maintenance Support */}
            {SERVICES[2] && (() => {
              const ServiceIcon = ICON_MAP[SERVICES[2].id] || Wrench;
              return (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={handleServiceClick}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleServiceClick(e); }}
                  className={`bg-white rounded-3xl p-7 shadow-soft border border-slate-100/80 flex flex-col justify-between hover:shadow-medium transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 group cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-teal-500/40 ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-80 translate-y-6'
                  }`}
                  style={{ transitionDelay: '260ms' }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-xl bg-navy-50 text-navy-700 flex items-center justify-center group-hover:bg-navy-900 group-hover:text-white transition-colors duration-300">
                        <ServiceIcon className="w-5 h-5" />
                      </div>
                      <div className="bca-mask">
                        <span
                          className={`bca-reveal font-serif font-bold text-2xl text-slate-200 block ${
                            inView ? 'bca-active' : ''
                          }`}
                          style={{ transitionDelay: '300ms' }}
                        >
                          {SERVICES[2].number}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="bca-mask">
                        <h3
                          className={`bca-reveal text-lg font-bold font-serif text-navy-900 mb-2 group-hover:text-teal-600 transition-colors block ${
                            inView ? 'bca-active' : ''
                          }`}
                          style={{ transitionDelay: '360ms' }}
                        >
                          {trans(SERVICES[2].title)}
                        </h3>
                      </div>
                      <div className="bca-mask">
                        <p
                          className={`bca-reveal text-xs text-slate-600 leading-relaxed block ${
                            inView ? 'bca-active' : ''
                          }`}
                          style={{ transitionDelay: '420ms' }}
                        >
                          {trans(SERVICES[2].description)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 bca-mask">
                    <div
                      className={`bca-reveal ${
                        inView ? 'bca-active' : ''
                      }`}
                      style={{ transitionDelay: '580ms' }}
                    >
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleServiceClick(e); }}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-navy-900 group-hover:text-teal-600 transition-colors py-1 cursor-pointer"
                      >
                        <span>{t('serv_btn_learn_more')}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-teal-600" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Card 4: Custom OEM Formulation */}
            {SERVICES[3] && (() => {
              const ServiceIcon = ICON_MAP[SERVICES[3].id] || FlaskConical;
              return (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={handleServiceClick}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleServiceClick(e); }}
                  className={`bg-white rounded-3xl p-7 shadow-soft border border-slate-100/80 flex flex-col justify-between hover:shadow-medium transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 group cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-teal-500/40 ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-80 translate-y-6'
                  }`}
                  style={{ transitionDelay: '340ms' }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                        <ServiceIcon className="w-5 h-5" />
                      </div>
                      <div className="bca-mask">
                        <span
                          className={`bca-reveal font-serif font-bold text-2xl text-slate-200 block ${
                            inView ? 'bca-active' : ''
                          }`}
                          style={{ transitionDelay: '380ms' }}
                        >
                          {SERVICES[3].number}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="bca-mask">
                        <h3
                          className={`bca-reveal text-lg font-bold font-serif text-navy-900 mb-2 group-hover:text-teal-600 transition-colors block ${
                            inView ? 'bca-active' : ''
                          }`}
                          style={{ transitionDelay: '440ms' }}
                        >
                          {trans(SERVICES[3].title)}
                        </h3>
                      </div>
                      <div className="bca-mask">
                        <p
                          className={`bca-reveal text-xs text-slate-600 leading-relaxed block ${
                            inView ? 'bca-active' : ''
                          }`}
                          style={{ transitionDelay: '500ms' }}
                        >
                          {trans(SERVICES[3].description)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 bca-mask">
                    <div
                      className={`bca-reveal ${
                        inView ? 'bca-active' : ''
                      }`}
                      style={{ transitionDelay: '600ms' }}
                    >
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleServiceClick(e); }}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-navy-900 group-hover:text-teal-600 transition-colors py-1 cursor-pointer"
                      >
                        <span>{t('serv_btn_learn_more')}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-teal-600" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}

          </div>

        </div>
      </div>
    </section>
  );
}
