import { useState, useRef, useEffect } from 'react';
import { sound } from '../../utils/sound';

// Experiment 01: Procedural Particle Flow Field
function ParticleFlowExperiment() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, isHovered: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 360);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 260);

    const particles: { x: number; y: number; vx: number; vy: number; life: number }[] = [];
    const count = 90;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        life: Math.random() * 100,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isHovered: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.isHovered = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.fillStyle = 'rgba(6, 7, 11, 0.2)';
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Mouse gravity influence
        if (mouseRef.current.isHovered) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            p.vx += (dx / dist) * 0.15;
            p.vy += (dy / dist) * 0.15;
          }
        }

        // Dampen velocity
        p.vx *= 0.98;
        p.vy *= 0.98;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = '#00f0ff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Connecting threshold lines
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
      ctx.lineWidth = 0.8;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 50) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />;
}

// Experiment 02: Lissajous Harmonic Wave Synthesizer
function LissajousResonator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [freqA, setFreqA] = useState(3);
  const [freqB, setFreqB] = useState(2);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 360);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 260);
    let phase = 0;

    const render = () => {
      ctx.fillStyle = '#06070b';
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const radiusX = width * 0.35;
      const radiusY = height * 0.35;

      ctx.beginPath();
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 1.5;

      const steps = 400;
      for (let i = 0; i <= steps; i++) {
        const theta = (i / steps) * Math.PI * 2;
        const x = centerX + Math.sin(theta * freqA + phase) * radiusX;
        const y = centerY + Math.sin(theta * freqB) * radiusY;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase += 0.02;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [freqA, freqB]);

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="h-[200px] w-full relative">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-white/10 px-4 pb-2 text-[10px] font-mono text-gray-400">
        <div className="flex items-center gap-2">
          <span>RATIO:</span>
          <button
            onClick={() => {
              sound.playHover();
              setFreqA(freqA === 5 ? 1 : freqA + 1);
            }}
            className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-white"
          >
            A: {freqA}
          </button>
          <button
            onClick={() => {
              sound.playHover();
              setFreqB(freqB === 5 ? 1 : freqB + 1);
            }}
            className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-white"
          >
            B: {freqB}
          </button>
        </div>
        <span className="text-[#00f0ff] uppercase">RESONANCE LOCKED</span>
      </div>
    </div>
  );
}

// Experiment 03: Kinetic Typography Proximity Distortion
function KineticTypography() {
  const phrase = "CODE · ART · INTELLIGENCE";
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="h-full flex flex-col justify-between p-6">
      <div className="space-y-1">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#00f0ff]">
          MAGNETIC KINETIC TYPE
        </span>
        <p className="text-xs font-mono text-gray-500">
          HOVER ACROSS CHARACTERS TO STIMULATE KINETIC REACTION
        </p>
      </div>

      <div className="my-auto py-8 flex flex-wrap justify-center gap-x-1 gap-y-2 select-none">
        {phrase.split('').map((char, i) => {
          const isTarget = hoveredIdx === i;
          const isNeighbor = hoveredIdx !== null && Math.abs(hoveredIdx - i) === 1;

          return (
            <span
              key={i}
              onMouseEnter={() => {
                sound.playHover();
                setHoveredIdx(i);
              }}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`text-xl sm:text-2xl font-display font-extrabold transition-all duration-200 cursor-pointer inline-block ${
                isTarget
                  ? 'text-[#00f0ff] scale-125 -translate-y-2 drop-shadow-[0_0_12px_#00f0ff]'
                  : isNeighbor
                  ? 'text-gray-200 scale-110 -translate-y-1'
                  : 'text-gray-400'
              }`}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          );
        })}
      </div>

      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-gray-500">
        <span>INTERPOLATION: SPRING DAMPED</span>
        <span className="text-[#00f0ff]">KINETIC DYNAMICS</span>
      </div>
    </div>
  );
}

export function ExperimentsSection() {
  return (
    <section className="relative w-full bg-[#050505] py-24 px-6 sm:px-12 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-[#00f0ff]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#00f0ff]">
                CHAPTER 05 // MICRO-INTERACTIONS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase text-metallic tracking-tight">
              THE EXPERIMENTAL LAB.
            </h2>
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-gray-400 max-w-sm">
            PURPOSEFUL TACTILE INTERACTIONS DEMONSTRATING REAL-TIME MATHEMATICS AND PARTICLES.
          </p>
        </div>

        {/* 3 Interactive Experiment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 01: Procedural Particle Field */}
          <div className="luxury-card rounded-xl overflow-hidden border-white/10 flex flex-col h-[360px]">
            <div className="p-4 border-b border-white/10 flex items-center justify-between text-[10px] font-mono text-gray-400 bg-white/[0.01]">
              <span>01 // DYNAMIC PARTICLE FIELD</span>
              <span className="text-[#00f0ff]">GRAVITY: CURSOR</span>
            </div>
            <div className="flex-1 relative">
              <ParticleFlowExperiment />
            </div>
          </div>

          {/* 02: Lissajous Harmonic Resonator */}
          <div className="luxury-card rounded-xl overflow-hidden border-white/10 flex flex-col h-[360px]">
            <div className="p-4 border-b border-white/10 flex items-center justify-between text-[10px] font-mono text-gray-400 bg-white/[0.01]">
              <span>02 // HARMONIC RESONATOR</span>
              <span className="text-[#00f0ff]">PARAMETRIC MATH</span>
            </div>
            <div className="flex-1">
              <LissajousResonator />
            </div>
          </div>

          {/* 03: Kinetic Typography */}
          <div className="luxury-card rounded-xl overflow-hidden border-white/10 flex flex-col h-[360px]">
            <div className="p-4 border-b border-white/10 flex items-center justify-between text-[10px] font-mono text-gray-400 bg-white/[0.01]">
              <span>03 // KINETIC TYPOGRAPHY</span>
              <span className="text-[#00f0ff]">PROXIMITY DAMPED</span>
            </div>
            <div className="flex-1">
              <KineticTypography />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
