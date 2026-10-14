import { useState, useEffect, Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { Lighting } from './Lighting';
import { CameraRig } from './CameraRig';
import { ChronoCore } from './ChronoCore';
import { ParticleField } from './ParticleField';
import { MonolithField } from './MonolithField';
import { InteractiveArtifacts } from './InteractiveArtifacts';
import type { ArtifactData } from '../../types';
import type { GSAPSceneState } from '../../hooks/useGSAPScrollTrigger';

interface SceneProps {
  sceneState: GSAPSceneState;
  selectedArtifact: ArtifactData | null;
  onSelectArtifact: (artifact: ArtifactData) => void;
  isFreeFly: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class CanvasErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('WebGL Rendering Notice:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-[#030305] text-gray-400 font-mono text-xs">
          <div className="text-center p-6 border border-white/10 rounded-xl bg-[#0c0c14]/80 backdrop-blur-md">
            <span className="text-neon-cyan block mb-2 font-bold">[WEBGL ACCELERATION INITIALIZING]</span>
            <span>Reload or enable hardware acceleration for optimal 3D fidelity.</span>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export function Scene({
  sceneState,
  selectedArtifact,
  onSelectArtifact,
  isFreeFly
}: SceneProps) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setPointer({ x, y });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <div className="webgl-canvas-container">
      <CanvasErrorBoundary>
        <Canvas
          camera={{ position: [0, 0.4, 7.2], fov: 44 }}
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

          {/* Dynamic Studio & Space Lighting driven by GSAP */}
          <Lighting sceneState={sceneState} />

          {/* Camera Trajectory & Parallax Choreography driven by GSAP */}
          <CameraRig
            sceneState={sceneState}
            pointer={pointer}
            selectedArtifact={selectedArtifact}
            isFreeFly={isFreeFly}
          />

          {/* Thousands of Procedural Cosmic Particles driven by GSAP velocity */}
          <ParticleField sceneState={sceneState} />

          {/* Section 1 & 2: Colossal Central Sculpture driven by GSAP reconfiguration */}
          <ChronoCore
            sceneState={sceneState}
            pointer={pointer}
            onInteract={() => {}}
          />

          {/* Section 3: Deep Space Floating Monolith Sanctuary driven by GSAP elevation */}
          <MonolithField sceneState={sceneState} />

          {/* Section 4: The Interactive Triad of Relics */}
          <InteractiveArtifacts
            selectedArtifact={selectedArtifact}
            onSelectArtifact={onSelectArtifact}
          />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
