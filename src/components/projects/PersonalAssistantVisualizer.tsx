import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Sparkles, Hash, ShieldCheck } from 'lucide-react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface Scenario {
  id: string;
  tabLabel: string;
  category: string;
  userMessage: string;
  systemActions: {
    service: string;
    step: string;
    detail: string;
    approvalGate?: boolean;
  }[];
  assistantReply: string;
  payloadHighlight?: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'email-calendar',
    tabLabel: 'Email + Calendar',
    category: 'INBOX & SCHEDULING',
    userMessage: 'What needs my attention today? Summarize the important emails and block focus time this afternoon.',
    systemActions: [
      { service: 'Planner / executor', step: 'Planning the multi-step request', detail: 'Gmail reads and a proposed Calendar write ordered' },
      { service: 'Google Calendar', step: 'Checking availability', detail: 'Sample opening found later this afternoon' },
      { service: 'Google Calendar', step: 'Pending action → confirmed in Discord', detail: 'Create a focus block in the selected calendar', approvalGate: true },
      { service: 'Google Calendar', step: 'Write completed after confirmation', detail: 'Focus block created and recorded in the audit log' },
    ],
    assistantReply: 'I summarized the priority threads. After you confirmed the pending action in Discord, I created the focus block and added the write to the audit log.',
    payloadHighlight: 'Read complete · Calendar write confirmed',
  },
  {
    id: 'meeting-intel',
    tabLabel: 'Meeting Takeaways',
    category: 'MEET & DRIVE NOTES',
    userMessage: 'What were the key takeaways from yesterday’s meetings?',
    systemActions: [
      { service: 'Google Meet', step: 'Finding meeting artifacts', detail: 'Sample run: recent meeting records located' },
      { service: 'Google Drive', step: 'Reading stored notes', detail: 'Drive notes grounded the summary' },
      { service: 'OpenAI', step: 'Synthesizing takeaways', detail: 'Decisions and follow-ups separated from source notes' },
      { service: 'Trace log', step: 'Recording tool reads', detail: 'Capability route and source references traced' },
    ],
    assistantReply: 'Sample takeaway: the Northstar team chose the new sign-in flow, moved onboarding review to Friday, and left two follow-ups in the Drive notes. This was a read-only request, so no approval was needed.',
    payloadHighlight: 'Grounded in Meet and Drive notes',
  },
  {
    id: 'personal-tracking',
    tabLabel: '“Log:” Convention',
    category: 'LIFE TRACKER SPREADSHEET',
    userMessage: 'Log: workout completed, 150g protein today, and 90 minutes deep work on creative goals.',
    systemActions: [
      { service: 'Intent router', step: 'Matched deterministic daily_logger workflow', detail: 'The "Log:" prefix selected the tracking capability' },
      { service: 'Google Sheets', step: 'Preparing tracker update', detail: 'Workout, protein, and deep-work fields mapped' },
      { service: 'Google Sheets', step: 'Pending action → confirmed in Discord', detail: 'Append the supplied values to the tracking sheet', approvalGate: true },
      { service: 'Google Sheets', step: 'Write completed after confirmation', detail: 'Rows updated and mutation recorded in the audit log' },
    ],
    assistantReply: 'After you confirmed the pending action in Discord, I recorded the workout, 150g protein, and 90 minutes of deep work in Google Sheets.',
    payloadHighlight: 'Sheet write confirmed in Discord',
  },
  {
    id: 'email-to-sheets',
    tabLabel: 'Email → Sheets',
    category: 'STRUCTURED EXTRACTION',
    userMessage: 'Find the invoices in my recent emails and create a sheet with the vendor, amount, and due date.',
    systemActions: [
      { service: 'Gmail', step: 'Searching recent messages', detail: 'Sample inbox: invoice attachments located' },
      { service: 'OpenAI', step: 'Planning the multi-step request', detail: 'Planner mapped reads, extraction, and proposed writes' },
      { service: 'Google Sheets', step: 'Pending action → confirmed in Discord', detail: 'Create and populate an invoice spreadsheet', approvalGate: true },
      { service: 'Drive + Sheets', step: 'Write completed after confirmation', detail: 'Sample sheet created and recorded in trace and audit logs' },
    ],
    assistantReply: 'After you confirmed the pending action in Discord, I created the sample invoice sheet in Drive and populated the extracted fields.',
    payloadHighlight: 'Planner · OAuth tools · Confirmed write',
  },
  {
    id: 'docs-drive',
    tabLabel: 'Docs + Drive',
    category: 'DOCUMENT WORKFLOW',
    userMessage: 'Draft a project brief from these notes and save it in my planning folder.',
    systemActions: [
      { service: 'Intent router', step: 'Matched Docs and Drive capability', detail: 'Write policy requires Discord confirmation' },
      { service: 'OpenAI', step: 'Structuring supplied notes', detail: 'Draft outline prepared for the Northstar brief' },
      { service: 'Google Docs', step: 'Pending action → confirmed in Discord', detail: 'Create the drafted document in Google Docs', approvalGate: true },
      { service: 'Google Drive', step: 'Write completed after confirmation', detail: 'Document saved to the selected folder and audited' },
    ],
    assistantReply: 'After you confirmed the pending action in Discord, I created the Northstar project brief and saved it in the selected Drive folder.',
    payloadHighlight: 'Document write confirmed',
  },
];

