import React from 'react';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { TEACHING_PILLARS } from '../data/portfolioData';

const TOPICS = [
  'Generative AI Fundamentals',
  'Autonomous Agent Systems',
  'Vibe Coding & AI-Assisted Dev',
  'Workflow Automation (Make & n8n)',
  'Claude & ChatGPT Workflows',
  'Gemini & Multimodal APIs',
  'Perplexity Deep Research',
  'Context Windows & Clear Instructions',
  'Personal Productivity Bots',
  'AI for Business Workflows',
];

export const Teaching: React.FC = () => {
  return (
    <section id="teaching" className="py-24 sm:py-36 px-5 sm:px-8 max-w-6xl mx-auto border-t border-white/[0.06]">
      <div className="max-w-3xl mb-16 sm:mb-20 space-y-4">
        <div className="font-mono text-xs text-indigo-400 tracking-widest uppercase">
          TEACHING PHILOSOPHY
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
          I teach people how to build useful things with AI.
        </h2>
        <p className="text-base sm:text-xl text-zinc-300 font-light leading-relaxed">
          Specific tools change quickly, so I focus on skills that last: choosing a good use case, breaking it into steps, building a working version, and checking the result.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {TEACHING_PILLARS.map((pillar) => (
          <div
            key={pillar.title}
            className="p-6 sm:p-8 rounded-2xl bg-[#0D0F14] border border-white/[0.08] hover:border-indigo-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="font-mono text-xs text-indigo-400 font-bold uppercase tracking-wider mb-2">
                Pillar
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{pillar.title}</h3>
              <div className="text-xs font-mono text-zinc-400 mb-6">{pillar.subtitle}</div>

              <ul className="space-y-3 mb-6">
                {pillar.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                    <span className="text-indigo-400 font-mono mt-0.5">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-white/[0.06] text-xs text-zinc-400 italic">
              {pillar.outcome}
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 sm:p-12 rounded-3xl bg-[#0D0F14] border border-white/[0.08] relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-[11px] font-mono text-indigo-300">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>AI Educator · KIDLIN School of AI</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Practical AI for Builders, Professionals & Non-Technical Learners
            </h3>

            <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
              I teach students, working professionals, and founders. We start with a real task and build something they can use, even if they have little coding experience.
            </p>

            <div className="pt-2">
              <a
                href="https://kidlinschool.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold tracking-wide transition-all shadow-lg shadow-indigo-600/20 cursor-pointer"
              >
                <span>Learn with me at KIDLIN</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              Core Curriculum Themes
            </div>
            <div className="flex flex-wrap gap-2">
              {TOPICS.map((topic) => (
                <span
                  key={topic}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-zinc-300"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
