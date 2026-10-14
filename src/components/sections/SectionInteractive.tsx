import type { ArtifactData } from '../../types';
import { ARTIFACTS } from '../3d/InteractiveArtifacts';
import { Eye, Radio, Sparkles } from 'lucide-react';
import { sound } from '../../utils/sound';

interface SectionInteractiveProps {
  selectedArtifact: ArtifactData | null;
  onSelectArtifact: (artifact: ArtifactData) => void;
}

export function SectionInteractive({ selectedArtifact, onSelectArtifact }: SectionInteractiveProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 py-24 pointer-events-none select-none">
      <div className="max-w-7xl mx-auto w-full">
        {/* Cinematic Header */}
        <div className="max-w-2xl mb-12 space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs text-neon-cyan tracking-[0.25em] uppercase">
            <Radio className="w-3.5 h-3.5 text-neon-cyan animate-pulse" />
            <span>// ACT IV : QUANTUM SPECIMENS</span>
          </div>

          <h2 className="font-display font-extrabold text-5xl sm:text-7xl text-white tracking-tighter leading-[0.95]">
            THE TRIAD OF RELICS.
          </h2>

          <p className="font-sans text-base sm:text-lg text-gray-300 font-light leading-relaxed">
            Three hyper-structures suspended in zero-entropy vacuum. Click any artifact in 3D space or activate below to lock the camera and inspect its telemetry.
          </p>
        </div>

        {/* Sophisticated Tactical Selector Rail (No generic template cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pointer-events-auto max-w-5xl">
          {ARTIFACTS.map((artifact, i) => {
            const isSelected = selectedArtifact?.id === artifact.id;
            return (
              <div
                key={artifact.id}
                onClick={() => {
                  sound.playChime(700 + i * 80, 0.4);
                  onSelectArtifact(artifact);
                }}
                className={`relative p-5 rounded-xl border backdrop-blur-xl transition-all cursor-pointer group ${
                  isSelected
                    ? 'bg-[#0f111e]/90 border-neon-cyan shadow-[0_0_35px_rgba(0,240,255,0.25)]'
                    : 'bg-[#080910]/70 border-white/10 hover:border-white/30 hover:bg-[#0c0d18]'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[10px] text-gray-400 mb-2">
                  <span>0{i + 1} // {artifact.code}</span>
                  <span
                    className="font-bold px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: `${artifact.color}15`, color: artifact.color }}
                  >
                    {artifact.classification}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-white mb-1.5 group-hover:text-neon-cyan transition-colors">
                  {artifact.name}
                </h3>

                <div className="flex items-center justify-between text-xs font-mono pt-3 border-t border-white/5">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" style={{ color: artifact.color }} />
                    <span className="text-white font-bold">{artifact.coherence}</span>
                  </span>

                  <span className="text-neon-cyan font-bold flex items-center gap-1 text-[11px] group-hover:translate-x-0.5 transition-transform">
                    <Eye className="w-3.5 h-3.5" />
                    <span>INSPECT 3D</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
