import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { MUSE_CONFIG } from '../../data/museData';
import { MuseSignup } from './MuseSignup';

export const MuseHero: React.FC = () => {
  return (
    <section className="px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="max-w-4xl space-y-8 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              10-DAY SERIES
            </div>

            <div className="space-y-5">
              <h1 className="text-5xl font-bold leading-[1.02] text-white sm:text-7xl md:text-8xl">
                10 Days of Muse
              </h1>
              <p className="max-w-3xl text-xl font-light leading-relaxed text-zinc-300 sm:text-2xl">
                Practical prompts, workflows, comparisons, and experiments with Meta's new AI agent.
              </p>
            </div>

            <p className="max-w-2xl text-base font-light leading-relaxed text-zinc-400 sm:text-lg">
              I'm putting Muse through real workflows for 10 days. Every experiment, prompt, and workflow from the series lives here.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#muse-series"
                className="inline-flex items-center gap-2.5 rounded-lg bg-white px-6 py-3.5 text-sm font-medium text-zinc-950 shadow-[0_0_30px_rgba(255,255,255,0.12)] transition-colors hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-white/60"
              >
                <span>Explore the series</span>
                <ArrowDown className="h-4 w-4 text-zinc-900" />
              </a>
              <a
                href={MUSE_CONFIG.officialMuseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-5 py-3.5 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/[0.09] focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
              >
                <span>Official Muse page</span>
                <ArrowUpRight className="h-4 w-4 text-indigo-400" />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-4 font-mono text-xs text-zinc-500">
              <span className="text-indigo-300">{MUSE_CONFIG.seriesStatus}</span>
              <span aria-hidden="true">/</span>
              <span>{MUSE_CONFIG.affiliationNote}</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <MuseSignup />
          </div>
        </div>
      </div>
    </section>
  );
};
