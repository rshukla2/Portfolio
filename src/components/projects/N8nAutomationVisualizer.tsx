import React, { useEffect, useRef, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BellRing,
  CheckCircle2,
  Clock3,
  Copy,
  Download,
  FileSpreadsheet,
  HardDrive,
  LockKeyhole,
  Mail,
  MessageSquare,
  Pause,
  Play,
  RefreshCcw,
  RotateCcw,
  Server,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Tags,
  UserCheck,
  Webhook,
  Workflow,
} from 'lucide-react';
import { useInViewport } from '../../hooks/useInViewport';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

type WorkflowId = 'jobs' | 'leads' | 'recruiters';
type NodeTone = 'run' | 'data' | 'ai' | 'human' | 'success';
type RunTone = 'running' | 'ai' | 'failed' | 'alerted' | 'recovered';

interface FlowNode {
  title: string;
  note: string;
  tone: NodeTone;
  icon: React.ComponentType<{ className?: string }>;
}

interface WorkflowDefinition {
  id: WorkflowId;
  label: string;
  nodes: FlowNode[];
  edges: string[];
}

const WORKFLOWS: WorkflowDefinition[] = [
  {
    id: 'jobs',
    label: 'Daily Job Scan',
    nodes: [
      { title: 'Schedule', note: 'Every morning', tone: 'run', icon: Clock3 },
      { title: 'Fetch boards', note: 'About 450 daily', tone: 'data', icon: Download },
      { title: 'Filter', note: 'Role · location · seniority', tone: 'run', icon: SlidersHorizontal },
      { title: 'Dedupe', note: 'Remove repeats', tone: 'run', icon: Copy },
      { title: 'LLM score', note: 'Bounded LLM step', tone: 'ai', icon: Sparkles },
      { title: 'Tracking sheet', note: 'Write best matches', tone: 'success', icon: FileSpreadsheet },
    ],
    edges: ['450 boards', '1,240 postings', '86 matches', '61 unique', 'top 12'],
  },
  {
    id: 'leads',
    label: 'Lead Pipeline',
    nodes: [
      { title: 'Webhook / Gmail', note: 'Form or inbound email', tone: 'data', icon: Webhook },
      { title: 'Lead sheet', note: 'Log the new lead', tone: 'success', icon: FileSpreadsheet },
      { title: 'LLM draft', note: 'Bounded reply draft', tone: 'ai', icon: Sparkles },
      { title: 'Human review', note: 'Nothing auto-sends', tone: 'human', icon: UserCheck },
      { title: 'Phone alert', note: 'New lead notice', tone: 'data', icon: BellRing },
    ],
    edges: ['1 item', '1 logged', '1 draft', '1 alert'],
  },
  {
    id: 'recruiters',
    label: 'Recruiter Tracker',
    nodes: [
      { title: 'LinkedIn email', note: 'Notification arrives', tone: 'data', icon: Mail },
      { title: 'Classify', note: 'Bounded LLM step', tone: 'ai', icon: Tags },
      { title: 'Tracking sheet', note: 'Log the message', tone: 'success', icon: FileSpreadsheet },
      { title: 'Suggested reply', note: 'Prepared for review', tone: 'human', icon: MessageSquare },
    ],
    edges: ['1 notice', '1 classified', '1 suggestion'],
  },
];

const RUN: { node: number; tone: RunTone }[] = [
  { node: 0, tone: 'running' },
  { node: 1, tone: 'running' },
  { node: 2, tone: 'running' },
  { node: 3, tone: 'running' },
  { node: 4, tone: 'ai' },
  { node: 5, tone: 'running' },
  { node: 5, tone: 'failed' },
  { node: 5, tone: 'alerted' },
  { node: 5, tone: 'recovered' },
];

const NODE_STYLES: Record<NodeTone, { card: string; icon: string; chip: string }> = {
  run: {
    card: 'border-indigo-500/30 bg-indigo-950/20',
    icon: 'text-indigo-300',
    chip: 'bg-indigo-500/15 text-indigo-300',
  },
  data: {
    card: 'border-sky-500/30 bg-sky-950/20',
    icon: 'text-sky-300',
    chip: 'bg-sky-500/15 text-sky-300',
  },
  ai: {
    card: 'border-violet-500/40 bg-violet-950/25',
    icon: 'text-violet-300',
    chip: 'bg-violet-500/15 text-violet-300',
  },
  human: {
    card: 'border-amber-500/40 bg-amber-950/20',
    icon: 'text-amber-300',
    chip: 'bg-amber-500/15 text-amber-300',
  },
  success: {
    card: 'border-emerald-500/30 bg-emerald-950/20',
    icon: 'text-emerald-300',
    chip: 'bg-emerald-500/15 text-emerald-300',
  },
};

