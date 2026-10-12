import React, { useEffect, useRef, useState } from 'react';
import {
  Activity,
  ArrowRight,
  Clock,
  FileWarning,
  ShieldAlert,
  Repeat,
  RefreshCw,
  GitBranch,
  LifeBuoy,
  Ban,
  Terminal,
  CheckCircle2,
} from 'lucide-react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

type FailId = 'timeout' | 'malformed' | 'injection' | 'loop';
type PathId = 'retry' | 'fallback' | 'escalate' | 'stop';
type Phase = 'idle' | 'running' | 'failed' | 'recovered';

const FAILURES: Record<
  FailId,
  { label: string; icon: React.ComponentType<{ className?: string }>; tag: string; scenario: string; path: PathId }
> = {
  timeout: {
    label: 'Timeout',
    icon: Clock,
    tag: 'TIMEOUT',
    scenario: 'A tool call exceeds its deadline and never returns.',
    path: 'retry',
  },
  malformed: {
    label: 'Malformed Output',
    icon: FileWarning,
    tag: 'MALFORMED OUTPUT',
    scenario: 'A tool returns structured output that fails schema validation.',
    path: 'fallback',
  },
  injection: {
    label: 'Prompt Injection',
    icon: ShieldAlert,
    tag: 'INJECTION',
    scenario: 'Untrusted content tries to hijack the agent’s next action.',
    path: 'escalate',
  },
  loop: {
    label: 'Loop Detection',
    icon: Repeat,
    tag: 'LOOP DETECTED',
    scenario: 'The agent keeps calling the same tool with the same result.',
    path: 'stop',
  },
};

const RECOVERY: Record<PathId, { label: string; icon: React.ComponentType<{ className?: string }>; when: string }> = {
  retry: { label: 'Retry', icon: RefreshCw, when: 'Timeouts, 500s, and dropped deps' },
  fallback: { label: 'Fallback', icon: GitBranch, when: 'Malformed or low-confidence output' },
  escalate: { label: 'Escalate', icon: LifeBuoy, when: 'Injection, ambiguity, high stakes' },
  stop: { label: 'Stop Safely', icon: Ban, when: 'Loop or runaway cost / guardrail breach' },
};

const FAIL_IDS = Object.keys(FAILURES) as FailId[];
const RECOVERY_IDS = Object.keys(RECOVERY) as PathId[];

// Failure catalog the lab can inject (display only).
const CATALOG = [
  'API 500 errors',
  'Timeouts',
  'Malformed output',
  'Prompt injection',
  'Poor retrieval',
  'Repeated loops',
  'Routing mistakes',
  'Unavailable deps',
];

