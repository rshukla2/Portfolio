import React from 'react';
import { MUSE_FRAMEWORK_STEPS } from '../../data/museData';

export const MuseFramework: React.FC = () => {
  return (
    <section className="border-t border-white/[0.06] px-5 py-24 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-3xl space-y-4 sm:mb-20">
          <div className="font-mono text-xs uppercase tracking-widest text-indigo-400">
            MY APPROACH
          </div>
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
            Don't just copy my prompts. Steal my framework.
          </h2>
        </div>

        <div className="space-y-8">
          {MUSE_FRAMEWORK_STEPS.map((step) => (
            <div
              key={step.number}
              className="grid gap-4 border-t border-white/[0.06] pt-8 sm:grid-cols-12 sm:gap-8"
            >
              <div className="font-mono text-xs uppercase tracking-widest text-indigo-400 sm:col-span-3">
                {step.number} · {step.title}
              </div>
              <p className="text-xl font-light leading-relaxed text-zinc-300 sm:col-span-9 sm:text-2xl">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-14 max-w-3xl text-base font-light leading-relaxed text-zinc-400 sm:text-xl">
          The goal isn't to memorize prompts. It's to learn how to turn problems into systems.
        </p>
      </div>
    </section>
  );
};
