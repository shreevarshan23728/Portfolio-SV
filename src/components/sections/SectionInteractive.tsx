import type { ArtifactData } from '../../types';
import { ARTIFACTS } from '../3d/InteractiveArtifacts';
import { Eye, Zap } from 'lucide-react';
import { sound } from '../../utils/sound';

interface SectionInteractiveProps {
  selectedArtifact: ArtifactData | null;
  onSelectArtifact: (artifact: ArtifactData) => void;
}

export function SectionInteractive({ selectedArtifact, onSelectArtifact }: SectionInteractiveProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 py-24 pointer-events-none">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan font-mono text-xs tracking-widest uppercase">
            <span>CHAPTER 04 // INTERACTION</span>
          </div>

          <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight leading-[1.05]">
            THE TRIAD OF RELICS.
          </h2>

          <p className="font-sans text-base sm:text-lg text-gray-300 font-light leading-relaxed">
            Three quantum artifacts floating in synchronized formation. Click an object directly in 3D space or select below to command the camera and initiate inspection.
          </p>
        </div>

        {/* Interactive Relic Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pointer-events-auto max-w-5xl mx-auto">
          {ARTIFACTS.map((artifact) => {
            const isSelected = selectedArtifact?.id === artifact.id;
            return (
              <div
                key={artifact.id}
                onClick={() => {
                  sound.playChime(700, 0.4);
                  onSelectArtifact(artifact);
                }}
                className={`group relative bg-[#0c0c14]/85 backdrop-blur-xl rounded-2xl p-6 border transition-all cursor-pointer transform hover:-translate-y-1.5 shadow-xl ${
                  isSelected
                    ? 'border-neon-cyan shadow-[0_0_30px_rgba(0,240,255,0.25)]'
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                {/* Glow bar */}
                <div
                  className="absolute top-0 left-6 right-6 h-0.5 rounded-full"
                  style={{ backgroundColor: artifact.color }}
                />

                <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-3">
                  <span>{artifact.code}</span>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded"
                    style={{ backgroundColor: `${artifact.color}15`, color: artifact.color }}
                  >
                    {artifact.classification}
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors">
                  {artifact.name}
                </h3>

                <p className="text-xs text-gray-400 font-sans leading-relaxed line-clamp-3 mb-5">
                  {artifact.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-white/5 font-mono text-xs">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" style={{ color: artifact.color }} />
                    <span className="text-white font-bold">{artifact.coherence}</span>
                  </span>

                  <span className="flex items-center gap-1 text-neon-cyan font-bold group-hover:translate-x-1 transition-transform">
                    <Eye className="w-3.5 h-3.5" />
                    <span>INSPECT</span>
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
