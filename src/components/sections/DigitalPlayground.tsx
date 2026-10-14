import { useState } from 'react';
import { PlaygroundCanvas, PLAYGROUND_OBJECTS } from '../3d/PlaygroundCanvas';
import { RotateCcw, Sliders, Eye, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { sound } from '../../utils/sound';

export function DigitalPlayground() {
  const [selectedId, setSelectedId] = useState<string | null>('icosahedron');
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1.0);
  const [lightMood, setLightMood] = useState<'cyan' | 'violet' | 'chrome'>('cyan');
  const [isLowSpecFallback, setIsLowSpecFallback] = useState<boolean>(false);

  const activeArtifact = PLAYGROUND_OBJECTS.find(o => o.id === selectedId) || null;

  const handleReset = () => {
    sound.playChime(500, 0.4);
    setSelectedId(null);
    setWireframe(false);
    setSpeed(1.0);
    setLightMood('cyan');
  };

  const handleSelectObject = (id: string | null) => {
    if (id) sound.playHover();
    setSelectedId(id);
  };

  return (
    <section
      id="experiments"
      className="relative min-h-screen w-full bg-[#050505] py-28 px-6 sm:px-12 border-t border-white/[0.05]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#00f0ff]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#00f0ff]">
                CHAPTER 03 // 3D DIGITAL PLAYGROUND
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold uppercase text-metallic tracking-tight">
              ENTER THE EXPERIMENT.
            </h2>
          </div>

          <div className="text-left md:text-right max-w-md">
            <p className="text-xs font-mono uppercase tracking-widest text-gray-400">
              AN EXPERIMENTAL SPATIAL ART INSTALLATION WITH REAL-TIME RAYCASTING AND METALLIC MATERIALS.
            </p>
          </div>
        </div>

        {/* 3D Canvas / Fallback Container */}
        <div className="relative">
          {!isLowSpecFallback ? (
            <PlaygroundCanvas
              selectedId={selectedId}
              onSelectId={handleSelectObject}
              wireframe={wireframe}
              speed={speed}
              lightMood={lightMood}
            />
          ) : (
            <div className="w-full h-[520px] rounded-2xl border border-white/10 bg-[#0a0c14] flex flex-col items-center justify-center p-8 text-center space-y-4">
              <Layers size={40} className="text-[#00f0ff]" />
              <h3 className="text-xl font-display uppercase tracking-widest text-white">
                PROCEDURAL 2.5D SHADER FALLBACK MODE
              </h3>
              <p className="text-sm font-mono text-gray-400 max-w-md">
                Active for reduced GPU overhead or low-power devices. Standard WebGL rasterization suspended.
              </p>
              <button
                onClick={() => setIsLowSpecFallback(false)}
                className="px-6 py-2 rounded-full bg-[#00f0ff] text-black font-mono text-xs uppercase tracking-widest font-semibold hover:bg-white"
              >
                ENABLE FULL 3D WEBGL
              </button>
            </div>
          )}

          {/* Interactive Controls Overlay Toolbar */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/10 backdrop-blur-md">
            {/* Object Fast-Switch Capsule */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mr-1 hidden sm:inline">
                SELECT OBJECT:
              </span>
              {PLAYGROUND_OBJECTS.map((obj) => (
                <button
                  key={obj.id}
                  onClick={() => handleSelectObject(obj.id === selectedId ? null : obj.id)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-widest transition-all ${
                    selectedId === obj.id
                      ? 'bg-[#00f0ff] text-black font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                      : 'bg-white/[0.04] text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {obj.name.split(' ')[1]}
                </button>
              ))}
            </div>

            {/* Visual Tweaks Controls */}
            <div className="flex items-center gap-3">
              {/* Wireframe Toggle */}
              <button
                onClick={() => {
                  sound.playHover();
                  setWireframe(!wireframe);
                }}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5 border transition-all ${
                  wireframe
                    ? 'border-[#00f0ff] text-[#00f0ff] bg-[#00f0ff]/10'
                    : 'border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <Eye size={12} />
                <span>WIREFRAME</span>
              </button>

              {/* Speed Selector */}
              <button
                onClick={() => {
                  sound.playHover();
                  setSpeed(speed === 1.0 ? 2.0 : speed === 2.0 ? 0.4 : 1.0);
                }}
                className="px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-widest border border-white/10 text-gray-400 hover:text-white flex items-center gap-1.5"
              >
                <Sliders size={12} />
                <span>SPEED: {speed}X</span>
              </button>

              {/* Light Mood Toggle */}
              <button
                onClick={() => {
                  sound.playHover();
                  setLightMood(lightMood === 'cyan' ? 'violet' : lightMood === 'violet' ? 'chrome' : 'cyan');
                }}
                className="px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-widest border border-white/10 text-gray-400 hover:text-white flex items-center gap-1.5"
              >
                <Sparkles size={12} />
                <span className="uppercase">MOOD: {lightMood}</span>
              </button>

              {/* Reset Scene */}
              <button
                onClick={handleReset}
                title="Reset Camera & Selection"
                className="p-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>

          {/* Telemetry Inspector Card (Reveals details of selected object) */}
          {activeArtifact && (
            <div className="mt-6 luxury-card rounded-xl p-6 sm:p-8 animate-in fade-in duration-300 border-white/15">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-4 mb-4 gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#00f0ff]">
                    {activeArtifact.code} // {activeArtifact.category}
                  </span>
                  <h4 className="text-xl sm:text-2xl font-display font-bold uppercase text-white tracking-wide">
                    {activeArtifact.name}
                  </h4>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                  <ShieldCheck size={14} className="text-[#00f0ff]" />
                  <span>RAYCAST ACTIVE · SPATIAL ANCHOR LOCKED</span>
                </div>
              </div>

              <p className="text-sm text-gray-300 font-light leading-relaxed mb-6">
                {activeArtifact.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono pt-4 border-t border-white/[0.06]">
                <div className="space-y-1">
                  <span className="text-gray-500 uppercase tracking-widest text-[10px] block">SURFACE MATERIAL</span>
                  <span className="text-gray-200">{activeArtifact.specifications.material}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-500 uppercase tracking-widest text-[10px] block">REFLECTIVITY INDEX</span>
                  <span className="text-gray-200">{activeArtifact.specifications.reflectance}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-500 uppercase tracking-widest text-[10px] block">KINETIC DAMPING</span>
                  <span className="text-gray-200">{activeArtifact.specifications.damping}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
