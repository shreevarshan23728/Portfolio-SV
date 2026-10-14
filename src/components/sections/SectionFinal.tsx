import { Compass, RotateCcw, Sparkles, Terminal } from 'lucide-react';
import { sound } from '../../utils/sound';

interface SectionFinalProps {
  onToggleFreeFly: () => void;
  onRestart: () => void;
}

export function SectionFinal({ onToggleFreeFly, onRestart }: SectionFinalProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-between px-6 py-24 pointer-events-none">
      <div className="max-w-4xl mx-auto w-full text-center my-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 font-mono text-xs tracking-widest uppercase shadow-2xl">
          <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
          <span>CHAPTER 05 // THE HORIZON</span>
        </div>

        {/* Powerful Closing Statement */}
        <h2 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl text-white tracking-tighter leading-[0.95] drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
          THE LIMIT IS YOUR <br />
          <span className="bg-gradient-to-r from-neon-cyan via-white to-neon-violet bg-clip-text text-transparent">
            IMAGINATION.
          </span>
        </h2>

        <p className="font-sans text-lg sm:text-2xl text-gray-300 font-light max-w-xl mx-auto leading-relaxed">
          The future is not something you enter. <br className="hidden sm:inline" />
          It is something you build.
        </p>

        {/* Clear Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 pointer-events-auto">
          <button
            onClick={() => {
              sound.playChime(880, 0.4);
              onToggleFreeFly();
            }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-neon-cyan to-electric-blue text-black font-display font-extrabold text-sm tracking-wider uppercase hover:shadow-[0_0_40px_rgba(0,240,255,0.8)] transition-all flex items-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
          >
            <Compass className="w-4 h-4 text-black animate-spin-slow" />
            <span>ENTER 3D FREE-FLY MODE</span>
          </button>

          <button
            onClick={() => {
              sound.playChime(520, 0.5);
              onRestart();
            }}
            className="px-6 py-4 rounded-full bg-[#0c0c14]/80 text-white font-mono text-xs tracking-wider border border-white/15 hover:border-neon-cyan/50 hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md"
          >
            <RotateCcw className="w-4 h-4 text-neon-cyan" />
            <span>RESTART SEQUENCE</span>
          </button>
        </div>
      </div>

      {/* Cybernetic Editorial Footer */}
      <footer className="max-w-6xl mx-auto w-full pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400 pointer-events-auto">
        <div className="flex items-center gap-2 text-gray-300">
          <Terminal className="w-4 h-4 text-neon-cyan" />
          <span>BUILT FOR THE FUTURE // THREE.JS • R3F • SHADERS • GSAP</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-gray-400">
            <Sparkles className="w-3.5 h-3.5 text-neon-violet" />
            <span>AWWWARDS QUALITY STANDARDS</span>
          </span>
          <span className="text-gray-500">© 2026 DIMENSION</span>
        </div>
      </footer>
    </section>
  );
}
