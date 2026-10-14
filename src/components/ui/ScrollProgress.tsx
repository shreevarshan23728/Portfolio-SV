interface ScrollProgressProps {
  scrollProgress: number;
  activeSection: number;
  onNavigateToSection: (idx: number) => void;
}

export function ScrollProgress({ scrollProgress, activeSection, onNavigateToSection }: ScrollProgressProps) {
  const chapters = ['01', '02', '03', '04', '05'];

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center gap-4 pointer-events-auto select-none">
      <div className="text-[10px] font-mono text-gray-500 tracking-widest -rotate-90 mb-4 uppercase">
        STAGE // 0{activeSection + 1}
      </div>

      <div className="relative w-0.5 h-44 bg-white/10 rounded-full flex flex-col justify-between items-center py-1">
        {/* Active glowing indicator thumb */}
        <div
          className="absolute w-2.5 h-2.5 rounded-full bg-neon-cyan shadow-[0_0_12px_#00f0ff] -left-[4px] transition-all duration-150"
          style={{ top: `${Math.min(Math.max(scrollProgress * 100, 0), 96)}%` }}
        />

        {/* Notches for each chapter */}
        {chapters.map((ch, idx) => {
          const isActive = activeSection === idx;
          return (
            <button
              key={ch}
              onClick={() => onNavigateToSection(idx)}
              className={`group relative w-2 h-2 rounded-full border transition-all ${
                isActive
                  ? 'bg-white border-neon-cyan scale-125'
                  : 'bg-[#0c0c14] border-gray-600 hover:border-neon-cyan'
              }`}
              title={`Jump to Chapter ${ch}`}
            >
              <span className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-[#0c0c14] border border-white/10 text-[9px] font-mono text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                CH // {ch}
              </span>
            </button>
          );
        })}
      </div>

      <div className="text-[10px] font-mono text-neon-cyan font-bold tracking-widest mt-4">
        {Math.round(scrollProgress * 100)}%
      </div>
    </div>
  );
}
