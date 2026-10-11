import React, { useEffect, useRef, useState } from 'react';
import {
  Network,
  Cpu,
  UserCheck,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Play,
  Pause,
  RotateCcw,
} from 'lucide-react';
import { useInViewport } from '../../hooks/useInViewport';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

type Tone = 'run' | 'human' | 'fail' | 'fix' | 'pass';

interface Stage {
  id: string;
  code: string;
  title: string;
  role: string;
  isHuman?: boolean;
  detail: string;
}

const STAGES: Stage[] = [
  {
    id: 'requirements',
    code: '01',
    title: 'Requirements',
    role: 'Structured Intake',
    detail:
      'Software requirements are ingested as a structured input the agents can reason over, not a wall of free text.',
  },
  {
    id: 'plan',
    code: '02',
    title: 'Plan',
    role: 'Planner Agent',
    detail:
      'A planner agent decomposes the requirements into an executable plan and flags anything ambiguous for a human to clarify.',
  },
  {
    id: 'prepare',
    code: '03',
    title: 'Prepare',
    role: 'Setup / Learner Agent',
    detail:
      'A setup agent prepares safe, disposable test conditions from reusable setup knowledge, so every run starts from a clean, repeatable state.',
  },
  {
    id: 'validate',
    code: '04',
    title: 'Validate',
    role: 'Tester Agent',
    detail:
      'A tester agent drives the application through the UI and checks outcomes against executable test specifications.',
  },
  {
    id: 'fix',
    code: '05',
    title: 'Fix',
    role: 'Fixer Agent',
    detail:
      'When validation fails, structured failure evidence is packaged and handed to a fixer agent, which repairs and rebuilds.',
  },
  {
    id: 'retest',
    code: '06',
    title: 'Retest',
    role: 'Repair / Retest Loop',
    detail:
      'The repaired build is re-validated. Guardrails and stop conditions bound how many repair cycles are allowed.',
  },
  {
    id: 'approval',
    code: '07',
    title: 'Human Approval',
    role: 'Human Sign-off',
    isHuman: true,
    detail:
      'A human reviews the validated result and approves delivery. Ambiguity and final approval always stay with a person.',
  },
];

// The scripted run the token follows: it validates, fails, routes through the
// repair loop, re-validates, then reaches human approval.
const RUN: { node: number; tone: Tone; status: string }[] = [
  { node: 0, tone: 'run', status: 'Requirements ingested' },
  { node: 1, tone: 'run', status: 'Planner agent decomposes the plan' },
  { node: 1, tone: 'human', status: 'Ambiguity flagged → human clarification' },
  { node: 2, tone: 'run', status: 'Setup agent prepares disposable test state' },
  { node: 3, tone: 'fail', status: 'Validation failed → evidence packaged' },
  { node: 4, tone: 'fix', status: 'Fixer agent repairs and rebuilds' },
  { node: 5, tone: 'run', status: 'Retest the repaired build' },
  { node: 3, tone: 'pass', status: 'Re-validation passed' },
  { node: 6, tone: 'human', status: 'Human reviews and approves delivery' },
];

const TONE_META: Record<Tone, { label: string; text: string; ring: string; dot: string; bg: string }> = {
  run: { label: 'RUNNING', text: 'text-indigo-300', ring: 'ring-indigo-500/50', dot: 'bg-indigo-500', bg: 'bg-indigo-950/40' },
  human: { label: 'HUMAN GATE', text: 'text-amber-300', ring: 'ring-amber-500/50', dot: 'bg-amber-500', bg: 'bg-amber-950/30' },
  fail: { label: 'FAILED · RETRY', text: 'text-rose-300', ring: 'ring-rose-500/50', dot: 'bg-rose-500', bg: 'bg-rose-950/30' },
  fix: { label: 'REPAIRING', text: 'text-amber-300', ring: 'ring-amber-500/50', dot: 'bg-amber-500', bg: 'bg-amber-950/30' },
  pass: { label: 'RECOVERED', text: 'text-emerald-300', ring: 'ring-emerald-500/50', dot: 'bg-emerald-500', bg: 'bg-emerald-950/30' },
};

const GUARDRAILS = ['Guardrails On', 'Stop Conditions', 'Disposable Test Data', 'Human Sign-off'];

