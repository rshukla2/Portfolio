import React, { useEffect, useRef, useState } from 'react';
import {
  BookOpen,
  Brain,
  CheckCircle2,
  Database,
  GraduationCap,
  KeyRound,
  Lock,
  Pause,
  Play,
  RotateCcw,
  Server,
  ShieldCheck,
  Sparkles,
  XCircle,
} from 'lucide-react';
import { useInViewport } from '../../hooks/useInViewport';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

type Tone = 'ready' | 'wrong' | 'thinking' | 'streaming' | 'saved' | 'limit' | 'correct';

interface RunStep {
  tone: Tone;
  status: string;
  trace: number;
  feedbackWords: number;
  selected: number | null;
  sheetOpen: boolean;
  limitReached?: boolean;
  correct?: boolean;
}

interface TraceStage {
  label: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  active: string;
  dot: string;
}

const FEEDBACK =
  'This model predicts likely text from patterns. It does not check facts, so a confident answer can still be wrong.';
const FEEDBACK_WORDS = FEEDBACK.split(' ');

const RUN: RunStep[] = [
  { tone: 'ready', status: 'Lesson question ready', trace: 0, feedbackWords: 0, selected: null, sheetOpen: false },
  { tone: 'wrong', status: 'Learner chose an incorrect answer', trace: 0, feedbackWords: 0, selected: 0, sheetOpen: false },
  { tone: 'thinking', status: 'Lumi opens grounded to this question', trace: 1, feedbackWords: 4, selected: 0, sheetOpen: true },
  { tone: 'streaming', status: 'Lesson context assembled', trace: 3, feedbackWords: 10, selected: 0, sheetOpen: true },
  { tone: 'streaming', status: 'Claude Haiku streams grounded feedback', trace: 4, feedbackWords: 18, selected: 0, sheetOpen: true },
  { tone: 'saved', status: 'Question and token usage recorded', trace: 5, feedbackWords: FEEDBACK_WORDS.length, selected: 0, sheetOpen: true },
  { tone: 'limit', status: 'Daily tutor limit reached, try again tomorrow', trace: 5, feedbackWords: FEEDBACK_WORDS.length, selected: 0, sheetOpen: true, limitReached: true },
  { tone: 'correct', status: 'Retry correct, lesson progress saved', trace: 0, feedbackWords: 0, selected: 1, sheetOpen: false, correct: true },
];

const TONE_META: Record<Tone, { label: string; text: string; dot: string; panel: string }> = {
  ready: { label: 'LESSON READY', text: 'text-indigo-300', dot: 'bg-indigo-500', panel: 'bg-indigo-950/30 border-indigo-500/30' },
  wrong: { label: 'TRY AGAIN', text: 'text-rose-300', dot: 'bg-rose-500', panel: 'bg-rose-950/30 border-rose-500/30' },
  thinking: { label: 'GROUNDING', text: 'text-violet-300', dot: 'bg-violet-500', panel: 'bg-violet-950/30 border-violet-500/30' },
  streaming: { label: 'STREAMING', text: 'text-violet-300', dot: 'bg-violet-500', panel: 'bg-violet-950/30 border-violet-500/30' },
  saved: { label: 'USAGE SAVED', text: 'text-emerald-300', dot: 'bg-emerald-500', panel: 'bg-emerald-950/30 border-emerald-500/30' },
  limit: { label: 'DAILY LIMIT', text: 'text-amber-300', dot: 'bg-amber-500', panel: 'bg-amber-950/30 border-amber-500/30' },
  correct: { label: 'CORRECT', text: 'text-emerald-300', dot: 'bg-emerald-500', panel: 'bg-emerald-950/30 border-emerald-500/30' },
};

