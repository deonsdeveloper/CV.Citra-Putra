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

  const goToNextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating, slides.length]);

  const goToPrevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
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



  return (
    <div
      id="hero"
      className="relative w-full h-[100vh] min-h-[520px] max-h-[850px] overflow-hidden bg-navy-900 text-white select-none"
    >
      {/* Slides Stack */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 max-h-[850px] transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image with Ken Burns Zoom Effect (HTML img tag for reliable iOS Safari Full-Page screenshot rendering) */}
            <img
              src={slide.bgImage}
              alt={slide.title || 'Hero Background'}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding={index === 0 ? 'sync' : 'async'}
              className={`absolute inset-0 w-full h-full object-cover max-h-[850px] transition-transform duration-[7000ms] ease-out pointer-events-none ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 max-h-[850px] bg-gradient-to-b from-slate-950/60 via-slate-900/30 to-slate-950/80 pointer-events-none" />
            <div className="absolute inset-0 max-h-[850px] bg-radial-vignette opacity-30 pointer-events-none" />

            {/* Slide Content Container */}
            <div className="relative h-full max-h-[850px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col justify-center items-center text-center py-16 sm:py-20 lg:py-24">
              <div
                className={`max-w-4xl space-y-4 sm:space-y-6 transition-all duration-1000 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
              >
                {/* H1 Title - Editorial Playfair Display */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-[1.15] text-white drop-shadow-md px-2">
                  {slide.title}
                </h1>

                {/* Subheadline - Inter */}
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-200 font-sans max-w-2xl mx-auto font-light leading-relaxed drop-shadow px-2">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>
        );
      })}

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
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
                }`}
            />
          ))}
        </div>

        {/* Bouncing Explore More Indicator */}
        <ExploreMore targetId="about" />
      </div>
    </div>
  );
}
