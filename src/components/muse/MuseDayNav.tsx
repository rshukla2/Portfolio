import React from 'react';
import { MUSE_DAYS } from '../../data/museData';

export const MuseDayNav: React.FC = () => {
  return (
    <section
      id="muse-series"
      className="border-y border-white/[0.06] px-5 py-5 sm:px-8"
      aria-label="Muse series day navigation"
    >
      <div className="mx-auto max-w-6xl">
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
          {MUSE_DAYS.map((day) => {
            const label = String(day.number).padStart(2, '0');
            const isReleased = day.status === 'released';

            if (!isReleased) {
              return (
                <div
                  key={day.number}
                  className="min-w-20 rounded-lg border border-white/[0.05] bg-white/[0.02] px-4 py-3 text-center opacity-55"
                >
                  <div className="font-mono text-sm text-zinc-500">{label}</div>
                  <div className="mt-1 whitespace-nowrap font-mono text-[9px] uppercase tracking-widest text-zinc-600">
                    Soon
                  </div>
                </div>
              );
            }

            return (
              <a
                key={day.number}
                href={`#muse-day-${day.number}`}
                className="min-w-20 rounded-lg border border-indigo-500/40 bg-indigo-500/[0.08] px-4 py-3 text-center transition-colors hover:bg-indigo-500/[0.14] focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
              >
                <div className="font-mono text-sm font-bold text-indigo-300">{label}</div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-widest text-zinc-400">
                  Live
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
