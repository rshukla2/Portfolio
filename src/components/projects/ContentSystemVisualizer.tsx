import React, { useState, useEffect } from 'react';
import { Layers, CheckCircle2, UserCheck, Video, Film, Play, Pause, GitFork } from 'lucide-react';
import { useInViewport } from '../../hooks/useInViewport';

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
    title: 'Research Agent',
    tag: 'Automated Discovery',
    description: 'Autonomous agent scours technical blogs, research papers, community questions, and real engineering discussions for high-signal ideas.',
    engine: 'Perplexity + Custom Scraping',
    outputArtifact: 'Curated Research Dossier',
    supportingDetails: [
      {
        label: 'Signal Filtering',
        text: 'Sources are scored for technical depth, relevance, and evidence of real audience demand before they enter the research set.',
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
    description: 'Evaluates angles against audience value: practical AI implementation, agent orchestration architectures, and vibe-coding patterns.',
    engine: 'OpenAI API / Claude Analysis',
    outputArtifact: 'Top 3 Validated Angles',
    supportingDetails: [
      {
        label: 'Pattern Clustering',
        text: 'Related findings are grouped into recurring problems, emerging techniques, and questions builders are actively trying to solve.',
      },
      {
        label: 'Angle Ranking',
        text: 'Each cluster is ranked for novelty, usefulness, and audience fit, producing three distinct angles for editorial comparison.',
      },
    ],
  },
  {
    id: 'script',
    stepNum: '03',
    title: 'Scriptwriting Agent',
    tag: 'Structured Drafting',
    description: 'Transforms raw research into structured video scripts with 3 hook variations, technical walkthrough timestamps, and visual cues.',
    engine: 'Custom Structured Prompt Harness',
    outputArtifact: 'Full Draft Script & Timestamps',
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
    tag: 'Rishi Shukla (Taste & Nuance)',
    isHuman: true,
    description: 'Non-negotiable human taste checkpoint. Rishi personally refines tone, verifies code accuracy, adjusts pacing, and injects authentic builder stories.',
    engine: 'Human Judgment & Editorial Taste',
    outputArtifact: 'Approved Production Script',
    supportingDetails: [
      {
        label: 'Editorial Judgment',
        text: 'Automation pauses while Rishi rewrites generic language, sharpens the teaching sequence, and adds examples from real projects.',
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
    engine: 'HeyGen + Higgsfield APIs',
    outputArtifact: 'Video Avatar + AI B-roll Assets',
  },
];

export const ContentSystemVisualizer: React.FC = () => {
  const { ref: visualizerRef, isInViewport } = useInViewport<HTMLDivElement>();
  const [activeStageIndex, setActiveStageIndex] = useState<number>(3);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    if (!isPlaying || !isInViewport) return;
    const interval = setInterval(() => {
      setActiveStageIndex((prev) => (prev + 1) % STAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPlaying, isInViewport]);

  return (
    <div
      ref={visualizerRef}
      id="content-system-visualizer"
      className="w-full bg-[#0D0F14] border border-white/[0.08] rounded-xl p-5 md:p-7 text-left shadow-2xl relative overflow-hidden"
    >
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span className="font-mono text-xs text-zinc-300 font-medium tracking-wide uppercase">
            End-to-End Content Engine · Make.com Orchestration Layer
          </span>
        </div>

        <div className="flex items-center gap-3">
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
                      stage.isHuman
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-indigo-500/20 text-indigo-300'
                    }`}
                  >
                    Stage {stage.stepNum}
                  </span>
                  <span className="text-sm font-semibold text-white">{stage.title}</span>
                  {stage.isHuman && (
                    <span className="text-xs text-amber-400 font-mono font-medium flex items-center gap-1">
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
                        Rishi’s configured digital twin avatars render high-definition video speech directly from approved script cues.
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
        <span>“The goal isn’t to remove creativity from content creation. It’s to remove the repetitive work surrounding it.”</span>
        <span className="text-indigo-400">Make.com Multi-Node Pipeline</span>
      </div>
    </div>
  );
};
