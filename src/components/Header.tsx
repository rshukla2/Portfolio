import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ArrowUpRight,
  Mail,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Github, Linkedin } from './icons/BrandIcons';

interface HeaderProps {
  activeSection: string;
}

const NAV_ITEMS = [
  { label: 'Work', href: '#work' },
  { label: 'Approach', href: '#approach' },
  { label: 'Teaching', href: '#teaching' },
  { label: 'About', href: '#about' },
  { label: 'Writing', href: '#writing' },
  { label: 'Contact', href: '#contact' },
];

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#090A0D]/85 backdrop-blur-md border-b border-white/[0.07] py-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          id="nav-brand-logo"
          className="group flex items-center gap-2.5 font-bold tracking-tight text-white transition-opacity hover:opacity-90 cursor-pointer"
        >
          <div className="w-6 h-6 rounded-md bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center font-mono text-xs text-indigo-300 group-hover:scale-105 transition-transform">
            R
          </div>
          <span className="text-sm sm:text-base tracking-tight font-semibold">RISHI SHUKLA</span>
        </a>

        {/* Desktop Nav */}
        <nav id="desktop-nav-menu" className="hidden md:flex items-center gap-7 text-xs font-medium">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.label}
                href={item.href}
                className={`transition-colors duration-200 cursor-pointer tracking-wide ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-zinc-400 hover:text-zinc-100'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action / Social Link */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Rishi Shukla on LinkedIn"
            className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Rishi Shukla on GitHub"
            className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="#teaching"
            id="nav-cta-teaching"
            className="ml-2 px-3.5 py-1.5 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-xs font-medium text-white border border-white/[0.08] transition-all flex items-center gap-1 cursor-pointer"
          >
            <span>Learn With Me</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-indigo-400" />
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          id="mobile-menu-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-dropdown"
          className="md:hidden bg-[#0D0F14]/98 backdrop-blur-xl border-b border-white/[0.08] px-6 py-6 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="flex flex-col space-y-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-zinc-300 hover:text-white py-1.5 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded bg-white/[0.05] text-zinc-300 hover:text-white"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded bg-white/[0.05] text-zinc-300 hover:text-white"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                aria-label="Email Rishi"
                className="p-2 rounded bg-white/[0.05] text-zinc-300 hover:text-white"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <a
              href="#teaching"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-colors"
            >
              Learn With Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
