import { useRef } from 'react';
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
                className={`whitespace-nowrap rounded-full border border-white/10 bg-[#090A0D]/80 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-zinc-200 backdrop-blur transition-opacity duration-200 ${
                  isActive
                    ? 'opacity-100'
                    : 'hidden sm:inline opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
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
