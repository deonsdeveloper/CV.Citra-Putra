import React, { useState, useEffect } from 'react';
import { TESTIMONIALS } from '../data/products';

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-28 bg-navy-900 text-white relative overflow-hidden bg-noise">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-8">
        {/* Large Decorative Quote Icon */}
        <div className="font-serif text-8xl lg:text-[120px] text-teal-500/20 leading-none select-none -mb-12">
          “
        </div>

        {/* Quote Content */}
        <div className="min-h-[160px] flex items-center justify-center">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className={`transition-all duration-700 space-y-6 ${
                idx === current
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-4 scale-95 hidden'
              }`}
            >
              <blockquote className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-slate-100 font-light leading-relaxed max-w-3xl mx-auto">
                "{t.quote}"
              </blockquote>

              <div className="w-16 h-0.5 bg-teal-500/40 mx-auto" />

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-14 h-14 rounded-full border-2 border-teal-500 object-cover shadow-glow"
                />
                <div className="text-center sm:text-left">
                  <h4 className="font-sans font-semibold text-white text-base">
                    {t.name}
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">
                    {t.role}, <span className="text-teal-400">{t.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center items-center gap-3 pt-6">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Testimonial ${idx + 1}`}
              className={`transition-all duration-500 rounded-full cursor-pointer ${
                idx === current
                  ? 'w-8 h-2 bg-teal-500'
                  : 'w-2 h-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
