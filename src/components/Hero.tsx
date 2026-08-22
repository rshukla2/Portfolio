import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import portraitUrl from '../../assets/rishi-shukla-portrait.jpg';
import { PERSONAL_INFO } from '../data/portfolioData';
import { RaunoCursorWords } from './RaunoCursorWords';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero-section"
      className="relative min-h-[92svh] lg:min-h-screen flex flex-col justify-center pt-28 pb-0 lg:pb-16 px-5 sm:px-8 max-w-6xl mx-auto overflow-hidden"
    >
      <RaunoCursorWords />

      <div
        className="pointer-events-none absolute inset-y-14 -right-[8%] z-0 hidden w-[65%] lg:block xl:-right-[5%] xl:w-[61%]"
        aria-hidden="true"
      >
        <img
          src={portraitUrl}
          alt=""
          className="h-full w-full object-cover object-[center_24%] opacity-90"
          decoding="async"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(90deg, #090A0D 0%, rgba(9,10,13,0.96) 10%, rgba(9,10,13,0.45) 34%, transparent 58%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(180deg, rgba(9,10,13,0.2) 0%, transparent 55%, #090A0D 100%)',
          }}
        />
      </div>

      <div className="relative z-20 max-w-4xl space-y-8 sm:space-y-10 lg:max-w-[62%] xl:max-w-[59%]">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono tracking-widest text-zinc-300 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            {PERSONAL_INFO.eyebrow}
          </div>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.5rem] font-bold tracking-tight text-white leading-[1.05]">
            {PERSONAL_INFO.headlineFirst}
          </h1>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.5rem] font-bold tracking-tight text-zinc-400 leading-[1.05]">
            {PERSONAL_INFO.headlineSecond}
          </h1>
        </div>

        <p className="text-base sm:text-xl md:text-2xl lg:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl lg:max-w-xl">
          {PERSONAL_INFO.bio}
        </p>

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

        <div className="pt-6 sm:pt-10 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs font-mono text-zinc-400">
          <span className="text-zinc-500">Currently exploring</span>
          <span className="text-indigo-400">→</span>
          <span className="text-zinc-300 font-medium">{PERSONAL_INFO.currentlyExploring}</span>
        </div>
      </div>

      <div className="relative z-10 -mx-5 mt-5 aspect-[4/3] overflow-hidden sm:-mx-8 sm:mt-8 sm:aspect-[16/9] lg:hidden">
        <img
          src={portraitUrl}
          alt={`Portrait of ${PERSONAL_INFO.name}`}
          className="h-full w-full object-cover object-[center_10%]"
          decoding="async"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(180deg, #090A0D 0%, rgba(9,10,13,0.35) 20%, transparent 46%, transparent 78%, #090A0D 100%)',
          }}
        />
      </div>
    </section>
  );
};
