import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { RaunoCursorWords } from './RaunoCursorWords';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero-section"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center pt-28 pb-16 px-5 sm:px-8 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Rauno-inspired interactive words & cursor field */}
      <RaunoCursorWords />

      <div className="relative z-20 max-w-4xl space-y-8 sm:space-y-10">
        {/* Eyebrow & Status Tag */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono tracking-widest text-zinc-300 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            {PERSONAL_INFO.eyebrow}
          </div>
        </div>

        {/* Main Headline */}
        <div className="space-y-2 sm:space-y-3">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05]">
            {PERSONAL_INFO.headlineFirst}
          </h1>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-zinc-400 leading-[1.05]">
            {PERSONAL_INFO.headlineSecond}
          </h1>
        </div>

        {/* Supporting Copy */}
        <p className="text-base sm:text-xl md:text-2xl text-zinc-300 font-light leading-relaxed max-w-2xl">
          {PERSONAL_INFO.bio}
        </p>

        {/* Action CTAs */}
        <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
          <a
            href="#work"
            id="hero-cta-explore-work"
            className="px-6 py-3.5 rounded-lg bg-white text-zinc-950 font-medium text-sm hover:bg-zinc-100 transition-all flex items-center gap-2.5 shadow-[0_0_30px_rgba(255,255,255,0.12)] cursor-pointer active:scale-95"
          >
            <span>Explore my work</span>
            <ArrowDown className="w-4 h-4 text-zinc-900" />
          </a>

          <a
            href="#teaching"
            id="hero-cta-learn-with-me"
            className="px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white transition-colors flex items-center gap-2 group cursor-pointer"
          >
            <span>Learn with me</span>
            <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Live Exploration Status Pill */}
        <div className="pt-6 sm:pt-10 flex items-center gap-2 text-xs font-mono text-zinc-400">
          <span className="text-zinc-500">Currently exploring</span>
          <span className="text-indigo-400">→</span>
          <span className="text-zinc-300 font-medium">{PERSONAL_INFO.currentlyExploring}</span>
        </div>
      </div>
    </section>
  );
};
