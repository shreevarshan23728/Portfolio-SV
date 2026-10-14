import { Compass, X } from 'lucide-react';
import { sound } from '../../utils/sound';

interface FreeFlyControlsProps {
  onExit: () => void;
}

export function FreeFlyControls({ onExit }: FreeFlyControlsProps) {
  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40 bg-[#0c0c14]/90 backdrop-blur-xl border border-neon-cyan/40 px-5 py-3 rounded-full flex items-center gap-4 shadow-[0_0_30px_rgba(0,240,255,0.3)] animate-pulse pointer-events-auto">
      <div className="flex items-center gap-2 text-neon-cyan font-mono text-xs font-bold">
        <Compass className="w-4 h-4 animate-spin-slow" />
        <span>360° FREE-FLY MODE ACTIVE</span>
      </div>

      <div className="hidden sm:inline text-[11px] font-mono text-gray-400 border-l border-white/10 pl-3">
        Drag to Orbit • Scroll to Zoom
      </div>

      <button
        onClick={() => {
          sound.playChime(600, 0.3);
          onExit();
        }}
        className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center gap-1 transition-colors"
      >
        <X className="w-3.5 h-3.5 text-gray-300" />
        <span>EXIT</span>
      </button>
    </div>
  );
}
