import React, { useEffect, useRef, useState } from 'react';
import {
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  FileText,
  GraduationCap,
  Inbox,
  Lightbulb,
  LineChart,
  LockKeyhole,
  Megaphone,
  Pause,
  Play,
  Rocket,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  Workflow,
  Wrench,
  XCircle,
} from 'lucide-react';
import { useInViewport } from '../../hooks/useInViewport';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

type Tone = 'running' | 'ai' | 'failed' | 'success' | 'approval';
type Route = 'opus' | 'sonnet' | 'local';

interface Specialist {
  name: string;
  role: string;
  model: string;
  route: Route;
  memory: string;
  tools: string;
  approval: string;
  icon: React.ComponentType<{ className?: string }>;
  dimmed?: boolean;
}

interface RunStep {
  specialist: number | null;
  route: Route;
  tone: Tone;
  status: string;
  tokens: number;
  panel: 'request' | 'plan' | 'brief' | 'failure' | 'verified' | 'approval' | 'done';
}

const SPECIALISTS: Specialist[] = [
  {
    name: 'Engineering Lead', role: 'Code and tests', model: 'Local Qwen3-Coder', route: 'local',
    memory: 'role.md · knowledge/', tools: 'Code and test tools', approval: 'Consequential changes', icon: Code2,
  },
  {
    name: 'Deployment', role: 'Builds and releases', model: 'Sonnet', route: 'sonnet',
    memory: 'role.md · release notes', tools: 'Build and upload tools', approval: 'Publishing a release', icon: Rocket,
  },
  {
    name: 'n8n Automation', role: 'Workflow operations', model: 'Sonnet', route: 'sonnet',
    memory: 'role.md · workflow notes', tools: 'Scoped automation tools', approval: 'External writes', icon: Workflow,
  },
  {
    name: 'Product Strategist', role: 'Product direction', model: 'Sonnet', route: 'sonnet',
    memory: 'role.md · product notes', tools: 'Research tools', approval: 'None for drafts', icon: Lightbulb,
  },
  {
    name: 'Job Search', role: 'Reviews matches', model: 'Sonnet', route: 'sonnet',
    memory: 'role.md · search notes', tools: 'Search tools', approval: 'Submitting anything', icon: BriefcaseBusiness,
  },
  {
    name: 'Outreach', role: 'Drafts follow-ups', model: 'Sonnet', route: 'sonnet',
    memory: 'role.md · outreach notes', tools: 'Drafting tools', approval: 'Every outgoing message', icon: Send,
  },
  {
    name: 'Content & Growth', role: 'Content planning', model: 'Sonnet', route: 'sonnet',
    memory: 'role.md · content notes', tools: 'Content tools', approval: 'Posting publicly', icon: Megaphone,
  },
  {
    name: 'Career Learning', role: 'Learning plans', model: 'Sonnet', route: 'sonnet',
    memory: 'role.md · learning notes', tools: 'Research tools', approval: 'None for plans', icon: GraduationCap,
  },
  {
    name: 'Homework Help', role: 'Guided support', model: 'Sonnet', route: 'sonnet',
    memory: 'role.md · study notes', tools: 'Reference tools', approval: 'None for guidance', icon: FileText,
  },
  {
    name: 'Market Analyst', role: 'On request only', model: 'Sonnet', route: 'sonnet',
    memory: 'role.md · market notes', tools: 'Research tools', approval: 'Any financial action', icon: LineChart,
    dimmed: true,
  },
];

const RUN: RunStep[] = [
  { specialist: null, route: 'opus', tone: 'running', status: 'Request received from You.', tokens: 120, panel: 'request' },
  {
    specialist: null, route: 'opus', tone: 'ai', tokens: 410, panel: 'plan',
    status: 'Chief of Staff plans and splits 3 sample tasks.',
  },
  {
    specialist: 0, route: 'sonnet', tone: 'running', tokens: 760, panel: 'brief',
    status: 'Scoped briefs dispatched in parallel.',
  },
  {
    specialist: 0, route: 'local', tone: 'failed', tokens: 1180, panel: 'failure',
    status: 'Sent back with corrective instructions.',
  },
  {
    specialist: 0, route: 'local', tone: 'success', tokens: 1510, panel: 'verified',
    status: 'Verified against tests.',
  },
  {
    specialist: 1, route: 'sonnet', tone: 'running', tokens: 1790, panel: 'verified',
    status: 'Deployment builds and uploads the release.',
  },
  {
    specialist: 5, route: 'sonnet', tone: 'approval', tokens: 2140, panel: 'approval',
    status: 'Held for your OK: outward-facing.',
  },
  {
    specialist: 5, route: 'opus', tone: 'success', tokens: 2360, panel: 'done',
    status: '3 tasks done, 1 retry, 1 approval pending.',
  },
];

