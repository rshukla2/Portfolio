import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Check, Package, Zap } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  category: string;
  dopamineScore: number;
  emoji: string;
}

const ITEMS: CartItem[] = [
  { id: '1', name: 'Mystery Artisan Keyboard', category: 'Hardware', dopamineScore: 98, emoji: '⌨️' },
  { id: '2', name: 'Midnight Espresso Roast', category: 'Fuel', dopamineScore: 85, emoji: '☕' },
  { id: '3', name: 'Vintage Cyberpunk Synth', category: 'Audio', dopamineScore: 94, emoji: '🎹' },
  { id: '4', name: 'Noise-Canceling Orbitals', category: 'Focus', dopamineScore: 91, emoji: '🎧' },
];

export const ImpulseVisualizer: React.FC = () => {
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  const [dopamineLevel, setDopamineLevel] = useState<number>(84);
  const [purchasedCount, setPurchasedCount] = useState<number>(3);
  const [isOrdered, setIsOrdered] = useState<boolean>(false);

  const handleImpulseBuy = () => {
    setIsOrdered(true);
    setDopamineLevel(99);
    setPurchasedCount((prev) => prev + 1);

    setTimeout(() => {
      setIsOrdered(false);
      setActiveItemIndex((prev) => (prev + 1) % ITEMS.length);
      setDopamineLevel(88);
    }, 2000);
  };

  const item = ITEMS[activeItemIndex];

  return (
    <div
      id="impulse-app-visualizer"
      className="w-full bg-[#0D0F14] border border-white/[0.08] rounded-xl p-5 md:p-7 text-left shadow-2xl relative overflow-hidden"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="font-mono text-xs text-zinc-300 font-medium tracking-wide uppercase">
            Impulse Engine · Dopamine UX Loop Simulator
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <span>Target: <strong className="text-white">Web & Android Play Store</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-5 flex justify-center">
          <div className="w-64 sm:w-72 bg-[#090A0D] border-[5px] border-[#22242D] rounded-[36px] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative">
            <div className="w-24 h-4 bg-[#22242D] rounded-full mx-auto mb-2 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#16171E] mr-2" />
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-900" />
            </div>

            <div className="bg-[#12141A] rounded-[24px] p-4 text-white">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 mb-3">
                <span className="font-bold text-xs tracking-wider text-indigo-400 uppercase">IMPULSE FEED</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {purchasedCount} Checked Out
                </span>
              </div>

              <div className="bg-[#1A1C24] border border-white/[0.08] rounded-xl p-4 text-center mb-3">
                <div className="text-4xl mb-2 select-none transform hover:scale-110 transition-transform">
                  {item.emoji}
                </div>
                <div className="font-semibold text-sm text-zinc-100">{item.name}</div>
                <div className="text-[11px] text-zinc-400 font-mono mt-0.5">{item.category}</div>

                <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-amber-400 font-mono">
                  <Sparkles className="w-3 h-3" />
                  <span>Dopamine Score: {item.dopamineScore}%</span>
                </div>
              </div>

              <div className="space-y-1 mb-3">
                <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                  <span>Anticipation Index</span>
                  <span className="text-amber-400">{dopamineLevel}%</span>
                </div>
                <div className="w-full bg-white/[0.08] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 transition-all duration-500"
                    style={{ width: `${dopamineLevel}%` }}
                  />
                </div>
              </div>

              <button
                type="button"
                id="impulse-buy-btn"
                onClick={handleImpulseBuy}
                disabled={isOrdered}
                className={`w-full py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  isOrdered
                    ? 'bg-emerald-600 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white active:scale-95'
                }`}
              >
                {isOrdered ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Dopamine Unlocked!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Instant Checkout Loop</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 space-y-4">
          <div className="bg-[#08090C] border border-white/[0.08] rounded-lg p-5">
            <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <Package className="w-4 h-4 text-indigo-400" />
              <span>The Rapid-Evolution Experiment</span>
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Read about a viral psychological concept in Seoul at 7:00 PM. By 11:30 PM, the core React prototype was live. Over the following weekend, it was packaged with backend state, authentication, and native packaging for the Google Play Store.
            </p>

            <div className="mt-4 pt-3 border-t border-white/[0.06] grid grid-cols-2 gap-3 font-mono text-[11px]">
              <div>
                <span className="text-zinc-500 block">Iteration Velocity</span>
                <span className="text-emerald-400 font-medium">Ideation to Store in days</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Stack</span>
                <span className="text-zinc-300 font-medium">React, Capacitor, Node API</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs text-zinc-400 leading-relaxed">
            <strong className="text-zinc-200 block mb-1">Takeaway for Learners:</strong>
            AI coding tools and full-stack fundamentals let me test the idea that same evening while it was still fresh.
          </div>
        </div>
      </div>
    </div>
  );
};
