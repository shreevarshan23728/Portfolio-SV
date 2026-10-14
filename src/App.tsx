import { useState, useRef } from 'react';
import { Scene } from './components/3d/Scene';
import { Navigation } from './components/ui/Navigation';
import { TelemetryHUD } from './components/ui/TelemetryHUD';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { ArtifactModal } from './components/ui/ArtifactModal';
import { FreeFlyControls } from './components/ui/FreeFlyControls';
import { SectionHero } from './components/sections/SectionHero';
import { SectionTransform } from './components/sections/SectionTransform';
import { SectionImmersion } from './components/sections/SectionImmersion';
import { SectionInteractive } from './components/sections/SectionInteractive';
import { SectionFinal } from './components/sections/SectionFinal';
import { useScrollProgress } from './utils/useScrollProgress';
import type { ArtifactData } from './types';
import { ARTIFACTS } from './components/3d/InteractiveArtifacts';
import { sound } from './utils/sound';

export default function App() {
  const { progress, activeSection } = useScrollProgress();
  const [selectedArtifact, setSelectedArtifact] = useState<ArtifactData | null>(null);
  const [isFreeFly, setIsFreeFly] = useState<boolean>(false);
  const [isCinemaBars, setIsCinemaBars] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleNavigateToSection = (sectionIndex: number) => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = (sectionIndex / 4) * totalHeight;
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  const handleRestart = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNextArtifact = () => {
    if (!selectedArtifact) {
      setSelectedArtifact(ARTIFACTS[0]);
      return;
    }
    const currentIndex = ARTIFACTS.findIndex(a => a.id === selectedArtifact.id);
    const nextIndex = (currentIndex + 1) % ARTIFACTS.length;
    sound.playChime(700 + nextIndex * 100, 0.3);
    setSelectedArtifact(ARTIFACTS[nextIndex]);
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#030305] text-white">
      {/* Subtle Visual Textures */}
      <div className="film-grain" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />

      {/* Optional 2.39:1 Anamorphic Cinema Letterbox Bars */}
      {isCinemaBars && (
        <>
          <div className="fixed top-0 left-0 right-0 h-10 sm:h-14 bg-black z-50 pointer-events-none border-b border-white/5 flex items-center justify-between px-8 text-[9px] font-mono text-gray-500 uppercase tracking-widest">
            <span>ARRI ALEXA 65 // 2.39:1 ANAMORPHIC</span>
            <span>SHUTTER: 180° // T1.5 // COLOR: ACEScc</span>
          </div>
          <div className="fixed bottom-0 left-0 right-0 h-10 sm:h-14 bg-black z-50 pointer-events-none border-t border-white/5 flex items-center justify-between px-8 text-[9px] font-mono text-gray-500 uppercase tracking-widest">
            <span>SCENE // REAL-TIME WEBGL</span>
            <span>TIMECODE // 00:04:18:22</span>
          </div>
        </>
      )}

      {/* Persistent 3D WebGL Scene */}
      <Scene
        scrollProgress={progress}
        selectedArtifact={selectedArtifact}
        onSelectArtifact={setSelectedArtifact}
        isFreeFly={isFreeFly}
      />

      {/* Top HUD Navigation */}
      <Navigation
        activeSection={activeSection}
        isFreeFly={isFreeFly}
        isCinemaBars={isCinemaBars}
        onToggleFreeFly={() => setIsFreeFly(!isFreeFly)}
        onToggleCinemaBars={() => setIsCinemaBars(!isCinemaBars)}
        onNavigateToSection={handleNavigateToSection}
      />

      {/* Live System Diagnostics & Coordinates HUD */}
      <TelemetryHUD
        scrollProgress={progress}
        activeSection={activeSection}
      />

      {/* Vertical Chapter Scroll Progress Rail */}
      <ScrollProgress
        scrollProgress={progress}
        activeSection={activeSection}
        onNavigateToSection={handleNavigateToSection}
      />

      {/* Free-Fly Controls Banner */}
      {isFreeFly && (
        <FreeFlyControls onExit={() => setIsFreeFly(false)} />
      )}

      {/* Holographic Relic Inspection Modal */}
      <ArtifactModal
        artifact={selectedArtifact}
        onClose={() => setSelectedArtifact(null)}
        onNext={handleNextArtifact}
      />

      {/* Editorial Storytelling Overlay Sections */}
      <div className="content-overlay">
        {/* Section 1: Hero Introduction */}
        <SectionHero
          onExplore={() => handleNavigateToSection(1)}
          onInteractCore={() => {
            sound.playResonancePulse();
            const canvasEl = document.querySelector('canvas');
            if (canvasEl) {
              canvasEl.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            }
          }}
        />

        {/* Section 2: Transformation & Expansion */}
        <SectionTransform />

        {/* Section 3: Immersion & Monolith Sanctuary */}
        <SectionImmersion />

        {/* Section 4: The Interactive Triad of Relics */}
        <SectionInteractive
          selectedArtifact={selectedArtifact}
          onSelectArtifact={setSelectedArtifact}
        />

        {/* Section 5: The Horizon & Final Experience */}
        <SectionFinal
          onToggleFreeFly={() => setIsFreeFly(!isFreeFly)}
          onRestart={handleRestart}
        />
      </div>
    </div>
  );
}
