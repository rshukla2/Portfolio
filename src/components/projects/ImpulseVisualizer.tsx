import React, { useEffect, useRef, useState } from 'react';
import { ShoppingBag, Sparkles, Check, Package, Zap } from 'lucide-react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface CartItem {
  id: string;
  name: string;
  category: string;
  appeal: string;
  emoji: string;
}

const ITEMS: CartItem[] = [
  { id: '1', name: 'Artisan Keyboard', category: 'Sample product', appeal: 'Tempting', emoji: '⌨️' },
  { id: '2', name: 'Midnight Espresso Roast', category: 'Sample product', appeal: 'Very tempting', emoji: '☕' },
  { id: '3', name: 'Vintage Synth', category: 'Sample product', appeal: 'Tempting', emoji: '🎹' },
  { id: '4', name: 'Noise-Canceling Headphones', category: 'Sample product', appeal: 'Very tempting', emoji: '🎧' },
];

export const ImpulseVisualizer: React.FC = () => {
  const prefersReduced = usePrefersReducedMotion();
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  const [dopamineLevel, setDopamineLevel] = useState<number>(84);
  const [purchasedCount, setPurchasedCount] = useState<number>(3);
  const [isOrdered, setIsOrdered] = useState<boolean>(false);
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (resetTimerRef.current !== null) window.clearTimeout(resetTimerRef.current);
  }, []);

  const handleImpulseBuy = () => {
    if (resetTimerRef.current !== null) window.clearTimeout(resetTimerRef.current);
    setIsOrdered(true);
    setDopamineLevel(99);
    setPurchasedCount((prev) => prev + 1);

    if (!prefersReduced) {
      resetTimerRef.current = window.setTimeout(() => {
        setIsOrdered(false);
        setActiveItemIndex((prev) => (prev + 1) % ITEMS.length);
        setDopamineLevel(88);
        resetTimerRef.current = null;
      }, 2000);
    }
  };

  const item = ITEMS[activeItemIndex];

  return (
    <div
      id="impulse-app-visualizer"
      className="w-full md:min-h-[600px] bg-[#0D0F14] border border-white/[0.08] rounded-xl p-5 md:p-7 text-left shadow-2xl relative overflow-hidden"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="font-mono text-xs text-zinc-300 font-medium tracking-wide uppercase">
            Impulse · Fake Shopping Simulator
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <span><strong className="text-white">Archived · Web demo</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* CSS Phone Shell */}
        <div className="md:col-span-5 flex justify-center">
          <div className="w-64 sm:w-72 bg-[#090A0D] border-[5px] border-[#22242D] rounded-[36px] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative">
            {/* Phone Notch */}
            <div className="w-24 h-4 bg-[#22242D] rounded-full mx-auto mb-2 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#16171E] mr-2" />
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-900" />
            </div>

            {/* In-app Display */}
            <div className="bg-[#12141A] rounded-[24px] p-4 text-white">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 mb-3">
                <span className="font-bold text-xs tracking-wider text-indigo-400 uppercase">IMPULSE FEED</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  Demo cart · {purchasedCount} orders
                </span>
              </div>

              {/* Item Card */}
              <div className="bg-[#1A1C24] border border-white/[0.08] rounded-xl p-4 text-center mb-3">
                <div className="text-4xl mb-2 select-none transform hover:scale-110 transition-transform">
                  {item.emoji}
                </div>
                <div className="font-semibold text-sm text-zinc-100">{item.name}</div>
                <div className="text-[11px] text-zinc-400 font-mono mt-0.5">{item.category}</div>

                <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-amber-400 font-mono">
                  <Sparkles className="w-3 h-3" />
                  <span>Sample appeal: {item.appeal}</span>
                </div>
              </div>

              {/* Dopamine Meter */}
              <div className="space-y-1 mb-3">
                <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                  <span>Demo anticipation</span>
                  <span className="text-amber-400">High</span>
                </div>
                <div className="w-full bg-white/[0.08] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 transition-all duration-500"
                    style={{ width: `${dopamineLevel}%` }}
                  />
                </div>
              </div>

              {/* Action Button */}
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
                    <span>Fake Order Placed</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Place Fake Order</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Story & Technical Depth */}
        <div className="md:col-span-7 space-y-4">
          <div className="bg-[#08090C] border border-white/[0.08] rounded-lg p-5">
            <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <Package className="w-4 h-4 text-indigo-400" />
              <span>From Curiosity to Prototype</span>
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              After reading about a South Korean fake-shopping trend, the first prototype was built in one evening. It grew into a Flutter app, reached Google Play closed testing, and is now archived with an offline browser demo.
            </p>

            <div className="mt-4 pt-3 border-t border-white/[0.06] grid grid-cols-2 gap-3 font-mono text-[11px]">
              <div>
                <span className="text-zinc-500 block">Build story</span>
                <span className="text-emerald-400 font-medium">First prototype in 1 evening</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Stack</span>
                <span className="text-zinc-300 font-medium">Flutter · Riverpod</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs text-zinc-400 leading-relaxed">
            <strong className="text-zinc-200 block mb-1">Offline demo:</strong>
            The frozen browser catalog preserves the product experience without the original API. Every product and order shown here is sample data.
          </div>
        </div>
      </div>
    </div>
  );
};
