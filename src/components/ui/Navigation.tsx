import { useState } from 'react';
import { Volume2, VolumeX, Compass, Menu, X } from 'lucide-react';
import { sound } from '../../utils/sound';

interface NavigationProps {
  activeSection: number;
  isFreeFly: boolean;
  onToggleFreeFly: () => void;
  onNavigateToSection: (sectionIndex: number) => void;
}

export function Navigation({
  activeSection,
  isFreeFly,
  onToggleFreeFly,
  onNavigateToSection,
}: NavigationProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sections = [
    { label: 'ORIGIN', index: 0 },
    { label: 'TRANSFORMATION', index: 1 },
    { label: 'IMMERSION', index: 2 },
    { label: 'THE RELICS', index: 3 },
    { label: 'HORIZON', index: 4 },
  ];

  const handleSoundToggle = () => {
    const isPlaying = sound.toggleMute();
    setIsMuted(!isPlaying);
  };

  const handleNavClick = (idx: number) => {
    sound.playHover();
    onNavigateToSection(idx);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-5 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan via-electric-blue to-neon-violet p-[1px] flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.4)]">
            <div className="w-full h-full bg-[#030305] rounded-[7px] flex items-center justify-center text-xs font-mono font-bold text-neon-cyan">
              Δ
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold tracking-widest text-sm text-white flex items-center gap-2">
              DIMENSION <span className="text-[10px] text-neon-cyan font-mono px-1.5 py-0.5 rounded bg-neon-cyan/10 border border-neon-cyan/20">v2.4</span>
            </span>
            <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">
              Beyond Imagination
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0c0c14]/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-2xl pointer-events-auto">
          {sections.map((sec) => {
            const isActive = activeSection === sec.index;
            return (
              <button
                key={sec.label}
                onClick={() => handleNavClick(sec.index)}
                className={`px-3 py-1.5 text-xs font-mono tracking-wider transition-all rounded-full flex items-center gap-1.5 ${
                  isActive
                    ? 'text-black bg-neon-cyan font-bold shadow-[0_0_12px_rgba(0,240,255,0.6)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-[10px] opacity-60">0{sec.index + 1}</span>
                <span>{sec.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right HUD Controls */}
        <div className="flex items-center gap-3 pointer-events-auto">
          {/* Free-Fly 3D Exploration Toggle */}
          <button
            onClick={() => {
              sound.playChime(800, 0.3);
              onToggleFreeFly();
            }}
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono tracking-wider transition-all ${
              isFreeFly
                ? 'bg-neon-cyan text-black border-neon-cyan font-bold shadow-[0_0_15px_rgba(0,240,255,0.8)]'
                : 'bg-[#0c0c14]/80 text-gray-300 border-white/10 hover:border-neon-cyan/50 hover:text-neon-cyan'
            }`}
            title="Toggle 360° Free-Fly Camera Mode"
          >
            <Compass className={`w-3.5 h-3.5 ${isFreeFly ? 'animate-spin-slow' : ''}`} />
            <span>{isFreeFly ? 'EXIT FREE-FLY' : '3D FREE-FLY'}</span>
          </button>

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={handleSoundToggle}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono tracking-wider transition-all ${
              !isMuted
                ? 'bg-neon-violet/20 text-neon-violet border-neon-violet/50 shadow-[0_0_15px_rgba(138,43,226,0.3)]'
                : 'bg-[#0c0c14]/80 text-gray-400 border-white/10 hover:text-white'
            }`}
            title={isMuted ? 'Enable Ambient Audio Synthesizer' : 'Mute Audio'}
          >
            {!isMuted ? <Volume2 className="w-3.5 h-3.5 text-neon-violet" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{!isMuted ? 'AUDIO: ON' : 'AUDIO: OFF'}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#0c0c14]/80 border border-white/10 text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-4 bg-[#0c0c14]/95 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col gap-2 pointer-events-auto shadow-2xl">
          {sections.map((sec) => (
            <button
              key={sec.label}
              onClick={() => handleNavClick(sec.index)}
              className={`text-left px-4 py-2.5 rounded-lg text-xs font-mono flex items-center justify-between ${
                activeSection === sec.index ? 'bg-neon-cyan text-black font-bold' : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              <span>0{sec.index + 1} // {sec.label}</span>
              {activeSection === sec.index && <span className="text-[10px]">ACTIVE</span>}
            </button>
          ))}
          <button
            onClick={() => {
              onToggleFreeFly();
              setMobileMenuOpen(false);
            }}
            className="mt-2 text-left px-4 py-2.5 rounded-lg text-xs font-mono bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan flex items-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>{isFreeFly ? 'EXIT FREE-FLY 3D' : 'ENTER 3D FREE-FLY'}</span>
          </button>
        </div>
      )}
    </header>
  );
}