const TONE_META: Record<Tone, { label: string; text: string; dot: string; border: string; bg: string }> = {
  running: { label: 'RUNNING', text: 'text-indigo-300', dot: 'bg-indigo-400', border: 'border-indigo-500/30', bg: 'bg-indigo-950/30' },
  ai: { label: 'PLANNING', text: 'text-violet-300', dot: 'bg-violet-400', border: 'border-violet-500/30', bg: 'bg-violet-950/30' },
  failed: { label: 'RETRY', text: 'text-rose-300', dot: 'bg-rose-400', border: 'border-rose-500/30', bg: 'bg-rose-950/30' },
  success: { label: 'VERIFIED', text: 'text-emerald-300', dot: 'bg-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-950/30' },
  approval: { label: 'APPROVAL GATE', text: 'text-amber-300', dot: 'bg-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-950/30' },
};

const ROUTE_META: Record<Route, { title: string; detail: string; chip: string; active: string }> = {
  opus: { title: 'Opus', detail: 'plan + judge', chip: 'bg-violet-500 text-white', active: 'border-violet-500/40 bg-violet-950/20' },
  sonnet: { title: 'Sonnet', detail: 'specialists', chip: 'bg-sky-500 text-white', active: 'border-sky-500/40 bg-sky-950/20' },
  local: { title: 'Local Qwen3-Coder', detail: 'Ollama · code + bulk · free', chip: 'bg-emerald-500 text-white', active: 'border-emerald-500/40 bg-emerald-950/20' },
};

const METRICS = [
  ['Usage in five days', '~1.5B tokens'],
  ['Prompt-cache hit rate', '~97%'],
  ['Local model tokens', '~70M'],
  ['Hosted subscription', '$25/mo'],
];

