import React, { useState } from 'react';
import { CheckCircle2, Sparkles, Hash } from 'lucide-react';

interface Scenario {
  id: string;
  tabLabel: string;
  category: string;
  userMessage: string;
  systemActions: {
    service: string;
    step: string;
    detail: string;
  }[];
  assistantReply: string;
  payloadHighlight?: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'email-calendar',
    tabLabel: 'Email + Calendar',
    category: 'INBOX & SCHEDULING',
    userMessage: 'What needs my attention today? Summarize the important emails and block two hours this afternoon so I can work on them.',
    systemActions: [
      { service: 'Email API', step: 'Searching inbox', detail: 'Analyzed 42 threads · 3 high-priority threads identified' },
      { service: 'Google Calendar', step: 'Checking schedule', detail: 'Found open slot 2:30 PM to 4:30 PM' },
      { service: 'Google Calendar', step: 'Creating focus block', detail: 'Event "Deep Focus: Urgent Email Processing" placed' },
      { service: 'OpenAI API', step: 'Synthesizing briefing', detail: 'Structured summary generated with 1-click context' },
    ],
    assistantReply: 'Here’s what matters today: 1) Client proposal review from Alex (needs sign-off by 5 PM), 2) Server migration heads-up, 3) Speaker deck confirmation. I’ve scheduled a 2-hour focus block from 2:30 PM to 4:30 PM on your calendar so you have uninterrupted time.',
    payloadHighlight: 'Calendar Event & Summary Ready',
  },
  {
    id: 'meeting-intel',
    tabLabel: 'Meeting Takeaways',
    category: 'WISPR FLOW INTELLIGENCE',
    userMessage: 'What were the key takeaways from yesterday’s meetings?',
    systemActions: [
      { service: 'Wispr Flow', step: 'Connecting to Wispr Flow', detail: '2 recorded meeting sessions retrieved' },
      { service: 'Wispr Flow', step: 'Notes & transcripts analyzed', detail: '4 core architectural takeaways extracted' },
      { service: 'Task Engine', step: 'Identifying follow-ups', detail: '2 action items assigned to Rishi' },
      { service: 'OpenAI API', step: 'Formatting actionable digest', detail: 'Clustered by decisions vs next steps' },
    ],
    assistantReply: 'Yesterday’s takeaways: 1) RedMane microservice auth is finalized on OAuth 2.1, 2) KIDLIN student onboarding moved to Discord bots, 3) Two open action items: send updated API docs to Sarah and finalize the Friday demo agenda.',
    payloadHighlight: '4 Takeaways · 2 Follow-ups',
  },
  {
    id: 'personal-tracking',
    tabLabel: '“Log:” Convention',
    category: 'LIFE TRACKER SPREADSHEET',
    userMessage: 'Log: workout completed, 150g protein today, and 90 minutes deep work on creative goals.',
    systemActions: [
      { service: 'Google Sheets', step: 'Productivity Sheet located', detail: 'Target tab: "2026 Life Tracker"' },
      { service: 'Google Sheets', step: 'Workout recorded', detail: 'Logged: Upper Body Hypertrophy (Session 42)' },
      { service: 'Google Sheets', step: 'Protein intake recorded', detail: 'Logged: 150g (100% daily macro goal hit)' },
      { service: 'Google Sheets', step: 'Daily progress updated', detail: 'Added 1.5h to Creative Projects streak' },
    ],
    assistantReply: '✓ Productivity tracker updated! Recorded your workout, 150g protein, and 90m creative session. You’re currently on a 14-day consistency streak for creative building.',
    payloadHighlight: 'Google Sheets Updated Instantly',
  },
  {
    id: 'email-to-sheets',
    tabLabel: 'Email → Sheets',
    category: 'STRUCTURED EXTRACTION',
    userMessage: 'Find the invoices in my recent emails and create a sheet with the vendor, amount, and due date.',
    systemActions: [
      { service: 'Email API', step: 'Searching email attachments', detail: 'Found 4 invoice PDFs from past 14 days' },
      { service: 'OpenAI API', step: 'Extracting tabular data', detail: 'Extracted vendor, amount, invoice #, and due date' },
      { service: 'Google Drive', step: 'Creating new spreadsheet', detail: 'Created "Invoices_Aug_2026.xlsx"' },
      { service: 'Google Sheets', step: 'Populating rows', detail: '4 formatted rows with currency validation added' },
    ],
    assistantReply: 'Done! Created "Invoices_Aug_2026" in your Google Drive with 4 extracted invoices (Total: $842.10, next due date Aug 28). Linked in your Drive root folder.',
    payloadHighlight: 'Automated Data Pipeline',
  },
  {
    id: 'communication',
    tabLabel: 'SMS & Voice',
    category: 'MESSAGING & OUTREACH',
    userMessage: 'Send a text to Marcus confirming tomorrow’s design review meeting at 11 AM.',
    systemActions: [
      { service: 'Contacts API', step: 'Contact identified', detail: 'Matched Marcus (+1 312-***-****)' },
      { service: 'OpenAI API', step: 'Drafting SMS message', detail: 'Prepared polite, clear confirmation' },
      { service: 'SMS Gateway', step: 'SMS dispatched', detail: 'Message sent via authorized gateway' },
    ],
    assistantReply: '✓ Text sent to Marcus: "Hey Marcus, confirming our design review tomorrow at 11:00 AM. Looking forward to it!"',
    payloadHighlight: 'SMS Dispatched',
  },
];

