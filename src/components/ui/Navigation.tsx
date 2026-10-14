import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { sound } from '../../utils/sound';

interface NavigationProps {
  activeSection: string;
}

export function Navigation({ activeSection }: NavigationProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: 'HOME', id: 'home' },
    { label: 'ABOUT', id: 'about' },
    { label: 'PROJECTS', id: 'projects' },
    { label: 'EXPERIMENTS', id: 'experiments' },
    { label: 'CONTACT', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const isPlaying = sound.toggleMute();
    setIsMuted(!isPlaying);
  };

  const handleNavClick = (id: string) => {
    sound.playHover();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 select-none ${
          scrolled
            ? 'py-3.5 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* Brand Monogram */}
          <button
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-3.5 text-left focus:outline-none"
          >
            <div className="relative w-8 h-8 rounded-full border border-white/20 bg-white/[0.03] flex items-center justify-center transition-all duration-300 group-hover:border-[#00f0ff] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              <span className="text-[11px] font-mono font-bold text-gray-200 group-hover:text-[#00f0ff] transition-colors">
                SV
              </span>
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-mono font-semibold tracking-[0.25em] text-white uppercase group-hover:text-gray-300 transition-colors">
                SHREE VARSHAN
              </span>
              <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase">
                COIMBATORE // 11.0168° N
              </span>
            </div>
          </button>

          {/* Desktop Center Floating Capsule Navigation */}
          <nav className="hidden md:flex items-center px-6 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
            <ul className="flex items-center gap-1">
              {navItems.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id} className="flex items-center">
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`relative px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.2em] transition-all duration-200 ${
                        isActive
                          ? 'text-[#00f0ff] font-semibold'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#00f0ff] rounded-full shadow-[0_0_8px_#00f0ff]" />
                      )}
                    </button>
                    {idx < navItems.length - 1 && (
                      <span className="text-white/10 text-xs px-1 select-none">·</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Action Controls: Audio Engine & Direct Contact */}
          <div className="flex items-center gap-3">
            {/* Audio Feedback Synthesizer Toggle */}
            <button
              onClick={handleSoundToggle}
              title={isMuted ? 'Enable Atmospheric Audio' : 'Mute Audio'}
              className={`p-2 rounded-full border transition-all duration-200 text-xs font-mono flex items-center gap-1.5 ${
                !isMuted
                  ? 'border-[#00f0ff]/50 bg-[#00f0ff]/10 text-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                  : 'border-white/10 bg-white/[0.02] text-gray-400 hover:text-white hover:border-white/25'
              }`}
            >
              {!isMuted ? <Volume2 size={14} /> : <VolumeX size={14} />}
              <span className="hidden xl:inline text-[10px] tracking-widest uppercase">
                {!isMuted ? 'AUDIO ON' : 'SOUND'}
              </span>
            </button>

            {/* Quick Connect Link */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('contact');
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#00f0ff]/30 bg-[#00f0ff]/5 text-[11px] font-mono tracking-widest text-[#00f0ff] hover:bg-[#00f0ff]/15 hover:border-[#00f0ff] transition-all shadow-[0_0_15px_rgba(0,240,255,0.15)]"
            >
              <span>CONNECT</span>
              <ArrowUpRight size={12} />
            </a>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="md:hidden p-2 rounded-full border border-white/15 bg-white/[0.03] text-gray-300 hover:text-white hover:border-white/30"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Luxury Glass Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-[#050505]/95 backdrop-blur-2xl flex flex-col justify-between px-8 py-24 animate-in fade-in duration-300">
          <div className="flex flex-col space-y-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#00f0ff]">
              NAVIGATION INDEX
            </span>
            <ul className="flex flex-col space-y-4">
              {navItems.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`text-2xl font-display uppercase tracking-widest flex items-center justify-between w-full py-2 border-b border-white/[0.06] transition-colors ${
                        isActive ? 'text-[#00f0ff]' : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="text-xs font-mono text-gray-500">0{idx + 1}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col gap-4 font-mono text-xs text-gray-400">
            <div className="flex items-center justify-between">
              <span>SOUND DESIGN</span>
              <button
                onClick={handleSoundToggle}
                className="text-[#00f0ff] underline uppercase"
              >
                {!isMuted ? 'ACTIVE (MUTE)' : 'MUTED (ENABLE)'}
              </button>
            </div>
            <div className="text-[10px] text-gray-600 uppercase tracking-widest">
              SHREE VARSHAN // PORTFOLIO 2026
            </div>
          </div>
        </div>
      )}
    </>
  );
}
