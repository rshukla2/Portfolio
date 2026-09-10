import React from 'react';

export const MuseIntro: React.FC = () => {
  return (
    <section className="border-t border-white/[0.06] px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="font-mono text-xs uppercase tracking-widest text-indigo-400">
            New to Muse?
          </div>
        </div>
        <div className="space-y-4 lg:col-span-8">
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-5xl">
            Think of this page as my working notebook.
          </h2>
          <p className="max-w-3xl text-base font-light leading-relaxed text-zinc-400 sm:text-xl">
            Muse is Meta's AI agent experience. I am using this series to test it on practical workflows, compare it with systems I have already built, and document what feels useful in the real world.
          </p>
        </div>
      </div>
    </section>
  );
};
