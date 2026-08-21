import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

const STEPS = [
  { step: '01', title: 'Problem', subtitle: 'Notice friction or curiosity' },
  { step: '02', title: 'Experiment', subtitle: 'Rapid hypothesis with AI' },
  { step: '03', title: 'Build', subtitle: 'Functional prototype in hours' },
  { step: '04', title: 'Automate', subtitle: 'Durable system or framework' },
];

export const Philosophy: React.FC = () => {
  return (
    <section
      id="philosophy-section"
      className="py-24 sm:py-36 px-5 sm:px-8 max-w-6xl mx-auto border-t border-white/[0.06]"
    >
      <div className="max-w-4xl space-y-10 sm:space-y-14">
        {/* Eyebrow */}
        <div className="font-mono text-xs text-indigo-400 tracking-widest uppercase">
          HOW I THINK
        </div>

        {/* Large Statement */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
          {PERSONAL_INFO.philosophy}
        </h2>

        {/* Manifesto Body */}
        <p className="text-lg sm:text-2xl text-zinc-300 font-light leading-relaxed max-w-3xl">
          If something feels repetitive, inefficient, frustrating, or simply interesting, my first instinct is usually:{' '}
          <span className="text-white font-medium underline decoration-indigo-500/50 underline-offset-8">
            Can I build something for this?
          </span>
        </p>

        {/* Minimal Flow Progression */}
        <div className="pt-8 sm:pt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {STEPS.map((item, idx) => (
              <div
                key={item.title}
                className="group p-5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-indigo-500/40 hover:bg-white/[0.04] transition-all"
              >
                <div className="font-mono text-[11px] text-zinc-500 mb-2">{item.step}</div>
                <div className="text-lg font-semibold text-white tracking-tight flex items-center justify-between">
                  <span>{item.title}</span>
                  {idx < 3 && (
                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400 transition-colors hidden md:block" />
                  )}
                </div>
                <div className="text-xs text-zinc-400 mt-1 leading-snug">{item.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
