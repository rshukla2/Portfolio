import React from 'react';
import { ArrowDownRight } from 'lucide-react';
import { MuseDay } from '../../types';
import { CopyPrompt } from './CopyPrompt';

interface LatestMuseExperimentProps {
  day: MuseDay;
}

export const LatestMuseExperiment: React.FC<LatestMuseExperimentProps> = ({ day }) => {
  const label = String(day.number).padStart(2, '0');

  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 border-t border-white/[0.06] pt-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-3">
              <div className="font-mono text-xs uppercase tracking-widest text-indigo-400">
                NEW · DAY {label}
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-zinc-500">
                The newest released experiment gets extra space here so people arriving from Instagram can orient quickly.
              </p>
            </div>
          </div>

          <div className="space-y-8 lg:col-span-8">
            <div className="space-y-4">
              <div className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                {day.type}
              </div>
              <h2 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-5xl">
                {day.title}
              </h2>
              {day.shortDescription && (
                <p className="max-w-2xl text-base font-light leading-relaxed text-zinc-300 sm:text-xl">
                  {day.shortDescription}
                </p>
              )}
            </div>

            {day.prompt && <CopyPrompt prompt={day.prompt} />}

            <a
              href={`#muse-day-${day.number}`}
              className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-5 py-3 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/[0.09] focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
            >
              <span>Jump to details</span>
              <ArrowDownRight className="h-4 w-4 text-indigo-400" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
