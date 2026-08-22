import React, { useState, useEffect } from 'react';
import { Layers, CheckCircle2, UserCheck, Video, Film, Play, Pause, GitFork } from 'lucide-react';

interface ContentStage {
  id: string;
  stepNum: string;
  title: string;
  tag: string;
  isHuman?: boolean;
  description: string;
  engine: string;
  outputArtifact: string;
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
  },
  {
    id: 'topic',
    stepNum: '02',
    title: 'Topic Discovery',
    tag: 'Signal Clustering',
    description: 'Evaluates angles against audience value: practical AI implementation, agent orchestration architectures, and vibe-coding patterns.',
    engine: 'OpenAI API / Claude Analysis',
    outputArtifact: 'Top 3 Validated Angles',
  },
  {
    id: 'script',
    stepNum: '03',
    title: 'Scriptwriting Agent',
    tag: 'Structured Drafting',
    description: 'Transforms raw research into structured video scripts with 3 hook variations, technical walkthrough timestamps, and visual cues.',
    engine: 'Custom Structured Prompt Harness',
    outputArtifact: 'Full Draft Script & Timestamps',
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
  const [activeStageIndex, setActiveStageIndex] = useState<number>(3);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStageIndex((prev) => (prev + 1) % STAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentStage = STAGES[activeStageIndex];

  return (
    <div
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
      <div className="bg-[#08090C] border border-white/[0.08] rounded-xl p-5 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-2">
            <span
              className={`font-mono text-xs px-2 py-0.5 rounded font-bold ${
                currentStage.isHuman
                  ? 'bg-amber-500/20 text-amber-300'
                  : 'bg-indigo-500/20 text-indigo-300'
              }`}
            >
              Stage {currentStage.stepNum}
            </span>
            <span className="text-sm font-semibold text-white">{currentStage.title}</span>
            {currentStage.isHuman && (
              <span className="text-xs text-amber-400 font-mono font-medium flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5" />
                Human Taste Checkpoint
              </span>
            )}
          </div>
          <span className="text-xs font-mono text-zinc-400">Engine: {currentStage.engine}</span>
        </div>

        <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
          {currentStage.description}
        </p>

        {/* If Media Generation Stage (Stage 05) - Show the Visual Branching between HeyGen & Higgsfield */}
        {activeStageIndex === 4 ? (
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
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-zinc-400">
              <span>Stage Artifact:</span>
              <strong className={currentStage.isHuman ? 'text-amber-300' : 'text-emerald-400'}>
                {currentStage.outputArtifact}
              </strong>
            </div>
            <span className="text-zinc-500">Orchestrated via Make.com</span>
          </div>
        )}
      </div>

      {/* Supporting philosophy footer quote */}
      <div className="mt-4 pt-3 border-t border-white/[0.04] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-zinc-500">
        <span>“The goal isn’t to remove creativity from content creation. It’s to remove the repetitive work surrounding it.”</span>
        <span className="text-indigo-400">Make.com Multi-Node Pipeline</span>
      </div>
    </div>
  );
};