const RUN_STYLES: Record<RunTone, { label: string; text: string; dot: string; panel: string }> = {
  running: { label: 'RUNNING', text: 'text-indigo-300', dot: 'bg-indigo-400', panel: 'border-indigo-500/20' },
  ai: { label: 'BOUNDED LLM', text: 'text-violet-300', dot: 'bg-violet-400', panel: 'border-violet-500/20' },
  failed: { label: 'NODE FAILED', text: 'text-rose-300', dot: 'bg-rose-400', panel: 'border-rose-500/30' },
  alerted: { label: 'ERROR WORKFLOW', text: 'text-amber-300', dot: 'bg-amber-400', panel: 'border-amber-500/30' },
  recovered: { label: 'RECOVERED', text: 'text-emerald-300', dot: 'bg-emerald-400', panel: 'border-emerald-500/30' },
};

const HEALTH_CHECKS = [
  { label: 'Weekly backup', icon: HardDrive },
  { label: 'Auto-update with health-check rollback', icon: RefreshCcw },
  { label: 'Daily disk check', icon: Server },
  { label: 'External uptime monitor', icon: Activity },
  { label: 'Credentials in credential store', icon: LockKeyhole },
];

export const N8nAutomationVisualizer: React.FC = () => {
  const { ref: visualizerRef, isInViewport } = useInViewport<HTMLDivElement>();
  const prefersReduced = usePrefersReducedMotion();
  const representativeStep = 4;
  const [workflowId, setWorkflowId] = useState<WorkflowId>('jobs');
  const [runStep, setRunStep] = useState<number>(prefersReduced ? representativeStep : 0);
  const [activeNode, setActiveNode] = useState<number>(prefersReduced ? 4 : 0);
  const [isPlaying, setIsPlaying] = useState<boolean>(!prefersReduced);
  const [inspected, setInspected] = useState<boolean>(false);
  const runStepRef = useRef<number>(prefersReduced ? representativeStep : 0);

  const workflow = WORKFLOWS.find((item) => item.id === workflowId) ?? WORKFLOWS[0];
  const runTone = RUN_STYLES[RUN[runStep].tone];

  useEffect(() => {
    if (!isPlaying || !isInViewport || prefersReduced) return;

    const interval = window.setInterval(() => {
      const nextStep = (runStepRef.current + 1) % RUN.length;
      runStepRef.current = nextStep;
      setRunStep(nextStep);
      setActiveNode(Math.min(RUN[nextStep].node, workflow.nodes.length - 1));
      setInspected(false);
    }, 1600);

    return () => window.clearInterval(interval);
  }, [isPlaying, isInViewport, prefersReduced, workflow.nodes.length]);

  useEffect(() => {
    if (!prefersReduced) return;
    runStepRef.current = representativeStep;
    setRunStep(representativeStep);
    setActiveNode(Math.min(RUN[representativeStep].node, workflow.nodes.length - 1));
    setIsPlaying(false);
    setInspected(false);
  }, [prefersReduced, workflow.nodes.length]);

  const selectWorkflow = (id: WorkflowId) => {
    setWorkflowId(id);
    setActiveNode(0);
    setInspected(true);
    setIsPlaying(false);
  };

  const inspectNode = (index: number) => {
    setActiveNode(index);
    setInspected(true);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setInspected(false);
    setIsPlaying((current) => !current);
  };

  const resetRun = () => {
    const resetStep = prefersReduced ? representativeStep : 0;
    runStepRef.current = resetStep;
    setWorkflowId('jobs');
    setRunStep(resetStep);
    setActiveNode(prefersReduced ? 4 : 0);
    setInspected(false);
    setIsPlaying(!prefersReduced);
  };

  const statusText = getStatusText(workflow, runStep, activeNode, inspected);
  const executionRows = getExecutionRows(workflow, runStep);

  return (
    <div
      ref={visualizerRef}
      id="n8n-automation-visualizer"
      className="w-full bg-[#0D0F14] border border-white/[0.08] rounded-xl p-5 md:p-7 text-left shadow-2xl relative overflow-hidden"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-6">
        <div className="min-w-0 flex items-center gap-2">
          <Workflow className="w-4 h-4 shrink-0 text-indigo-400" />
          <span className="truncate font-mono text-xs text-zinc-300 font-medium tracking-wide uppercase">
            Production Automation Canvas
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2 py-1 rounded-md bg-sky-500/10 border border-sky-500/20 text-[10px] font-mono text-sky-300">
            Oracle Cloud · Docker · Caddy HTTPS
          </span>
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
            aria-label="Reset automation run"
            className="p-1.5 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white border border-white/[0.08] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Automation workflows">
          {WORKFLOWS.map((item) => {
            const selected = item.id === workflowId;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => selectWorkflow(item.id)}
                className={selected
                  ? 'px-3 py-1.5 rounded-lg border border-indigo-500/40 bg-indigo-950/40 text-xs font-mono text-indigo-200 transition-all duration-300 cursor-pointer'
                  : 'px-3 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-all duration-300 cursor-pointer'}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <span className="text-[10px] font-mono uppercase tracking-wide text-zinc-600">Simulated run · sample edge counts</span>
      </div>

      <div className="grid min-w-0">
        {WORKFLOWS.map((item) => {
          const visible = item.id === workflowId;
          return (
            <div
              key={item.id}
              role="tabpanel"
              aria-hidden={!visible}
              className={visible
                ? 'relative z-10 col-start-1 row-start-1 min-w-0 opacity-100 transition-all duration-300'
                : 'pointer-events-none select-none col-start-1 row-start-1 min-w-0 opacity-0 transition-all duration-300'}
            >
              <div className="bg-[#08090C] border border-white/[0.08] rounded-xl p-3 md:p-4 min-w-0">
                <div className="flex flex-col md:flex-row md:items-stretch min-w-0">
                  {item.nodes.map((node, index) => (
                    <React.Fragment key={node.title}>
                      <FlowNodeCard
                        node={node}
                        active={visible && index === activeNode}
                        failed={visible && index === activeNode && RUN[runStep].tone === 'failed'}
                        onInspect={() => inspectNode(index)}
                      />
                      {index < item.edges.length && (
                        <FlowConnector label={item.edges[index]} active={visible && activeNode === index + 1} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={`mt-4 bg-[#08090C] border rounded-lg px-4 py-3 flex flex-wrap items-center justify-between gap-3 ${runTone.panel}`}>
        <div className="min-w-0 flex items-center gap-2.5 font-mono text-xs">
          <span className={`w-2.5 h-2.5 shrink-0 rounded-full animate-pulse ${runTone.dot}`} aria-hidden="true" />
          <span className={`shrink-0 ${runTone.text}`}>{inspected ? 'INSPECTED' : runTone.label}</span>
          <span className="min-w-0 text-zinc-400">· {statusText}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500">
          {RUN[runStep].tone === 'failed' ? <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> : <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
          deterministic flow
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#08090C] border border-white/[0.07] rounded-lg p-4 min-w-0">
          <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] pb-2 mb-3">
            <span className="text-[10px] font-mono uppercase tracking-wide text-zinc-500">Execution log</span>
            <span className="text-[10px] font-mono text-emerald-400">live simulation</span>
          </div>
          <div className="space-y-2 min-h-[104px]">
            {executionRows.map((row) => (
              <div key={row.text} className="flex min-w-0 items-start gap-2 text-[11px] font-mono">
                {row.tone === 'fail' ? (
                  <AlertTriangle className="mt-0.5 w-3 h-3 shrink-0 text-rose-400" />
                ) : row.tone === 'alert' ? (
                  <Mail className="mt-0.5 w-3 h-3 shrink-0 text-amber-400" />
                ) : (
                  <CheckCircle2 className="mt-0.5 w-3 h-3 shrink-0 text-emerald-400" />
                )}
                <span className={row.tone === 'fail' ? 'text-rose-300' : row.tone === 'alert' ? 'text-amber-300' : 'text-zinc-400'}>
                  {row.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#08090C] border border-white/[0.07] rounded-lg p-4 min-w-0">
          <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] pb-2 mb-3">
            <span className="text-[10px] font-mono uppercase tracking-wide text-zinc-500">Production health</span>
            <span className="text-[10px] font-mono text-zinc-600">weekly log audit</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-2">
            {HEALTH_CHECKS.map((check, index) => {
              const HealthIcon = check.icon;
              const checked = runStep >= Math.min(index, 4) || prefersReduced;
              return (
                <div key={check.label} className="flex min-w-0 items-center gap-2 text-[11px] text-zinc-400">
                  <span className={checked ? 'w-5 h-5 shrink-0 rounded-md bg-emerald-500/10 flex items-center justify-center transition-all duration-300' : 'w-5 h-5 shrink-0 rounded-md bg-white/[0.03] flex items-center justify-center transition-all duration-300'}>
                    {checked ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <HealthIcon className="w-3 h-3 text-zinc-600" />}
                  </span>
                  <span>{check.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/[0.04] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-zinc-500">
        <span>Deterministic flows, LLMs only in bounded steps</span>
        <span className="text-indigo-400">Trigger → Process → Review → Monitor</span>
      </div>
    </div>
  );
};

function FlowNodeCard({
  node,
  active,
  failed,
  onInspect,
}: {
  node: FlowNode;
  active: boolean;
  failed: boolean;
  onInspect: () => void;
}) {
  const Icon = node.icon;
  const style = NODE_STYLES[node.tone];
  const activeStyle = failed
    ? 'ring-1 ring-rose-500/70 border-rose-500/60 bg-rose-950/30 shadow-[0_0_18px_rgba(244,63,94,0.12)]'
    : `${style.card} ring-1 ring-white/10 shadow-[0_0_18px_rgba(99,102,241,0.10)]`;

  return (
    <button
      type="button"
      onClick={onInspect}
      className={`w-full md:flex-1 md:min-w-0 min-h-[86px] p-3 rounded-lg border text-left transition-all duration-300 cursor-pointer ${active ? activeStyle : 'border-white/[0.06] bg-white/[0.02] opacity-70 hover:opacity-100'}`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className={`w-7 h-7 rounded-md flex items-center justify-center ${style.chip}`}>
          <Icon className={`w-3.5 h-3.5 ${style.icon}`} />
        </span>
        <span className={active ? 'w-2 h-2 rounded-full bg-indigo-400 animate-pulse' : 'w-2 h-2 rounded-full bg-zinc-700'} aria-hidden="true" />
      </div>
      <div className="text-xs font-semibold text-zinc-100 leading-tight truncate">{node.title}</div>
      <div className="mt-1 text-[10px] leading-snug text-zinc-500 md:line-clamp-2">{node.note}</div>
    </button>
  );
}

function FlowConnector({ label, active }: { label: string; active: boolean }) {
  return (
    <div className="relative h-10 md:h-auto md:w-14 shrink-0 flex items-center justify-center" aria-hidden="true">
      <span className="absolute top-0 bottom-0 left-1/2 w-px md:inset-x-0 md:top-1/2 md:w-auto md:h-px bg-white/[0.12]" />
      <span className="relative z-10 px-1.5 py-0.5 rounded-full md:rounded-md border border-sky-500/20 bg-[#0D0F14] text-[8px] font-mono text-sky-300 whitespace-nowrap md:text-center md:leading-tight">
        <span className="md:hidden">{label}</span>
        <span className="hidden md:block">{label.split(' ')[0]}</span>
        <span className="hidden md:block text-sky-300/70">{label.split(' ').slice(1).join(' ')}</span>
      </span>
      <span className={active ? 'md:hidden absolute left-1/2 top-1 w-1.5 h-1.5 -translate-x-1/2 translate-y-6 rounded-full bg-sky-400 transition-all duration-300' : 'md:hidden absolute left-1/2 top-1 w-1.5 h-1.5 -translate-x-1/2 rounded-full bg-sky-400/40 transition-all duration-300'} />
      <span className={active ? 'hidden md:block absolute left-1 top-1/2 w-1.5 h-1.5 -translate-y-1/2 translate-x-11 rounded-full bg-sky-400 transition-all duration-300' : 'hidden md:block absolute left-1 top-1/2 w-1.5 h-1.5 -translate-y-1/2 rounded-full bg-sky-400/40 transition-all duration-300'} />
    </div>
  );
}

function getStatusText(workflow: WorkflowDefinition, step: number, activeNode: number, inspected: boolean) {
  if (inspected) return `${workflow.nodes[activeNode].title}: ${workflow.nodes[activeNode].note}`;
  if (RUN[step].tone === 'failed') return `${workflow.nodes[workflow.nodes.length - 1].title} failed in this sample run`;
  if (RUN[step].tone === 'alerted') return 'Error Workflow sent an email alert to the owner';
  if (RUN[step].tone === 'recovered') return 'The next run completed successfully';
  return `${workflow.nodes[activeNode].title}: ${workflow.nodes[activeNode].note}`;
}

function getExecutionRows(workflow: WorkflowDefinition, step: number) {
  const completedNodes = workflow.nodes.slice(0, Math.min(step + 1, workflow.nodes.length));
  const rows: { text: string; tone: 'ok' | 'fail' | 'alert' }[] = completedNodes
    .slice(-3)
    .map((node) => ({ text: `Success · ${node.title}`, tone: 'ok' }));

  if (RUN[step].tone === 'failed') rows.push({ text: `Failed · ${workflow.nodes[workflow.nodes.length - 1].title}`, tone: 'fail' });
  if (RUN[step].tone === 'alerted') {
    rows.push({ text: 'Error Workflow · owner email alert sent', tone: 'alert' });
  }
  if (RUN[step].tone === 'recovered') rows.push({ text: 'Success · next sample run recovered', tone: 'ok' });
  return rows.slice(-4);
}
