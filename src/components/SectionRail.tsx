import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const SECTION_ITEMS = [
  { id: 'hero-section', label: 'Top' },
  { id: 'work', label: 'Work' },
  { id: 'approach', label: 'Approach' },
  { id: 'teaching', label: 'Teaching' },
  { id: 'about', label: 'Experience' },
  { id: 'writing', label: 'Writing' },
  { id: 'contact', label: 'Contact' },
];

const TOP_ALIASES = ['hero', 'hero-section', 'highlights'];

export function SectionRail({ activeSection }: { activeSection: string }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const lastKnownRef = useRef('hero-section');

  // Phones only: names show while scrolling and fade out ~1.5s after scrolling stops.
  // Starts visible so first-time visitors see the full list once.
  const [isScrolling, setIsScrolling] = useState(true);
  useEffect(() => {
    let timer = window.setTimeout(() => setIsScrolling(false), 1500);
    const onScroll = () => {
      setIsScrolling(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setIsScrolling(false), 1500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(timer);
    };
  }, []);

  // Resolve active rail item; sections not on the rail keep the previous one lit.
  if (TOP_ALIASES.includes(activeSection)) {
    lastKnownRef.current = 'hero-section';
  } else if (SECTION_ITEMS.some((item) => item.id === activeSection)) {
    lastKnownRef.current = activeSection;
  }
  const activeId = lastKnownRef.current;

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
    history.replaceState(null, '', `#${id}`);
  };

  return (
    <nav
      aria-label="Page sections"
      className="fixed right-1 sm:right-5 top-1/2 -translate-y-1/2 z-40 pointer-events-none"
    >
      <div className="relative flex flex-col items-end">
        {/* Vertical guide line, centered under the dots */}
        <div
          className="absolute top-3 bottom-3 right-[15px] w-px bg-white/10"
          aria-hidden="true"
        />
        {SECTION_ITEMS.map((item) => {
          const isActive = item.id === activeId;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                goTo(item.id);
              }}
              aria-label={item.label}
              aria-current={isActive ? 'true' : undefined}
              className="group pointer-events-auto relative flex flex-row-reverse items-center gap-2 p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50"
            >
              <span className="flex h-4 w-4 items-center justify-center">
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? 'h-3 w-3 bg-indigo-400 ring-4 ring-indigo-500/20'
                      : 'h-2 w-2 bg-zinc-600 group-hover:bg-zinc-400'
                  }`}
                />
              </span>
              <span
                className={`whitespace-nowrap rounded-full border bg-[#090A0D]/80 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider backdrop-blur transition-[color,opacity] duration-300 max-sm:absolute max-sm:right-full max-sm:mr-1 ${
                  isScrolling ? '' : 'max-sm:opacity-0 max-sm:pointer-events-none'
                } ${
                  isActive
                    ? 'border-white/10 text-zinc-200'
                    : 'border-white/[0.05] text-zinc-500 group-hover:text-zinc-300 group-focus-visible:text-zinc-300'
                }`}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
