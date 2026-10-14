import { ArrowDown, Orbit, Play } from 'lucide-react';
import { sound } from '../../utils/sound';

interface SectionHeroProps {
  onExplore: () => void;
  onInteractCore: () => void;
}

export function SectionHero({ onExplore, onInteractCore }: SectionHeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-between px-6 sm:px-12 py-24 sm:py-28 pointer-events-none select-none">
      {/* Top Cinematic Slate Header */}
      <div className="flex items-center justify-between max-w-7xl mx-auto w-full pt-4">
        <div className="flex items-center gap-3 font-mono text-[10px] text-gray-500 tracking-widest uppercase">
          <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded">REEL 01</span>
          <span>FPS: 60.00</span>
          <span className="hidden sm:inline text-gray-700">/</span>
          <span className="hidden sm:inline">PROD: DIMENSION_CORP</span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px] text-neon-cyan tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
          <span>REAL-TIME PBR SHADER ENGINE</span>
        </div>
      </div>

      {/* Monumental Headline Composition */}
      <div className="max-w-6xl mx-auto w-full my-auto text-left py-12">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-neon-cyan tracking-[0.25em] uppercase mb-4 opacity-90">
          <span>// ACT I : THE SINGULARITY</span>
        </div>

        <h1 className="font-display font-extrabold text-6xl sm:text-8xl lg:text-[10.5rem] text-white tracking-tighter leading-[0.88] mb-6">
          ENTER ANOTHER <br />
          <span className="bg-gradient-to-r from-white via-neon-cyan to-neon-violet bg-clip-text text-transparent">
            DIMENSION.
          </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pt-4">
          <p className="md:col-span-7 font-sans text-lg sm:text-2xl text-gray-300 font-light leading-relaxed">
            Beyond interfaces. Beyond imagination. A cinematic real-time sculpture exploring the physical presence of hyper-dimensional computing.
          </p>

          <div className="md:col-span-5 flex flex-wrap items-center gap-4 pointer-events-auto">
            <button
              onClick={() => {
                sound.playChime(660, 0.4);
                onExplore();
              }}
              className="group px-7 py-4 rounded-full bg-white text-black font-display font-bold text-xs tracking-widest uppercase hover:bg-neon-cyan hover:shadow-[0_0_35px_rgba(0,240,255,0.8)] transition-all flex items-center gap-3 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-black group-hover:translate-x-0.5 transition-transform" />
              <span>EXPLORE EXPERIENCE</span>
            </button>

            <button
              onClick={() => {
                sound.playResonancePulse();
                onInteractCore();
              }}
              className="px-6 py-4 rounded-full bg-black/60 text-white font-mono text-xs tracking-wider border border-white/20 hover:border-neon-cyan hover:bg-neon-cyan/10 transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <Orbit className="w-3.5 h-3.5 text-neon-cyan" />
              <span>PULSE CORE</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Cinematic Scroll Bar */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-t border-white/10 pt-4 pointer-events-auto">
        <div className="font-mono text-[10px] text-gray-500 tracking-widest uppercase flex items-center gap-4">
          <span>COORDINATES: [0.0, 0.4, 7.2]</span>
          <span className="hidden sm:inline">LENS: 44mm</span>
        </div>

        <button
          onClick={onExplore}
          className="flex items-center gap-2 font-mono text-[10px] text-gray-400 hover:text-neon-cyan tracking-widest uppercase transition-colors group cursor-pointer"
        >
          <span>SCROLL TO ADVANCE SCENE</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform text-neon-cyan" />
        </button>
      </div>
    </section>
  );
}
