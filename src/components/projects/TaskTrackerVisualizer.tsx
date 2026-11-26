import React, { useEffect, useRef, useState } from 'react';
import {
  Bot,
  Braces,
  CheckCircle2,
  Circle,
  Cloud,
  Database,
  GitMerge,
  HardDrive,
  Network,
  Pause,
  Play,
  RotateCcw,
  Server,
  ShieldCheck,
  Smartphone,
  Terminal,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { useInViewport } from '../../hooks/useInViewport';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

type Tab = 'sync' | 'model';
type Tone = 'offline' | 'sync' | 'merge' | 'mcp' | 'saved' | 'conflict';

interface RunStep {
  tone: Tone;
  status: string;
  version: number;
}

const RUN: RunStep[] = [
  { tone: 'offline', status: 'Saved on device (v12)', version: 12 },
  { tone: 'sync', status: 'PUSH changes since v11 (1 task)', version: 12 },
  { tone: 'merge', status: 'Last-write-wins merge accepted · v13', version: 13 },
  { tone: 'mcp', status: 'Assistant reads Sprint 3 through MCP', version: 13 },
  { tone: 'mcp', status: 'Assistant completes task t-104 · v14', version: 14 },
  { tone: 'saved', status: 'Delta pulled to phone · task updated', version: 14 },
  { tone: 'conflict', status: 'Newer timestamp wins the conflict', version: 14 },
];

const TONE_META: Record<Tone, { label: string; dot: string; text: string; panel: string }> = {
  offline: { label: 'OFFLINE', dot: 'bg-amber-400', text: 'text-amber-300', panel: 'border-amber-500/30 bg-amber-950/20' },
  sync: { label: 'SYNCING', dot: 'bg-sky-400', text: 'text-sky-300', panel: 'border-sky-500/30 bg-sky-950/20' },
  merge: { label: 'MERGING', dot: 'bg-indigo-400', text: 'text-indigo-300', panel: 'border-indigo-500/30 bg-indigo-950/20' },
  mcp: { label: 'MCP', dot: 'bg-violet-400', text: 'text-violet-300', panel: 'border-violet-500/30 bg-violet-950/20' },
  saved: { label: 'SAVED', dot: 'bg-emerald-400', text: 'text-emerald-300', panel: 'border-emerald-500/30 bg-emerald-950/20' },
  conflict: { label: 'RESOLVING', dot: 'bg-rose-400', text: 'text-rose-300', panel: 'border-rose-500/30 bg-rose-950/20' },
};

const TASKS = [
  { id: 't-101', label: 'Audit launch checklist', done: true },
  { id: 't-102', label: 'Finalize onboarding', done: false },
  { id: 't-103', label: 'Prepare demo notes', done: false },
  { id: 't-104', label: 'Write release notes', done: false },
];

const TAB_ACTIVE = 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300';
const TAB_IDLE = 'bg-white/[0.02] border-white/[0.06] text-zinc-500 hover:text-zinc-300';

export const TaskTrackerVisualizer: React.FC = () => {
  const { ref: visualizerRef, isInViewport } = useInViewport<HTMLDivElement>();
  const prefersReduced = usePrefersReducedMotion();
  const representativeStep = 4;
  const [activeStep, setActiveStep] = useState<number>(prefersReduced ? representativeStep : 0);
  const [activeTab, setActiveTab] = useState<Tab>('sync');
  const [isPlaying, setIsPlaying] = useState<boolean>(!prefersReduced);
  const [inspecting, setInspecting] = useState<boolean>(false);
  const stepRef = useRef<number>(prefersReduced ? representativeStep : 0);

  useEffect(() => {
    if (!isPlaying || !isInViewport || prefersReduced || activeTab !== 'sync') return;
    const interval = window.setInterval(() => {
      stepRef.current = (stepRef.current + 1) % RUN.length;
      setActiveStep(stepRef.current);
      setInspecting(false);
    }, 1650);
    return () => window.clearInterval(interval);
  }, [activeTab, isInViewport, isPlaying, prefersReduced]);

  const inspect = (step: number) => {
    stepRef.current = step;
    setActiveStep(step);
    setIsPlaying(false);
    setInspecting(true);
  };

  const selectTab = (tab: Tab) => {
    setActiveTab(tab);
    setIsPlaying(false);
    setInspecting(true);
  };

  const togglePlay = () => {
    setActiveTab('sync');
    setInspecting(false);
    setIsPlaying((playing) => !playing);
  };

  const resetRun = () => {
    const resetStep = prefersReduced ? representativeStep : 0;
    stepRef.current = resetStep;
    setActiveStep(resetStep);
    setActiveTab('sync');
    setInspecting(false);
    setIsPlaying(!prefersReduced);
  };

  const step = RUN[activeStep];
  const meta = TONE_META[step.tone];
  const online = activeStep >= 1;
  const phoneComplete = activeStep >= 5;
  const pushActive = activeStep === 1 || activeStep === 5;
  const mcpActive = activeStep === 3 || activeStep === 4;

  return (
    <div
      ref={visualizerRef}
      id="task-tracker-visualizer"
      className="w-full bg-[#0D0F14] border border-white/[0.08] rounded-xl p-5 md:p-7 text-left shadow-2xl relative overflow-hidden"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-4">
        <div className="flex min-w-0 items-center gap-2">
          <Network className="w-4 h-4 shrink-0 text-indigo-400" />
          <span className="truncate font-mono text-xs text-zinc-300 font-medium tracking-wide uppercase">
            Task Tracker · Offline-first sync + MCP
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-zinc-300 border border-white/[0.08] transition-colors cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-indigo-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isPlaying ? 'Pause Run' : 'Resume Run'}</span>
          </button>
          <button
            type="button"
            onClick={resetRun}
            aria-label="Reset sync walkthrough"
            className="p-1.5 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white border border-white/[0.08] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2" role="tablist" aria-label="Task Tracker views">
          <button type="button" role="tab" aria-selected={activeTab === 'sync'} onClick={() => selectTab('sync')} className={`px-3 py-1.5 rounded-md border text-[11px] font-mono transition-all ${activeTab === 'sync' ? TAB_ACTIVE : TAB_IDLE}`}>
            Sync flow
          </button>
          <button type="button" role="tab" aria-selected={activeTab === 'model'} onClick={() => selectTab('model')} className={`px-3 py-1.5 rounded-md border text-[11px] font-mono transition-all ${activeTab === 'model' ? TAB_ACTIVE : TAB_IDLE}`}>
            Data model
          </button>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500">
          <span className="rounded bg-white/[0.05] px-1.5 py-0.5 text-zinc-400">sample data</span>
          <span>{inspecting ? 'Inspected' : `Step ${activeStep + 1} of ${RUN.length}`}</span>
        </div>
      </div>

      <div className={`mb-4 rounded-lg border px-4 py-3 flex flex-wrap items-center justify-between gap-2 transition-all duration-300 ${meta.panel}`}>
        <div className="flex min-w-0 items-center gap-2.5 font-mono text-xs">
          <span className={`w-2.5 h-2.5 shrink-0 rounded-full animate-pulse ${meta.dot}`} />
          <span className={meta.text}>{meta.label}</span>
          <span className="min-w-0 truncate text-zinc-400">· {step.status}</span>
        </div>
        <span className="font-mono text-[10px] text-zinc-500">simulated walkthrough</span>
      </div>

      <div className="grid">
        <div aria-hidden={activeTab !== 'sync'} className={`col-start-1 row-start-1 transition-opacity duration-300 ${activeTab === 'sync' ? 'relative z-10 opacity-100' : 'pointer-events-none opacity-0'}`}>
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_2rem_minmax(0,1.08fr)_2rem_minmax(0,1fr)] items-stretch">
            <button type="button" onClick={() => inspect(phoneComplete ? 5 : 0)} className="min-w-0 text-left cursor-pointer">
              <div className="h-full min-h-[350px] rounded-xl border border-white/[0.08] bg-[#08090C] p-3 transition-all duration-300 hover:border-white/[0.16]">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
                  <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-zinc-500"><Smartphone className="w-3.5 h-3.5 text-indigo-400" /> iOS app</span>
                  <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[9px] ${online ? 'bg-emerald-500/10 text-emerald-300' : 'bg-amber-500/10 text-amber-300'}`}>
                    {online ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}{online ? 'Online' : 'Offline'}
                  </span>
                </div>
                <div className="mx-auto mt-3 max-w-[260px] rounded-[1.4rem] border border-white/[0.1] bg-zinc-950 p-3 shadow-xl">
                  <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-zinc-800" aria-hidden="true" />
                  <div className="text-[9px] font-mono uppercase text-zinc-600">Work Cycle</div>
                  <div className="text-sm font-semibold text-white">Q4 Launch</div>
                  <div className="mt-2 flex items-center justify-between rounded-lg bg-indigo-500/10 px-2.5 py-2">
                    <span className="text-xs font-medium text-indigo-200">Sprint 3</span>
                    <span className="font-mono text-[9px] text-indigo-400">4 tasks · sample</span>
                  </div>
                  <div className="mt-2 space-y-1.5">
                    {TASKS.map((task) => {
                      const completed = task.done || (task.id === 't-104' && phoneComplete);
                      return (
                        <div key={task.id} className="flex min-w-0 items-center gap-2 rounded-md border border-white/[0.05] bg-white/[0.02] px-2 py-2">
                          {completed ? <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" /> : <Circle className="w-3.5 h-3.5 shrink-0 text-zinc-600" />}
                          <span className={`truncate text-[11px] transition-all duration-300 ${completed ? 'text-zinc-500 line-through' : 'text-zinc-300'}`}>{task.label}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className={`mt-2 rounded-md border px-2 py-1.5 font-mono text-[9px] transition-all ${activeStep === 0 ? 'border-amber-500/20 bg-amber-500/10 text-amber-300' : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'}`}>
                    {activeStep === 0 ? 'Saved on device (v12)' : `Local version v${step.version}`}
                  </div>
                </div>
              </div>
            </button>

            <div className="relative h-7 md:h-auto" aria-hidden="true">
              <div className="absolute left-1/2 top-1 bottom-1 w-px -translate-x-1/2 bg-sky-500/20 md:left-1 md:right-1 md:top-1/2 md:bottom-auto md:h-px md:w-auto md:translate-x-0" />
              <span className={`absolute left-1/2 top-1 h-2 w-2 -translate-x-1/2 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)] transition-all duration-700 md:left-1 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 ${pushActive ? 'translate-y-4 opacity-100 md:translate-x-5 md:translate-y-0' : 'opacity-20'}`} />
            </div>

            <button type="button" onClick={() => inspect(activeStep === 2 ? 2 : 1)} className="min-w-0 text-left cursor-pointer">
              <div className="h-full min-h-[350px] rounded-xl border border-white/[0.08] bg-[#08090C] p-4 transition-all duration-300 hover:border-white/[0.16]">
                <div className="flex min-w-0 items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
                  <span className="flex min-w-0 items-center gap-1.5 font-mono text-[10px] uppercase text-zinc-500"><Server className="w-3.5 h-3.5 shrink-0 text-indigo-400" /><span className="truncate">Sync API</span></span>
                  <span className="shrink-0 rounded bg-indigo-500/10 px-2 py-0.5 font-mono text-[10px] text-indigo-300">v{step.version}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="rounded bg-white/[0.04] px-2 py-1 font-mono text-[9px] text-zinc-400">Node.js · Express · SQLite</span>
                  <span className="rounded bg-white/[0.04] px-2 py-1 font-mono text-[9px] text-zinc-400">Docker · Caddy HTTPS · Oracle Cloud</span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-lg border border-sky-500/15 bg-sky-500/[0.06] p-2.5">
                    <ShieldCheck className="mb-1 w-3.5 h-3.5 text-sky-400" />
                    <div className="font-mono text-[9px] text-zinc-500">AUTH</div>
                    <div className="text-[10px] text-sky-200">Bearer token</div>
                  </div>
                  <div className="rounded-lg border border-indigo-500/15 bg-indigo-500/[0.06] p-2.5">
                    <GitMerge className="mb-1 w-3.5 h-3.5 text-indigo-400" />
                    <div className="font-mono text-[9px] text-zinc-500">MERGE</div>
                    <div className="text-[10px] text-indigo-200">Last-write-wins</div>
                  </div>
                </div>
                <div className="mt-3 rounded-lg border border-white/[0.06] bg-black/30 p-3">
                  <div className="mb-2 flex items-center gap-1.5 font-mono text-[9px] uppercase text-zinc-600"><Database className="w-3 h-3" /> Event log · sample</div>
                  <div className="space-y-2 font-mono text-[9px] leading-relaxed">
                    <div className={activeStep >= 1 ? 'text-sky-300' : 'text-zinc-700'}>→ PUSH changes since v11 (1 task)</div>
                    <div className={activeStep >= 2 ? 'text-indigo-300' : 'text-zinc-700'}>✓ merge accepted · server v13</div>
                    <div className={activeStep >= 4 ? 'text-violet-300' : 'text-zinc-700'}>← MCP complete_task(t-104)</div>
                    <div className={activeStep >= 5 ? 'text-emerald-300' : 'text-zinc-700'}>✓ delta ready · server v14</div>
                  </div>
                </div>
              </div>
            </button>

            <div className="relative h-7 md:h-auto" aria-hidden="true">
              <div className="absolute left-1/2 top-1 bottom-1 w-px -translate-x-1/2 bg-sky-500/20 md:left-1 md:right-1 md:top-1/2 md:bottom-auto md:h-px md:w-auto md:translate-x-0" />
              <span className={`absolute left-1/2 top-1 h-2 w-2 -translate-x-1/2 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)] transition-all duration-700 md:left-1 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 ${mcpActive ? 'translate-y-4 opacity-100 md:translate-x-5 md:translate-y-0' : 'opacity-20'}`} />
            </div>

            <button type="button" onClick={() => inspect(activeStep === 4 ? 4 : 3)} className="min-w-0 text-left cursor-pointer">
              <div className="h-full min-h-[350px] rounded-xl border border-white/[0.08] bg-[#08090C] p-4 transition-all duration-300 hover:border-white/[0.16]">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-zinc-500"><Bot className="w-3.5 h-3.5 text-violet-400" /> AI assistant</span>
                  <span className="rounded bg-violet-500/10 px-2 py-0.5 font-mono text-[9px] text-violet-300">Claude via MCP</span>
                </div>
                <div className="mt-3 min-h-[176px] rounded-lg border border-violet-500/15 bg-black/40 p-3 font-mono text-[9px] leading-relaxed">
                  <div className="mb-3 flex items-center gap-1.5 text-zinc-600"><Terminal className="w-3 h-3" /> task-tracker-mcp</div>
                  <div className={activeStep >= 3 ? 'text-violet-300' : 'text-zinc-700'}>&gt; list_tasks({'{ sprint: "Sprint 3" }'})</div>
                  <div className={`mt-1 transition-opacity ${activeStep >= 3 ? 'text-zinc-400 opacity-100' : 'opacity-0'}`}>← 4 tasks returned <span className="text-zinc-600">· sample</span></div>
                  <div className={`mt-4 transition-opacity ${activeStep >= 4 ? 'text-violet-300 opacity-100' : 'opacity-0'}`}>&gt; complete_task({'{ id: "t-104" }'})</div>
                  <div className={`mt-1 transition-opacity ${activeStep >= 4 ? 'text-emerald-300 opacity-100' : 'opacity-0'}`}>← updated · version 14</div>
                  <span className="mt-3 inline-block h-3 w-1.5 animate-pulse bg-violet-400/70" aria-hidden="true" />
                </div>
                <div className="mt-3 flex items-start gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
                  <Braces className="mt-0.5 w-3.5 h-3.5 shrink-0 text-violet-400" />
                  <p className="text-[10px] leading-relaxed text-zinc-400">The MCP server lets assistants read, create, update, and complete the same tasks.</p>
                </div>
              </div>
            </button>
          </div>

          <button type="button" onClick={() => inspect(6)} className={`mt-3 w-full rounded-lg border p-3 text-left transition-all duration-300 ${activeStep === 6 ? 'border-rose-500/25 bg-rose-950/10' : 'border-white/[0.06] bg-white/[0.015]'}`}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[9px] uppercase text-zinc-500">Conflict demo · sample</span>
              <span className={`rounded border px-2 py-1 font-mono text-[9px] transition-all ${activeStep === 6 ? 'border-white/[0.04] text-zinc-700 opacity-40' : 'border-white/[0.06] text-zinc-500'}`}>Web edit · 10:41</span>
              <span className={`rounded border px-2 py-1 font-mono text-[9px] ${activeStep === 6 ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300' : 'border-white/[0.06] text-zinc-500'}`}>Phone edit · 10:42 · newer wins</span>
            </div>
          </button>
        </div>

        <div aria-hidden={activeTab !== 'model'} className={`col-start-1 row-start-1 min-h-[406px] rounded-xl border border-white/[0.08] bg-[#08090C] p-5 transition-opacity duration-300 ${activeTab === 'model' ? 'relative z-10 opacity-100' : 'pointer-events-none opacity-0'}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-4">
            <div><div className="font-mono text-[10px] uppercase text-zinc-500">Data model</div><div className="mt-1 text-sm font-semibold text-white">One simple hierarchy</div></div>
            <span className="rounded bg-white/[0.04] px-2 py-1 font-mono text-[9px] text-zinc-500">static view</span>
          </div>
          <div className="mx-auto mt-6 max-w-xl space-y-3">
            {[
              { label: 'Work Cycle', detail: 'id · title · updatedAt · version', icon: Cloud, style: 'border-indigo-500/25 bg-indigo-500/[0.07] text-indigo-300', indent: 'ml-0' },
              { label: 'Sprint', detail: 'id · cycleId · status · updatedAt', icon: Network, style: 'border-sky-500/25 bg-sky-500/[0.07] text-sky-300', indent: 'ml-6 sm:ml-12' },
              { label: 'Task', detail: 'id · sprintId · status · updatedAt · version', icon: CheckCircle2, style: 'border-emerald-500/25 bg-emerald-500/[0.07] text-emerald-300', indent: 'ml-12 sm:ml-24' },
            ].map((node) => {
              const Icon = node.icon;
              return <div key={node.label} className={node.indent}><div className={`rounded-lg border p-3 ${node.style}`}><div className="flex items-center gap-2"><Icon className="w-4 h-4 shrink-0" /><span className="text-xs font-semibold text-white">{node.label}</span></div><div className="mt-1 pl-6 font-mono text-[9px] text-zinc-500">{node.detail}</div></div></div>;
            })}
          </div>
          <div className="mx-auto mt-5 flex max-w-xl items-start gap-3 rounded-lg border border-amber-500/20 bg-amber-500/[0.06] p-3">
            <HardDrive className="w-4 h-4 shrink-0 text-amber-400" />
            <div><div className="text-xs font-medium text-amber-200">Versioned JSON backup</div><p className="mt-1 text-[10px] leading-relaxed text-zinc-400">Backup and restore preserve the hierarchy while local storage keeps the app useful without a connection.</p></div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/[0.04] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-zinc-500">
        <span>Same tasks for people and agents</span>
        <span className="text-indigo-400">Offline-first → Delta sync → MCP</span>
      </div>
    </div>
  );
};
