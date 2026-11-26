import React from 'react';
import { ExternalLink, Package, LayoutDashboard, Workflow } from 'lucide-react';

const AppleLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
  </svg>
);
import { PROJECTS, PROJECT_TIERS } from '../data/portfolioData';
import { Github } from './icons/BrandIcons';
import { ProjectVisualPlaceholder } from './projects/ProjectVisualPlaceholder';
import { EnterpriseDeliveryVisualizer } from './projects/EnterpriseDeliveryVisualizer';
import { AiCodeManagerVisualizer } from './projects/AiCodeManagerVisualizer';
import { PersonalAssistantVisualizer } from './projects/PersonalAssistantVisualizer';
import { ContentSystemVisualizer } from './projects/ContentSystemVisualizer';
import { InboxManagerVisualizer } from './projects/InboxManagerVisualizer';
import { NewsAgentVisualizer } from './projects/NewsAgentVisualizer';
import { PartyGamesVisualizer } from './projects/PartyGamesVisualizer';
import { ImpulseVisualizer } from './projects/ImpulseVisualizer';
import { SpinWheelVisualizer } from './projects/SpinWheelVisualizer';
import { AiOsVisualizer } from './projects/AiOsVisualizer';
import { TaskTrackerVisualizer } from './projects/TaskTrackerVisualizer';
import { KidlinLumiVisualizer } from './projects/KidlinLumiVisualizer';
import { N8nAutomationVisualizer } from './projects/N8nAutomationVisualizer';
import { CalorifyVisualizer } from './projects/CalorifyVisualizer';

// Map project.id to visualizer components
const VISUALIZER_MAP: Record<string, React.FC> = {
  'enterprise-delivery': EnterpriseDeliveryVisualizer,
  'ai-code-manager': AiCodeManagerVisualizer,
  'chief-assistant': PersonalAssistantVisualizer,
  'ai-content-creation': ContentSystemVisualizer,
  'ai-inbox-manager': InboxManagerVisualizer,
  'ai-news-agent': NewsAgentVisualizer,
  'party-games': PartyGamesVisualizer,
  'impulse-app': ImpulseVisualizer,
  'spin-the-wheel': SpinWheelVisualizer,
  'ai-os': AiOsVisualizer,
  'task-tracker': TaskTrackerVisualizer,
  'kidlin-app': KidlinLumiVisualizer,
  'n8n-automation': N8nAutomationVisualizer,
  calorify: CalorifyVisualizer,
};

// Status badge class map - full Tailwind classes per status tone
const STATUS_BADGE_CLASSES: Record<string, { bg: string; text: string; border: string }> = {
  live: { bg: 'bg-emerald-500/10', text: 'text-emerald-300', border: 'border-emerald-500/20' },
  active: { bg: 'bg-sky-500/10', text: 'text-sky-300', border: 'border-sky-500/20' },
  pilot: { bg: 'bg-amber-500/10', text: 'text-amber-300', border: 'border-amber-500/20' },
  testing: { bg: 'bg-violet-500/10', text: 'text-violet-300', border: 'border-violet-500/20' },
  archived: { bg: 'bg-zinc-500/10', text: 'text-zinc-300', border: 'border-zinc-500/20' },
};