const TRACE: TraceStage[] = [
  { label: 'App', detail: 'Lesson and answer', icon: BookOpen, accent: 'text-indigo-300', active: 'bg-indigo-950/40 border-indigo-500/40 ring-1 ring-indigo-500/30', dot: 'bg-indigo-500' },
  { label: 'nginx HTTPS', detail: 'Encrypted request', icon: Lock, accent: 'text-sky-300', active: 'bg-sky-950/40 border-sky-500/40 ring-1 ring-sky-500/30', dot: 'bg-sky-500' },
  { label: 'FastAPI', detail: 'JWT verified', icon: KeyRound, accent: 'text-sky-300', active: 'bg-sky-950/40 border-sky-500/40 ring-1 ring-sky-500/30', dot: 'bg-sky-500' },
  { label: 'Context builder', detail: 'Lesson, question, answer', icon: Brain, accent: 'text-indigo-300', active: 'bg-indigo-950/40 border-indigo-500/40 ring-1 ring-indigo-500/30', dot: 'bg-indigo-500' },
  { label: 'Claude Haiku', detail: 'Streaming response', icon: Sparkles, accent: 'text-violet-300', active: 'bg-violet-950/40 border-violet-500/40 ring-1 ring-violet-500/30', dot: 'bg-violet-500' },
  { label: 'PostgreSQL', detail: '+1 question, +312 tokens', icon: Database, accent: 'text-emerald-300', active: 'bg-emerald-950/40 border-emerald-500/40 ring-1 ring-emerald-500/30', dot: 'bg-emerald-500' },
];

const OPTIONS = [
  'It always uses the newest facts',
  'It predicts likely text from patterns',
  'It checks every answer with a person',
];

const OPS = ['Apple sign-in', 'Google sign-in', 'Email code', 'fail2ban', 'ufw', 'Watchdog + alert', 'Daily DB backup'];

