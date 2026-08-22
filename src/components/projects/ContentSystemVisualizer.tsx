import React, { useState } from 'react';
import { Layers } from 'lucide-react';

const STAGES = [
  {
    id: 'research',
    title: 'Research Agent',
    tool: 'Perplexity + Custom Scraper',
    detail: 'Monitors community questions, developer pain points, and breaking agent architecture papers.',
    output: 'Raw Signal Matrix',
  },
  {
    id: 'topics',
    title: 'Topic Discovery',
    tool: 'Claude 3.7 / GPT-4o Filter',
    detail: 'Groups source material into useful themes for AI coding, agents, and workflow automation.',
    output: 'Validated Topic Angles',
  },
  {
    id: 'script',
    title: 'Scriptwriting Node',
    tool: 'Structured Prompt Harness',
    detail: 'Generates 3 hook variations, visual code walkthrough cues, and concise takeaway frameworks.',
    output: 'Draft Script & Visual Cues',
  },
  {
    id: 'review',
    title: 'Human Review',
    tool: 'Rishi Shukla (100% Taste & Verification)',
    detail: 'Polishes code examples, ensures authentic voice, injects real project nuance, and tests code live.',
    output: 'Final Approved Asset',
  },
  {
    id: 'publish',
    title: 'Multi-Channel Dispatch',
    tool: 'Make.com & n8n Webhooks',
    detail: 'Distributes formatted markdown to LinkedIn, YouTube community briefs, and student repository resources.',
    output: 'Scheduled & Published ✓',
  },
];

export const ContentSystemVisualizer: React.FC = () => {
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(2);

  const stage = STAGES[selectedStageIndex];

  return (
    <div
      id="content-automation-visualizer"
      className="w-full bg-[#0D0F14] border border-white/[0.08] rounded-xl p-5 md:p-7 text-left shadow-2xl relative overflow-hidden"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span className="font-mono text-xs text-zinc-300 font-medium tracking-wide uppercase">
            Content Workflow · Make.com + n8n
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
          <span className="text-emerald-400">Automated Pipeline</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
        {STAGES.map((st, idx) => {
          const isSelected = idx === selectedStageIndex;

          return (
            <button
              key={st.id}
              type="button"
              onClick={() => setSelectedStageIndex(idx)}
              className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-indigo-950/50 border-indigo-500 text-white ring-1 ring-indigo-500/50'
                  : 'bg-white/[0.02] border-white/[0.05] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-1 text-zinc-500">
                <span>0{idx + 1}</span>
                {idx === 3 ? (
                  <span className="text-amber-400 font-bold">HUMAN</span>
                ) : (
                  <span className="text-indigo-400">AUTO</span>
                )}
              </div>
              <div className="text-xs font-semibold tracking-tight text-white mb-0.5 truncate">
                {st.title}
              </div>
              <div className="text-[10px] text-zinc-400 font-mono truncate">{st.tool}</div>
            </button>
          );
        })}
      </div>

      <div className="bg-[#08090C] border border-white/[0.08] rounded-xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">
              Stage 0{selectedStageIndex + 1}
            </span>
            <span className="text-sm font-semibold text-white">{stage.title}</span>
          </div>
          <span className="text-xs font-mono text-zinc-400">Engine: {stage.tool}</span>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed mb-4">{stage.detail}</p>

        <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2 text-zinc-400">
            <span>Stage Output:</span>
            <strong className="text-emerald-400">{stage.output}</strong>
          </div>
          <span className="text-zinc-500">State: Active & Synchronized</span>
        </div>
      </div>
    </div>
  );
};
