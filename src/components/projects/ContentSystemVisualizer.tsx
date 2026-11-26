import React, { useState, useEffect } from 'react';
import { Layers, CheckCircle2, UserCheck, Video, Film, Play, Pause, GitFork } from 'lucide-react';
import { useInViewport } from '../../hooks/useInViewport';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface ContentStage {
  id: string;
  stepNum: string;
  title: string;
  tag: string;
  isHuman?: boolean;
  description: string;
  engine: string;
  outputArtifact: string;
  supportingDetails?: {
    label: string;
    text: string;
  }[];
}
const STAGES: ContentStage[] = [
  {
    id: 'research',
    stepNum: '01',
    title: 'Research Step',
    tag: 'Guided Discovery',
    description: 'A Make.com scenario gathered research inputs and organized promising ideas for the content workflow.',
    engine: 'Make.com scenario · research step',
    outputArtifact: 'Curated Research Dossier',
    supportingDetails: [
      {
        label: 'Signal Filtering',
        text: 'Research inputs are filtered for relevance and usefulness before they enter the working set.',
      },
      {
        label: 'Research Synthesis',
        text: 'Duplicate ideas and shallow summaries are removed, leaving a concise dossier of claims, examples, and source links for the next stage.',
      },
    ],
  },
  {
    id: 'topic',
    stepNum: '02',
    title: 'Topic Discovery',
    tag: 'Signal Clustering',
    description: 'Filters possible topics for usefulness, fit, and a clear teaching angle before scriptwriting begins.',
    engine: 'Make.com · topic filter',
    outputArtifact: 'Shortlisted Content Angles',
    supportingDetails: [
      {
        label: 'Pattern Clustering',
        text: 'Related findings are grouped into recurring problems, emerging techniques, and questions builders are actively trying to solve.',
      },
      {
        label: 'Angle Ranking',
        text: 'Each cluster is compared for usefulness and audience fit, producing a shortlist for editorial review.',
      },
    ],
  },
  {
    id: 'script',
    stepNum: '03',
    title: 'Script Drafting',
    tag: 'Structured Drafting',
    description: 'Transforms the selected research into a structured video script with hook options, teaching beats, and visual cues.',
    engine: 'Structured script prompt',
    outputArtifact: 'Structured Draft Script',
    supportingDetails: [
      {
        label: 'Narrative Structure',
        text: 'The selected angle becomes a production-ready sequence with hook options, teaching beats, demonstrations, and visual cues.',
      },
      {
        label: 'Verification Pass',
        text: 'Technical claims, code examples, and transitions are flagged for review so unsupported details never reach production.',
      },
    ],
  },
  {
    id: 'review',
    stepNum: '04',
    title: 'HUMAN REVIEW',
    tag: 'Required on Every Piece',
    isHuman: true,
    description: 'A required human checkpoint refines tone, verifies technical claims, adjusts pacing, and approves the piece before media generation.',
    engine: 'Human review · required gate',
    outputArtifact: 'Approved Production Script',
    supportingDetails: [
      {
        label: 'Editorial Judgment',
        text: 'Automation pauses while the draft is refined for specificity, teaching sequence, and authentic examples.',
      },
      {
        label: 'Approval Gate',
        text: 'The script moves forward only after its technical claims, pacing, tone, and visual direction have been personally approved.',
      },
    ],
  },
  {
    id: 'media',
    stepNum: '05',
    title: 'Media Generation',
    tag: 'Creative AI Tooling',
    description: 'Dual-branch generation: Synthesizes speaking avatar video via HeyGen and custom cinematic B-roll visuals via Higgsfield.',
    engine: 'HeyGen digital twins + Higgsfield B-roll',
    outputArtifact: 'Video Avatar + AI B-roll Assets',
  },
];

