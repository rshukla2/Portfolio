import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  return (
    <footer id="main-footer" className="py-12 px-5 sm:px-8 border-t border-white/[0.06] bg-[#07080A]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="font-semibold text-sm text-white tracking-tight">
            {PERSONAL_INFO.name}
          </div>
          <div className="text-xs font-mono text-zinc-400">
            {PERSONAL_INFO.eyebrow}
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono text-zinc-400">
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="hover:text-white transition-colors"
          >
            Email
          </a>
        </div>

        <div className="text-xs font-mono text-zinc-400 text-center sm:text-right">
          Built with curiosity.
        </div>
      </div>
    </footer>
  );
};
