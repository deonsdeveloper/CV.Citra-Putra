import React, { useState, useRef } from 'react';

/**
 * Interactive 3D Drum Viewer Component
 * Allows user to drag left/right to rotate the drum 360 degrees smoothly.
 */
export default function DrumViewer({ image, alt, onError, onCardClick, isFeatured = false }) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startXRef = useRef(0);
  const startRotRef = useRef(0);
  const hasMovedRef = useRef(false);

  const handlePointerDown = (e) => {
    e.stopPropagation();
    startXRef.current = e.clientX;
    startRotRef.current = rotation;
    hasMovedRef.current = false;
    setIsDragging(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (_) {}
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startXRef.current;
    if (Math.abs(deltaX) > 3) {
      hasMovedRef.current = true;
    }
    setRotation(startRotRef.current + deltaX * 1.2);
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) {}

    // If user merely clicked without dragging, trigger modal open
    if (!hasMovedRef.current && onCardClick) {
      onCardClick();
    }
  };

  const handlePointerCancel = () => {
    setIsDragging(false);
  };

  return (
    <div className={`w-full ${isFeatured ? 'h-52 sm:h-64' : 'h-44 sm:h-48'} bg-transparent flex flex-col items-center justify-center relative my-2 overflow-hidden select-none group/drum`}>
      {/* 360° Drag Hint Pill on Hover */}
      <div className="absolute top-2 right-2 z-10 opacity-0 group-hover/drum:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-navy-900/80 backdrop-blur-xs text-[10px] text-teal-300 font-medium tracking-wide shadow-sm border border-teal-500/20">
        <span className="inline-block animate-pulse text-teal-400 font-bold">360°</span>
        <span className="text-[9px] text-slate-200">Geser</span>
      </div>

      {/* Interactive Drag & Rotate Area */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none"
        title="Klik dan geser ke kiri/kanan untuk memutar"
      >
        <img
          src={image}
          alt={alt}
          onError={onError}
          draggable={false}
          style={{
            transform: `rotateY(${rotation}deg)`,
            transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'visible',
            willChange: 'transform',
          }}
          className={`${isFeatured ? 'max-h-44 sm:max-h-56' : 'max-h-36 sm:max-h-40'} w-auto max-w-[85%] object-contain mix-blend-multiply pointer-events-none select-none transition-[scale] duration-300 group-hover/drum:scale-105`}
          loading="lazy"
        />
      </div>

      {/* Dynamic Ground Shadow */}
      <div
        style={{
          transform: `scaleX(${1 + Math.abs(Math.sin((rotation * Math.PI) / 180)) * 0.12})`,
          transition: isDragging ? 'none' : 'transform 0.35s ease-out',
        }}
        className={`${isFeatured ? 'w-32' : 'w-24'} h-2 bg-slate-300/30 rounded-full filter blur-xs -mt-1 pointer-events-none`}
      />
    </div>
  );
}