export const KidlinLumiVisualizer: React.FC = () => {
  const { ref: visualizerRef, isInViewport } = useInViewport<HTMLDivElement>();
  const prefersReduced = usePrefersReducedMotion();
  const representativeStep = 5;
  const [stepIndex, setStepIndex] = useState<number>(prefersReduced ? representativeStep : 0);
  const [isPlaying, setIsPlaying] = useState<boolean>(!prefersReduced);
  const [inspectedTrace, setInspectedTrace] = useState<number | null>(null);
  const runStepRef = useRef<number>(prefersReduced ? representativeStep : 0);

  useEffect(() => {
    if (!isPlaying || !isInViewport || prefersReduced) return;

    const interval = window.setInterval(() => {
      runStepRef.current = (runStepRef.current + 1) % RUN.length;
      setStepIndex(runStepRef.current);
      setInspectedTrace(null);
    }, 1600);

    return () => window.clearInterval(interval);
  }, [isPlaying, isInViewport, prefersReduced]);

  const step = RUN[stepIndex];
  const tone = TONE_META[step.tone];
  const visibleFeedback = FEEDBACK_WORDS.slice(0, step.feedbackWords).join(' ');
  const activeTrace = inspectedTrace ?? step.trace;

  const togglePlay = () => {
    setInspectedTrace(null);
    setIsPlaying((current) => !current);
  };

  const resetRun = () => {
    runStepRef.current = 0;
    setStepIndex(0);
    setInspectedTrace(null);
    setIsPlaying(!prefersReduced);
  };

  const inspectTrace = (index: number) => {
    setIsPlaying(false);
    setInspectedTrace(index);
  };

  const selectAnswer = (index: number) => {
    setIsPlaying(false);
    setInspectedTrace(null);
    const target = index === 1 ? 7 : 1;
    runStepRef.current = target;
    setStepIndex(target);
  };

  return (
    <div
      ref={visualizerRef}
      id="kidlin-lumi-visualizer"
      className="w-full bg-[#0D0F14] border border-white/[0.08] rounded-xl p-5 md:p-7 text-left shadow-2xl relative overflow-hidden"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-5">
        <div className="flex min-w-0 items-center gap-2">
          <GraduationCap className="w-4 h-4 shrink-0 text-indigo-400" />
          <span className="truncate font-mono text-xs text-zinc-300 font-medium tracking-wide uppercase">
            KIDLIN · Grounded Lumi Tutor
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
            aria-label="Reset Lumi tutor walkthrough"
            className="p-1.5 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white border border-white/[0.08] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="mb-5 bg-[#08090C] border border-white/[0.07] rounded-lg px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5 font-mono text-xs">
          <span className={`w-2.5 h-2.5 shrink-0 rounded-full animate-pulse ${tone.dot}`} />
          <span className={`shrink-0 ${tone.text}`}>{tone.label}</span>
          <span className="min-w-0 text-zinc-400">· {inspectedTrace !== null ? `Inspected · ${TRACE[inspectedTrace].label}` : step.status}</span>
        </div>
        <span className="text-[10px] font-mono text-zinc-500">SIMULATED WALKTHROUGH · SAMPLE DATA</span>
      </div>

      <div className="grid min-w-0 grid-cols-1 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-5 items-stretch">
        <div className="min-w-0 flex justify-center">
          <div className="w-full max-w-[286px] min-h-[430px] rounded-[2rem] border border-white/[0.12] bg-[#08090C] p-2 shadow-xl">
            <div className="relative min-h-[412px] overflow-hidden rounded-[1.55rem] border border-white/[0.06] bg-[#11131A] p-4">
              <div className="mx-auto mb-4 h-1 w-16 rounded-full bg-white/10" aria-hidden="true" />
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[9px] font-mono text-zinc-500 uppercase">Lesson 04 · sample</div>
                  <div className="truncate text-sm font-semibold text-white">How AI models learn</div>
                </div>
                <span className="shrink-0 rounded-full bg-indigo-500/10 px-2 py-1 text-[9px] font-mono text-indigo-300">60%</span>
              </div>
              <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <div className="h-full w-3/5 rounded-full bg-indigo-500 transition-all duration-300" />
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-3">
                <div className="mb-2 text-[9px] font-mono uppercase text-zinc-500">Check your understanding</div>
                <p className="mb-3 text-xs font-medium leading-relaxed text-zinc-100">
                  Why can an AI model give a wrong answer confidently?
                </p>
                <div className="space-y-2">
                  {OPTIONS.map((option, index) => {
                    const isSelected = step.selected === index;
                    const optionClass = isSelected && index === 1
                      ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-200'
                      : isSelected
                        ? 'border-rose-500/50 bg-rose-950/40 text-rose-200 translate-x-0.5'
                        : 'border-white/[0.07] bg-black/10 text-zinc-400 hover:border-white/[0.14]';
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => selectAnswer(index)}
                        className={`w-full min-w-0 rounded-lg border px-2.5 py-2 text-left text-[10px] leading-snug transition-all duration-300 ${optionClass}`}
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          {isSelected && index === 1 ? <CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> : isSelected ? <XCircle className="h-3.5 w-3.5 shrink-0" /> : <span className="h-3.5 w-3.5 shrink-0 rounded-full border border-white/15" />}
                          <span>{option}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className={`absolute inset-x-2 bottom-2 rounded-2xl border p-4 shadow-2xl transition-all duration-300 ${tone.panel} ${step.sheetOpen ? 'translate-y-0 opacity-100' : 'translate-y-[110%] opacity-0'}`}>
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Lumi</div>
                    <div className="text-[9px] font-mono text-violet-300">Grounded in this lesson</div>
                  </div>
                </div>
                {step.limitReached ? (
                  <div className="rounded-lg bg-amber-950/30 p-2.5 text-[10px] leading-relaxed text-amber-200">
                    Daily limit reached. Your progress is safe. Lumi will be ready again tomorrow.
                  </div>
                ) : (
                  <p className="min-h-[58px] text-[10px] leading-relaxed text-zinc-200">
                    {visibleFeedback}
                    {step.feedbackWords > 0 && step.feedbackWords < FEEDBACK_WORDS.length && <span className="ml-1 inline-block h-3 w-1 animate-pulse bg-violet-400" aria-hidden="true" />}
                  </p>
                )}
              </div>

              {step.correct && (
                <div className="absolute inset-x-4 bottom-4 rounded-xl border border-emerald-500/30 bg-emerald-950/90 p-3 text-center shadow-xl">
                  <CheckCircle2 className="mx-auto mb-1 h-5 w-5 text-emerald-400" />
                  <div className="text-xs font-semibold text-emerald-200">Correct · +XP</div>
                  <div className="text-[9px] font-mono text-emerald-300/70">Sample lesson reward</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="min-w-0 bg-[#08090C] border border-white/[0.08] rounded-xl p-4 flex flex-col">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase">Behind the answer</div>
              <div className="text-sm font-semibold text-white">Grounded tutor trace</div>
            </div>
            <span className="text-[9px] font-mono text-zinc-500">CLICK TO INSPECT</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {TRACE.map((stage, index) => {
              const Icon = stage.icon;
              const isActive = index === activeTrace;
              const isComplete = index < step.trace;
              const traceClass = isActive ? stage.active : isComplete ? 'bg-white/[0.03] border-white/[0.1]' : 'bg-white/[0.015] border-white/[0.05] opacity-65';
              return (
                <button
                  key={stage.label}
                  type="button"
                  onClick={() => inspectTrace(index)}
                  className={`min-w-0 rounded-lg border p-2.5 text-left transition-all duration-300 ${traceClass}`}
                >
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <Icon className={`h-3.5 w-3.5 shrink-0 ${stage.accent}`} />
                    {isActive ? <span className={`h-2 w-2 shrink-0 rounded-full animate-pulse ${stage.dot}`} /> : isComplete ? <CheckCircle2 className="h-3 w-3 text-emerald-400" /> : null}
                  </div>
                  <div className="truncate text-[11px] font-semibold text-zinc-100">{stage.label}</div>
                  <div className="truncate text-[9px] font-mono text-zinc-500">{stage.detail}</div>
                  {index === 5 && <span className="mt-1 inline-block rounded bg-white/[0.05] px-1.5 py-0.5 text-[8px] font-mono text-zinc-500">SAMPLE</span>}
                </button>
              );
            })}
          </div>

          <div className="mt-3 rounded-lg border border-white/[0.07] bg-white/[0.02] p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono uppercase text-zinc-500">Cost control · sample</span>
              <span className="text-[10px] font-mono text-amber-300">{step.limitReached ? '5 of 5' : '3 of 5'} questions</span>
            </div>
            <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div className={`h-full rounded-full transition-all duration-300 ${step.limitReached ? 'w-full bg-amber-500' : 'w-3/5 bg-indigo-500'}`} />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-zinc-500">
              <span>Tokens today: {step.trace >= 5 ? '1,248' : '936'} sample</span>
              <span className="flex items-center gap-1 text-emerald-300"><Database className="h-3 w-3" /> Daily tracking</span>
            </div>
          </div>

          <div className="mt-3 grid flex-1 place-items-center rounded-lg border border-dashed border-white/[0.07] px-3 py-2 text-center">
            <div>
              <Server className="mx-auto mb-1 h-4 w-4 text-sky-400" />
              <p className="text-[10px] leading-relaxed text-zinc-400">
                FastAPI and PostgreSQL in Docker behind nginx HTTPS. JWT is verified before tutor context is built.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-white/[0.06] bg-[#08090C] px-3 py-2.5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[9px] font-mono text-zinc-400">
          <span className="flex items-center gap-1 text-zinc-500"><ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> OPS</span>
          {OPS.map((item) => <span key={item}>{item}</span>)}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/[0.04] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-zinc-500">
        <span>Grounded feedback, predictable cost</span>
        <span className="text-indigo-400">Question → Context → Stream → Track</span>
      </div>
    </div>
  );
};
