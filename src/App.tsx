import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Philosophy } from './components/Philosophy';
import { FeaturedProjects } from './components/FeaturedProjects';
import { Approach } from './components/Approach';
import { Teaching } from './components/Teaching';
import { Experience } from './components/Experience';
import { Writing } from './components/Writing';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#090A0D] text-[#E5E7EB] selection:bg-indigo-500/30 selection:text-white font-sans antialiased">
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.15), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <Header activeSection={activeSection} />

      <main className="relative z-10">
        <Hero />
        <Philosophy />
        <FeaturedProjects />
        <Approach />
        <Teaching />
        <Experience />
        <Writing />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
