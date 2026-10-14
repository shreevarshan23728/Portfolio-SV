import { Crosshair, Move3d } from 'lucide-react';

export function SectionTransform() {
  return (
    <section className="relative min-h-screen flex items-center px-6 sm:px-12 py-24 pointer-events-none select-none">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Monumental Film Narrative */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs text-neon-cyan tracking-[0.25em] uppercase">
            <Crosshair className="w-3.5 h-3.5 text-neon-cyan animate-spin-slow" />
            <span>// ACT II : RECONFIGURATION</span>
          </div>

          <h2 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl text-white tracking-tighter leading-[0.92]">
            ARCHITECTED <br />
            <span className="text-gray-400">FOR THE INFINITE.</span>
          </h2>

          <p className="font-sans text-lg sm:text-xl text-gray-300 font-light leading-relaxed max-w-xl">
            Where computational precision meets hyper-dimensional geometry. As the camera sweeps into an orthogonal crane angle, the sculpture separates along radial axes, exposing internal quantum conduits engineered with zero mechanical tolerance.
          </p>

          {/* Minimalist Architectural Schematics (No generic cards) */}
          <div className="pt-6 flex flex-wrap items-center gap-8 font-mono text-xs text-gray-400 border-t border-white/10 max-w-xl">
            <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest block">GIMBAL DEVIATION</span>
              <span className="text-white font-bold text-sm">0.0003° SEC</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest block">RADIAL SEPARATION</span>
              <span className="text-neon-cyan font-bold text-sm">3.60 METERS</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest block">REFLECTANCE</span>
              <span className="text-white font-bold text-sm">0.99 CHROME</span>
            </div>
          </div>
        </div>

        {/* Right Column: Architectural HUD Crosshair Reticle */}
        <div className="lg:col-span-5 hidden lg:flex justify-end">
          <div className="relative w-80 h-80 rounded-full border border-white/10 flex items-center justify-center p-8">
            <div className="absolute inset-4 rounded-full border border-dashed border-neon-cyan/30 animate-spin-slow" />
            <div className="absolute inset-12 rounded-full border border-white/5" />
            
            <div className="text-center font-mono space-y-2 pointer-events-auto">
              <Move3d className="w-8 h-8 text-neon-cyan mx-auto" />
              <div className="text-xs font-bold text-white tracking-widest">GIMBAL ALIGNMENT</div>
              <div className="text-[10px] text-gray-400">PBR CLEARCOAT ACTIVE</div>
              <div className="text-[9px] text-neon-violet font-bold">120° ORBITAL TRAJECTORY</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