export const FeaturedProjects: React.FC = () => {

  const getIconForLink = (iconName?: string) => {
    switch (iconName) {
      case 'github':
        return <Github className="w-3.5 h-3.5" />;
      case 'appstore':
        return <AppleLogo className="w-3.5 h-3.5" />;
      case 'npm':
        return <Package className="w-3.5 h-3.5" />;
      case 'external':
        return <ExternalLink className="w-3.5 h-3.5" />;
      case 'architecture':
        return <LayoutDashboard className="w-3.5 h-3.5" />;
      default:
        return <Workflow className="w-3.5 h-3.5" />;
    }
  };

  const renderStatusBadge = (project: typeof PROJECTS[0]) => {
    const badgeClasses = STATUS_BADGE_CLASSES[project.statusTone] || STATUS_BADGE_CLASSES.archived;

    return (
      <span
        className={`inline-flex whitespace-nowrap px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider border ${badgeClasses.bg} ${badgeClasses.text} ${badgeClasses.border}`}
      >
        {project.status}
      </span>
    );
  };

  const renderProjectLinks = (links: typeof PROJECTS[0]['links']) => {
    return (
      <div className="pt-2 flex flex-wrap items-center gap-3">
        {links.map((link) => {
          const isAnchor = link.href.startsWith('#');
          return (
            <a
              key={link.href}
              href={link.href}
              target={isAnchor ? undefined : '_blank'}
              rel={isAnchor ? undefined : 'noopener noreferrer'}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
                link.kind === 'primary'
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                  : 'bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] text-white'
              }`}
              onClick={(e) => {
                if (isAnchor && link.href.startsWith('#visual-')) {
                  e.preventDefault();
                  const projectId = link.href.replace('#visual-', '');
                  document.getElementById(`visual-${projectId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              {getIconForLink(link.icon)}
              <span>{link.label}</span>
            </a>
          );
        })}
      </div>
    );
  };

  const renderVisualizer = (project: typeof PROJECTS[0]) => {
    const VisualizerComponent = VISUALIZER_MAP[project.id];
    const isPlaceholder = project.visual === 'placeholder';
    const visualContainerId = `visual-${project.id}`;

    // Every tier shows its visual (no collapse)
    return (
      <div id={visualContainerId} className="scroll-mt-24 mt-8">
        {!isPlaceholder && <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
          {project.visual === 'illustration' && (
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-indigo-300">Interactive illustration</span>
              <span className="w-1 h-1 rounded-full bg-indigo-400" />
            </div>
          )}
          {project.visual === 'live' && (
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-indigo-300">Live widget</span>
              <span className="w-1 h-1 rounded-full bg-indigo-400" />
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-zinc-500">
              {project.visual === 'illustration' ? 'Illustrative run using sample data. No real agents or services are called.' : 'This one actually works. Give it a spin.'}
            </span>
          </div>
        </div>}
        {isPlaceholder ? (
          <ProjectVisualPlaceholder projectId={project.id} projectName={project.name} />
        ) : (
          <VisualizerComponent />
        )}
      </div>
    );
  };

  // Group projects by tier
  const projectsByTier = PROJECT_TIERS.map((tier) => {
    const tierProjects = PROJECTS.filter((p) => p.tier === tier.tier);
    return { tier, projects: tierProjects };
  });

  return (
    <section id="work" className="py-24 sm:py-36 px-5 sm:px-8 max-w-6xl mx-auto border-t border-white/[0.06]">
      {/* Section Header */}
      <div className="max-w-3xl mb-16 sm:mb-24 space-y-4">
        <div className="font-mono text-xs text-indigo-400 tracking-widest uppercase">
          SELECTED WORK
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
          Things I've built because I got curious.
        </h2>
        <p className="text-base sm:text-xl text-zinc-400 font-light leading-relaxed">
          Some started as problems. Some started as random ideas. Most became working software or automations surprisingly quickly.
        </p>
      </div>

      {/* Project Index */}
      <div className="max-w-6xl mb-20 sm:mb-28">
        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-3">Project index</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {PROJECTS.map((project) => (
            <a
              key={project.id}
              href={`#project-${project.id}`}
              className="flex flex-col gap-1 px-3 py-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] hover:border-white/[0.08] transition-all cursor-pointer"
            >
              <span className="font-mono text-[10px] text-indigo-400">{project.number}</span>
              <span className="text-xs text-zinc-200 truncate">{project.name}</span>
              <span className="text-[10px] text-zinc-500 truncate">{project.status}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Projects by Tier */}
      {projectsByTier.map(({ tier, projects }, tierIndex) => {
        return (
          <div key={tier.tier} className="mt-36 sm:mt-48 first:mt-0">
            {/* Tier Header: reads as a new chapter, clearly above project headlines */}
            <div className="relative mb-16 sm:mb-24 pt-12 sm:pt-16">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-indigo-500/60 via-white/[0.08] to-transparent" aria-hidden="true" />
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-indigo-300">
                  <span className="text-indigo-400/70">Part {String(tierIndex + 1).padStart(2, '0')}</span>
                  <span className="h-1 w-1 rounded-full bg-indigo-400" aria-hidden="true" />
                  {tier.eyebrow}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  {projects.length} {projects.length === 1 ? 'project' : 'projects'}
                </span>
              </div>
              <h3 className="max-w-4xl text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
                {tier.title}
              </h3>
              <p className="mt-4 max-w-2xl text-base sm:text-lg text-zinc-400 font-light leading-relaxed">
                {tier.description}
              </p>
            </div>

            {/* Projects in this tier */}
            <div className="space-y-28 sm:space-y-36">
            {projects.map((project) => {
              const isFlagship = tier.tier === 'flagship';
              const headlineSize = 'text-2xl sm:text-4xl';
              const spacingClass = isFlagship ? 'space-y-8' : 'space-y-6';

              return (
                <article
                  key={project.id}
                  id={`project-${project.id}`}
                  className={`${spacingClass} scroll-mt-24`}
                >
                  {/* Project Top Narrative Header */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 font-mono text-xs text-zinc-500 uppercase tracking-wider">
                      <span className="text-indigo-400 font-bold">{project.number}</span>
                      <span>·</span>
                      <span>{project.category}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <h3 className="text-lg sm:text-xl font-semibold text-indigo-200 tracking-tight">
                        {project.name}
                      </h3>
                      {renderStatusBadge(project)}
                    </div>

                    {/* Same width as the story column, so every headline wraps at the same edge */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      <h4 className={`lg:col-span-8 ${headlineSize} font-bold tracking-tight text-white leading-[1.15] sm:leading-snug`}>
                        {project.headline}
                      </h4>
                    </div>
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

                      {/* Stats Strip */}
                      {project.stats && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                          {project.stats.map((stat) => (
                            <div key={stat.label} className="bg-white/[0.02] border border-white/[0.05] p-3 rounded-lg">
                              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{stat.label}</div>
                              <div className="text-sm font-semibold text-white mt-0.5">{stat.value}</div>
                            </div>
                          ))}
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

                      {renderProjectLinks(project.links)}
                    </div>
                  </div>

                  {/* Interactive Visualizer */}
                  {renderVisualizer(project)}
                </article>
              );
            })}
            </div>
          </div>
        );
      })}
    </section>
  );
};
