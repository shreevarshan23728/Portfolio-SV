import { Compass, RotateCcw, Clapperboard, Sparkles } from 'lucide-react';
import { sound } from '../../utils/sound';

interface SectionFinalProps {
  onToggleFreeFly: () => void;
  onRestart: () => void;
}

export function SectionFinal({ onToggleFreeFly, onRestart }: SectionFinalProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-between px-6 sm:px-12 py-24 pointer-events-none select-none">
      <div className="max-w-6xl mx-auto w-full my-auto text-center space-y-8 py-16">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-neon-cyan tracking-[0.3em] uppercase">
          <Clapperboard className="w-3.5 h-3.5 text-neon-cyan" />
          <span>// ACT V : THE HORIZON</span>
        </div>

        {/* Monumental Closing Statement */}
        <h2 className="font-display font-extrabold text-6xl sm:text-8xl lg:text-[9.5rem] text-white tracking-tighter leading-[0.88] drop-shadow-[0_15px_40px_rgba(0,0,0,0.9)]">
          THE LIMIT IS YOUR <br />
          <span className="bg-gradient-to-r from-neon-cyan via-white to-neon-violet bg-clip-text text-transparent">
            IMAGINATION.
          </span>
        </h2>

        <p className="font-sans text-xl sm:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
          The future is not something you enter. <br className="hidden sm:inline" />
          It is something you build.
        </p>

        {/* Clear Cinematic Call-to-Action Triggers */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-6 pointer-events-auto">
          <button
            onClick={() => {
              sound.playChime(880, 0.4);
              onToggleFreeFly();
            }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-neon-cyan to-electric-blue text-black font-display font-bold text-xs tracking-widest uppercase hover:shadow-[0_0_40px_rgba(0,240,255,0.8)] transition-all flex items-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
          >
            <Compass className="w-4 h-4 text-black animate-spin-slow" />
            <span>ENTER 3D FREE-FLY MODE</span>
          </button>

          <button
            onClick={() => {
              sound.playChime(520, 0.5);
              onRestart();
            }}
            className="px-7 py-4 rounded-full bg-black/60 text-white font-mono text-xs tracking-wider border border-white/20 hover:border-neon-cyan hover:bg-neon-cyan/10 transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md"
          >
            <RotateCcw className="w-3.5 h-3.5 text-neon-cyan" />
            <span>RESTART SEQUENCE</span>
          </button>
        </div>
      </div>

      {/* Cinematic End-Credits Strip */}
      <footer className="max-w-7xl mx-auto w-full pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-gray-500 pointer-events-auto uppercase tracking-widest">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold">DIMENSION WEBGL</span>
          <span>// THREE.JS</span>
          <span>// REACT THREE FIBER</span>
          <span>// PBR SHADERS</span>
        </div>

        <div className="flex items-center gap-4 text-gray-400">
          <span className="flex items-center gap-1.5 text-neon-cyan">
            <Sparkles className="w-3 h-3 text-neon-cyan" />
            <span>EXCELLENCE IN DIGITAL ART DIRECTION</span>
          </span>
          <span>© 2026</span>
        </div>
      </footer>
    </section>
  );
}
