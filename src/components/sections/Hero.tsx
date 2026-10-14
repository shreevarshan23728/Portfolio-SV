import { Sparkles, ChevronRight } from 'lucide-react';
import { HeroScene } from '../3d/HeroSphere';
import { sound } from '../../utils/sound';

export function Hero() {
  const handleScrollTo = (id: string) => {
    sound.playHover();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505] pt-20 pb-16 px-6 sm:px-12"
    >
      {/* 3D Mechanical Chrome Sphere Canvas */}
      <HeroScene />

      {/* Subtle Ambient Vignette & Depth Mask */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_20%,#050505_80%)]" />

      {/* Floating Coordinate Markers */}
      <div className="absolute top-28 left-6 sm:left-12 pointer-events-none hidden md:flex flex-col text-[10px] font-mono text-gray-500 uppercase tracking-widest space-y-1">
        <span className="text-gray-400 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
          SYS // 0x4149.RTH
        </span>
        <span>LAT: 11.0168° N · LON: 76.9558° E</span>
        <span>EXPERIENCE LEVEL // IMMERSIVE 3D</span>
      </div>

      <div className="absolute top-28 right-6 sm:right-12 pointer-events-none hidden md:flex flex-col text-right text-[10px] font-mono text-gray-500 uppercase tracking-widest space-y-1">
        <span className="text-gray-400">STATUS: CORE OPERATIONAL</span>
        <span>AI & DATA SCIENCE PROTOCOL</span>
        <span>REFLECTANCE: 98.4% SPECULAR</span>
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center px-4">
        {/* Subtle Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md mb-6 transition-all hover:border-[#00f0ff]/40">
          <Sparkles size={12} className="text-[#00f0ff]" />
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-gray-300">
            FUTURISTIC DIGITAL EXPERIENCE
          </span>
        </div>

        {/* Main Heading: SHREE VARSHAN */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tight uppercase select-none text-metallic mb-4 leading-none">
          SHREE VARSHAN
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm md:text-base font-mono uppercase tracking-[0.3em] sm:tracking-[0.35em] text-[#00f0ff] mb-6 font-medium max-w-2xl">
          CREATIVE DEVELOPER · AI ENTHUSIAST · DIGITAL EXPLORER
        </p>

        {/* Supporting Text */}
        <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl font-light leading-relaxed mb-10 tracking-wide">
          Building intelligent systems and extraordinary digital experiences at the intersection of code, design, and AI.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* Primary Button */}
          <button
            onClick={() => handleScrollTo('about')}
            className="group relative w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-mono text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 hover:bg-[#00f0ff] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] flex items-center justify-center gap-2"
          >
            <span>EXPLORE MY WORLD</span>
            <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>

          {/* Secondary Button */}
          <button
            onClick={() => handleScrollTo('projects')}
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 bg-white/[0.02] backdrop-blur-md text-white font-mono text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:border-[#00f0ff] hover:text-[#00f0ff] hover:bg-white/[0.05] flex items-center justify-center gap-2"
          >
            <span>VIEW PROJECTS</span>
          </button>
        </div>
      </div>

      {/* Small Scroll Indicator */}
      <button
        onClick={() => handleScrollTo('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-gray-500 hover:text-[#00f0ff] transition-colors focus:outline-none"
      >
        <span>SCROLL TO ENTER</span>
        <div className="w-5 h-9 rounded-full border border-white/20 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-[#00f0ff] animate-bounce" />
        </div>
      </button>
    </section>
  );
}
