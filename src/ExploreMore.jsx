import React from 'react';
import { ArrowDown } from 'lucide-react';

export default function ExploreMore({ targetId = 'about' }) {
  const handleClick = (e) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col items-center gap-1.5 pt-1">
      <button
        onClick={handleClick}
        aria-label="Jelajahi lebih lanjut"
        className="w-12 h-12 rounded-full border-2 border-white/40 bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-teal-500 hover:border-teal-400 transition-all duration-300 group shadow-lg cursor-pointer"
      >
        <ArrowDown className="w-5 h-5 text-white animate-bounce-slow group-hover:translate-y-1 transition-transform" />
      </button>
      <span className="text-[10px] font-semibold text-white/80 uppercase tracking-[0.25em] font-sans">
        Explore More
      </span>
    </div>
  );
}
