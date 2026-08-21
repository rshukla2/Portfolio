import React, { useState, useRef } from 'react';
import { Sparkles, Copy, Check, RefreshCw } from 'lucide-react';

const HOOKS = [
  'The 1 AI mistake 90% of builders make',
  'How I built this entire app in 20 minutes',
  'Stop prompting ChatGPT like a search engine',
  'I automated my entire 5 AM morning routine',
  'Why simple software systems beat complex models',
  'The exact workflow I use to vibe-code daily',
  'Why curiosity is 10x more valuable with AI',
  'What happens when you break a 40-page PRD into agents',
];

const COLORS = [
  '#4F46E5', // Indigo
  '#2563EB', // Blue
  '#0D9488', // Teal
  '#7C3AED', // Violet
  '#0284C7', // Sky
  '#4338CA', // Deep Indigo
  '#059669', // Emerald
  '#6366F1', // Light Indigo
];

export const SpinWheelVisualizer: React.FC = () => {
  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [selectedHook, setSelectedHook] = useState<string | null>(HOOKS[0]);
  const [copied, setCopied] = useState<boolean>(false);
  const [spinCount, setSpinCount] = useState<number>(1);
  const currentRotationRef = useRef<number>(0);

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setCopied(false);

    // Random extra spins (5 to 8 full rotations + random slice offset)
    const extraTurns = 5 + Math.floor(Math.random() * 4);
    const sliceAngle = 360 / HOOKS.length;
    const randomSlice = Math.floor(Math.random() * HOOKS.length);
    const targetAngle = extraTurns * 360 + (360 - randomSlice * sliceAngle - sliceAngle / 2);

    const newRotation = currentRotationRef.current + targetAngle;
    currentRotationRef.current = newRotation;
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedHook(HOOKS[randomSlice]);
      setSpinCount((prev) => prev + 1);
    }, 3200);
  };

  const handleCopy = () => {
    if (!selectedHook) return;
    navigator.clipboard.writeText(selectedHook);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="spin-wheel-visualizer"
      className="w-full bg-[#0D0F14] border border-white/[0.08] rounded-xl p-5 md:p-7 text-left shadow-2xl relative overflow-hidden"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="font-mono text-xs text-zinc-300 font-medium tracking-wide uppercase">
            Live Interactive Widget · 20-Min Build Prototype
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <span>Spins: <strong className="text-white">{spinCount}</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Wheel Container */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative py-4">
          {/* Wheel Pointer */}
          <div className="absolute top-2 z-20 flex flex-col items-center">
            <div className="w-4 h-6 bg-white border-2 border-indigo-600 rounded-b-full shadow-lg -translate-y-1 transform scale-110" />
          </div>

          {/* SVG Wheel */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72">
            <svg
              viewBox="0 0 300 300"
              className="w-full h-full rounded-full shadow-[0_0_30px_rgba(0,0,0,0.6)] border-4 border-white/10"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning
                  ? 'transform 3.2s cubic-bezier(0.15, 0.9, 0.25, 1)'
                  : 'none',
              }}
            >
              {HOOKS.map((_, i) => {
                const angle = 360 / HOOKS.length;
                const startAngle = (i * angle * Math.PI) / 180;
                const endAngle = ((i + 1) * angle * Math.PI) / 180;

                const x1 = 150 + 145 * Math.cos(startAngle);
                const y1 = 150 + 145 * Math.sin(startAngle);
                const x2 = 150 + 145 * Math.cos(endAngle);
                const y2 = 150 + 145 * Math.sin(endAngle);

                const midAngle = ((i + 0.5) * angle * Math.PI) / 180;
                const tx = 150 + 90 * Math.cos(midAngle);
                const ty = 150 + 90 * Math.sin(midAngle);
                const textRotation = (i + 0.5) * angle;

                return (
                  <g key={i}>
                    <path
                      d={`M 150 150 L ${x1} ${y1} A 145 145 0 0 1 ${x2} ${y2} Z`}
                      fill={COLORS[i % COLORS.length]}
                      stroke="#0D0F14"
                      strokeWidth="2"
                    />
                    <text
                      x={tx}
                      y={ty}
                      fill="#FFFFFF"
                      fontSize="9"
                      fontWeight="600"
                      fontFamily="monospace"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${textRotation}, ${tx}, ${ty})`}
                      className="select-none uppercase tracking-wider"
                    >
                      {`Hook #0${i + 1}`}
                    </text>
                  </g>
                );
              })}
              <circle cx="150" cy="150" r="28" fill="#090A0D" stroke="#FFFFFF" strokeWidth="3" />
              <circle cx="150" cy="150" r="10" fill="#6366F1" />
            </svg>
          </div>

          <button
            type="button"
            id="spin-action-button"
            onClick={spinWheel}
            disabled={isSpinning}
            className="mt-6 px-7 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <RefreshCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>{isSpinning ? 'Spinning Hook...' : 'Spin the Wheel'}</span>
          </button>
        </div>

        {/* Selected Hook Output & Story Box */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-[#08090C] border border-white/[0.08] rounded-lg p-5">
            <div className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider mb-1">
              Current Selected Hook
            </div>
            <div className="text-lg sm:text-xl font-semibold text-white leading-relaxed min-h-[3.5rem] flex items-center">
              “{selectedHook}”
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs text-zinc-400 font-mono">Format: High-Retention Video Hook</span>
              <button
                type="button"
                id="copy-hook-btn"
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/[0.06] hover:bg-white/[0.12] text-xs font-mono text-zinc-200 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Hook</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs text-zinc-400 leading-relaxed">
            <strong className="text-zinc-200 block mb-1">Why this project matters:</strong>
            Instead of spending hours searching for a free, non-bloated tool or tolerating ad popups, I wrote a prompt, styled the canvas, and shipped the code in under 30 minutes.
          </div>
        </div>
      </div>
    </div>
  );
};
