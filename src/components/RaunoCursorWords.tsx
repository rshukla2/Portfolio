import React, { useEffect, useRef, useState } from 'react';

interface FloatingWord {
  id: number;
  text: string;
  x: number;
  y: number;
  opacity: number;
  scale: number;
  dx: number;
  dy: number;
}

const WORDS = [
  'observe',
  'imagine',
  'build',
  'test',
  'automate',
  'ship',
  'teach',
  'iterate',
  'simplify',
];

export const RaunoCursorWords: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [words, setWords] = useState<FloatingWord[]>([]);
  const lastSpawnRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });
  const wordIndexRef = useRef<number>(0);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const hasFloatingWords = words.length > 0;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mousePosRef.current = { x, y };

      const now = performance.now();
      const dist = Math.hypot(x - lastSpawnRef.current.x, y - lastSpawnRef.current.y);

      // Only spawn when mouse travels enough distance and not too frequently
      if (dist > 75 && now - lastSpawnRef.current.time > 320) {
        lastSpawnRef.current = { x, y, time: now };
        const text = WORDS[wordIndexRef.current % WORDS.length];
        wordIndexRef.current += 1;

        const angle = Math.random() * Math.PI * 2;
        const speed = 0.35 + Math.random() * 0.4;

        const newWord: FloatingWord = {
          id: now + Math.random(),
          text,
          x: x + (Math.random() * 20 - 10),
          y: y - 12,
          opacity: 0.85,
          scale: 0.95,
          dx: Math.cos(angle) * speed,
          dy: -0.6 - Math.random() * 0.4,
        };

        setWords((prev) => [...prev.slice(-8), newWord]);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  useEffect(() => {
    if (!hasFloatingWords) return;

    let animId: number;

    const loop = () => {
      setWords((prevWords) => {
        if (prevWords.length === 0) return prevWords;
        return prevWords
          .map((w) => ({
            ...w,
            x: w.x + w.dx,
            y: w.y + w.dy,
            opacity: w.opacity - 0.015,
            scale: w.scale + 0.003,
          }))
          .filter((w) => w.opacity > 0.02);
      });
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [hasFloatingWords]);

  if (isTouchDevice) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      id="rauno-ambient-canvas"
      className="absolute inset-0 overflow-hidden pointer-events-none z-10"
      aria-hidden="true"
    >
      <div
        className="absolute w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-opacity duration-300 ease-out opacity-25"
        style={{
          left: `${mousePosRef.current.x}px`,
          top: `${mousePosRef.current.y}px`,
          background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, rgba(99,102,241,0) 70%)',
        }}
      />

      {words.map((w) => (
        <span
          key={w.id}
          className="absolute font-mono text-[11px] uppercase tracking-[0.25em] text-indigo-300/80 font-medium select-none pointer-events-none will-change-transform"
          style={{
            left: `${w.x}px`,
            top: `${w.y}px`,
            opacity: w.opacity,
            transform: `translate(-50%, -50%) scale(${w.scale})`,
            textShadow: '0 0 12px rgba(99, 102, 241, 0.4)',
          }}
        >
          {w.text}
        </span>
      ))}
    </div>
  );
};
