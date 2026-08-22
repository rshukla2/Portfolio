import React, { useState } from 'react';
import {
  Mail,
  Copy,
  Check,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Github, Linkedin } from './icons/BrandIcons';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-28 sm:py-44 px-5 sm:px-8 max-w-6xl mx-auto border-t border-white/[0.06]">
      <div className="max-w-4xl space-y-10 sm:space-y-12">
        <div className="font-mono text-xs text-indigo-400 tracking-widest uppercase">
          INITIATE CONVERSATION
        </div>

        <div className="space-y-2 sm:space-y-3">
          <h2 className="text-3xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08]">
            Have an idea?
          </h2>
          <h2 className="text-3xl sm:text-6xl md:text-7xl font-bold tracking-tight text-zinc-400 leading-[1.08]">
            Let’s see what AI can do with it.
          </h2>
        </div>

        <p className="text-base sm:text-2xl text-zinc-300 font-light leading-relaxed max-w-3xl">
          Whether you want to learn practical AI, rethink a manual workflow, build a bespoke agent prototype, or simply exchange ideas — I’m always interested in conversations with curious people.
        </p>

        {/* Primary Contact Actions */}
        <div className="pt-6 flex flex-wrap items-center gap-4 sm:gap-6">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            id="contact-email-btn"
            className="px-7 py-4 rounded-xl bg-white text-zinc-950 font-medium text-sm hover:bg-zinc-100 transition-all flex items-center gap-2.5 shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95 cursor-pointer"
          >
            <Mail className="w-4 h-4 text-zinc-900" />
            <span>Send Email</span>
          </a>

          <button
            type="button"
            id="contact-copy-email-btn"
            onClick={copyEmail}
            className="px-5 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-sm font-mono text-zinc-300 transition-all flex items-center gap-2 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">{PERSONAL_INFO.email} copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-zinc-400" />
                <span>Copy Email</span>
              </>
            )}
          </button>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            id="contact-linkedin-link"
            className="px-5 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-sm font-mono text-zinc-300 transition-all flex items-center gap-2"
          >
            <Linkedin className="w-4 h-4 text-indigo-400" />
            <span>Connect on LinkedIn</span>
          </a>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            id="contact-github-link"
            className="px-5 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-sm font-mono text-zinc-300 transition-all flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            <span>View GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
};
