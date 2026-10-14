import { Compass } from 'lucide-react';

export function SectionImmersion() {
  return (
    <section className="relative min-h-screen flex items-center px-6 sm:px-12 py-24 pointer-events-none select-none">
      <div className="max-w-7xl mx-auto w-full">
        <div className="max-w-3xl space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs text-neon-violet tracking-[0.25em] uppercase">
            <Compass className="w-3.5 h-3.5 text-neon-violet animate-pulse" />
            <span>// ACT III : THE DEEP SECTOR</span>
          </div>

          <h2 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl text-white tracking-tighter leading-[0.92]">
            BEYOND CLASSICAL <br />
            <span className="bg-gradient-to-r from-neon-cyan via-electric-blue to-neon-violet bg-clip-text text-transparent">
              REALITY.
            </span>
          </h2>

          <p className="font-sans text-lg sm:text-xl text-gray-300 font-light leading-relaxed max-w-2xl">
            Step outside the Euclidean grid. Floating monolithic obelisks anchor the gravimetric fields of this cybernetic sanctuary. Light streams and thousands of cosmic particles accelerate with camera velocity, warping perception into deep space.
          </p>

          <div className="pt-6 flex flex-wrap items-center gap-10 font-mono text-xs text-gray-400 border-t border-white/10">
            <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest block">GRAVIMETRIC INDEX</span>
              <span className="text-white font-bold text-sm">ZERO-G // 0.00m/s²</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest block">DEPTH COORDINATES</span>
              <span className="text-neon-violet font-bold text-sm">-11.00m to -38.00m</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest block">ATMOSPHERE</span>
              <span className="text-white font-bold text-sm">DEEP OBSIDIAN FOG</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