export const ContentSystemVisualizer: React.FC = () => {
  const { ref: visualizerRef, isInViewport } = useInViewport<HTMLDivElement>();
  const prefersReduced = usePrefersReducedMotion();
  const [activeStageIndex, setActiveStageIndex] = useState<number>(3);
  const [isPlaying, setIsPlaying] = useState<boolean>(!prefersReduced);

  useEffect(() => {
    if (!isPlaying || !isInViewport || prefersReduced) return;
    const interval = setInterval(() => {
      setActiveStageIndex((prev) => (prev + 1) % STAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPlaying, isInViewport, prefersReduced]);

  return (
    <div
      ref={visualizerRef}
      id="content-system-visualizer"
      className="w-full md:min-h-[600px] bg-[#0D0F14] border border-white/[0.08] rounded-xl p-5 md:p-7 text-left shadow-2xl relative overflow-hidden"
    >
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span className="font-mono text-xs text-zinc-300 font-medium tracking-wide uppercase">
            Content Creation System · Make.com Orchestration
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-2 py-0.5 rounded bg-zinc-500/10 border border-zinc-500/20 text-[11px] font-mono text-zinc-300">
            Archived
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-mono text-indigo-300">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span>Make.com Flow</span>
          </div>

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-[11px] font-mono text-zinc-400 hover:text-white transition-all cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 text-zinc-400" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-emerald-400" />
                <span>Play Flow</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Interactive Pipeline Flow (With Visual Human Distinct Step) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
        {STAGES.map((st, idx) => {
          const isActive = idx === activeStageIndex;
          const isPassed = idx < activeStageIndex;

          return (
            <button
              key={st.id}
              type="button"
              onClick={() => {
                setActiveStageIndex(idx);
                setIsPlaying(false);
              }}
              className={`p-3 rounded-lg border text-left transition-all cursor-pointer relative overflow-hidden ${
                st.isHuman
                  ? isActive
                    ? 'bg-amber-950/50 border-amber-500/70 text-white ring-1 ring-amber-500/50'
                    : 'bg-amber-950/20 border-amber-500/30 text-amber-200 hover:bg-amber-950/30'
                  : isActive
                  ? 'bg-indigo-950/50 border-indigo-500 text-white ring-1 ring-indigo-500/50'
                  : isPassed
                  ? 'bg-white/[0.03] border-white/[0.08] text-zinc-300'
                  : 'bg-white/[0.01] border-white/[0.04] text-zinc-500 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                <span className={st.isHuman ? 'text-amber-400 font-bold' : 'text-indigo-400 font-bold'}>
                  {st.stepNum}
                </span>
                {st.isHuman ? (
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono font-bold">
                    HUMAN
                  </span>
                ) : (
                  <span className="text-[9px] text-zinc-500 font-mono">AUTO</span>
                )}
              </div>

              <div className="text-xs font-semibold tracking-tight text-white mb-0.5 truncate">
                {st.title}
              </div>
              <div className="text-[10px] text-zinc-400 font-mono truncate">{st.tag}</div>
            </button>
          );
        })}
      </div>

      {/* Stage Detail & Media Branching Inspector */}
      <div className="grid">
        {STAGES.map((stage, stageIndex) => {
          const isActive = stageIndex === activeStageIndex;

          return (
            <div
              key={stage.id}
              aria-hidden={!isActive}
              className={`col-start-1 row-start-1 bg-[#08090C] border border-white/[0.08] rounded-xl p-5 space-y-5 transition-opacity duration-200 ${
                isActive
                  ? 'relative z-10 opacity-100'
                  : 'pointer-events-none select-none opacity-0'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono text-xs px-2 py-0.5 rounded font-bold ${
                      stage.isHuman ? 'bg-amber-500/20 text-amber-300' : 'bg-indigo-500/20 text-indigo-300'
                    }`}
                  >
                    Stage {stage.stepNum}
                  </span>
                  <span className="text-sm font-semibold text-white">{stage.title}</span>
                  {stage.isHuman && (
                    <span className="text-xs text-amber-400 font-mono flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5" />
                      Human Taste Checkpoint
                    </span>
                  )}
                </div>
                <span className="text-xs font-mono text-zinc-400">Engine: {stage.engine}</span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                {stage.description}
              </p>

              {/* If Media Generation Stage (Stage 05) - Show the Visual Branching between HeyGen & Higgsfield */}
              {stageIndex === 4 ? (
                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-indigo-300 uppercase tracking-wider">
                    <GitFork className="w-3.5 h-3.5" />
                    <span>Parallel Media Generation Pipeline</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* HeyGen Branch */}
                    <div className="p-3.5 rounded-lg bg-indigo-950/30 border border-indigo-500/30 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-200">
                          <Video className="w-4 h-4 text-indigo-400" />
                          <span>HeyGen</span>
                        </div>
                        <span className="text-[10px] font-mono text-indigo-300">Digital Twin / Avatar</span>
                      </div>
                      <div className="text-xs text-zinc-300 font-light">
                        Configured digital twins render video from the human-approved script and production cues.
                      </div>
                      <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 pt-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Avatar Video Rendered</span>
                      </div>
                    </div>

                    {/* Higgsfield Branch */}
                    <div className="p-3.5 rounded-lg bg-purple-950/30 border border-purple-500/30 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-200">
                          <Film className="w-4 h-4 text-purple-400" />
                          <span>Higgsfield</span>
                        </div>
                        <span className="text-[10px] font-mono text-purple-300">AI B-Roll & Visuals</span>
                      </div>
                      <div className="text-xs text-zinc-300 font-light">
                        Generates cinematic supporting visuals, conceptual animations, and custom B-roll clips for key narrative moments.
                      </div>
                      <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 pt-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>B-Roll Sequence Ready</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div
                      className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider ${
                        stage.isHuman ? 'text-amber-300' : 'text-indigo-300'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Stage Processing Details</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
                      <span className="text-zinc-500">Make.com Output:</span>
                      <strong className={stage.isHuman ? 'text-amber-300' : 'text-emerald-400'}>
                        {stage.outputArtifact}
                      </strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {stage.supportingDetails?.map((detail) => (
                      <div
                        key={detail.label}
                        className={`p-3.5 rounded-lg border space-y-1.5 ${
                          stage.isHuman
                            ? 'bg-amber-950/20 border-amber-500/25'
                            : 'bg-indigo-950/20 border-indigo-500/20'
                        }`}
                      >
                        <div
                          className={`text-[10px] font-mono font-semibold uppercase tracking-wider ${
                            stage.isHuman ? 'text-amber-300' : 'text-indigo-300'
                          }`}
                        >
                          {detail.label}
                        </div>
                        <p className="text-xs text-zinc-300 font-light leading-relaxed">
                          {detail.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Supporting philosophy footer quote */}
      <div className="mt-4 pt-3 border-t border-white/[0.04] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-zinc-500">
        <span>"The goal isn't to remove creativity from content creation. It's to remove the repetitive work surrounding it."</span>
        <span className="text-indigo-400">Archived · Human review on every piece</span>
      </div>
    </div>
  );
};
