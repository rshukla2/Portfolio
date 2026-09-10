import React, { useEffect } from 'react';
import { MUSE_CONFIG, MUSE_DAYS } from '../data/museData';
import { LatestMuseExperiment } from '../components/muse/LatestMuseExperiment';
import { MuseDayNav } from '../components/muse/MuseDayNav';
import { MuseDaySection } from '../components/muse/MuseDaySection';
import { MuseFramework } from '../components/muse/MuseFramework';
import { MuseHero } from '../components/muse/MuseHero';
import { MuseIntro } from '../components/muse/MuseIntro';
import { MusePortfolioBridge } from '../components/muse/MusePortfolioBridge';

export const MusePage: React.FC = () => {
  const releasedDays = MUSE_DAYS.filter((day) => day.status === 'released');
  const latestDay =
    releasedDays.find((day) => day.number === MUSE_CONFIG.currentReleasedDay) ||
    releasedDays[releasedDays.length - 1];
  const shouldShowLatestExperiment = releasedDays.length > 1;

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
      <MuseHero />
      <MuseDayNav />
      {shouldShowLatestExperiment && latestDay && <LatestMuseExperiment day={latestDay} />}

      <section className="px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="mx-auto max-w-6xl">
          {MUSE_DAYS.map((day) => (
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
