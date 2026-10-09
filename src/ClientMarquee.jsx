import React from 'react';
import { CLIENTS } from '../data/products';
import { Factory } from 'lucide-react';

export default function ClientMarquee() {
  return (
    <section className="py-12 bg-sand border-y border-amber-900/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center mb-8">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.25em]">
          Dipercaya oleh Industri & Manufaktur Torkemuka di Indonesia
        </span>
      </div>

      {/* Marquee Row */}
      <div className="relative w-full overflow-hidden group">
        <div className="flex w-[200%] animate-marquee group-hover:[animation-play-state:paused]">
          {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-8 opacity-60 hover:opacity-100 transition-opacity duration-300 shrink-0 cursor-default"
            >
              <div className="w-8 h-8 rounded-lg bg-navy-900/10 flex items-center justify-center text-navy-800">
                <Factory className="w-4 h-4" />
              </div>
              <div>
                <span className="font-serif font-bold text-navy-900 text-sm block">
                  {client.name}
                </span>
                <span className="text-[10px] text-slate-500 font-medium block">
                  {client.industry}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
