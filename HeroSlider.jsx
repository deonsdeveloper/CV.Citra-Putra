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

  // Preload all slide images into browser cache immediately
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

  // Auto-play timer (6 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      goToNextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [goToNextSlide]);

  // Keyboard arrow keys navigation
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
      className="relative w-full h-[100vh] min-h-[520px] max-h-[820px] overflow-hidden text-white select-none bg-cover bg-center transition-all duration-700 ease-in-out"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.45)), url('${activeSlide.bgImage}')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Slide Content Container */}
      <div className="relative z-10 h-full max-h-[820px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col justify-center items-center text-center py-16 sm:py-20 lg:py-24">
        <div
          key={activeSlide.id}
          className="max-w-4xl space-y-4 sm:space-y-6 transition-all duration-700 animate-slide-up-fade"
        >
          {/* H1 Title - Editorial Playfair Display */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-[1.15] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] px-2">
            {activeSlide.title}
          </h1>

          {/* Subheadline - Inter */}
          <p className="text-xs sm:text-base md:text-lg lg:text-xl text-slate-100 font-sans max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] px-2">
            {activeSlide.subtitle}
          </p>
        </div>
      </div>

      {/* Unified Bottom Controls: Dot Indicators & Explore More Button */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        {/* Dot Indicators */}
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

        {/* Bouncing Explore More Indicator */}
        <ExploreMore targetId="about" />
      </div>
    </section>
  );
}
