import { Layers, Globe, Compass } from 'lucide-react';

export function SectionImmersion() {
  return (
    <section className="relative min-h-screen flex items-center px-6 py-24 pointer-events-none">
      <div className="max-w-6xl mx-auto w-full">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-violet/10 border border-neon-violet/30 text-neon-violet font-mono text-xs tracking-widest uppercase">
            <span>CHAPTER 03 // IMMERSION</span>
          </div>

          <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight leading-[1.05]">
            BEYOND CLASSICAL <br />
            <span className="bg-gradient-to-r from-neon-cyan via-electric-blue to-neon-violet bg-clip-text text-transparent">
              REALITY.
            </span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-gray-300 font-light leading-relaxed">
            Step outside the Euclidean grid. A synthesis of physical presence, deep cosmic perspective, and ethereal intelligence. The floating obsidian monoliths anchor the gravimetric fields of this cybernetic void.
          </p>

          {/* Feature Matrix Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 pointer-events-auto">
            <div className="bg-[#0c0c14]/80 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:border-neon-cyan/40 transition-all">
              <Layers className="w-5 h-5 text-neon-cyan mb-2" />
              <div className="font-mono text-xs font-bold text-white mb-1">MONOLITH PROTOCOL</div>
              <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
                Reflective obsidian pillars acting as quantum stabilizers across parallel vectors.
              </p>
            </div>

            <div className="bg-[#0c0c14]/80 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:border-neon-violet/40 transition-all">
              <Globe className="w-5 h-5 text-neon-violet mb-2" />
              <div className="font-mono text-xs font-bold text-white mb-1">COSMIC STREAM</div>
              <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
                2,400 procedural light particles drifting seamlessly with camera velocity.
              </p>
            </div>

            <div className="bg-[#0c0c14]/80 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:border-emerald-400/40 transition-all">
              <Compass className="w-5 h-5 text-emerald-400 mb-2" />
              <div className="font-mono text-xs font-bold text-white mb-1">ZERO-G KINEMATICS</div>
              <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
                Atmospheric fog and volumetric depth calculations simulating boundless space.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