export const PersonalAssistantVisualizer: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>(SCENARIOS[0].id);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [visibleStepCount, setVisibleStepCount] = useState<number>(4);

  const handleSelectScenario = (scenario: Scenario) => {
    setActiveScenarioId(scenario.id);
    setIsExecuting(true);
    setVisibleStepCount(0);

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setVisibleStepCount(step);
      if (step >= scenario.systemActions.length) {
        clearInterval(interval);
        setIsExecuting(false);
      }
    }, 450);
  };

  return (
    <div
      id="personal-ai-os-visualizer"
      className="w-full bg-[#0D0F14] border border-white/[0.08] rounded-xl p-5 md:p-7 text-left shadow-2xl relative overflow-hidden"
    >
      {/* Top Discord Style Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-[#5865F2]/20 border border-[#5865F2]/40 flex items-center justify-center">
            <Hash className="w-3.5 h-3.5 text-[#5865F2]" />
          </div>
          <div>
            <div className="text-xs font-mono text-zinc-200 font-semibold flex items-center gap-2">
              <span>ai-operations</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/[0.05] text-zinc-400 font-mono">
                Discord Client
              </span>
            </div>
            <div className="text-[10px] font-mono text-zinc-500">Conversational System Hub · Real-time Orchestration</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 font-medium">Assistant Online</span>
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
              {/* User Message (Rishi) */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-900/60 border border-indigo-500/30 text-indigo-200 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  RS
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white">Rishi Shukla</span>
                    <span className="text-[10px] font-mono text-zinc-500">Today at 2:14 PM</span>
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
                    <span>Background Actions Triggered</span>
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
                            ? 'bg-emerald-950/20 border-emerald-500/30 text-zinc-200'
                            : isCurrent
                            ? 'bg-indigo-950/40 border-indigo-500/50 text-white'
                            : 'bg-white/[0.01] border-white/[0.03] text-zinc-600 opacity-40'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono mb-0.5">
                          <span className="text-indigo-400 font-semibold">{action.service}</span>
                          {isDone && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
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
                    <span className="text-xs font-semibold text-indigo-300">Personal AI Assistant</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#5865F2]/20 text-[#5865F2] font-mono text-[9px] font-bold">
                      BOT
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">Today at 2:14 PM</span>
                  </div>
                  <div className="text-xs sm:text-sm text-zinc-200 leading-relaxed bg-[#5865F2]/10 border border-[#5865F2]/20 p-3.5 rounded-lg">
                    {scenario.assistantReply}
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
          <span>Email</span>
          <span>·</span>
          <span>Calendar</span>
          <span>·</span>
          <span>Drive</span>
          <span>·</span>
          <span>Sheets</span>
          <span>·</span>
          <span>Docs</span>
          <span>·</span>
          <span className="text-indigo-300 font-semibold">Wispr Flow</span>
          <span>·</span>
          <span>Contacts</span>
          <span>·</span>
          <span>SMS</span>
          <span>·</span>
          <span>Voice</span>
          <span>·</span>
          <span>OpenAI</span>
        </div>
      </div>
    </div>
  );
};
