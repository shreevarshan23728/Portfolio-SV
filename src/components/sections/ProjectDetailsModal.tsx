import { useEffect } from 'react';
import type { ProjectCaseStudy } from '../../data/projects';
import { X, ExternalLink, ShieldAlert, Layers, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/sound';

interface ProjectDetailsModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
}

export function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-2xl overflow-y-auto animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#090a0f] border border-white/15 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden my-auto">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] uppercase tracking-wider font-semibold">
              {project.status}
            </span>
            <span className="text-xs font-mono text-gray-400">
              WORLD // {project.number}
            </span>
          </div>

          <button
            onClick={() => {
              sound.playHover();
              onClose();
            }}
            aria-label="Close Case Study"
            className="p-2 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all focus:outline-none"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-10 max-h-[80vh] overflow-y-auto space-y-10 custom-scrollbar">
          {/* Title & Category */}
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#00f0ff] block mb-2">
              {project.category}
            </span>
            <h3 className="text-3xl sm:text-5xl font-display font-extrabold uppercase text-white tracking-tight leading-tight">
              {project.title}
            </h3>
            <p className="mt-4 text-base sm:text-lg text-gray-300 font-light leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest">
                <ShieldAlert size={14} />
                <span>PROBLEM STATEMENT</span>
              </div>
              <p className="text-sm text-gray-300 font-light leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#00f0ff]/[0.02] border border-[#00f0ff]/20 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff] uppercase tracking-widest">
                <CheckCircle2 size={14} />
                <span>ENGINEERED SOLUTION</span>
              </div>
              <p className="text-sm text-gray-300 font-light leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Technical Architecture */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-gray-400 uppercase tracking-widest border-b border-white/10 pb-2">
              <Layers size={14} className="text-[#00f0ff]" />
              <span>TECHNICAL ARCHITECTURE & PROTOCOL</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.technicalArchitecture.map((step, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-lg bg-white/[0.015] border border-white/5 text-xs font-mono text-gray-300"
                >
                  <span className="text-[#00f0ff] font-bold">0{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges & Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-gray-500 block">
                COMPUTATIONAL CHALLENGES
              </span>
              <p className="text-sm text-gray-400 leading-relaxed font-light">
                {project.challenges}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#00f0ff] block">
                SIMULATED RESULTS & BENCHMARKS
              </span>
              <p className="text-sm text-gray-300 leading-relaxed font-light">
                {project.results}
              </p>
            </div>
          </div>

          {/* Technologies Used */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 block">
              SYSTEM TECHNOLOGIES & PACKAGES
            </span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono text-gray-300 bg-white/[0.04] border border-white/10 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
            <div className="text-[11px] font-mono text-gray-500">
              VISUAL DIRECTION: {project.visualDirection}
            </div>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/[0.03] text-xs font-mono text-white hover:border-[#00f0ff] hover:text-[#00f0ff] transition-all"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  <span>VIEW REPOSITORY</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00f0ff] text-black text-xs font-mono font-semibold hover:bg-white transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                >
                  <span>LIVE DEMO</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
