import { useState, useEffect } from 'react';
import { CustomCursor } from './components/ui/CustomCursor';
import { Navigation } from './components/ui/Navigation';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { ProjectGallery } from './components/sections/ProjectGallery';
import { DigitalPlayground } from './components/sections/DigitalPlayground';
import { TechStack } from './components/sections/TechStack';
import { ExperimentsSection } from './components/sections/ExperimentsSection';
import { Contact } from './components/sections/Contact';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const sectionIds = ['home', 'about', 'projects', 'experiments', 'engine', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-[#f1f5f9] selection:bg-[#00f0ff] selection:text-[#050505] overflow-x-hidden">
      {/* Precision Trailing Custom Cursor */}
      <CustomCursor />

      {/* Subtle Atmospheric Textures */}
      <div className="film-grain" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />

      {/* Floating Minimal Navigation Bar */}
      <Navigation activeSection={activeSection} />

      {/* Main Sections */}
      <main className="w-full">
        {/* 02. HERO SECTION — The Wow Experience */}
        <Hero />

        {/* 04. ABOUT ME — Digital Identity */}
        <About />

        {/* 05. SELECTED WORK — Immersive Project Gallery */}
        <ProjectGallery />

        {/* 06. 3D DIGITAL PLAYGROUND — Enter the Experiment */}
        <DigitalPlayground />

        {/* 07. TECH STACK — The Engine Room */}
        <TechStack />

        {/* 08. EXPERIMENTS & MICRO-INTERACTIONS */}
        <ExperimentsSection />

        {/* 09. CONTACT — The Final Frame & Minimal Footer */}
        <Contact />
      </main>
    </div>
  );
}
