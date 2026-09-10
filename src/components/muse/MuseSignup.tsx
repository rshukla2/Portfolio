import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { MUSE_CONFIG } from '../../data/museData';

interface MuseSignupProps {
  compact?: boolean;
}

export const MuseSignup: React.FC<MuseSignupProps> = ({ compact = false }) => {
  return (
    <form
      action={MUSE_CONFIG.signupFormAction}
      method="POST"
      className={`rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:p-6 ${
        compact ? '' : 'lg:mt-8'
      }`}
    >
      <input type="hidden" name="_subject" value="New 10 Days of Muse signup" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="source" value="10 Days of Muse page" />

      <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-indigo-500/30 bg-indigo-500/[0.10] text-indigo-300">
        <Mail className="h-4 w-4" />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold leading-snug text-white sm:text-2xl">
          Get all 10 days in your inbox.
        </h2>
        <p className="text-sm leading-relaxed text-zinc-400">
          I'll send the remaining prompts, workflow notes, and practical takeaways from Days 2-10 before I post them on Instagram.
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
        <label className="sr-only" htmlFor="muse-email">
          Email address
        </label>
        <input
          id="muse-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="min-h-11 flex-1 rounded-lg border border-white/[0.08] bg-black/25 px-4 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-indigo-400/70 focus:ring-2 focus:ring-indigo-400/30"
        />
        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-white/60"
        >
          <span>Join the list</span>
          <ArrowRight className="h-4 w-4 text-zinc-900" />
        </button>
      </div>

      <p className="mt-3 font-mono text-[11px] leading-relaxed text-zinc-600">
        You can unsubscribe anytime.
      </p>
    </form>
  );
};