export const AiOsVisualizer: React.FC = () => {
  const { ref: visualizerRef, isInViewport } = useInViewport<HTMLDivElement>();
  const prefersReduced = usePrefersReducedMotion();
  const initialStep = prefersReduced ? 4 : 0;
  const [stepIndex, setStepIndex] = useState(initialStep);
  const [isPlaying, setIsPlaying] = useState(!prefersReduced);
  const [inspectedAgent, setInspectedAgent] = useState<number | null>(null);
  const runStepRef = useRef(initialStep);

  useEffect(() => {
    if (!isPlaying || !isInViewport || prefersReduced) return;
    const interval = window.setInterval(() => {
      runStepRef.current = (runStepRef.current + 1) % RUN.length;
      setStepIndex(runStepRef.current);
      setInspectedAgent(null);
    }, 1650);
    return () => window.clearInterval(interval);
  }, [isPlaying, isInViewport, prefersReduced]);

  const step = RUN[stepIndex];
  const tone = TONE_META[step.tone];
  const inspected = SPECIALISTS[inspectedAgent ?? 0];

  const inspectAgent = (index: number) => {
    setIsPlaying(false);
    setInspectedAgent(index);
  };

  const inspectHub = () => {
    setIsPlaying(false);
    setInspectedAgent(null);
    runStepRef.current = 1;
    setStepIndex(1);
  };

  const togglePlay = () => {
    setInspectedAgent(null);
    setIsPlaying((current) => !current);
  };

  const resetRun = () => {
    const resetStep = prefersReduced ? 4 : 0;
    runStepRef.current = resetStep;
    setStepIndex(resetStep);
    setInspectedAgent(null);
    setIsPlaying(!prefersReduced);
  };

  return (
    <div ref={visualizerRef} id="ai-os-visualizer" className="w-full bg-[#0D0F14] border border-white/[0.08] rounded-xl p-5 md:p-7 text-left shadow-2xl relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-6">
        <div className="flex min-w-0 items-center gap-2">
          <BrainCircuit className="w-4 h-4 shrink-0 text-indigo-400" />
          <span className="truncate font-mono text-xs text-zinc-300 font-medium tracking-wide uppercase">AI OS · Chief of Staff Orchestration</span>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={togglePlay} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-zinc-300 border border-white/[0.08] transition-colors cursor-pointer">
            {isPlaying ? <><Pause className="w-3.5 h-3.5 text-indigo-400" /><span>Pause Run</span></> : <><Play className="w-3.5 h-3.5 text-emerald-400" /><span>Resume Run</span></>}
          </button>
          <button type="button" onClick={resetRun} aria-label="Reset AI OS run" className="p-1.5 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white border border-white/[0.08] transition-colors cursor-pointer">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className={`mb-4 rounded-lg border px-4 py-3 flex flex-wrap items-center justify-between gap-2 transition-all duration-300 ${tone.bg} ${tone.border}`}>
        <div className="flex min-w-0 items-center gap-2.5 font-mono text-xs">
          <span className={`w-2.5 h-2.5 shrink-0 rounded-full animate-pulse ${tone.dot}`} />
          <span className={`shrink-0 ${tone.text}`}>{tone.label}</span>
          <span className="min-w-0 text-zinc-300">· {inspectedAgent === null ? step.status : `Inspected · ${SPECIALISTS[inspectedAgent].name}`}</span>
        </div>
        <span className="text-[10px] font-mono text-zinc-500">TYPICAL DAY · SIMULATED RUN</span>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-[0.8fr_1.7fr_1.05fr]">
        <section className="min-w-0 rounded-xl border border-white/[0.07] bg-[#08090C] p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] uppercase text-zinc-500">Request inbox</span>
            <span className="rounded bg-sky-500/10 px-1.5 py-0.5 font-mono text-[9px] text-sky-300">1 NEW</span>
          </div>
          <button type="button" onClick={() => { setIsPlaying(false); setInspectedAgent(null); runStepRef.current = 0; setStepIndex(0); }} className="w-full rounded-lg border border-sky-500/20 bg-sky-950/10 p-3 text-left transition-all duration-300 hover:border-sky-500/40">
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-300"><Inbox className="h-3.5 w-3.5" /></span>
              <div className="min-w-0"><div className="text-xs font-medium text-white">You</div><div className="font-mono text-[9px] text-zinc-500">NOW · SAMPLE DATA</div></div>
            </div>
            <p className="text-xs leading-relaxed text-zinc-300">Ship the Task Tracker fix and draft follow-ups to this week&apos;s leads.</p>
          </button>
          <div className="mt-3 space-y-2 font-mono text-[10px] text-zinc-500">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-emerald-400" />One request, one owner</div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-3 w-3 text-amber-400" />Approval gates stay on</div>
          </div>
        </section>

        <section className="min-w-0 rounded-xl border border-white/[0.07] bg-[#08090C] p-3">
          <button type="button" onClick={inspectHub} className="mb-3 w-full rounded-lg border border-violet-500/25 bg-violet-950/20 p-3 text-left transition-all duration-300 hover:border-violet-500/50">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2.5"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/15 text-violet-300"><Sparkles className="h-4 w-4" /></span><div className="min-w-0"><div className="truncate text-sm font-semibold text-white">Chief of Staff</div><div className="truncate font-mono text-[10px] text-violet-300">Plans · delegates · judges</div></div></div>
              <span className="shrink-0 rounded border border-violet-500/25 bg-violet-500/10 px-2 py-0.5 font-mono text-[9px] text-violet-300">OPUS</span>
            </div>
          </button>
          <div className="mb-2 flex items-center justify-between"><span className="font-mono text-[10px] uppercase text-zinc-500">Specialists</span><span className="font-mono text-[9px] text-zinc-600">CLICK TO INSPECT</span></div>
          <div className="grid grid-cols-2 gap-1.5">
            {SPECIALISTS.map((agent, index) => {
              const active = step.specialist === index || inspectedAgent === index;
              const Icon = agent.icon;
              return (
                <button key={agent.name} type="button" onClick={() => inspectAgent(index)} className={`min-w-0 rounded-lg border p-2 text-left transition-all duration-300 ${active ? 'border-indigo-500/45 bg-indigo-950/30 ring-1 ring-indigo-500/20' : agent.dimmed ? 'border-white/[0.04] bg-white/[0.01] opacity-45 hover:opacity-80' : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.14]'}`}>
                  <div className="flex min-w-0 items-center gap-1.5"><Icon className={`h-3 w-3 shrink-0 ${active ? 'text-indigo-300' : 'text-zinc-500'}`} /><span className="truncate text-[10px] font-medium text-zinc-200">{agent.name}</span><span className={`ml-auto h-1.5 w-1.5 shrink-0 rounded-full ${active ? 'bg-indigo-400 animate-pulse' : agent.dimmed ? 'bg-zinc-700' : 'bg-emerald-500/70'}`} /></div>
                  <div className="mt-1 flex min-w-0 items-center justify-between gap-1"><span className="truncate text-[9px] text-zinc-500">{agent.role}</span><span className="shrink-0 rounded bg-white/[0.04] px-1 py-0.5 font-mono text-[8px] text-zinc-400">{agent.route === 'local' ? '$0 LOCAL' : agent.model.toUpperCase()}</span></div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="grid min-w-0 rounded-xl border border-white/[0.07] bg-[#08090C] p-4 md:min-h-[304px]">
            <div aria-hidden={inspectedAgent === null} className={`col-start-1 row-start-1 min-w-0 transition-all duration-300 ${inspectedAgent !== null ? 'relative z-10 opacity-100' : 'pointer-events-none select-none opacity-0'}`}>
              <div className="mb-4 flex items-center justify-between gap-2"><span className="font-mono text-[10px] uppercase text-indigo-300">Agent inspector</span><span className="font-mono text-[9px] text-zinc-500">INSPECTED</span></div>
              <div className="mb-4 text-sm font-semibold text-white">{inspected.name}</div>
              {[['Role', inspected.role], ['Model', inspected.model], ['Memory files', inspected.memory], ['Tools it may use', inspected.tools], ['Needs approval for', inspected.approval]].map(([label, value]) => <div key={label} className="mb-2.5 min-w-0 border-b border-white/[0.05] pb-2"><div className="font-mono text-[9px] uppercase text-zinc-600">{label}</div><div className="mt-0.5 break-words text-[11px] text-zinc-300">{value}</div></div>)}
            </div>
            <div aria-hidden={inspectedAgent !== null} className={`col-start-1 row-start-1 min-w-0 transition-all duration-300 ${inspectedAgent === null ? 'relative z-10 opacity-100' : 'pointer-events-none select-none opacity-0'}`}>
              <div className="mb-3 flex items-center justify-between gap-2"><span className="font-mono text-[10px] uppercase text-zinc-500">Scoped brief</span><span className="rounded bg-white/[0.04] px-1.5 py-0.5 font-mono text-[9px] text-zinc-500">SAMPLE DATA</span></div>
              <div className="space-y-2.5">
                <div><div className="font-mono text-[9px] uppercase text-zinc-600">Goal</div><div className="text-[11px] text-zinc-300">Fix the task completion state.</div></div>
                <div><div className="font-mono text-[9px] uppercase text-zinc-600">Files</div><div className="text-[11px] text-zinc-300">Task row · task tests</div></div>
                <div><div className="font-mono text-[9px] uppercase text-zinc-600">Expected output</div><div className="text-[11px] text-zinc-300">Patch plus passing tests</div></div>
                <div><div className="font-mono text-[9px] uppercase text-zinc-600">Tools allowed</div><div className="text-[11px] text-zinc-300">Code editor · test runner</div></div>
                <div className="flex items-center gap-2 rounded-lg border border-white/[0.05] bg-white/[0.02] p-2 text-[10px] text-zinc-600"><LockKeyhole className="h-3 w-3 shrink-0" /><span className="line-through">Full chat history: not shared</span></div>
                <div className={`rounded-lg border p-2.5 transition-all duration-300 ${tone.border} ${tone.bg}`}>
                  <div className={`flex items-center gap-2 text-[11px] ${tone.text}`}>{step.tone === 'failed' ? <XCircle className="h-3.5 w-3.5" /> : step.tone === 'success' ? <CheckCircle2 className="h-3.5 w-3.5" /> : step.tone === 'approval' ? <ShieldCheck className="h-3.5 w-3.5" /> : <Wrench className="h-3.5 w-3.5" />}<span>{step.status}</span></div>
                </div>
              </div>
            </div>
        </section>
      </div>

      <div className="mt-3 rounded-xl border border-white/[0.07] bg-[#08090C] p-3">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2"><span className="font-mono text-[10px] uppercase text-zinc-500">Model routing</span><span className="font-mono text-[9px] text-zinc-500">Cheapest model suited to the work</span></div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {(Object.keys(ROUTE_META) as Route[]).map((route) => { const routeInfo = ROUTE_META[route]; const active = route === step.route; return <div key={route} className={`relative min-w-0 overflow-hidden rounded-lg border px-3 py-2 transition-all duration-300 ${active ? routeInfo.active : 'border-white/[0.05] bg-white/[0.01]'}`}><div className="flex min-w-0 items-center justify-between gap-2"><div className="min-w-0"><div className="truncate text-[11px] font-medium text-zinc-200">{routeInfo.title}</div><div className="truncate font-mono text-[9px] text-zinc-500">{routeInfo.detail}</div></div><span className={`shrink-0 rounded px-1.5 py-0.5 font-mono text-[8px] transition-all duration-300 ${active ? `translate-x-0 opacity-100 ${routeInfo.chip}` : 'translate-x-3 bg-zinc-800 text-zinc-500 opacity-0'}`}>TASK</span></div></div>; })}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {METRICS.map(([label, value]) => <div key={label} className="min-w-0 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2"><div className="truncate font-mono text-[8px] uppercase text-zinc-600">{label} · real</div><div className="truncate text-xs font-semibold text-white">{value}</div></div>)}
        <div className="col-span-2 min-w-0 rounded-lg border border-sky-500/15 bg-sky-950/10 px-3 py-2 sm:col-span-1"><div className="font-mono text-[8px] uppercase text-sky-400/70">Tokens this run · sample</div><div className="text-xs font-semibold text-sky-300">{step.tokens.toLocaleString()}</div></div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/[0.04] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-zinc-500">
        <span>Useful work with human judgment and control</span>
        <span className="text-indigo-400">Request → Plan → Delegate → Verify → Approve</span>
      </div>
    </div>
  );
};
