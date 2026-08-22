import React from 'react';
import { Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Github, Instagram, Linkedin } from './icons/BrandIcons';

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

        <nav aria-label="Social links" className="flex items-center gap-2 text-zinc-400">
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Rishi Shukla on LinkedIn"
            className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-2.5 transition-colors hover:border-white/[0.12] hover:bg-white/[0.07] hover:text-white"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Rishi Shukla on GitHub"
            className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-2.5 transition-colors hover:border-white/[0.12] hover:bg-white/[0.07] hover:text-white"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={PERSONAL_INFO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Rishi Shukla on Instagram"
            className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-2.5 transition-colors hover:border-white/[0.12] hover:bg-white/[0.07] hover:text-white"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            aria-label="Email Rishi Shukla"
            className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-2.5 transition-colors hover:border-white/[0.12] hover:bg-white/[0.07] hover:text-white"
          >
            <Mail className="h-4 w-4" />
          </a>
        </nav>

        <div className="text-xs font-mono text-zinc-400 text-center sm:text-right">
          Built with curiosity.
        </div>
      </div>
    </footer>
  );
};
