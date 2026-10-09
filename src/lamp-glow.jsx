import React, { useEffect, useState, useRef } from 'react';

/**
 * LampGlow - Subtle Cyan Industrial Ambient Light & Beam Effect
 * 
 * Extracts the iconic dual-conic light rays, horizontal cyan laser beam,
 * and soft ambient radial glow as a purely decorative, non-intrusive background element.
 * 
 * @param {Object} props
 * @param {'subtle' | 'medium' | 'strong'} [props.intensity='subtle'] - Opacity/glow intensity level
 * @param {string} [props.className=''] - Additional class names for styling overrides
 * @param {boolean} [props.showBeam=true] - Whether to show the top horizontal laser beam
 * @param {boolean} [props.showRays=true] - Whether to show the dual conic light rays
 * @param {string} [props.beamWidth='max-w-4xl'] - Tailwind max-w class for horizontal beam span
 */
export default function LampGlow({
  intensity = 'subtle',
  className = '',
  showBeam = true,
  showRays = true,
  beamWidth = 'max-w-4xl',
}) {
  const containerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Intensity opacity mappings
  const intensityMap = {
    subtle: {
      rays: 'opacity-40 sm:opacity-50',
      beam: 'opacity-80',
      radial: 'opacity-50',
      glowShadow: 'shadow-[0_0_15px_#22d3ee,0_0_30px_#06b6d4]',
    },
    medium: {
      rays: 'opacity-55 sm:opacity-70',
      beam: 'opacity-90',
      radial: 'opacity-70',
      glowShadow: 'shadow-[0_0_20px_#22d3ee,0_0_40px_#06b6d4,0_0_60px_#0891b2]',
    },
    strong: {
      rays: 'opacity-70 sm:opacity-85',
      beam: 'opacity-100',
      radial: 'opacity-85',
      glowShadow: 'shadow-[0_0_25px_#22d3ee,0_0_50px_#06b6d4,0_0_80px_#0891b2]',
    },
  };

  const currentIntensity = intensityMap[intensity] || intensityMap.subtle;

  // Mount animation & subtle scroll parallax
  useEffect(() => {
    setMounted(true);

    let rafId;
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Calculate subtle parallax only when element is near viewport (clamped between 0 and -18px)
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const offset = Math.max(-18, Math.min(0, -(window.innerHeight - rect.top) * 0.03));
        setScrollY(offset);
      }
    };

    const onScrollThrottled = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScrollThrottled, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScrollThrottled);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute top-0 left-1/2 -translate-x-1/2 w-full pointer-events-none z-0 overflow-hidden flex flex-col items-center select-none ${className}`}
      style={{
        transform: `translateX(-50%) translateY(${scrollY}px)`,
        transition: 'transform 0.15s ease-out',
      }}
    >
      {/* 1. Dual Conic Industrial Light Rays (Left & Right meeting in center) */}
      {showRays && (
        <div
          className={`relative w-full max-w-5xl h-48 sm:h-72 lg:h-80 flex items-center justify-center transition-all duration-[1600ms] ease-out ${
            mounted ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          } ${currentIntensity.rays}`}
        >
          {/* Left Conic Light Ray */}
          <div
            className="absolute top-0 right-1/2 w-[18rem] sm:w-[28rem] lg:w-[32rem] h-full bg-gradient-conic from-cyan-400/30 via-transparent to-transparent blur-2xl"
            style={{
              backgroundImage:
                'conic-gradient(from 70deg at 50% 0%, rgba(34, 211, 238, 0.35) 0deg, rgba(6, 182, 212, 0.15) 30deg, transparent 65deg)',
              transform: 'rotate(-5deg)',
              transformOrigin: 'top right',
            }}
          />

          {/* Right Conic Light Ray */}
          <div
            className="absolute top-0 left-1/2 w-[18rem] sm:w-[28rem] lg:w-[32rem] h-full bg-gradient-conic from-cyan-400/30 via-transparent to-transparent blur-2xl"
            style={{
              backgroundImage:
                'conic-gradient(from 220deg at 50% 0%, transparent 0deg, rgba(6, 182, 212, 0.15) 35deg, rgba(34, 211, 238, 0.35) 65deg)',
              transform: 'rotate(5deg)',
              transformOrigin: 'top left',
            }}
          />
        </div>
      )}

      {/* 2. Soft Ambient Radial Glow (Ellipse directly beneath beam) */}
      <div
        className={`absolute top-0 w-full max-w-4xl h-56 sm:h-72 lg:h-96 rounded-full blur-3xl pointer-events-none transition-all duration-[1800ms] ease-out ${
          mounted ? 'scale-100' : 'scale-75'
        } ${currentIntensity.radial} animate-lamp-ambient`}
        style={{
          background:
            'radial-gradient(ellipse at center top, rgba(34, 211, 238, 0.22) 0%, rgba(6, 182, 212, 0.08) 45%, transparent 70%)',
        }}
      />

      {/* 3. Horizontal Cyan Light Beam (Ultra-thin, sharp top source) */}
      {showBeam && (
        <div
          className={`absolute top-0 w-full ${beamWidth} px-6 sm:px-12 flex justify-center transition-all duration-[1400ms] ease-out ${
            mounted ? 'scale-x-100 opacity-100' : 'scale-x-50 opacity-0'
          }`}
        >
          {/* Main Laser Core */}
          <div
            className={`w-full h-[1.5px] sm:h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent ${currentIntensity.beam} ${currentIntensity.glowShadow} animate-lamp-beam-pulse`}
          />
        </div>
      )}
    </div>
  );
}