export const EnterpriseDeliveryVisualizer: React.FC = () => {
  const { ref: visualizerRef, isInViewport } = useInViewport<HTMLDivElement>();
  const prefersReduced = usePrefersReducedMotion();

  const [activeNode, setActiveNode] = useState<number>(0);
  const [tone, setTone] = useState<Tone>('run');
  const [status, setStatus] = useState<string>(RUN[0].status);
  const [inspecting, setInspecting] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(!prefersReduced);
  const runStepRef = useRef<number>(0);

  useEffect(() => {
    if (!isPlaying || !isInViewport || prefersReduced) return;

    const interval = setInterval(() => {
      runStepRef.current = (runStepRef.current + 1) % RUN.length;
      const step = RUN[runStepRef.current];
      setActiveNode(step.node);
      setTone(step.tone);
      setStatus(step.status);
      setInspecting(false);
    }, 1600);

    return () => clearInterval(interval);
  }, [isPlaying, isInViewport, prefersReduced]);

  const inspectStage = (index: number) => {
    setIsPlaying(false);
    setInspecting(true);
    setActiveNode(index);
    const stage = STAGES[index];
    setTone(stage.isHuman ? 'human' : 'run');
    setStatus(`Inspecting · ${stage.title}`);
  };

  const togglePlay = () => {
    if (inspecting) setInspecting(false);
    setIsPlaying((prev) => !prev);
  };

  const resetRun = () => {
    runStepRef.current = 0;
    setActiveNode(0);
    setTone('run');
    setStatus(RUN[0].status);
    setInspecting(false);
    setIsPlaying(!prefersReduced);
  };

  const meta = TONE_META[tone];

  return (
    <div
      ref={visualizerRef}
      id="enterprise-delivery-visualizer"
      className="w-full bg-[#0D0F14] border border-white/[0.08] rounded-xl p-5 md:p-7 text-left shadow-2xl relative overflow-hidden"
    >
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-indigo-400" />
          <span className="font-mono text-xs text-zinc-300 font-medium tracking-wide uppercase">
            Enterprise Agentic Delivery · Multi-Agent Validation
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            id="enterprise-toggle-btn"
            onClick={togglePlay}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-zinc-300 border border-white/[0.08] transition-colors cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-indigo-400" />
                <span>Pause Run</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                <span>Resume Run</span>
              </>
            )}
          </button>

          <button
            type="button"
            id="enterprise-reset-btn"
            onClick={resetRun}
            aria-label="Reset delivery pipeline"
            className="p-1.5 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white border border-white/[0.08] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Guardrails strip */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 text-[11px] font-mono">
        <span className="flex items-center gap-1.5 text-zinc-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          Guardrails
        </span>
        {GUARDRAILS.map((rail) => (
          <span key={rail} className="text-zinc-400">
            {rail}
          </span>
        ))}
      </div>

      {/* Pipeline Stepper */}
      <div className="mb-6">
        <div className="text-xs font-mono text-zinc-400 mb-3 flex items-center justify-between">
          <span>DELIVERY PIPELINE</span>
          <span className="text-indigo-400">
            {STAGES[activeNode].code} / {STAGES.length}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {STAGES.map((stage, idx) => {
            const isActive = idx === activeNode;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => inspectStage(idx)}
                className={`relative text-left p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? `${meta.bg} ${meta.ring} ring-1 border-white/10 text-white`
                    : stage.isHuman
                    ? 'bg-amber-950/10 border-amber-500/20 text-amber-200/80'
                    : 'bg-white/[0.01] border-white/[0.04] text-zinc-500 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[10px] text-zinc-500">{stage.code}</span>
                  {isActive ? (
                    <span className={`w-2.5 h-2.5 rounded-full ${meta.dot} animate-pulse`} />
                  ) : stage.isHuman ? (
                    <UserCheck className="w-3.5 h-3.5 text-amber-400/70" />
                  ) : (
                    <Cpu className="w-3.5 h-3.5 text-zinc-600" />
                  )}
                </div>
                <div className="font-mono text-xs font-semibold tracking-tight text-white mb-1">{stage.title}</div>
                <div className="text-[11px] text-zinc-400 leading-snug truncate">{stage.role}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live status ribbon */}
      <div className="mb-6 bg-[#08090C] border border-white/[0.07] rounded-lg px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 font-mono text-xs">
          <span className={`w-2.5 h-2.5 rounded-full ${meta.dot} animate-pulse`} />
          <span className={meta.text}>{meta.label}</span>
          <span className="text-zinc-400">· {status}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500">
          {tone === 'fail' ? (
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
          ) : tone === 'pass' ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
          )}
          <span>worker: delivery-orchestrator</span>
        </div>
      </div>

      {/* Stage detail (crossfaded) */}
      <div className="grid">
        {STAGES.map((stage, index) => {
          const isActive = index === activeNode;
          return (
            <div
              key={stage.id}
              aria-hidden={!isActive}
              className={`col-start-1 row-start-1 bg-[#08090C] border border-white/[0.08] rounded-xl p-5 space-y-3 transition-opacity duration-200 ${
                isActive ? 'relative z-10 opacity-100' : 'pointer-events-none select-none opacity-0'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono text-xs px-2 py-0.5 rounded font-bold ${
                      stage.isHuman ? 'bg-amber-500/20 text-amber-300' : 'bg-indigo-500/20 text-indigo-300'
                    }`}
                  >
                    {stage.code}
                  </span>
                  <span className="text-sm font-semibold text-white">{stage.title}</span>
                  {stage.isHuman ? (
                    <span className="text-xs text-amber-400 font-mono flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5" />
                      Human Gate
                    </span>
                  ) : (
                    <span className="text-xs font-mono text-indigo-400/80 flex items-center gap-1">
                      <Cpu className="w-3.5 h-3.5" />
                      {stage.role}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-mono text-zinc-500">{inspecting ? 'Inspected' : 'Auto-running'}</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">{stage.detail}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-white/[0.04] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-zinc-500">
        <span>Automate the repetitive delivery loop · keep humans on ambiguity and approval</span>
        <span className="text-indigo-400">Deliver → Validate → Fix → Retest → Approve</span>
      </div>
    </div>
  );
};
