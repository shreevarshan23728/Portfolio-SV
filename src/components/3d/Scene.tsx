import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Lighting } from './Lighting';
import { CameraRig } from './CameraRig';
import { ChronoCore } from './ChronoCore';
import { ParticleField } from './ParticleField';
import { MonolithField } from './MonolithField';
import { InteractiveArtifacts } from './InteractiveArtifacts';
import type { ArtifactData } from '../../types';

interface SceneProps {
  scrollProgress: number;
  selectedArtifact: ArtifactData | null;
  onSelectArtifact: (artifact: ArtifactData) => void;
  isFreeFly: boolean;
}

export function Scene({
  scrollProgress,
  selectedArtifact,
  onSelectArtifact,
  isFreeFly
}: SceneProps) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      // Normalize pointer between -1 and 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setPointer({ x, y });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <div className="webgl-canvas-container">
      <Canvas
        camera={{ position: [0, 0.4, 7.2], fov: 46 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        {/* Deep Black Atmospheric Space Fog */}
        <color attach="background" args={['#030305']} />
        <fog attach="fog" args={['#030305', 6, 52]} />

        {/* Dynamic Studio & Space Lighting */}
        <Lighting />

        {/* Camera Trajectory & Parallax Choreography */}
        <CameraRig
          scrollProgress={scrollProgress}
          pointer={pointer}
          selectedArtifact={selectedArtifact}
          isFreeFly={isFreeFly}
        />

        {/* Thousands of Procedural Cosmic Particles */}
        <ParticleField scrollProgress={scrollProgress} />

        {/* Section 1 & 2: Colossal Central Futuristic Mechanical Sculpture */}
        <ChronoCore
          scrollProgress={scrollProgress}
          pointer={pointer}
          onInteract={() => {}}
        />

        {/* Section 3: Deep Space Floating Monolith Sanctuary */}
        <MonolithField scrollProgress={scrollProgress} />

        {/* Section 4: The Interactive Triad of Relics */}
        <InteractiveArtifacts
          selectedArtifact={selectedArtifact}
          onSelectArtifact={onSelectArtifact}
        />
      </Canvas>
    </div>
  );
}
