import React, { useEffect, useRef, useState } from 'react';
import { Gamepad2, Users, Brain, Dices, Plus, Minus, Play, Wifi } from 'lucide-react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

type ModeId = 'imposter' | 'trivia' | 'dare';

interface Mode {
  id: ModeId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
  meta: string;
  accent: { text: string; ring: string; bg: string; border: string; dot: string };
}

const MODES: Mode[] = [
  {
    id: 'imposter',
    label: 'Imposter',
    icon: Users,
    tagline: 'Everyone knows the word — except one. Find the imposter before they blend in.',
    meta: 'Roles · 1 imposter · 60s reveal',
    accent: {
      text: 'text-violet-300',
      ring: 'ring-violet-500/40',
      bg: 'bg-violet-950/30',
      border: 'border-violet-500/40',
      dot: 'bg-violet-500',
    },
  },
  {
    id: 'trivia',
    label: 'Trivia',
    icon: Brain,
    tagline: 'Category rounds anyone can join. Race for points across rounds, no paywall to unlock the next.',
    meta: 'Rounds · 10 questions · live scoring',
    accent: {
      text: 'text-emerald-300',
      ring: 'ring-emerald-500/40',
      bg: 'bg-emerald-950/30',
      border: 'border-emerald-500/40',
      dot: 'bg-emerald-500',
    },
  },
  {
    id: 'dare',
    label: 'Truth or Dare',
    icon: Dices,
    tagline: 'Two decks, one room. Pick a deck and choose your risk — configurable, no ads.',
    meta: 'Decks · Fully customizable',
    accent: {
      text: 'text-rose-300',
      ring: 'ring-rose-500/40',
      bg: 'bg-rose-950/30',
      border: 'border-rose-500/40',
      dot: 'bg-rose-500',
    },
  },
];

const MIN_PLAYERS = 2;
const MAX_PLAYERS = 6;
const PHONE_SLOTS = 4;

