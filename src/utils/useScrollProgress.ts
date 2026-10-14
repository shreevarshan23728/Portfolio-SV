import { useState, useEffect } from 'react';

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      
      const currentScroll = window.scrollY;
      const rawProgress = Math.min(Math.max(currentScroll / totalHeight, 0), 1);
      setProgress(rawProgress);

      // 5 Sections: 0.0 - 0.2 (Hero), 0.2 - 0.4 (Transform), 0.4 - 0.6 (Immersion), 0.6 - 0.8 (Interaction), 0.8 - 1.0 (Conclusion)
      const section = Math.min(Math.floor(rawProgress * 5), 4);
      setActiveSection(section);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { progress, activeSection };
}
