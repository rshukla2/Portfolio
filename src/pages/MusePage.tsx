import React, { useEffect } from 'react';
import { MUSE_DAYS } from '../data/museData';
import { MuseDaySection } from '../components/muse/MuseDaySection';
import { MuseFramework } from '../components/muse/MuseFramework';
import { MuseHero } from '../components/muse/MuseHero';
import { MuseIntro } from '../components/muse/MuseIntro';
import { MusePortfolioBridge } from '../components/muse/MusePortfolioBridge';

export const MusePage: React.FC = () => {
  const releasedDays = MUSE_DAYS.filter((day) => day.status === 'released');

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const previousDescription = description?.content;
    const previousCanonical = canonical?.href;

    document.title = '10 Days of Muse | Rishi Shukla';
    if (description) {
      description.content = "Practical prompts, workflows, comparisons, and experiments from Rishi Shukla's 10-day Meta Muse series.";
    }
    if (canonical) {
      canonical.href = `${window.location.origin}${import.meta.env.BASE_URL}muse`;
    }

    return () => {
      document.title = previousTitle;
      if (description && previousDescription) {
        description.content = previousDescription;
      }
      if (canonical && previousCanonical) {
        canonical.href = previousCanonical;
      }
    };
  }, []);

  return (
    <>
      {/* Archive notice banner */}
      <div className="px-5 pt-24 sm:px-8">
        <div className="max-w-6xl mx-auto rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 sm:p-5">
          <p className="text-sm font-semibold text-amber-200">This series has ended.</p>
          <p className="text-sm text-zinc-300 mt-1">
            The 10 Days of Muse series wrapped up after Day 1 and is no longer being updated. The first experiment is kept here for reference. For my current work, see the{' '}
            <a
              href={`${import.meta.env.BASE_URL}`}
              className="text-amber-300 hover:underline"
            >
              main portfolio
            </a>
            .
          </p>
        </div>
      </div>

      <MuseHero />

      <section className="px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="mx-auto max-w-6xl">
          {releasedDays.map((day) => (
            <MuseDaySection key={day.number} day={day} />
          ))}
        </div>
      </section>

      <MuseFramework />
      <MuseIntro />
      <MusePortfolioBridge />
    </>
  );
};
