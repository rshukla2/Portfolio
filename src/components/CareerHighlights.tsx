import React from 'react';
import { CAREER_HIGHLIGHTS } from '../data/portfolioData';

export const CareerHighlights: React.FC = () => {
  return (
    <section
      id="highlights"
      className="w-full border-t border-white/[0.06] bg-[#090A0D] py-10 sm:py-14"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="font-mono text-xs text-indigo-400 tracking-widest uppercase mb-6 text-center">
          AT A GLANCE
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {CAREER_HIGHLIGHTS.map((highlight, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {highlight.value}
              </div>
              <div className="text-xs sm:text-sm text-zinc-400">
                {highlight.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
