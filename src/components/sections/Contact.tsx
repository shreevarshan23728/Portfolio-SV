import { useState } from 'react';
import { PROFILE } from '../../data/profile';
import { Mail, Copy, Check, ArrowUp, Sparkles } from 'lucide-react';
import { sound } from '../../utils/sound';

export function Contact() {
  const [copied, setCopied] = useState(false);

  const cleanEmail = PROFILE.socialLinks.email.replace('mailto:', '');

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    sound.playChime(800, 0.2);
    navigator.clipboard.writeText(cleanEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    sound.playHover();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="contact"
      className="relative min-h-[90vh] w-full bg-[#050505] py-28 px-6 sm:px-12 border-t border-white/[0.05] flex flex-col justify-between overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00f0ff]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto w-full text-center relative z-10 my-auto">
        {/* Section Pre-title */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 mb-8">
          <Sparkles size={12} className="text-[#00f0ff]" />
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#00f0ff]">
            CHAPTER 06 // TRANSMISSION TERMINAL
          </span>
        </div>

        {/* Cinematic Heading */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold uppercase text-metallic tracking-tight mb-8 leading-tight">
          LET'S BUILD SOMETHING UNEXPECTED.
        </h2>

        {/* Supporting Text */}
        <p className="text-base sm:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed mb-12">
          Have an interesting idea, a challenging problem, or a project worth exploring? Let's connect.
        </p>

        {/* Action Buttons: EMAIL ME, GITHUB, LINKEDIN */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto mb-10">
          {/* Email Me Button (Valid Mailto) */}
          <a
            href={PROFILE.socialLinks.email}
            onClick={() => sound.playChime(660, 0.3)}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-mono text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#00f0ff] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center gap-2.5"
          >
            <Mail size={16} />
            <span>EMAIL ME</span>
          </a>

          {/* GitHub Button */}
          <a
            href={PROFILE.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playHover()}
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 bg-white/[0.02] backdrop-blur-md text-white font-mono text-xs uppercase tracking-[0.2em] font-medium hover:border-[#00f0ff] hover:text-[#00f0ff] hover:bg-white/[0.05] transition-all flex items-center justify-center gap-2.5"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <span>GITHUB</span>
          </a>

          {/* LinkedIn Button */}
          <a
            href={PROFILE.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playHover()}
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 bg-white/[0.02] backdrop-blur-md text-white font-mono text-xs uppercase tracking-[0.2em] font-medium hover:border-[#00f0ff] hover:text-[#00f0ff] hover:bg-white/[0.05] transition-all flex items-center justify-center gap-2.5"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            <span>LINKEDIN</span>
          </a>
        </div>

        {/* Quick Email Clipboard Copy Pill */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.02] border border-white/10 text-xs font-mono text-gray-400">
          <span>{cleanEmail}</span>
          <button
            onClick={handleCopyEmail}
            title="Copy email to clipboard"
            className="text-gray-400 hover:text-[#00f0ff] transition-colors focus:outline-none flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <Check size={14} className="text-[#00f0ff]" />
                <span className="text-[#00f0ff] text-[10px] uppercase font-bold">COPIED</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span className="text-[10px] uppercase">COPY</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Minimal Footer */}
      <footer className="w-full max-w-7xl mx-auto pt-16 mt-20 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-gray-500 gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
          <span className="text-gray-300 font-semibold tracking-widest uppercase">
            {PROFILE.name}
          </span>
          <span className="hidden sm:inline text-white/10">|</span>
          <span className="text-gray-400 tracking-wider">
            DESIGNED WITH CURIOSITY.
          </span>
          <span className="hidden sm:inline text-white/10">|</span>
          <span className="text-gray-500">
            {PROFILE.metadata.year}
          </span>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-gray-400 hover:text-[#00f0ff] transition-colors tracking-widest text-[11px] uppercase group"
        >
          <span>RETURN TO TOP</span>
          <ArrowUp size={14} className="transition-transform group-hover:-translate-y-1" />
        </button>
      </footer>
    </section>
  );
}
