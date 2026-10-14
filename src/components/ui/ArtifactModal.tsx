import { useState } from 'react';
import { X, Sliders, Zap, ShieldCheck, Radio, ChevronRight } from 'lucide-react';
import type { ArtifactData } from '../../types';
import { sound } from '../../utils/sound';

interface ArtifactModalProps {
  artifact: ArtifactData | null;
  onClose: () => void;
  onNext: () => void;
}

export function ArtifactModal({ artifact, onClose, onNext }: ArtifactModalProps) {
  const [harmonicTuning, setHarmonicTuning] = useState(72);
  const [fluxBoost, setFluxBoost] = useState(88);
  const [resonating, setResonating] = useState(false);

  if (!artifact) return null;

  const handleResonate = () => {
    sound.playResonancePulse();
    sound.playChime(880, 0.6);
    setResonating(true);
    setTimeout(() => setResonating(false), 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-auto">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Main Holographic HUD Card */}
      <div className="relative w-full max-w-xl bg-[#090a10]/90 backdrop-blur-2xl border border-white/15 rounded-2xl p-6 sm:p-8 shadow-[0_20px_70px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Decorative Top Accent Glow */}
        <div
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent"
          style={{ color: artifact.color }}
        />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">
                {artifact.code}
              </span>
              <span
                className="text-[10px] font-mono tracking-widest font-bold px-2 py-0.5 rounded"
                style={{ backgroundColor: `${artifact.color}20`, color: artifact.color }}
              >
                {artifact.classification}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              {artifact.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors border border-white/10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Narrative Description */}
        <p className="text-sm text-gray-300 leading-relaxed mb-6 font-sans">
          {artifact.description}
        </p>

        {/* Telemetry Matrix Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <span className="text-[10px] font-mono text-gray-400 block mb-1">HARMONIC FREQ</span>
            <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-neon-cyan" />
              {artifact.frequency}
            </span>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <span className="text-[10px] font-mono text-gray-400 block mb-1">COHERENCE RATIO</span>
            <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              {artifact.coherence}
            </span>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/5 col-span-2 sm:col-span-1">
            <span className="text-[10px] font-mono text-gray-400 block mb-1">FLUX DENSITY</span>
            <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-neon-violet" />
              {artifact.fluxDensity}
            </span>
          </div>
        </div>

        {/* Interactive Quantum Tuning Sliders */}
        <div className="bg-black/40 rounded-xl p-4 border border-white/10 mb-6 space-y-3.5">
          <div className="flex items-center justify-between text-xs font-mono text-gray-300">
            <span className="flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-neon-cyan" />
              <span>PHASE RESONANCE TUNING</span>
            </span>
            <span className="text-neon-cyan font-bold">{harmonicTuning}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={harmonicTuning}
            onChange={(e) => {
              setHarmonicTuning(Number(e.target.value));
              sound.playHover();
            }}
            className="w-full accent-neon-cyan h-1.5 bg-gray-800 rounded-lg cursor-pointer"
          />

          <div className="flex items-center justify-between text-xs font-mono text-gray-300 pt-1">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-neon-violet" />
              <span>FIELD EXCITATION DENSITY</span>
            </span>
            <span className="text-neon-violet font-bold">{fluxBoost}%</span>
          </div>
          <input
            type="range"
            min="20"
            max="100"
            value={fluxBoost}
            onChange={(e) => {
              setFluxBoost(Number(e.target.value));
              sound.playHover();
            }}
            className="w-full accent-neon-violet h-1.5 bg-gray-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={handleResonate}
            className={`flex-1 py-3 px-4 rounded-xl font-mono text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2 ${
              resonating
                ? 'bg-neon-cyan text-black shadow-[0_0_25px_#00f0ff]'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
            }`}
          >
            <Zap className={`w-4 h-4 ${resonating ? 'animate-bounce' : ''}`} />
            <span>{resonating ? 'RESONANCE BROADCASTING...' : 'TRIGGER RESONANCE PULSE'}</span>
          </button>

          <button
            onClick={onNext}
            className="py-3 px-4 rounded-xl font-mono text-xs text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-1 transition-all"
            title="Inspect next relic"
          >
            <span>NEXT RELIC</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
