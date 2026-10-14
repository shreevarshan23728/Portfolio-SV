import { ArrowDown, Sparkles, Orbit } from 'lucide-react';
import { sound } from '../../utils/sound';

interface SectionHeroProps {
  onExplore: () => void;
  onInteractCore: () => void;
}

export function SectionHero({ onExplore, onInteractCore }: SectionHeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-between px-6 py-28 pointer-events-none">
      {/* Top Tagline */}
      <div className="max-w-4xl mx-auto w-full text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 pointer-events-auto shadow-[0_0_20px_rgba(0,240,255,0.15)]">
          <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-gray-300 uppercase">
            IMMERSIVE WEBGL INSTALLATION // 2026
          </span>
        </div>

        {/* Oversized Headline */}
        <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-9xl text-white tracking-tighter leading-[0.95] mb-6 drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
          ENTER ANOTHER <br />
          <span className="bg-gradient-to-r from-white via-neon-cyan to-neon-violet bg-clip-text text-transparent">
            DIMENSION.
          </span>
        </h1>

        {/* Supporting Editorial Subtitle */}
        <p className="font-sans text-lg sm:text-2xl text-gray-300 font-light max-w-xl mx-auto leading-relaxed mb-8">
          Beyond interfaces. Beyond imagination.
        </p>

        {/* Hero Interactive Triggers */}
        <div className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
          <button
            onClick={() => {
              sound.playChime(660, 0.4);
              onExplore();
            }}
            className="px-8 py-4 rounded-full bg-neon-cyan text-black font-display font-extrabold text-sm tracking-wider uppercase hover:bg-white hover:shadow-[0_0_35px_rgba(0,240,255,0.8)] transition-all flex items-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>INITIATE ODYSSEY</span>
          </button>

          <button
            onClick={() => {
              sound.playResonancePulse();
              onInteractCore();
            }}
            className="px-6 py-4 rounded-full bg-[#0c0c14]/80 text-white font-mono text-xs tracking-wider border border-white/15 hover:border-neon-cyan/50 hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md"
          >
            <Orbit className="w-4 h-4 text-neon-cyan" />
            <span>PULSE ARTIFACT CORE</span>
          </button>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="flex flex-col items-center justify-center gap-3 text-center pointer-events-auto pt-8">
        <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase flex items-center gap-2">
          <span>SCROLL TO DIVE DEEPER</span>
          <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-ping" />
        </span>
        <button
          onClick={onExplore}
          className="p-2.5 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-neon-cyan transition-colors bg-black/40 backdrop-blur-sm"
          aria-label="Scroll to next chapter"
        >
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
