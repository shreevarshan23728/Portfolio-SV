import { useState, useRef, useEffect } from 'react';
import { PROJECTS, type ProjectCaseStudy } from '../../data/projects';
import { ProjectDetailsModal } from './ProjectDetailsModal';
import { ArrowUpRight, ExternalLink, Activity } from 'lucide-react';
import { sound } from '../../utils/sound';

// Interactive Visual Simulation 01: Edge-AI Autonomous Fleet Lidar Canvas
function FleetSimulationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 280);

    const robots = [
      { x: width * 0.2, y: height * 0.3, vx: 0.8, vy: 0.4, path: [] as { x: number; y: number }[] },
      { x: width * 0.7, y: height * 0.4, vx: -0.6, vy: 0.7, path: [] as { x: number; y: number }[] },
      { x: width * 0.5, y: height * 0.8, vx: 0.7, vy: -0.5, path: [] as { x: number; y: number }[] },
      { x: width * 0.8, y: height * 0.7, vx: -0.8, vy: -0.4, path: [] as { x: number; y: number }[] },
    ];

    const render = () => {
      ctx.fillStyle = '#06070b';
      ctx.fillRect(0, 0, width, height);

      // Warehouse grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const step = 30;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw obstacle warehouse pillars
      const pillars = [
        { x: width * 0.35, y: height * 0.5, r: 18 },
        { x: width * 0.65, y: height * 0.5, r: 18 },
      ];
      pillars.forEach((p) => {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.strokeRect(p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
        ctx.fillRect(p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
      });

      // Update & render AMR nodes
      robots.forEach((r, idx) => {
        r.x += r.vx;
        r.y += r.vy;

        if (r.x < 30 || r.x > width - 30) r.vx *= -1;
        if (r.y < 30 || r.y > height - 30) r.vy *= -1;

        r.path.push({ x: r.x, y: r.y });
        if (r.path.length > 25) r.path.shift();

        // Trail
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
        ctx.lineWidth = 1.5;
        r.path.forEach((pt, i) => {
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();

        // Lidar sweep arc
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
        ctx.arc(r.x, r.y, 28, 0, Math.PI * 2);
        ctx.stroke();

        // Robot core node
        ctx.fillStyle = '#00f0ff';
        ctx.beginPath();
        ctx.arc(r.x, r.y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Telemetry tag
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.font = '9px JetBrains Mono';
        ctx.fillText(`AMR-0${idx + 1}`, r.x + 8, r.y - 6);
      });

      // Peer-to-peer mesh consensus connection lines
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
      ctx.setLineDash([4, 4]);
      for (let i = 0; i < robots.length; i++) {
        for (let j = i + 1; j < robots.length; j++) {
          const dx = robots[i].x - robots[j].x;
          const dy = robots[i].y - robots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            ctx.beginPath();
            ctx.moveTo(robots[i].x, robots[i].y);
            ctx.lineTo(robots[j].x, robots[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.setLineDash([]);

      animId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

// Interactive Visual Simulation 02: Electrical Transient Oscilloscope Canvas
function ElectricalOscillogramCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 280);
    let offset = 0;

    const render = () => {
      ctx.fillStyle = '#06070b';
      ctx.fillRect(0, 0, width, height);

      // Oscilloscope background grid
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
      ctx.lineWidth = 1;
      const grid = 24;
      for (let x = 0; x < width; x += grid) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += grid) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Waveform: Fundamental 50Hz AC + Harmonic Transients
      ctx.beginPath();
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 2;

      for (let x = 0; x < width; x++) {
        const t = (x + offset) * 0.04;
        // Base sine + 3rd harmonic + 5th harmonic + anomalous micro-arc spike
        const base = Math.sin(t) * 45;
        const h3 = Math.sin(t * 3) * 8;
        const h5 = Math.sin(t * 5) * 4;
        // Spike at periodic intervals
        const spike = Math.sin(t * 0.3) > 0.95 ? (Math.random() - 0.5) * 35 : 0;
        const y = height / 2 + base + h3 + h5 + spike;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Second Ghost Waveform (Reference baseline)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x++) {
        const t = (x + offset * 0.5) * 0.04;
        const y = height / 2 + Math.sin(t) * 40;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Anomaly Detection Scan Indicator
      const scanX = (offset * 3) % width;
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
      ctx.beginPath();
      ctx.moveTo(scanX, 0);
      ctx.lineTo(scanX, height);
      ctx.stroke();

      ctx.fillStyle = '#ef4444';
      ctx.font = '9px JetBrains Mono';
      ctx.fillText('NILM SAMPLING: 10kHz', 12, 20);
      ctx.fillStyle = '#00f0ff';
      ctx.fillText('ANOMALY SCORE: 0.024 (NOMINAL)', 12, 36);

      offset += 1.5;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

// Interactive Visual Simulation 03: Procedural Vector Lattice & Latent Deformation Canvas
function GenerativeLatticeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 280);
    let time = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.fillStyle = '#06070b';
      ctx.fillRect(0, 0, width, height);

      const rows = 12;
      const cols = 20;
      const xSpacing = width / cols;
      const ySpacing = height / rows;

      ctx.strokeStyle = 'rgba(138, 43, 226, 0.35)';
      ctx.lineWidth = 1;

      // Draw distorted generative matrix
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const px = c * xSpacing + xSpacing / 2;
          const py = r * ySpacing + ySpacing / 2;

          const dx = px - mouseRef.current.x;
          const dy = py - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / 120);

          const wave = Math.sin(time + c * 0.4 + r * 0.3) * 12;
          const x = px + Math.cos(time + r) * 6 + (influence * dx * 0.2);
          const y = py + wave + (influence * dy * 0.2);

          if (c === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);

          // Node points
          ctx.fillStyle = influence > 0.3 ? '#00f0ff' : 'rgba(255, 255, 255, 0.4)';
          ctx.fillRect(x - 1, y - 1, 2, 2);
        }
        ctx.stroke();
      }

      ctx.fillStyle = '#a855f7';
      ctx.font = '9px JetBrains Mono';
      ctx.fillText('LATENT SPACE PROJECTION: 12-DIMENSIONAL', 12, 20);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fillText('DYNAMIC GLSL RIPPLE SHADER', 12, 34);

      time += 0.03;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

export function ProjectGallery() {
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);

  const renderVisualPreview = (id: string) => {
    switch (id) {
      case 'edge-ai-fleet':
        return <FleetSimulationCanvas />;
      case 'electrical-guardian':
        return <ElectricalOscillogramCanvas />;
      case 'ai-experiments':
        return <GenerativeLatticeCanvas />;
      default:
        return null;
    }
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full bg-[#050505] py-28 px-6 sm:px-12 border-t border-white/[0.05]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#00f0ff]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#00f0ff]">
                CHAPTER 02 // RESEARCH & ARCHITECTURE
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold uppercase text-metallic tracking-tight">
              SELECTED WORLDS.
            </h2>
          </div>

          <div className="text-left md:text-right max-w-md">
            <p className="text-xs font-mono uppercase tracking-widest text-gray-400">
              EXPLORATIONS AT THE INTERSECTION OF CODE, DESIGN, AND ARTIFICIAL INTELLIGENCE.
            </p>
            <span className="inline-block mt-2 text-[10px] font-mono px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-gray-400">
              ALL WORK DOCUMENTED AS ARCHITECTURAL CONCEPTS
            </span>
          </div>
        </div>

        {/* Large Editorial Project Gallery (Stacked Visual Compositions) */}
        <div className="space-y-16 lg:space-y-24">
          {PROJECTS.map((project, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <div
                key={project.id}
                className="group relative luxury-card rounded-2xl overflow-hidden p-6 sm:p-10 transition-all duration-500 border-white/[0.08]"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Visual Composition Preview */}
                  <div className={`lg:col-span-7 h-[300px] sm:h-[360px] rounded-xl overflow-hidden border border-white/10 bg-[#06070b] relative shadow-inner ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    {renderVisualPreview(project.id)}

                    {/* Overlay Watermark Badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[9px] font-mono text-gray-400 pointer-events-none">
                      <Activity size={10} className="text-[#00f0ff]" />
                      <span>REAL-TIME CANV // INTERACTIVE</span>
                    </div>
                  </div>

                  {/* Project Details & Metadata */}
                  <div className={`lg:col-span-5 flex flex-col space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-xs font-mono text-[#00f0ff] tracking-widest">
                        WORLD // {project.number}
                      </span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-gray-400">
                        {project.status}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gray-400 block">
                        {project.category}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase text-white group-hover:text-[#00f0ff] transition-colors leading-snug">
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-sm text-gray-400 font-light leading-relaxed">
                      {project.shortDescription}
                    </p>

                    {/* Technologies Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-[11px] font-mono text-gray-300 bg-white/[0.03] border border-white/[0.08] rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="pt-4 flex items-center gap-4">
                      <button
                        onClick={() => {
                          sound.playChime(650, 0.3);
                          setSelectedProject(project);
                        }}
                        className="px-6 py-3 rounded-full bg-white text-black font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#00f0ff] hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all flex items-center gap-2"
                      >
                        <span>INSPECT SYSTEM</span>
                        <ArrowUpRight size={14} />
                      </button>

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-full border border-white/15 text-gray-400 hover:text-white hover:border-[#00f0ff] transition-all"
                          title="View Repository"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
