import { useState } from 'react';
import { PROFILE } from '../../data/profile';
import { sound } from '../../utils/sound';
import { Cpu, Code2, Box, Wrench, Terminal } from 'lucide-react';

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Code2 size={16} className="text-[#00f0ff]" />;
      case 1:
        return <Cpu size={16} className="text-[#00f0ff]" />;
      case 2:
        return <Box size={16} className="text-[#00f0ff]" />;
      case 3:
        return <Wrench size={16} className="text-[#00f0ff]" />;
      default:
        return <Terminal size={16} className="text-[#00f0ff]" />;
    }
  };

  return (
    <section
      id="engine"
      className="relative min-h-screen w-full bg-[#050505] py-28 px-6 sm:px-12 border-t border-white/[0.05] overflow-hidden"
    >
      {/* Subtle Atmospheric Conduit Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#050505" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="10%" y1="20%" x2="90%" y2="80%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="6 6" />
          <line x1="90%" y1="20%" x2="10%" y2="80%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="6 6" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Pre-title & Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#00f0ff]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#00f0ff]">
                CHAPTER 04 // TECHNICAL ARCHITECTURE
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold uppercase text-metallic tracking-tight">
              THE ENGINE ROOM.
            </h2>
          </div>

          <div className="text-left md:text-right max-w-md">
            <p className="text-xs font-mono uppercase tracking-widest text-gray-400">
              MODULAR SUBSYSTEMS POWERING INTELLIGENT APPLICATIONS, SPATIAL GRAPHICS & EMBEDDED LOGIC.
            </p>
          </div>
        </div>

        {/* Technical Diagram Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROFILE.techCategories.map((cat, idx) => {
            const isHovered = activeCategory === idx;

            return (
              <div
                key={cat.title}
                onMouseEnter={() => {
                  sound.playHover();
                  setActiveCategory(idx);
                }}
                onMouseLeave={() => setActiveCategory(null)}
                className={`luxury-card rounded-xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative group ${
                  isHovered ? 'border-[#00f0ff] shadow-[0_0_30px_rgba(0,240,255,0.15)] -translate-y-1.5' : 'border-white/[0.08]'
                }`}
              >
                {/* Card Header: Code & Icon */}
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 group-hover:text-[#00f0ff] transition-colors">
                      {cat.code}
                    </span>
                    <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10 group-hover:border-[#00f0ff]/40 transition-colors">
                      {getCategoryIcon(idx)}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-display font-bold uppercase text-white tracking-wide mb-3 group-hover:text-[#00f0ff] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-light leading-relaxed mb-8">
                    {cat.description}
                  </p>
                </div>

                {/* Skills Vector List */}
                <div className="space-y-2 pt-4 border-t border-white/[0.06]">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500 block mb-3">
                    DEPLOYED STACK
                  </span>
                  <div className="flex flex-col space-y-2">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill}
                        className="flex items-center justify-between text-xs font-mono py-1 px-2.5 rounded bg-white/[0.02] border border-white/5 group-hover:border-white/15 transition-all text-gray-300 group-hover:text-white"
                      >
                        <span>{skill}</span>
                        <span className="text-[9px] text-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity">
                          01
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subtle active indicator bar */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300 rounded-b-xl ${
                    isHovered ? 'bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]' : 'bg-transparent'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Architecture Connecting Conduit Diagram */}
        <div className="mt-12 p-6 rounded-xl border border-white/[0.06] bg-white/[0.01] flex flex-col md:flex-row items-center justify-between text-xs font-mono text-gray-500 gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
            <span className="text-gray-300">ARCHITECTURE BUS: REAL-TIME ASYNCHRONOUS PIPELINE</span>
          </div>
          <div className="flex items-center gap-6">
            <span>REACT 19 + R3F</span>
            <span>·</span>
            <span>THREE.JS SHADERS</span>
            <span>·</span>
            <span>PYTHON ML RUNTIME</span>
          </div>
        </div>
      </div>
    </section>
  );
}
