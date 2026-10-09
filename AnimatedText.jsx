import React, { useEffect, useState } from 'react';

/**
 * AnimatedWordReveal Component
 * Animates text word-by-word with smooth mask reveal, staggered delay,
 * and interactive hover glow.
 */
export function AnimatedWordReveal({
  text = '',
  className = '',
  wordClassName = '',
  staggerMs = 40,
  baseDelayMs = 0,
  interactiveHover = true,
  highlightWords = [],
  as: Component = 'span',
}) {
  if (!text) return null;
  const words = text.split(' ');

  return (
    <Component className={`inline-wrap ${className}`}>
      {words.map((word, index) => {
        const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '').toLowerCase();
        const isHighlighted = highlightWords.some((h) => cleanWord.includes(h.toLowerCase()));

        return (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-1 -mb-1 mr-[0.28em] align-top">
            <span
              className={`inline-block bca-reveal transition-all duration-300 ${
                interactiveHover ? 'hover:text-teal-300 hover:scale-105 cursor-default' : ''
              } ${
                isHighlighted
                  ? 'text-teal-300 font-semibold drop-shadow-[0_0_12px_rgba(45,212,191,0.6)]'
                  : ''
              } ${wordClassName}`}
              style={{
                transitionDelay: `${baseDelayMs + index * staggerMs}ms`,
              }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </Component>
  );
}

/**
 * AnimatedTypewriter Component
 * Cycles through array of phrases with a smooth typing cursor effect.
 */
export function AnimatedTypewriter({
  phrases = [],
  typingSpeed = 80,
  deletingSpeed = 45,
  pauseMs = 2200,
  className = '',
}) {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink((v) => !v), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    if (!phrases.length) return;

    if (subIndex === phrases[phraseIdx].length + 1 && !isDeleting) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseMs);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setPhraseIdx((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [subIndex, phraseIdx, isDeleting, phrases, typingSpeed, deletingSpeed, pauseMs]);

  if (!phrases.length) return null;

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span>{phrases[phraseIdx].substring(0, subIndex)}</span>
      <span
        className={`ml-1 inline-block w-[3px] h-[0.85em] bg-teal-400 rounded-full transition-opacity ${
          blink ? 'opacity-100' : 'opacity-20'
        }`}
      />
    </span>
  );
}

/**
 * AmbientParticles Component
 * Renders floating ambient light specks in section backdrops.
 */
export function AmbientParticles({ count = 6 }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: count }).map((_, i) => {
        const size = 6 + (i % 4) * 4;
        const left = 15 + (i * 18) % 70;
        const top = 20 + (i * 25) % 60;
        const duration = 7 + (i % 3) * 3;
        const delay = i * 0.8;

        return (
          <div
            key={i}
            className="absolute rounded-full bg-teal-400/20 blur-sm animate-pulse-glow"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              top: `${top}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}

export default AnimatedWordReveal;
