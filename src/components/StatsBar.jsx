import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

function useCountUp(target, duration = 1800, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) {
      setCount(0);
      return;
    }
    let startTime = null;
    let animationFrameId = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };
    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [started, target, duration]);
  return count;
}

function StatItem({ stat, inView, idx }) {
  const count = useCountUp(stat.num, 1500 + idx * 100, inView);
  return (
    <div
      className={`flex flex-col items-center text-center ${
        idx > 0 ? 'pt-6 lg:pt-0' : ''
      } ${idx > 0 ? 'lg:px-6' : 'lg:pr-6'}`}
    >
      {/* Number with Mask Unveiling */}
      <div className="bca-mask">
        <span
          className={`bca-reveal block font-serif font-bold text-4xl lg:text-5xl text-navy-900 leading-none tracking-tight ${
            inView ? 'bca-active' : ''
          }`}
          style={{ transitionDelay: `${idx * 80 + 100}ms` }}
        >
          {count}{stat.suffix}
        </span>
      </div>

      {/* Label with Mask Unveiling */}
      <div className="bca-mask mt-3">
        <span
          className={`bca-reveal block text-xs font-semibold text-slate-800 uppercase tracking-widest font-sans ${
            inView ? 'bca-active' : ''
          }`}
          style={{ transitionDelay: `${idx * 80 + 180}ms` }}
        >
          {stat.label}
        </span>
      </div>

      {/* Sublabel with Mask Unveiling */}
      <div className="bca-mask mt-0.5">
        <span
          className={`bca-reveal block text-[11px] text-slate-400 font-medium tracking-normal ${
            inView ? 'bca-active' : ''
          }`}
          style={{ transitionDelay: `${idx * 80 + 240}ms` }}
        >
          {stat.sublabel}
        </span>
      </div>
    </div>
  );
}

export default function StatsBar() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  const stats = [
    { num: 28, suffix: '+', label: t('stat_products'), sublabel: t('stat_products_sub') },
    { num: 5,  suffix: '',  label: t('stat_categories'), sublabel: t('stat_categories_sub') },
    { num: 100, suffix: '+', label: t('stat_clients'), sublabel: t('stat_clients_sub') },
    { num: 15, suffix: '+', label: t('stat_experience'), sublabel: t('stat_experience_sub') },
  ];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -5% 0px' }
    );

    observer.observe(el);

    // Fallback timer for screenshot / slow observer triggers
    const fallbackTimer = setTimeout(() => {
      setInView(true);
    }, 1800);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div ref={ref} className="relative max-w-6xl mx-auto px-4 sm:px-6 z-30 -mt-12 lg:-mt-16">
      <div
        className={`bg-white rounded-3xl shadow-medium border border-slate-100 p-6 sm:p-8 lg:p-10 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-90 translate-y-4 scale-[0.99]'
        }`}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-0 divide-y sm:divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          {stats.map((stat, idx) => (
            <StatItem key={idx} stat={stat} inView={inView} idx={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
