import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import ExploreMore from './ExploreMore';

export default function HeroSlider({ onNavigate }) {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    {
      id: 1,
      title: t('hero_title_1'),
      subtitle: t('hero_desc_1'),
      ctaText: t('hero_cta_1'),
      ctaLink: '#products',
      bgImage: '/assets/hero/slide-1.png',
      badge: t('hero_badge_1'),
    },
    {
      id: 2,
      title: t('hero_title_2'),
      subtitle: t('hero_desc_2'),
      ctaText: t('hero_cta_2'),
      ctaLink: '#products',
      bgImage: '/assets/hero/boilerpabrik.png',
      badge: t('hero_badge_2'),
    },
    {
      id: 3,
      title: t('hero_title_3'),
      subtitle: t('hero_desc_3'),
      ctaText: t('hero_cta_3'),
      ctaLink: '#contact',
      bgImage: '/assets/hero/slide-3.png',
      badge: t('hero_badge_3'),
    },
    {
      id: 4,
      title: t('hero_title_4'),
      subtitle: t('hero_desc_4'),
      ctaLink: '#products',
      bgImage: '/assets/hero/coolingtower.png',
    },
    {
      id: 5,
      title: t('hero_title_5'),
      subtitle: t('hero_desc_5'),
      ctaLink: '#contact',
      bgImage: '/assets/hero/outdoorcoolingtower.png',
    },
  ];

  // Preload semua gambar slider ke cache browser agar langsung siap
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.bgImage;
    });
  }, []);

  const goToNextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating, slides.length]);

  const goToPrevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating, slides.length]);

  // Timer auto-slide 6 detik
  useEffect(() => {
    const timer = setInterval(() => {
      goToNextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [goToNextSlide]);

  // Navigasi keyboard panah
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPrevSlide();
      if (e.key === 'ArrowRight') goToNextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextSlide, goToPrevSlide]);

  const activeSlide = slides[currentSlide];

  return (
    <section
      id="hero"
      className="relative w-full h-[100vh] min-h-[520px] max-h-[820px] overflow-hidden text-white select-none bg-cover bg-center flex flex-col justify-center items-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.15) 50%, rgba(0, 0, 0, 0.5) 100%), url('${activeSlide.bgImage}')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Wrapper DOM Image eksplisit untuk menangani bug tangkapan layar full-page WebKit Safari iOS */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', zIndex: 0 }}
      >
        <img
          src={activeSlide.bgImage}
          alt={activeSlide.title || "Hero Background"}
          loading="eager"
          decoding="sync"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            minWidth: '100%',
            minHeight: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />
      </div>

      {/* Lapisan gradient halus */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.1) 45%, rgba(0, 0, 0, 0.5) 100%)',
          zIndex: 1 
        }} 
      />

      {/* Konten Teks Langsung di atas foto (Tanpa kotak hitam / card box) */}
      <div 
        className="relative h-full max-h-[820px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col justify-center items-center text-center py-16 sm:py-20 lg:py-24"
        style={{ zIndex: 10 }}
      >
        <div
          key={activeSlide.id}
          className="max-w-4xl space-y-4 sm:space-y-6 transition-all duration-700 animate-slide-up-fade"
        >
          {/* Judul Utama */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-[1.15] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] px-2">
            {activeSlide.title}
          </h1>

          {/* Subjudul */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-100 font-sans max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] px-2">
            {activeSlide.subtitle}
          </p>
        </div>
      </div>

      {/* Kontrol Bawah: Dots & Explore More */}
      <div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 20 }}
      >
        <div className="flex items-center gap-2.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Ke slide ${idx + 1}`}
              className={`transition-all duration-500 rounded-full cursor-pointer ${idx === currentSlide
                ? 'w-8 h-2.5 bg-teal-400 shadow-glow'
                : 'w-2.5 h-2.5 bg-white/60 hover:bg-white/90'
                }`}
            />
          ))}
        </div>

        <ExploreMore targetId="about" />
      </div>
    </section>
  );
}
