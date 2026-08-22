import React, { useState, useEffect } from 'react';
import { Mail, ShieldCheck, CheckCircle2, AlertTriangle, ListTodo, DollarSign, MessageSquare, Play, Pause } from 'lucide-react';
import { useInViewport } from '../../hooks/useInViewport';

interface InboxPhase {
  id: string;
  time: string;
  title: string;
  badge: string;
  description: string;
}

const PHASES: InboxPhase[] = [
  {
    id: 'ingest',
    time: '8:00 PM',
    title: 'Evening Shift Triggered',
    badge: 'Cron Execution',
    description: 'Scanning 58 emails received across the past 24 hours on business inbox.',
  },
  {
    id: 'categorize',
    time: '8:02 PM',
    title: 'Semantic Understanding & Labeling',
    badge: 'Zero Deletion Policy',
    description: 'Classifying content contextually into Important, Investors, Clients, Students, and Promotional labels.',
  },
  {
    id: 'extract',
    time: '8:04 PM',
    title: 'Action & Financial Intelligence',
    badge: 'Task Extraction',
    description: 'Isolating urgent deliverables, payment deadlines, and high-priority conversations.',
  },
  {
    id: 'digest',
    time: '8:05 PM',
    title: 'Daily Executive Briefing Sent',
    badge: 'Delivered ✓',
    description: 'Consolidated briefing answers “What actually matters?” in under 2 minutes of reading.',
  },
];

