import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PROJECTS } from '../../data/portfolioData';

const FEATURED_PROJECT_IDS = [
  'ai-code-manager',
  'personal-ai-os',
  'ai-content-creation',
];

export const MusePortfolioBridge: React.FC = () => {
  const projects = FEATURED_PROJECT_IDS.map((id) => PROJECTS.find((project) => project.id === id)).filter(Boolean);

  return (
    <section className="border-t border-white/[0.06] px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl space-y-4">
          <div className="font-mono text-xs uppercase tracking-widest text-indigo-400">
            More from me
          </div>
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-5xl">
            The Muse series fits into a larger body of AI systems work.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {projects.map((project) => project && (
            <a
              key={project.id}
              href={`${import.meta.env.BASE_URL}#project-${project.id}`}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5 transition-colors hover:border-indigo-500/35 hover:bg-white/[0.045] focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
            >
              <div className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                {project.category}
              </div>
              <h3 className="mt-4 text-lg font-semibold leading-snug text-white">
                {project.headline}
              </h3>
              <div className="mt-5 inline-flex items-center gap-2 text-sm text-indigo-300">
                <span>View project</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </a>
          ))}
        </div>

        <a
          href={`${import.meta.env.BASE_URL}#work`}
          className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
        >
          <span>Explore all my work</span>
          <ArrowRight className="h-4 w-4 text-indigo-400" />
        </a>
      </div>
    </section>
  );
};
