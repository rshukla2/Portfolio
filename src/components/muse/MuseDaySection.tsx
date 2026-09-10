import React from 'react';
import { MuseDay } from '../../types';
import { CopyPrompt } from './CopyPrompt';

interface MuseDaySectionProps {
  day: MuseDay;
}

export const MuseDaySection: React.FC<MuseDaySectionProps> = ({ day }) => {
  const label = String(day.number).padStart(2, '0');

  if (day.status !== 'released') {
    return (
      <section
        id={`muse-day-${day.number}`}
        className="border-t border-white/[0.06] py-10"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="font-mono text-xs uppercase tracking-widest text-zinc-600">
            DAY {label}
          </div>
          <div className="text-xl font-semibold text-zinc-500 sm:text-2xl">
            Coming Soon
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id={`muse-day-${day.number}`}
      className="border-t border-white/[0.06] py-16 sm:py-24"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <div className="space-y-3 lg:sticky lg:top-28">
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest">
              <span className="font-bold text-indigo-400">{label}</span>
              <span className="text-zinc-700">·</span>
              <span className="text-zinc-500">{day.type}</span>
            </div>
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
              {day.title}
            </h2>
          </div>
        </div>

        <div className="space-y-8 lg:col-span-8">
          {day.hook && (
            <p className="max-w-3xl text-xl font-light leading-relaxed text-zinc-300 sm:text-2xl">
              {day.hook}
            </p>
          )}

          {day.shortDescription && (
            <p className="max-w-3xl text-base font-light leading-relaxed text-zinc-400 sm:text-lg">
              {day.shortDescription}
            </p>
          )}

          {day.prompt && <CopyPrompt prompt={day.prompt} />}

          {day.promptTodo && (
            <div className="rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.02] p-4 font-mono text-xs leading-relaxed text-zinc-500 sm:p-5">
              {day.promptTodo}
            </div>
          )}

          {day.workflowSteps && (
            <div className="space-y-4">
              <div className="font-mono text-xs uppercase tracking-widest text-indigo-400">
                Workflow
              </div>
              <div className="space-y-3">
                {day.workflowSteps.map((step, index) => (
                  <div
                    key={step}
                    className="grid grid-cols-[2.5rem_1fr] gap-4 rounded-xl border border-white/[0.06] bg-white/[0.025] p-4"
                  >
                    <div className="font-mono text-sm font-bold text-zinc-600">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {day.comparisonCriteria && (
            <div className="space-y-4">
              <div className="font-mono text-xs uppercase tracking-widest text-indigo-400">
                Comparison criteria
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {day.comparisonCriteria.map((criterion) => (
                  <div
                    key={criterion.label}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4"
                  >
                    <div className="text-sm font-medium text-zinc-200">
                      {criterion.label}
                    </div>
                    <div className="mt-2 font-mono text-xs text-zinc-600">
                      {criterion.result || 'Results pending'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {day.learnings && (
            <div className="space-y-4">
              <div className="font-mono text-xs uppercase tracking-widest text-indigo-400">
                What I learned
              </div>
              <div className="space-y-3">
                {day.learnings.map((learning) => (
                  <p
                    key={learning}
                    className="rounded-xl border-l-2 border-indigo-500 bg-white/[0.025] px-4 py-3 text-sm leading-relaxed text-zinc-300 sm:text-base"
                  >
                    {learning}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
