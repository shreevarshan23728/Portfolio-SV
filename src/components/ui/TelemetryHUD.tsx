import { useEffect, useState } from 'react';
import { Activity, Radio, Cpu, Sparkles } from 'lucide-react';

interface TelemetryHUDProps {
  scrollProgress: number;
  activeSection: number;
}

export function TelemetryHUD({ scrollProgress, activeSection }: TelemetryHUDProps) {
  const [fps, setFps] = useState(60);
  const [coordinates, setCoordinates] = useState({ lat: '43.1904° N', lng: '12.0482° E', alt: '840 KM' });

  // Simple, lightweight FPS measurement
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const loop = (currentTime: number) => {
      frameCount++;
      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Fluctuate altitude dynamically with scroll
  useEffect(() => {
    const calculatedAlt = Math.round(840 - scrollProgress * 620);
    setCoordinates(prev => ({ ...prev, alt: `${calculatedAlt} KM` }));
  }, [scrollProgress]);

  const sectorNames = [
    'SECTOR 01 // SINGULARITY HYPER-CORE',
    'SECTOR 02 // RECONFIGURED METALLURGY',
    'SECTOR 03 // DEEP MONOLITH SANCTUARY',
    'SECTOR 04 // THE TRIAD OF RELICS',
    'SECTOR 05 // HORIZON HORIZON BOUNDARY',
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-6 select-none font-mono text-[11px] text-gray-400">
      {/* Top Telemetry Bars (below header) */}
      <div className="flex justify-between items-start mt-16">
        {/* Top-Left: Coordinate Telemetry */}
        <div className="hidden lg:flex items-center gap-3 bg-[#0c0c14]/70 backdrop-blur-md px-3.5 py-1.5 rounded-md border border-white/5">
          <Radio className="w-3.5 h-3.5 text-neon-cyan animate-pulse" />
          <span className="text-gray-300 tracking-wider">
            POS: <span className="text-white">{coordinates.lat}</span> / <span className="text-white">{coordinates.lng}</span>
          </span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-300">
            ALT: <span className="text-neon-cyan">{coordinates.alt}</span>
          </span>
        </div>

        {/* Top-Right: Engine Diagnostics */}
        <div className="hidden sm:flex items-center gap-3 bg-[#0c0c14]/70 backdrop-blur-md px-3.5 py-1.5 rounded-md border border-white/5 ml-auto">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-gray-300">
            ENGINE: <span className="text-emerald-400 font-bold">{fps} FPS</span>
          </span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-300 flex items-center gap-1">
            <Cpu className="w-3 h-3 text-neon-violet" />
            <span>PBR_SHADERS: <span className="text-white">ACTIVE</span></span>
          </span>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="flex justify-between items-end mb-2">
        {/* Bottom-Left: Active Sector & Interaction Hint */}
        <div className="flex flex-col gap-1.5 bg-[#0c0c14]/70 backdrop-blur-md px-4 py-2.5 rounded-lg border border-white/5 max-w-sm">
          <div className="flex items-center gap-2 text-white font-bold text-xs">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-ping" />
            <span>{sectorNames[activeSection]}</span>
          </div>
          <div className="text-[10px] text-gray-400 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-neon-cyan" />
            <span>Click core or artifacts to trigger quantum pulse</span>
          </div>
        </div>

        {/* Bottom-Right: Scroll Depth Index */}
        <div className="hidden md:flex flex-col items-end gap-1 bg-[#0c0c14]/70 backdrop-blur-md px-4 py-2.5 rounded-lg border border-white/5">
          <div className="text-gray-400 text-[10px] tracking-widest uppercase">DIMENSIONAL DEPTH</div>
          <div className="text-sm font-bold text-neon-cyan flex items-baseline gap-1">
            <span>{Math.round(scrollProgress * 100)}%</span>
            <span className="text-[10px] text-gray-500">/ 100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
