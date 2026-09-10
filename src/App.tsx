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
import { MusePage } from './pages/MusePage';

const getRoutePath = () => {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
  const pathname = window.location.pathname;
  const routePath = basePath && pathname.startsWith(basePath)
    ? pathname.slice(basePath.length) || '/'
    : pathname;

  return routePath.replace(/\/$/, '') || '/';
};

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [routePath, setRoutePath] = useState<string>(getRoutePath);
  const isMusePage = routePath === '/muse';

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

  useEffect(() => {
    const handleLocationChange = () => setRoutePath(getRoutePath());

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
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

      <Header activeSection={activeSection} isMusePage={isMusePage} />

      <main className="relative z-10">
        {isMusePage ? (
          <MusePage />
        ) : (
          <>
            <Hero />
            <Philosophy />
            <FeaturedProjects />
            <Approach />
            <Teaching />
            <Experience />
            <Writing />
            <Contact />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
