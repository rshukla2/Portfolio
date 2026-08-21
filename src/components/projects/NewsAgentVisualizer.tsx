import React, { useState } from 'react';
import { Clock, CheckCircle2, Search, Filter, Sparkles, Send, RefreshCw } from 'lucide-react';

const TIMELINE_EVENTS = [
  { time: '05:00:00 AM', label: 'Cron Trigger & Scraping', detail: 'Crawling 24 RSS feeds & X developer lists', icon: Search },
  { time: '05:01:15 AM', label: 'Hype Filter Agent', detail: 'Discarded 142 promotional & redundant clickbait articles', icon: Filter },
  { time: '05:02:40 AM', label: 'Importance Scoring', detail: 'Weighted by real architectural impact & benchmark signals', icon: Sparkles },
  { time: '05:03:50 AM', label: 'Top 5 Synthesis', detail: 'Generated key takeaways + "Why It Matters" engineering notes', icon: CheckCircle2 },
  { time: '05:04:30 AM', label: 'Briefing Dispatched', detail: 'Delivered via Gmail API to personal inbox ✓', icon: Send },
];

const CURATED_EMAIL_BRIEFING = [
  {
    title: 'Autonomous Coding Agents Move from Single Prompt to DAG Task Orchestration',
    takeaway: 'Multi-agent frameworks outperform monolithic LLM calls by 3.4x on complex refactoring tasks.',
    whyItMatters: 'Shifts engineering from manual coding to specification architecture and evaluation harnesses.',
  },
  {
    title: 'Open Source Small Language Models (SLMs) Match GPT-4 on Targeted Tool Calling',
    takeaway: 'Fine-tuned 8B parameter models running locally achieve 98% JSON schema reliability.',
    whyItMatters: 'Drastically lowers latency and cloud costs for autonomous cron agent loops.',
  },
  {
    title: 'Context Caching & Long-Window Optimization Slashes Agent Run Costs by 70%',
    takeaway: 'Re-evaluating static codebase tokens is no longer a financial bottleneck.',
    whyItMatters: 'Makes persistent autonomous background maintenance economically viable.',
  },
];

export const NewsAgentVisualizer: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(4);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const runSimulation = () => {
    setIsSimulating(true);
    setActiveStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step < TIMELINE_EVENTS.length) {
        setActiveStep(step);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 900);
  };

  return (
    <div
      id="news-agent-visualizer"
      className="w-full bg-[#0D0F14] border border-white/[0.08] rounded-xl p-5 md:p-7 text-left shadow-2xl relative overflow-hidden"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-indigo-400" />
          <span className="font-mono text-xs text-zinc-300 font-medium tracking-wide uppercase">
            Autonomous 05:00 AM Cron Research Pipeline
          </span>
        </div>
        <button
          type="button"
          id="replay-agent-btn"
          onClick={runSimulation}
          disabled={isSimulating}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-zinc-300 border border-white/[0.08] transition-colors cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
          <span>{isSimulating ? 'Running Pipeline...' : 'Replay 5 AM Run'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Timeline Column */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
            Execution Timeline (Daily 05:00 AM)
          </div>

          <div className="relative pl-6 border-l border-white/[0.1] space-y-4">
            {TIMELINE_EVENTS.map((event, idx) => {
              const isPastOrCurrent = idx <= activeStep;
              const isCurrent = idx === activeStep;
              const Icon = event.icon;

              return (
                <div key={event.label} className="relative group">
                  {/* Dot */}
                  <div
                    className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                      isCurrent
                        ? 'bg-indigo-600 border-white ring-4 ring-indigo-500/20'
                        : isPastOrCurrent
                        ? 'bg-emerald-500 border-emerald-300'
                        : 'bg-[#12141A] border-white/20'
                    }`}
                  >
                    {isPastOrCurrent && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>

                  <div
                    className={`p-3 rounded-lg border transition-all ${
                      isCurrent
                        ? 'bg-indigo-950/40 border-indigo-500/40 text-white'
                        : isPastOrCurrent
                        ? 'bg-white/[0.03] border-white/[0.06] text-zinc-300'
                        : 'bg-transparent border-transparent text-zinc-600'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                      <span className={isCurrent ? 'text-indigo-400 font-semibold' : 'text-zinc-400'}>
                        {event.time}
                      </span>
                      <Icon className="w-3.5 h-3.5 text-zinc-400" />
                    </div>
                    <div className="text-xs font-medium">{event.label}</div>
                    <div className="text-[11px] text-zinc-400 mt-0.5 leading-snug">{event.detail}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Generated Email Preview Box */}
        <div className="lg:col-span-7">
          <div className="bg-[#08090C] border border-white/[0.08] rounded-xl p-4 sm:p-5">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono text-[10px] font-bold">
                  AI
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Daily Applied AI Executive Briefing</div>
                  <div className="text-[10px] font-mono text-zinc-500">From: news-agent@automated.rishi · 5:04 AM</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono">
                Delivered ✓
              </span>
            </div>

            <div className="space-y-3 max-h-[290px] overflow-y-auto pr-1">
              {CURATED_EMAIL_BRIEFING.map((item, i) => (
                <div key={i} className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] space-y-1.5">
                  <div className="text-xs font-semibold text-zinc-100 flex items-start gap-1.5">
                    <span className="text-indigo-400 font-mono">0{i + 1}.</span>
                    <span>{item.title}</span>
                  </div>
                  <div className="text-[11px] text-zinc-300 pl-4">
                    <strong className="text-zinc-400">Takeaway:</strong> {item.takeaway}
                  </div>
                  <div className="text-[11px] text-zinc-400 pl-4">
                    <strong className="text-indigo-400">Why It Matters:</strong> {item.whyItMatters}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>Stack: CrewAI + OpenAI + Gmail API</span>
              <span className="text-emerald-400">Time Saved: ~30 min / morning</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