export const AgentReliabilityLabVisualizer: React.FC = () => {
  const prefersReduced = usePrefersReducedMotion();

  const [failure, setFailure] = useState<FailId | null>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const [traceStep, setTraceStep] = useState<number>(0);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const inject = (id: FailId) => {
    clearTimers();
    setFailure(id);
    setPhase('running');
    setTraceStep(0);

    if (prefersReduced) {
      setTraceStep(3);
      setPhase('recovered');
      return;
    }

    timers.current = [
      window.setTimeout(() => setTraceStep(1), 260),
      window.setTimeout(() => setTraceStep(2), 520),
      window.setTimeout(() => setPhase('failed'), 820),
      window.setTimeout(() => {
        setTraceStep(3);
        setPhase('recovered');
      }, 1350),
    ];
  };

  const resetLab = () => {
    clearTimers();
    setFailure(null);
    setPhase('idle');
    setTraceStep(0);
  };

  // Trace node state derived from the simulation phase.
  const nodeState = (index: number): 'idle' | 'run' | 'fail' | 'ok' => {
    if (index === 0) return phase !== 'idle' ? 'run' : 'idle';
    if (index === 1) return traceStep >= 1 ? 'run' : 'idle';
    if (index === 2) {
      if (phase === 'failed' || phase === 'recovered') return 'fail';
      if (traceStep >= 2) return 'run';
      return 'idle';
    }
    return phase === 'recovered' ? 'ok' : 'idle';
  };

  const activePath = failure ? FAILURES[failure].path : null;

  // Build the console trace from current state.
  const lines: { text: string; tone: 'dim' | 'run' | 'fail' | 'ok' }[] = [];
  if (failure && phase !== 'idle') {
    lines.push({ text: 'user request received', tone: 'dim' });
    if (traceStep >= 1) lines.push({ text: 'agent → tool call dispatched', tone: 'run' });
    if (phase === 'failed' || phase === 'recovered') {
      lines.push({ text: `tool call → ${FAILURES[failure].tag}`, tone: 'fail' });
    }
    if (phase === 'recovered') {
      lines.push({ text: `guardrail → ${RECOVERY[activePath!].label} applied`, tone: 'run' });
      lines.push({ text: 'outcome: contained within stop conditions', tone: 'ok' });
    }
  }

  const traceTone: Record<string, string> = {
    idle: 'text-zinc-500',
    run: 'text-indigo-300',
    fail: 'text-rose-300',
    ok: 'text-emerald-300',
  };

  return (
    <div
      id="agent-reliability-lab-visualizer"
      className="w-full bg-[#0D0F14] border border-white/[0.08] rounded-xl p-5 md:p-7 text-left shadow-2xl relative overflow-hidden"
    >
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-rose-400" />
          <span className="font-mono text-xs text-zinc-300 font-medium tracking-wide uppercase">
            Agent Reliability Lab · Failure Injection
          </span>
        </div>
        <button
          type="button"
          id="lab-reset-btn"
          onClick={resetLab}
          disabled={phase === 'idle'}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-zinc-300 border border-white/[0.08] transition-colors cursor-pointer disabled:opacity-40"
        >
          <Terminal className="w-3.5 h-3.5 text-indigo-400" />
          <span>Reset</span>
        </button>
      </div>

      {/* Inject-failure controls */}
      <div className="mb-6">
        <div className="text-xs font-mono text-zinc-400 mb-3">Inject a failure, watch the recovery</div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {FAIL_IDS.map((id) => {
            const f = FAILURES[id];
            const Icon = f.icon;
            const isActive = failure === id;
            return (
              <button
                key={id}
                type="button"
                id={`lab-inject-${id}`}
                onClick={() => inject(id)}
                className={`text-left p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-rose-950/30 border-rose-500/50 ring-1 ring-rose-500/40'
                    : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Icon className="w-3.5 h-3.5 text-rose-400" />
                  <span className="text-xs font-semibold text-white">{f.label}</span>
                </div>
                <div className="text-[10px] font-mono text-indigo-300/80">→ {RECOVERY[f.path].label}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Execution trace */}
        <div>
          <div className="text-xs font-mono text-zinc-400 mb-3">Execution Trace</div>

          <div className="flex flex-col sm:flex-row gap-2 sm:items-stretch">
            {[
              { title: 'User Request', sub: 'intent parsed' },
              { title: 'Agent', sub: 'plans tool call' },
              { title: 'Tool Call', sub: 'invoking' },
              { title: 'Result', sub: 'observed' },
            ].map((node, index) => {
              const state = nodeState(index);
              const stateClass =
                state === 'fail'
                  ? 'bg-rose-950/40 border-rose-500/50 ring-1 ring-rose-500/30'
                  : state === 'ok'
                  ? 'bg-emerald-950/40 border-emerald-500/50 ring-1 ring-emerald-500/30'
                  : state === 'run'
                  ? 'bg-indigo-950/40 border-indigo-500/50 ring-1 ring-indigo-500/30'
                  : 'bg-white/[0.01] border-white/[0.05] opacity-60';

              const dynamicSub =
                index === 2 && (phase === 'failed' || phase === 'recovered')
                  ? failure
                    ? FAILURES[failure].tag
                    : node.sub
                  : index === 3 && phase === 'recovered' && failure
                  ? `${RECOVERY[FAILURES[failure].path].label} · contained`
                  : node.sub;

              return (
                <React.Fragment key={node.title}>
                  <div className={`flex-1 p-3 rounded-lg border transition-all duration-300 ${stateClass}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] text-zinc-500">{String(index + 1).padStart(2, '0')}</span>
                      <span className={`w-2 h-2 rounded-full ${
                        state === 'fail' ? 'bg-rose-500 animate-pulse' : state === 'ok' ? 'bg-emerald-500' : state === 'run' ? 'bg-indigo-500 animate-pulse' : 'bg-zinc-700'
                      }`} />
                    </div>
                    <div className="font-mono text-xs font-semibold text-white mb-0.5">{node.title}</div>
                    <div className={`text-[11px] font-mono truncate ${state === 'fail' ? 'text-rose-300' : state === 'ok' ? 'text-emerald-300' : 'text-zinc-400'}`}>
                      {dynamicSub}
                    </div>
                  </div>
                  {index < 3 && (
                    <div className="hidden sm:flex items-center justify-center text-zinc-600">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Recovery decision matrix */}
          <div className="mt-6">
            <div className="text-xs font-mono text-zinc-400 mb-3">Recovery Decision</div>
            <div className="grid grid-cols-2 gap-2">
              {RECOVERY_IDS.map((id) => {
                const r = RECOVERY[id];
                const Icon = r.icon;
                const isActive = activePath === id;
                return (
                  <div
                    key={id}
                    className={`p-3 rounded-lg border transition-all duration-300 ${
                      isActive
                        ? 'bg-indigo-950/40 border-indigo-500/50 ring-1 ring-indigo-500/30'
                        : 'bg-white/[0.01] border-white/[0.05] opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-300' : 'text-zinc-500'}`} />
                      <span className={`text-xs font-semibold ${isActive ? 'text-white' : 'text-zinc-400'}`}>{r.label}</span>
                    </div>
                    <div className="text-[10px] font-mono text-zinc-500 leading-snug">{r.when}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Console + catalog */}
        <div className="space-y-6">
          <div className="bg-[#08090C] border border-white/[0.07] rounded-lg p-4 font-mono text-xs">
            <div className="flex items-center justify-between text-zinc-500 border-b border-white/[0.06] pb-2 mb-3 text-[11px]">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span>TRACE · OBSERVABILITY</span>
              </div>
              <span className={failure ? traceTone[nodeState(3) === 'fail' ? 'fail' : nodeState(3) === 'ok' ? 'ok' : 'run'] : 'text-zinc-500'}>
                {phase === 'idle' ? 'idle' : phase === 'failed' ? 'failure' : phase === 'recovered' ? 'contained' : 'running'}
              </span>
            </div>

            {phase === 'idle' || !failure ? (
              <div className="text-zinc-500 text-[11px]">
                <span className="text-indigo-400">➜</span> select a failure to inject and run the trace
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-[11px] text-zinc-400 flex items-start gap-2">
                  <span className="text-rose-400">⚠</span>
                  <span>{FAILURES[failure].scenario}</span>
                </div>
                {lines.map((line, i) => (
                  <div key={i} className="flex items-center gap-2 text-[11px]">
                    <span className="text-zinc-600">›</span>
                    <span
                      className={
                        line.tone === 'fail'
                          ? 'text-rose-300'
                          : line.tone === 'ok'
                          ? 'text-emerald-300'
                          : line.tone === 'run'
                          ? 'text-indigo-300'
                          : 'text-zinc-500'
                      }
                    >
                      {line.text}
                    </span>
                    {line.tone === 'ok' && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="text-xs font-mono text-zinc-400 mb-3">Failure Catalog</div>
            <div className="flex flex-wrap gap-1.5">
              {CATALOG.map((item) => (
                <span
                  key={item}
                  className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono text-zinc-400"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-white/[0.04] text-[10px] font-mono text-zinc-500">
              Simulated trace · no live agent or external calls
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
