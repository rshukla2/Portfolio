import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, Terminal, ShieldCheck, Cpu } from 'lucide-react';

const PIPELINE_STEPS = [
  { id: 'prd', label: 'PRD INGESTION', detail: '40-Page Product Spec' },
  { id: 'plan', label: 'DECOMPOSITION', detail: '326 Atomic Subtasks' },
  { id: 'dag', label: 'DEPENDENCY GRAPH', detail: 'DAG Conflict Resolution' },
  { id: 'queue', label: 'TASK QUEUE', detail: 'Context-Bounded Stream' },
  { id: 'codex', label: 'CODEX EXECUTION', detail: 'Pre-inspects existing code' },
  { id: 'test', label: 'AUTOMATED QA', detail: 'Unit & Integration Specs' },
  { id: 'result', label: 'STRUCTURED MERGE', detail: '99.4% Verified Yield' },
];

const LOG_SNIPPETS = [
  { task: '#042', title: 'Inspect Auth middleware before edit', status: 'MATCHED', duration: '1.2s' },
  { task: '#043', title: 'Implement Stripe webhook signature verification', status: 'TESTS 4/4 PASS', duration: '3.8s' },
  { task: '#044', title: 'Resolve race condition in worker event queue', status: 'PASSED', duration: '2.1s' },
  { task: '#045', title: 'Generate database migration for session state', status: 'VERIFIED', duration: '1.9s' },
  { task: '#046', title: 'Verify token expiration edge case in Redis client', status: 'TESTS 3/3 PASS', duration: '2.4s' },
];

export const AiCodeManagerVisualizer: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(4);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentLogIndex, setCurrentLogIndex] = useState<number>(0);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % PIPELINE_STEPS.length);
      setCurrentLogIndex((prev) => (prev + 1) % LOG_SNIPPETS.length);
    }, 2400);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div
      id="ai-code-manager-visualizer"
      className="w-full bg-[#0D0F14] border border-white/[0.08] rounded-xl p-5 md:p-7 text-left shadow-2xl relative overflow-hidden"
    >
      {/* Top Header & Interactive Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs text-zinc-300 font-medium tracking-wide uppercase">
            Autonomous Orchestration Pipeline
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            id="toggle-playback-btn"
            onClick={() => setIsPlaying(!isPlaying)}
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
            id="reset-pipeline-btn"
            onClick={() => {
              setActiveStepIndex(0);
              setCurrentLogIndex(0);
            }}
            aria-label="Reset visualizer"
            className="p-1.5 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white border border-white/[0.08] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Real Stats Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-white/[0.02] border border-white/[0.05] p-3 rounded-lg">
          <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">PRD Ingested</div>
          <div className="text-lg font-semibold text-white mt-0.5">40 Pages</div>
        </div>
        <div className="bg-white/[0.02] border border-white/[0.05] p-3 rounded-lg">
          <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Subtasks Generated</div>
          <div className="text-lg font-semibold text-white mt-0.5">326 Tasks</div>
        </div>
        <div className="bg-white/[0.02] border border-white/[0.05] p-3 rounded-lg">
          <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Yield / Success</div>
          <div className="text-lg font-semibold text-emerald-400 mt-0.5">324 Passed (99.4%)</div>
        </div>
        <div className="bg-white/[0.02] border border-white/[0.05] p-3 rounded-lg">
          <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Execution Mode</div>
          <div className="text-lg font-semibold text-indigo-300 mt-0.5">~36h Autonomous</div>
        </div>
      </div>

      {/* Animated Flow Steps */}
      <div className="mb-6">
        <div className="text-xs font-mono text-zinc-400 mb-3 flex items-center justify-between">
          <span>PIPELINE EXECUTION FLOW</span>
          <span className="text-indigo-400">Step {activeStepIndex + 1} of {PIPELINE_STEPS.length}</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
          {PIPELINE_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            const isCompleted = idx < activeStepIndex;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`relative text-left p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-950/40 border-indigo-500/60 shadow-[0_0_15px_rgba(99,102,241,0.15)] ring-1 ring-indigo-500/40'
                    : isCompleted
                    ? 'bg-white/[0.03] border-white/[0.1] text-zinc-300'
                    : 'bg-white/[0.01] border-white/[0.04] text-zinc-500 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[10px] text-zinc-500">0{idx + 1}</span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : isActive ? (
                    <Cpu className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
                  ) : null}
                </div>
                <div className="font-mono text-xs font-semibold tracking-tight text-white mb-1">
                  {step.label}
                </div>
                <div className="text-[11px] text-zinc-400 leading-snug truncate">
                  {step.detail}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Agent Execution Output Terminal */}
      <div className="bg-[#08090C] border border-white/[0.07] rounded-lg p-4 font-mono text-xs">
        <div className="flex items-center justify-between text-zinc-500 border-b border-white/[0.06] pb-2 mb-3 text-[11px]">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span>AGENT RUNTIME TASK LOG</span>
          </div>
          <span className="text-zinc-500">Node: worker-daemon-01</span>
        </div>

        <div className="space-y-2 text-zinc-300">
          <div className="flex items-start gap-2 text-zinc-400">
            <span className="text-indigo-400">➜</span>
            <span>
              <span className="text-zinc-500">Current Phase:</span>{' '}
              <strong className="text-white font-medium">{PIPELINE_STEPS[activeStepIndex].label}</strong>:{' '}
              {PIPELINE_STEPS[activeStepIndex].detail}
            </span>
          </div>

          <div className="bg-white/[0.02] p-2.5 rounded border border-white/[0.04] flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-semibold">{LOG_SNIPPETS[currentLogIndex].task}</span>
              <span className="text-zinc-200">{LOG_SNIPPETS[currentLogIndex].title}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-zinc-500">{LOG_SNIPPETS[currentLogIndex].duration}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                {LOG_SNIPPETS[currentLogIndex].status}
              </span>
            </div>
          </div>

          <div className="text-[11px] text-zinc-500 flex items-center gap-1.5 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Codex verified against codebase ast snapshot prior to mutation.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
