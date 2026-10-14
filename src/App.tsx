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
import { useGSAPScrollTrigger } from './hooks/useGSAPScrollTrigger';
import type { ArtifactData } from './types';
import { ARTIFACTS } from './components/3d/InteractiveArtifacts';
import { sound } from './utils/sound';

export default function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  // Unified master GSAP ScrollTrigger timeline state
  const sceneState = useGSAPScrollTrigger(scrollContainerRef, scrollTrackRef);

  const [selectedArtifact, setSelectedArtifact] = useState<ArtifactData | null>(null);
  const [isFreeFly, setIsFreeFly] = useState<boolean>(false);
  const [isCinemaBars, setIsCinemaBars] = useState<boolean>(false);

  const handleNavigateToSection = (sectionIndex: number) => {
    const track = scrollTrackRef.current;
    if (!track) return;
    const totalHeight = track.scrollHeight - window.innerHeight;
    const targets = [0, 0.24, 0.48, 0.72, 1.0];
    window.scrollTo({
      top: targets[sectionIndex] * totalHeight,
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

  const p = sceneState.progress;

  return (
    <div ref={scrollContainerRef} className="relative bg-[#030305] text-white selection:bg-neon-cyan selection:text-black">
      {/* Subtle Visual Textures */}
      <div className="film-grain" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />

      {/* Optional 2.39:1 Anamorphic Cinema Letterbox Bars */}
      {isCinemaBars && (
        <>
          <div className="fixed top-0 left-0 right-0 h-10 sm:h-14 bg-black z-50 pointer-events-none border-b border-white/5 flex items-center justify-between px-8 text-[9px] font-mono text-gray-500 uppercase tracking-widest transition-all">
            <span>ARRI ALEXA 65 // 2.39:1 ANAMORPHIC</span>
            <span>SHUTTER: 180° // T1.5 // COLOR: ACEScc</span>
          </div>
          <div className="fixed bottom-0 left-0 right-0 h-10 sm:h-14 bg-black z-50 pointer-events-none border-t border-white/5 flex items-center justify-between px-8 text-[9px] font-mono text-gray-500 uppercase tracking-widest transition-all">
            <span>SCENE // GSAP SCROLLTRIGGER 3D</span>
            <span>PROGRESS // {Math.round(p * 100)}%</span>
          </div>
        </>
      )}

      {/* Pinned 3D WebGL Scene */}
      <Scene
        sceneState={sceneState}
        selectedArtifact={selectedArtifact}
        onSelectArtifact={setSelectedArtifact}
        isFreeFly={isFreeFly}
      />

      {/* Top HUD Navigation */}
      <Navigation
        activeSection={sceneState.activeAct}
        isFreeFly={isFreeFly}
        isCinemaBars={isCinemaBars}
        onToggleFreeFly={() => setIsFreeFly(!isFreeFly)}
        onToggleCinemaBars={() => setIsCinemaBars(!isCinemaBars)}
        onNavigateToSection={handleNavigateToSection}
      />

      {/* Live System Diagnostics & Coordinates HUD */}
      <TelemetryHUD
        scrollProgress={sceneState.progress}
        activeSection={sceneState.activeAct}
      />

      {/* Vertical Chapter Scroll Progress Rail */}
      <ScrollProgress
        scrollProgress={sceneState.progress}
        activeSection={sceneState.activeAct}
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

      {/* =========================================================================
          PINNED NARRATIVE STAGE WITH CHOREOGRAPHED GSAP TRANSITIONS
          Each section animates with bespoke typography, avoiding repetitive fade-ins!
          ========================================================================= */}
      <div className="fixed inset-0 pointer-events-none z-10 flex flex-col justify-between overflow-hidden">
        {/* ACT I: THE SINGULARITY (Active 0.00 -> 0.22) */}
        <div
          className="absolute inset-0 transition-all duration-300 pointer-events-none"
          style={{
            opacity: p < 0.18 ? 1 - p * 2.5 : 0,
            transform: `translateY(${p < 0.22 ? p * -120 : -120}px) scale(${1 - p * 0.15})`,
            filter: p > 0.10 ? `blur(${Math.min((p - 0.10) * 45, 12)}px)` : 'none',
            visibility: p < 0.22 ? 'visible' : 'hidden',
          }}
        >
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
        </div>

        {/* ACT II: RECONFIGURATION (Active 0.22 -> 0.46) */}
        <div
          className="absolute inset-0 transition-all duration-300 pointer-events-none"
          style={{
            opacity: p >= 0.20 && p <= 0.44 ? Math.min((p - 0.20) * 10, 1) * Math.min((0.44 - p) * 10, 1) : 0,
            transform: `translateX(${p < 0.26 ? (0.26 - p) * -180 : p > 0.40 ? (p - 0.40) * -180 : 0}px)`,
            filter: p < 0.22 || p > 0.42 ? `blur(${Math.abs(p - 0.32) * 20}px)` : 'none',
            visibility: p >= 0.18 && p <= 0.48 ? 'visible' : 'hidden',
          }}
        >
          <SectionTransform />
        </div>

        {/* ACT III: THE DEEP SECTOR (Active 0.46 -> 0.70) */}
        <div
          className="absolute inset-0 transition-all duration-300 pointer-events-none"
          style={{
            opacity: p >= 0.44 && p <= 0.68 ? Math.min((p - 0.44) * 10, 1) * Math.min((0.68 - p) * 10, 1) : 0,
            transform: `scale(${p >= 0.44 && p <= 0.68 ? 1.15 - ((p - 0.44) / 0.24) * 0.15 : 1.15}) translateY(${p < 0.50 ? (0.50 - p) * 80 : 0}px)`,
            visibility: p >= 0.42 && p <= 0.72 ? 'visible' : 'hidden',
          }}
        >
          <SectionImmersion />
        </div>

        {/* ACT IV: THE TRIAD OF RELICS (Active 0.70 -> 0.90) */}
        <div
          className="absolute inset-0 transition-all duration-300 pointer-events-none"
          style={{
            opacity: p >= 0.68 && p <= 0.88 ? Math.min((p - 0.68) * 10, 1) * Math.min((0.88 - p) * 10, 1) : 0,
            transform: `translateY(${p < 0.74 ? (0.74 - p) * 120 : p > 0.85 ? (p - 0.85) * -100 : 0}px)`,
            visibility: p >= 0.66 && p <= 0.91 ? 'visible' : 'hidden',
          }}
        >
          <SectionInteractive
            selectedArtifact={selectedArtifact}
            onSelectArtifact={setSelectedArtifact}
          />
        </div>

        {/* ACT V: THE HORIZON (Active 0.90 -> 1.00) */}
        <div
          className="absolute inset-0 transition-all duration-300 pointer-events-none"
          style={{
            opacity: p >= 0.88 ? Math.min((p - 0.88) * 12, 1) : 0,
            transform: `scale(${p >= 0.88 ? 0.92 + ((p - 0.88) / 0.12) * 0.08 : 0.92})`,
            letterSpacing: p >= 0.88 ? `${(p - 0.88) * 0.05}em` : '0em',
            visibility: p >= 0.86 ? 'visible' : 'hidden',
          }}
        >
          <SectionFinal
            onToggleFreeFly={() => setIsFreeFly(!isFreeFly)}
            onRestart={handleRestart}
          />
        </div>
      </div>

      {/* =========================================================================
          PHYSICAL SCROLL TRACK DRIVEN BY GSAP SCROLLTRIGGER (500vh)
          Permits smooth, native mousewheel and touch scroll across all devices
          ========================================================================= */}
      <div
        ref={scrollTrackRef}
        className="relative w-full h-[500vh] pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
