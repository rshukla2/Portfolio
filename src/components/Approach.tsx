import React, { useState } from 'react';
import { APPROACH_STEPS } from '../data/portfolioData';

export const Approach: React.FC = () => {
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);

  return (
    <section id="approach" className="py-24 sm:py-36 px-5 sm:px-8 max-w-6xl mx-auto border-t border-white/[0.06]">
      <div className="max-w-3xl mb-16 sm:mb-24 space-y-4">
        <div className="font-mono text-xs text-indigo-400 tracking-widest uppercase">
          MY APPROACH
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
          How I work with AI.
        </h2>
        <p className="text-base sm:text-xl text-zinc-400 font-light leading-relaxed">
          A repeatable discipline for translating everyday friction into working software and timeless frameworks.
        </p>
      </div>

      {/* Spacious Step Story Progression */}
      <div className="space-y-16 sm:space-y-24">
        {APPROACH_STEPS.map((step) => {
          const isHovered = hoveredStep === step.number;

          return (
            <div
              key={step.number}
              id={`approach-step-${step.number}`}
              onMouseEnter={() => setHoveredStep(step.number)}
              onMouseLeave={() => setHoveredStep(null)}
              className={`p-6 sm:p-10 rounded-2xl transition-all duration-300 border ${
                isHovered
                  ? 'bg-white/[0.03] border-indigo-500/40 shadow-[0_0_30px_rgba(99,102,241,0.06)]'
                  : 'bg-transparent border-white/[0.05]'
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
                {/* Step Marker */}
                <div className="lg:col-span-3 flex lg:flex-col items-center lg:items-start justify-between">
                  <span className="font-mono text-3xl sm:text-5xl font-extrabold text-zinc-700 select-none">
                    {step.number}
                  </span>
                  <span className="font-mono text-xs text-indigo-400 uppercase tracking-widest mt-2">
                    {step.title}
                  </span>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-9 space-y-4">
                  <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
                    {step.headline}
                  </h3>
                  <p className="text-base sm:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl">
                    {step.body}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