export const PartyGamesVisualizer: React.FC = () => {
  const prefersReduced = usePrefersReducedMotion();

  const [mode, setMode] = useState<ModeId>('imposter');
  const [players, setPlayers] = useState<number>(4);
  const [joinedCount, setJoinedCount] = useState<number>(0);
  const [starting, setStarting] = useState<boolean>(false);
  const timers = useRef<number[]>([]);

  const activeMode = MODES.find((m) => m.id === mode) ?? MODES[0];
  const target = Math.min(players, PHONE_SLOTS);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  // Reflect player-count changes on the room when not mid-join.
  useEffect(() => {
    if (starting) return;
    setJoinedCount(target);
  }, [players, starting, target]);

  const changePlayers = (delta: number) =>
    setPlayers((p) => Math.max(MIN_PLAYERS, Math.min(MAX_PLAYERS, p + delta)));

  const startGameNight = () => {
    clearTimers();
    setStarting(true);

    if (prefersReduced) {
      setJoinedCount(target);
      setStarting(false);
      return;
    }

    setJoinedCount(0);
    for (let i = 1; i <= target; i += 1) {
      timers.current.push(window.setTimeout(() => setJoinedCount(i), i * 450));
    }
    timers.current.push(window.setTimeout(() => setStarting(false), (target + 1) * 450));
  };

  const ModeIcon = activeMode.icon;

  return (
    <div
      id="party-games-visualizer"
      className="w-full bg-[#0D0F14] border border-white/[0.08] rounded-xl p-5 md:p-7 text-left shadow-2xl relative overflow-hidden"
    >
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-4 h-4 text-indigo-400" />
          <span className="font-mono text-xs text-zinc-300 font-medium tracking-wide uppercase">
            Party Games · LAN Multiplayer
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-300">
          <Wifi className="w-3 h-3" />
          Local network · no accounts
        </div>
      </div>

      {/* Phones around the central room */}
      <div className="grid grid-cols-2 lg:grid-cols-12 gap-3 lg:gap-5 items-center">
        {/* Left phones */}
        <div className="col-span-2 lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-3">
          {renderPhone(0, joinedCount, activeMode)}
          {renderPhone(1, joinedCount, activeMode)}
        </div>

        {/* Central session / room */}
        <div className="col-span-2 lg:col-span-6">
          <div className={`rounded-2xl border p-5 transition-colors duration-300 ${activeMode.accent.bg} ${activeMode.accent.border}`}>
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">Game Room</span>
              <span className={`flex items-center gap-1.5 text-[10px] font-mono ${activeMode.accent.text}`}>
                <span className={`w-2 h-2 rounded-full ${activeMode.accent.dot} animate-pulse`} />
                Live
              </span>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <div className={`w-11 h-11 rounded-xl bg-white/[0.06] flex items-center justify-center ${activeMode.accent.text}`}>
                <ModeIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-base font-semibold text-white leading-tight">{activeMode.label}</div>
                <div className="text-[11px] font-mono text-zinc-400">{activeMode.meta}</div>
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed mb-4">{activeMode.tagline}</p>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] py-2">
                <div className={`text-lg font-bold ${activeMode.accent.text}`}>{players}</div>
                <div className="text-[9px] font-mono text-zinc-500 uppercase">Players</div>
              </div>
              <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] py-2">
                <div className="text-lg font-bold text-white">0</div>
                <div className="text-[9px] font-mono text-zinc-500 uppercase">Ads</div>
              </div>
              <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] py-2">
                <div className="text-lg font-bold text-emerald-400">LAN</div>
                <div className="text-[9px] font-mono text-zinc-500 uppercase">Network</div>
              </div>
            </div>

            {players > PHONE_SLOTS && (
              <div className="mt-3 text-center text-[10px] font-mono text-zinc-500">
                +{players - PHONE_SLOTS} more in the room
              </div>
            )}
          </div>
        </div>

        {/* Right phones */}
        <div className="col-span-2 lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-3">
          {renderPhone(2, joinedCount, activeMode)}
          {renderPhone(3, joinedCount, activeMode)}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 pt-5 border-t border-white/[0.06] space-y-4">
        {/* Mode tabs */}
        <div>
          <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-2">Game mode</div>
          <div className="flex flex-wrap gap-2">
            {MODES.map((m) => {
              const isActive = m.id === mode;
              const Icon = m.icon;
              return (
                <button
                  key={m.id}
                  type="button"
                  id={`party-mode-${m.id}`}
                  onClick={() => setMode(m.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                    isActive
                      ? `${m.accent.bg} ${m.accent.border} ${m.accent.text}`
                      : 'bg-white/[0.03] border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Player stepper */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Players</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                id="party-players-dec"
                onClick={() => changePlayers(-1)}
                disabled={players <= MIN_PLAYERS}
                aria-label="Fewer players"
                className="p-1.5 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 border border-white/[0.08] transition-colors cursor-pointer disabled:opacity-40"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center text-sm font-mono text-white">{players}</span>
              <button
                type="button"
                id="party-players-inc"
                onClick={() => changePlayers(1)}
                disabled={players >= MAX_PLAYERS}
                aria-label="More players"
                className="p-1.5 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 border border-white/[0.08] transition-colors cursor-pointer disabled:opacity-40"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <button
            type="button"
            id="party-start-btn"
            onClick={startGameNight}
            disabled={starting}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-xs font-semibold text-white transition-all cursor-pointer active:scale-95"
          >
            <Play className="w-3.5 h-3.5" />
            {starting ? 'Joining over LAN…' : 'Start Game Night'}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] font-mono text-zinc-500">
          <span>No ads</span>
          <span>·</span>
          <span>No feature paywalls</span>
          <span>·</span>
          <span>No accounts</span>
          <span>·</span>
          <span className="text-indigo-400">iOS · App Store release</span>
        </div>
      </div>
    </div>
  );
};

function renderPhone(slot: number, joinedCount: number, mode: Mode) {
  const active = slot < joinedCount;
  const Icon = mode.icon;
  return (
    <div
      className={`relative mx-auto w-16 sm:w-20 rounded-[18px] border p-1.5 transition-all duration-500 ${
        active
          ? `${mode.accent.border} ${mode.accent.bg} shadow-[0_0_20px_rgba(99,102,241,0.12)]`
          : 'border-white/[0.08] bg-white/[0.02] opacity-50'
      }`}
    >
      {/* Notch */}
      <div className="mx-auto mb-1 w-6 h-1 rounded-full bg-white/10" />
      {/* Screen */}
      <div
        className={`rounded-[10px] h-20 sm:h-24 flex flex-col items-center justify-center gap-1.5 ${
          active ? 'bg-[#090A0D]' : 'bg-white/[0.02]'
        }`}
      >
        <Icon className={`w-4 h-4 transition-colors ${active ? mode.accent.text : 'text-zinc-600'}`} />
        <span className={`text-[8px] font-mono uppercase ${active ? 'text-zinc-300' : 'text-zinc-600'}`}>
          P{slot + 1}
        </span>
        <span className={`flex items-center gap-1 text-[7px] font-mono ${active ? 'text-emerald-400' : 'text-zinc-600'}`}>
          <span className={`w-1 h-1 rounded-full ${active ? mode.accent.dot : 'bg-zinc-600'} ${active ? 'animate-pulse' : ''}`} />
          {active ? 'connected' : 'waiting'}
        </span>
      </div>
    </div>
  );
}
