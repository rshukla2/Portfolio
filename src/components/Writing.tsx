import React from 'react';
import { ArrowUpRight, Linkedin } from 'lucide-react';
import { WRITING_ARTICLES, PERSONAL_INFO } from '../data/portfolioData';

export const Writing: React.FC = () => {
  return (
    <section id="writing" className="py-24 sm:py-36 px-5 sm:px-8 max-w-6xl mx-auto border-t border-white/[0.06]">
      {/* Section Header */}
      <div className="max-w-3xl mb-16 sm:mb-20 space-y-4">
        <div className="font-mono text-xs text-indigo-400 tracking-widest uppercase">
          WRITING & IDEAS
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
          What I’m learning while I build.
        </h2>
        <p className="text-base sm:text-xl text-zinc-400 font-light leading-relaxed">
          Field notes on applied AI agents, software orchestration, vibe coding, and developer leverage.
        </p>
      </div>

      {/* 3-4 Curated Essays */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {WRITING_ARTICLES.map((article) => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 sm:p-8 rounded-2xl bg-[#0D0F14] border border-white/[0.08] hover:border-indigo-500/50 hover:bg-[#12141C] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-3">
                <span className="text-indigo-400 font-medium uppercase tracking-wider">{article.tag}</span>
                <span>{article.readTime}</span>
              </div>

              <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-indigo-200 transition-colors leading-snug mb-3 flex items-start justify-between gap-2">
                <span>{article.title}</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
              </h3>

              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                {article.summary}
              </p>
            </div>

            <div className="pt-5 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>{article.publishedDate}</span>
              <span className="text-indigo-400 group-hover:underline">Read on LinkedIn →</span>
            </div>
          </a>
        ))}
      </div>

      {/* Follow on LinkedIn CTA */}
      <div className="flex justify-center">
        <a
          href={PERSONAL_INFO.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-zinc-300 hover:text-white transition-colors"
        >
          <Linkedin className="w-4 h-4 text-indigo-400" />
          <span>Follow along on LinkedIn</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
};
