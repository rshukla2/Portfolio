import React, { useState } from 'react';
import { Bot, CheckCircle2, Sparkles } from 'lucide-react';

interface PresetPrompt {
  id: string;
  label: string;
  command: string;
  actions: { label: string; detail: string; service: string }[];
  resultSummary: string;
}

const PRESETS: PresetPrompt[] = [
  {
    id: 'deep-work',
    label: 'Focus Block & Email Brief',
    command: 'Summarize anything urgent from yesterday and block 2 hours this afternoon for deep work.',
    actions: [
      { label: 'Scanned 38 Gmail threads', detail: '2 high-priority partner replies flagged', service: 'Gmail API' },
      { label: 'Parsed Fireflies meeting transcript', detail: '3 engineering action items extracted', service: 'Fireflies AI' },
      { label: 'Inspected Google Calendar availability', detail: 'Detected 2:00 PM – 4:00 PM gap', service: 'Google Calendar' },
      { label: 'Created focus block', detail: 'Event "Deep Work: Architecture Spec" placed', service: 'Google Calendar' },
    ],
    resultSummary: 'Done. Synthesized 2 critical threads, logged 3 meeting deliverables to your Notion task list, and secured 2:00 PM – 4:00 PM on your calendar.',
  },
  {
    id: 'meeting-prep',
    label: 'Client Meeting Preparation',
    command: 'Prepare a 1-page briefing doc for my 10 AM call with RedMane stakeholders.',
    actions: [
      { label: 'Searched Google Drive for previous specs', detail: 'Matched 3 relevant architecture docs', service: 'Google Drive' },
      { label: 'Aggregated recent Jira ticket statuses', detail: '9 tickets in progress, 0 blockers', service: 'Jira API' },
      { label: 'Generated executive briefing in Docs', detail: 'Created "Stakeholder Brief - Aug 2026.docx"', service: 'Google Docs API' },
    ],
    resultSummary: 'Briefing document created in Google Docs with summarized status, open architecture points, and past decision logs.',
  },
  {
    id: 'weekly-sync',
    label: 'Weekly Content Sync',
    command: 'Find our top 3 performing AI tutorials this month and generate outline drafts for next week.',
    actions: [
      { label: 'Queried analytics & engagement metrics', detail: 'Vibe-coding tutorial led with 94% retention', service: 'Analytics API' },
      { label: 'Dispatched scriptwriting agent', detail: 'Generated 3 follow-up script frameworks', service: 'LLM Agent' },
      { label: 'Pushed draft queue to Notion', detail: 'Updated content board with review status', service: 'Notion API' },
    ],
    resultSummary: 'Top tutorials identified. Draft outlines generated and synced to your review pipeline.',
  },
];

export const PersonalAssistantVisualizer: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<PresetPrompt>(PRESETS[0]);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionStep, setExecutionStep] = useState<number>(4);

  const triggerExecution = (preset: PresetPrompt) => {
    setSelectedPreset(preset);
    setIsExecuting(true);
    setExecutionStep(0);

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setExecutionStep(current);
      if (current >= preset.actions.length) {
        clearInterval(interval);
        setIsExecuting(false);
      }
    }, 700);
  };

  return (
    <div
      id="personal-assistant-visualizer"
      className="w-full bg-[#0D0F14] border border-white/[0.08] rounded-xl p-5 md:p-7 text-left shadow-2xl relative overflow-hidden"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-indigo-400" />
          <span className="font-mono text-xs text-zinc-300 font-medium tracking-wide uppercase">
            Conversational Autonomous Hub
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>7 APIs Connected</span>
        </div>
      </div>

      {/* Preset Prompts Switcher */}
      <div className="flex flex-wrap gap-2 mb-4">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => triggerExecution(p)}
            className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer ${
              selectedPreset.id === p.id
                ? 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/50'
                : 'bg-white/[0.03] text-zinc-400 hover:text-white border border-white/[0.05]'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Interactive Command Box */}
      <div className="bg-[#08090C] border border-white/[0.08] rounded-xl p-4 sm:p-5 space-y-4">
        {/* User Prompt */}
        <div className="flex items-start gap-3 bg-white/[0.02] border border-white/[0.04] p-3.5 rounded-lg">
          <div className="w-7 h-7 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center font-mono text-xs font-bold shrink-0">
            R
          </div>
          <div className="flex-1">
            <div className="text-[11px] font-mono text-zinc-500 mb-0.5">Rishi Shukla</div>
            <div className="text-sm text-zinc-100 font-medium leading-relaxed">
              “{selectedPreset.command}”
            </div>
          </div>
        </div>

        {/* Action Pipeline Steps */}
        <div className="space-y-2 pt-2">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>AUTOMATED ACTIONS UNDERNEATH</span>
            {isExecuting && <span className="text-indigo-400 animate-pulse">Executing tools...</span>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {selectedPreset.actions.map((act, idx) => {
              const isDone = idx < executionStep;
              const isCurrent = idx === executionStep && isExecuting;

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border transition-all ${
                    isDone
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-zinc-200'
                      : isCurrent
                      ? 'bg-indigo-950/40 border-indigo-500/50 text-white'
                      : 'bg-white/[0.01] border-white/[0.03] text-zinc-600 opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="text-indigo-400 font-medium">{act.service}</span>
                    {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <div className="text-xs font-semibold">{act.label}</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">{act.detail}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Final Synthesized Output */}
        <div className="p-3.5 rounded-lg bg-indigo-950/30 border border-indigo-500/20 flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <div className="text-xs text-indigo-100 leading-relaxed">
            {selectedPreset.resultSummary}
          </div>
        </div>
      </div>
    </div>
  );
};
