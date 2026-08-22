import React from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';
import { EXPERIENCES, EDUCATION } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-36 px-5 sm:px-8 max-w-6xl mx-auto border-t border-white/[0.06]">
      <div className="max-w-3xl mb-16 sm:mb-20 space-y-4">
        <div className="font-mono text-xs text-indigo-400 tracking-widest uppercase">
          BACKGROUND & STORY
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
          Builder. Engineer. Educator.
        </h2>
        <p className="text-base sm:text-xl text-zinc-300 font-light leading-relaxed">
          I am a software engineer, entrepreneur, and AI educator with a Computer Science degree and an MBA in Technological Entrepreneurship from Illinois Institute of Technology. I am fascinated by the exact point where technology stops being theoretical and starts solving a real human problem.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
        <div className="lg:col-span-8 space-y-10">
          <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-2">
            <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
            <span>Career Milestones & Roles</span>
          </div>

          <div className="relative pl-6 border-l border-white/[0.08] space-y-10">
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="relative group">
                <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#0D0F14] border-2 border-indigo-500 group-hover:bg-indigo-400 transition-colors" />

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <span className="font-mono text-xs text-zinc-400 px-2.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.05]">
                      {exp.period}
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm font-mono text-indigo-400 font-medium">
                    {exp.organization}
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed pt-1">
                    {exp.summary}
                  </p>

                  {exp.skills && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.03] text-zinc-400 border border-white/[0.04]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-2">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
            <span>Academic Background</span>
          </div>

          <div className="space-y-6">
            {EDUCATION.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0D0F14] border border-white/[0.08] space-y-3"
              >
                <div className="text-base font-semibold text-white">
                  {edu.institution}
                </div>

                <ul className="space-y-1.5">
                  {edu.degrees.map((deg, i) => (
                    <li key={i} className="text-xs font-mono text-indigo-300 leading-snug">
                      • {deg}
                    </li>
                  ))}
                </ul>

                <p className="text-xs text-zinc-400 pt-2 border-t border-white/[0.06] leading-relaxed">
                  {edu.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