const CATEGORIES = [
  { label: 'Important', count: 4, color: 'text-indigo-400 border-indigo-500/30 bg-indigo-950/20' },
  { label: 'Investors', count: 3, color: 'text-purple-400 border-purple-500/30 bg-purple-950/20' },
  { label: 'Clients & Partners', count: 7, color: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20' },
  { label: 'Students (KIDLIN)', count: 9, color: 'text-sky-400 border-sky-500/30 bg-sky-950/20' },
  { label: 'Promotional & Newsletters', count: 35, color: 'text-zinc-400 border-zinc-700/40 bg-zinc-900/30' },
];

const EXTRACTED_INSIGHTS = [
  {
    type: 'URGENT',
    count: '2 items',
    icon: AlertTriangle,
    iconColor: 'text-amber-400',
    title: 'Server migration sign-off & KIDLIN cohort deadline',
    action: 'Needs decision before 10 AM tomorrow',
  },
  {
    type: 'NEXT ACTIONS',
    count: '5 tasks',
    icon: ListTodo,
    iconColor: 'text-indigo-400',
    title: 'Send slide deck to guest speaker · Review PR #142 · Reply to 3 student submissions',
    action: 'Queued to tomorrow morning priority list',
  },
  {
    type: 'MONEY & INVOICES',
    count: '1 item',
    icon: DollarSign,
    iconColor: 'text-emerald-400',
    title: 'AWS Cloud monthly compute invoice ($214.80)',
    action: 'Due in 5 days · Auto-debit verified',
  },
  {
    type: 'KEY CONVERSATIONS',
    count: '4 messages',
    icon: MessageSquare,
    iconColor: 'text-purple-400',
    title: 'Inquiries from 2 prospective enterprise workshop leads',
    action: 'Summarized with 1-click context',
  },
];

export const InboxManagerVisualizer: React.FC = () => {
  const { ref: visualizerRef, isInViewport } = useInViewport<HTMLDivElement>();
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState<number>(3);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    if (!isPlaying || !isInViewport) return;
    const timer = setInterval(() => {
      setCurrentPhaseIndex((prev) => (prev + 1) % PHASES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [isPlaying, isInViewport]);

  return (
    <div
      ref={visualizerRef}
      id="inbox-manager-visualizer"
      className="w-full bg-[#0D0F14] border border-white/[0.08] rounded-xl p-5 md:p-7 text-left shadow-2xl relative overflow-hidden"
    >
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-indigo-400" />
          <span className="font-mono text-xs text-zinc-300 font-medium tracking-wide uppercase">
            Evening Inbox Intelligence · 8:00 PM Automation
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero Deletion Guardrail</span>
          </div>

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-[11px] font-mono text-zinc-400 hover:text-white transition-all cursor-pointer"
            title={isPlaying ? 'Pause simulation' : 'Play simulation'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 text-zinc-400" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-emerald-400" />
                <span>Resume</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Progress Timeline Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {PHASES.map((phase, idx) => {
          const isActive = idx === currentPhaseIndex;
          const isPassed = idx < currentPhaseIndex;

          return (
            <button
              key={phase.id}
              type="button"
              onClick={() => {
                setCurrentPhaseIndex(idx);
                setIsPlaying(false);
              }}
              className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-950/50 border-indigo-500 text-white ring-1 ring-indigo-500/40'
                  : isPassed
                  ? 'bg-white/[0.03] border-white/[0.08] text-zinc-300'
                  : 'bg-white/[0.01] border-white/[0.04] text-zinc-500 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                <span className="text-indigo-400 font-bold">{phase.time}</span>
                {isPassed && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
              </div>
              <div className="text-xs font-semibold text-zinc-100 truncate">{phase.title}</div>
              <div className="text-[10px] font-mono text-zinc-400 mt-0.5">{phase.badge}</div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Workflow Stage Inspector */}
      <div className="bg-[#08090C] border border-white/[0.08] rounded-xl p-4 sm:p-6 space-y-5">
        {/* Phase 1: Intake */}
        {currentPhaseIndex === 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                Phase 1: Ingestion & Inbox Sweep
              </div>
              <span className="text-xs font-mono text-indigo-400">8:00:12 PM</span>
            </div>

            <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-white">58 Incoming Emails (Past 24 Hours)</div>
                <div className="text-xs text-zinc-400 mt-1">
                  Filtering spam gateways, fetching full message payloads, and initializing LLM batch parser.
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-2xl font-bold font-mono text-indigo-400">58 / 58</div>
                <div className="text-[10px] font-mono text-zinc-500">Processed</div>
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Categorization */}
        {currentPhaseIndex === 1 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                Phase 2: Semantic Understanding & Sorting
              </div>
              <div className="text-[11px] font-mono text-emerald-400">No Emails Deleted Automatically</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.label}
                  className={`p-3 rounded-lg border flex items-center justify-between ${cat.color}`}
                >
                  <span className="text-xs font-medium">{cat.label}</span>
                  <span className="font-mono text-xs font-bold">{cat.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Phase 3: Extraction */}
        {currentPhaseIndex === 2 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                Phase 3: Decision & Action Extraction
              </div>
              <span className="text-xs font-mono text-indigo-400">4 Critical Clusters</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {EXTRACTED_INSIGHTS.map((item) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={item.type}
                    className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold">
                        <IconComp className={`w-3.5 h-3.5 ${item.iconColor}`} />
                        <span className={item.iconColor}>{item.type}</span>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-400">{item.count}</span>
                    </div>
                    <div className="text-xs font-medium text-zinc-200">{item.title}</div>
                    <div className="text-[11px] text-zinc-400 font-mono">{item.action}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Phase 4: Final Digest Preview */}
        {currentPhaseIndex === 3 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono text-white font-medium">
                  8:05 PM Executive Inbox Briefing
                </span>
              </div>
              <span className="text-[11px] font-mono text-zinc-500">Delivered to Rishi</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/30 text-left">
                <div className="text-[10px] font-mono text-amber-300 uppercase font-bold">URGENT</div>
                <div className="text-xl font-bold font-mono text-white mt-0.5">2</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">Require reply before 10 AM</div>
              </div>

              <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/30 text-left">
                <div className="text-[10px] font-mono text-indigo-300 uppercase font-bold">NEXT ACTIONS</div>
                <div className="text-xl font-bold font-mono text-white mt-0.5">5</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">Extracted tasks queued</div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-left">
                <div className="text-[10px] font-mono text-emerald-300 uppercase font-bold">FINANCIAL</div>
                <div className="text-xl font-bold font-mono text-white mt-0.5">1</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">Cloud invoice due in 5d</div>
              </div>

              <div className="p-3 rounded-lg bg-purple-950/30 border border-purple-500/30 text-left">
                <div className="text-[10px] font-mono text-purple-300 uppercase font-bold">KEY THREADS</div>
                <div className="text-xl font-bold font-mono text-white mt-0.5">4</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">Partners & students</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>35 promotional emails archived without deletion · Inbox state clean</span>
              </div>
              <span className="text-indigo-400">Total read time: ~90 seconds</span>
            </div>
          </div>
        )}
      </div>

      {/* Understated bottom badge */}
      <div className="mt-4 pt-3 border-t border-white/[0.04] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-zinc-500">
        <span>Runs every day at 8:00 PM via automated cron</span>
        <span>Reduces 50 to 60 emails into actionable decisions</span>
      </div>
    </div>
  );
};
