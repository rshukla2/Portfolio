import React from 'react';
import { ExternalLink } from 'lucide-react';
import { PROJECTS, PERSONAL_INFO } from '../data/portfolioData';
import { Github } from './icons/BrandIcons';
import { AiCodeManagerVisualizer } from './projects/AiCodeManagerVisualizer';
import { PersonalAssistantVisualizer } from './projects/PersonalAssistantVisualizer';
import { ContentSystemVisualizer } from './projects/ContentSystemVisualizer';
import { InboxManagerVisualizer } from './projects/InboxManagerVisualizer';
import { NewsAgentVisualizer } from './projects/NewsAgentVisualizer';
import { ImpulseVisualizer } from './projects/ImpulseVisualizer';
import { SpinWheelVisualizer } from './projects/SpinWheelVisualizer';

export const FeaturedProjects: React.FC = () => {
  return (
    <section id="work" className="py-24 sm:py-36 px-5 sm:px-8 max-w-6xl mx-auto border-t border-white/[0.06]">
      {/* Section Header */}
      <div className="max-w-3xl mb-16 sm:mb-24 space-y-4">
        <div className="font-mono text-xs text-indigo-400 tracking-widest uppercase">
          SELECTED EXPERIMENTS
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
          Things I’ve built because I got curious.
        </h2>
        <p className="text-base sm:text-xl text-zinc-400 font-light leading-relaxed">
          Some started as problems. Some started as random ideas. Most became working software or automations surprisingly quickly.
        </p>
      </div>

      {/* Large Alternating Project Story Blocks */}
      <div className="space-y-28 sm:space-y-36">
        {PROJECTS.map((project) => {
          return (
            <article
              key={project.id}
              id={`project-${project.id}`}
              className="space-y-8 pt-6"
            >
              {/* Project Top Narrative Header */}
              <div className="max-w-3xl space-y-3">
                <div className="flex items-center gap-3 font-mono text-xs text-zinc-500 uppercase tracking-wider">
                  <span className="text-indigo-400 font-bold">{project.number}</span>
                  <span>·</span>
                  <span>{project.category}</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-[1.15] sm:leading-snug text-balance">
                  {project.headline}
                </h3>
              </div>

              {/* Story Narrative & Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-4 text-sm sm:text-base text-zinc-300 font-light leading-[1.58] sm:leading-relaxed tracking-[-0.008em] sm:tracking-normal [text-wrap:pretty] sm:[text-wrap:wrap] whitespace-pre-line">
                  {project.story}

                  {project.lesson && (
                    <div className="p-4 rounded-xl bg-white/[0.02] border-l-2 border-indigo-500 text-xs sm:text-sm text-zinc-200 font-normal mt-4">
                      <strong className="text-indigo-300 block mb-0.5 font-mono text-[11px] uppercase tracking-wider">
                        Core Takeaway
                      </strong>
                      {project.lesson}
                    </div>
                  )}
                </div>

                {/* Tags & Action Links */}
                <div className="lg:col-span-4 space-y-5 lg:pl-4">
                  <div>
                    <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
                      Architecture & Stack
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-xs font-mono text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white transition-all flex items-center gap-2"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>{project.primaryCtaText || 'View Live Demo'}</span>
                      </a>
                    )}

                    <a
                      href={project.githubUrl || PERSONAL_INFO.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] text-xs font-medium text-white transition-all flex items-center gap-2"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>{project.secondaryCtaText || 'View GitHub'}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Bespoke Interactive Visualizer for each project */}
              <div className="mt-8">
                {project.id === 'ai-code-manager' && <AiCodeManagerVisualizer />}
                {project.id === 'personal-ai-os' && <PersonalAssistantVisualizer />}
                {project.id === 'ai-content-creation' && <ContentSystemVisualizer />}
                {project.id === 'ai-inbox-manager' && <InboxManagerVisualizer />}
                {project.id === 'ai-news-agent' && <NewsAgentVisualizer />}
                {project.id === 'impulse-app' && <ImpulseVisualizer />}
                {project.id === 'spin-the-wheel' && <SpinWheelVisualizer />}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
