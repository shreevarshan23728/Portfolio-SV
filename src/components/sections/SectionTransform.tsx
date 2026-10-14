import { Cpu, Maximize2, ShieldAlert } from 'lucide-react';

export function SectionTransform() {
  return (
    <section className="relative min-h-screen flex items-center px-6 py-24 pointer-events-none">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Editorial Headline & Narrative */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan font-mono text-xs tracking-widest uppercase">
            <span>CHAPTER 02 // TRANSFORMATION</span>
          </div>

          <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight leading-[1.05]">
            ARCHITECTED FOR <br />
            <span className="text-gray-400">THE INFINITE.</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-gray-300 font-light leading-relaxed max-w-lg">
            As you navigate through spatial coordinates, the Chrono-Core disassembles its protective gimbal armor, revealing inner quantum conduits calibrated to bend the boundaries of perception.
          </p>

          {/* Technical Telemetry Badges */}
          <div className="grid grid-cols-2 gap-3 pt-4 max-w-md pointer-events-auto">
            <div className="bg-[#0c0c14]/80 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:border-neon-cyan/30 transition-all">
              <div className="flex items-center gap-2 text-neon-cyan mb-1.5 font-mono text-xs font-bold">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>EXPANSION RATIO</span>
              </div>
              <div className="text-xl font-mono font-bold text-white">1.618 φ</div>
              <p className="text-[10px] text-gray-400 mt-1 font-mono">Radial gimbal separation active</p>
            </div>

            <div className="bg-[#0c0c14]/80 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:border-neon-violet/30 transition-all">
              <div className="flex items-center gap-2 text-neon-violet mb-1.5 font-mono text-xs font-bold">
                <Cpu className="w-3.5 h-3.5" />
                <span>CORE FREQUENCY</span>
              </div>
              <div className="text-xl font-mono font-bold text-white">940.2 THz</div>
              <p className="text-[10px] text-gray-400 mt-1 font-mono">Harmonic resonance locked</p>
            </div>
          </div>
        </div>

        {/* Right Column: Holographic Spec Sheet Annotation */}
        <div className="hidden lg:flex justify-end">
          <div className="bg-[#0c0c14]/75 backdrop-blur-xl border border-white/10 p-6 rounded-2xl max-w-sm space-y-4 pointer-events-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-mono text-xs font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-neon-cyan" />
                <span>SYSTEM_TELEMETRY</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded">
                NORMAL
              </span>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex justify-between text-gray-400">
                <span>RING_ALPHA:</span>
                <span className="text-white">SYNCHRONIZED (CW)</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>RING_BETA:</span>
                <span className="text-white">COUNTER-ORBIT (CCW)</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>PBR_ROUGHNESS:</span>
                <span className="text-neon-cyan">0.08 [CHROME]</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>LIGHT_VECTOR:</span>
                <span className="text-neon-violet">DYNAMIC BIPOLAR</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-gray-400 font-sans border-t border-white/10 italic">
              "The architecture responds dynamically to your scroll inertia, maintaining fluid equilibrium."
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