export const PersonalAssistantVisualizer: React.FC = () => {
  const prefersReduced = usePrefersReducedMotion();
  const [activeScenarioId, setActiveScenarioId] = useState<string>(SCENARIOS[0].id);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [visibleStepCount, setVisibleStepCount] = useState<number>(4);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
  }, []);

  const handleSelectScenario = (scenario: Scenario) => {
    if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
    setActiveScenarioId(scenario.id);
    if (prefersReduced) {
      setIsExecuting(false);
      setVisibleStepCount(scenario.systemActions.length);
      return;
    }

    setIsExecuting(true);
    setVisibleStepCount(0);

    let step = 0;
    intervalRef.current = window.setInterval(() => {
      step += 1;
      setVisibleStepCount(step);
      if (step >= scenario.systemActions.length) {
        if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsExecuting(false);
      }
    }, 450);
  };

  return (
    <div
      id="personal-ai-os-visualizer"
      className="w-full md:min-h-[600px] bg-[#0D0F14] border border-white/[0.08] rounded-xl p-5 md:p-7 text-left shadow-2xl relative overflow-hidden"
    >
      {/* Top Discord Style Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-[#5865F2]/20 border border-[#5865F2]/40 flex items-center justify-center">
            <Hash className="w-3.5 h-3.5 text-[#5865F2]" />
          </div>
          <div>
            <div className="text-xs font-mono text-zinc-200 font-semibold flex items-center gap-2">
              <span>chief-assistant</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/[0.05] text-zinc-400 font-mono">
                Discord Client
              </span>
            </div>
            <div className="text-[10px] font-mono text-zinc-500">89 curated capabilities · Per-account OAuth · Archived</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-zinc-400 font-medium">Reference simulation</span>
        </div>
      </div>

      {/* Scenario Selector Pills */}
      <div className="flex flex-wrap gap-2 mb-5">
        {SCENARIOS.map((s) => {
          const isSelected = s.id === activeScenarioId;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => handleSelectScenario(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/50 shadow-sm'
                  : 'bg-white/[0.03] text-zinc-400 hover:text-white border border-white/[0.05] hover:bg-white/[0.06]'
              }`}
            >
              {s.tabLabel}
            </button>
          );
        })}
      </div>

      {/* Discord Conversation Box */}
      <div className="grid">
        {SCENARIOS.map((scenario) => {
          const isActive = scenario.id === activeScenarioId;

          return (
            <div
              key={scenario.id}
              aria-hidden={!isActive}
              className={`col-start-1 row-start-1 bg-[#08090C] border border-white/[0.08] rounded-xl p-4 sm:p-5 space-y-4 transition-opacity duration-200 ${
                isActive
                  ? 'relative z-10 opacity-100'
                  : 'pointer-events-none select-none opacity-0'
              }`}
            >
              {/* User message */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-900/60 border border-indigo-500/30 text-indigo-200 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  YOU
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white">You</span>
                    <span className="text-[10px] font-mono text-zinc-500">Sample chat · 2:14 PM</span>
                  </div>
                  <div className="text-sm text-zinc-100 font-normal leading-relaxed bg-white/[0.02] border border-white/[0.04] p-3 rounded-lg">
                    {scenario.userMessage}
                  </div>
                </div>
              </div>

              {/* System Execution Trace (Orchestration in Discord) */}
              <div className="ml-11 space-y-2.5 pt-1">
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-indigo-400" />
                    <span>{scenario.category}</span>
                  </span>
                  {isActive && isExecuting ? (
                    <span className="text-indigo-400 animate-pulse font-bold">Calling APIs...</span>
                  ) : (
                    <span className="text-emerald-400">All tools executed ✓</span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {scenario.systemActions.map((action, idx) => {
                    const isDone = !isActive || idx < visibleStepCount;
                    const isCurrent = isActive && idx === visibleStepCount && isExecuting;

                    return (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-lg border text-xs transition-all ${
                          isDone
                            ? action.approvalGate
                              ? 'bg-amber-950/30 border-amber-500/50 text-zinc-200'
                              : 'bg-emerald-950/20 border-emerald-500/30 text-zinc-200'
                            : isCurrent
                            ? 'bg-indigo-950/40 border-indigo-500/50 text-white'
                            : 'bg-white/[0.01] border-white/[0.03] text-zinc-600 opacity-40'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono mb-0.5">
                          <span className={action.approvalGate ? 'text-amber-300 font-semibold' : 'text-indigo-400 font-semibold'}>{action.service}</span>
                          {isDone && (action.approvalGate
                            ? <ShieldCheck className="w-3 h-3 text-amber-400" />
                            : <CheckCircle2 className="w-3 h-3 text-emerald-400" />)}
                        </div>
                        <div className="font-medium text-zinc-200">{action.step}</div>
                        <div className="text-[11px] text-zinc-400 font-mono mt-0.5 truncate">
                          {action.detail}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Assistant Response in Discord */}
              <div className="flex items-start gap-3 pt-2">
                <div className="w-8 h-8 rounded-full bg-[#5865F2]/20 border border-[#5865F2]/50 text-[#5865F2] flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  AI
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-indigo-300">Chief</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#5865F2]/20 text-[#5865F2] font-mono text-[9px] font-bold">
                      BOT
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">Sample chat · 2:14 PM</span>
                  </div>
                  <div className="text-xs sm:text-sm text-zinc-200 leading-relaxed bg-[#5865F2]/10 border border-[#5865F2]/20 p-3.5 rounded-lg">
                    {isActive && isExecuting
                      ? 'Chief is routing this request. Any proposed write will remain a pending action until you confirm it in Discord.'
                      : scenario.assistantReply}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Understated capability badges */}
      <div className="mt-5 pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-center sm:justify-between gap-3 text-xs font-mono text-zinc-400">
        <div className="flex flex-wrap items-center justify-center gap-2 text-[11px]">
          <span className="text-zinc-500 font-medium">Integrated Services:</span>
          <span>Gmail</span>
          <span>·</span>
          <span>Calendar</span>
          <span>·</span>
          <span>Drive</span>
          <span>·</span>
          <span>Sheets</span>
          <span>·</span>
          <span>Docs</span>
          <span>·</span>
          <span>Slides</span>
          <span>·</span>
          <span>Forms</span>
          <span>·</span>
          <span>Meet</span>
          <span>·</span>
          <span>Contacts</span>
          <span>·</span>
          <span>OpenAI</span>
        </div>
      </div>
    </div>
  );
};
