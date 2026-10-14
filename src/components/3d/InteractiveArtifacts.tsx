import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { sound } from '../../utils/sound';
import type { ArtifactData } from '../../types';

export const ARTIFACTS: ArtifactData[] = [
  {
    id: 'chrono-relic',
    name: 'THE CHRONO RELIC',
    code: 'RELIC_01 // CHRONO',
    classification: 'TEMPORAL FLUX CORE',
    description: 'A non-Euclidean kinetic chronometer recovered from the event horizon of Sector 9. Operates by twisting local spacetime metrics to store computational states outside classical entropy.',
    color: '#00f0ff',
    accentGlow: 'rgba(0, 240, 255, 0.4)',
    frequency: '1.618 THz (Golden Ratio)',
    coherence: '99.987%',
    fluxDensity: '4.82 Peta-Weber/m²',
    origin: 'SINGULARITY // 0x4F',
    position: [-3.8, 0, -25]
  },
  {
    id: 'neural-monolith',
    name: 'NEURAL MONOLITH',
    code: 'RELIC_02 // SYNAPSE',
    classification: 'SYNAPTIC CORTEX',
    description: 'Self-assembling cybernetic lattice featuring high-density synthetic neuromorphic pathways. Capable of evaluating 800 trillion quantum logic states per microsecond.',
    color: '#8a2be2',
    accentGlow: 'rgba(138, 43, 226, 0.4)',
    frequency: '4.912 GHz (Biorhythm)',
    coherence: '98.450%',
    fluxDensity: '12.4 Exa-FLOP Core',
    origin: 'DEEP GRID // AXIS-0',
    position: [0, 0.3, -25]
  },
  {
    id: 'quantum-prism',
    name: 'QUANTUM PRISM',
    code: 'RELIC_03 // REFRACT',
    classification: 'REFRACTIVE SINGULARITY',
    description: 'Polished hyper-dense crystalline prism designed to refract entangled photons into multi-dimensional spectra. Bridges lightwave communications across parallel physical planes.',
    color: '#00ffaa',
    accentGlow: 'rgba(0, 255, 170, 0.4)',
    frequency: '780.2 nm (Spectral Peak)',
    coherence: '100.000%',
    fluxDensity: 'Infinite Refraction',
    origin: 'PRISM VOID // SECTOR-7',
    position: [3.8, 0, -25]
  }
];

interface InteractiveArtifactsProps {
  selectedArtifact: ArtifactData | null;
  onSelectArtifact: (artifact: ArtifactData) => void;
}

export function InteractiveArtifacts({ selectedArtifact, onSelectArtifact }: InteractiveArtifactsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const relic1Ref = useRef<THREE.Group>(null);
  const relic2Ref = useRef<THREE.Group>(null);
  const relic3Ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    // Artifact 1 Animation: Chrono Relic
    if (relic1Ref.current) {
      relic1Ref.current.rotation.y += delta * 0.7;
      relic1Ref.current.rotation.x += delta * 0.4;
    }
    // Artifact 2 Animation: Neural Monolith
    if (relic2Ref.current) {
      relic2Ref.current.rotation.y -= delta * 0.5;
      relic2Ref.current.rotation.z += delta * 0.3;
    }
    // Artifact 3 Animation: Quantum Prism
    if (relic3Ref.current) {
      relic3Ref.current.rotation.x += delta * 0.6;
      relic3Ref.current.rotation.y += delta * 0.6;
    }
  });

  const handlePointerOver = (id: string) => {
    setHoveredId(id);
    sound.playHover();
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHoveredId(null);
    document.body.style.cursor = 'default';
  };

  const handleClick = (artifact: ArtifactData) => {
    sound.playChime(750, 0.4);
    onSelectArtifact(artifact);
  };

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Chrono Relic */}
      <group
        ref={relic1Ref}
        position={ARTIFACTS[0].position}
        onClick={(e) => { e.stopPropagation(); handleClick(ARTIFACTS[0]); }}
        onPointerOver={() => handlePointerOver(ARTIFACTS[0].id)}
        onPointerOut={handlePointerOut}
      >
        <mesh>
          <dodecahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial
            color="#f1f5f9"
            metalness={0.95}
            roughness={0.1}
            emissive={hoveredId === ARTIFACTS[0].id || selectedArtifact?.id === ARTIFACTS[0].id ? '#00f0ff' : '#000000'}
            emissiveIntensity={hoveredId === ARTIFACTS[0].id ? 0.6 : 0}
          />
        </mesh>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.35, 0.04, 16, 64]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.8} />
        </mesh>
        <mesh rotation={[0, Math.PI / 4, 0]}>
          <torusGeometry args={[1.55, 0.03, 16, 64]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* 2. Neural Monolith */}
      <group
        ref={relic2Ref}
        position={ARTIFACTS[1].position}
        onClick={(e) => { e.stopPropagation(); handleClick(ARTIFACTS[1]); }}
        onPointerOver={() => handlePointerOver(ARTIFACTS[1].id)}
        onPointerOut={handlePointerOut}
      >
        <mesh>
          <sphereGeometry args={[0.95, 32, 32]} />
          <meshStandardMaterial
            color="#0b0a14"
            metalness={0.9}
            roughness={0.2}
            emissive={hoveredId === ARTIFACTS[1].id || selectedArtifact?.id === ARTIFACTS[1].id ? '#8a2be2' : '#000000'}
            emissiveIntensity={hoveredId === ARTIFACTS[1].id ? 0.8 : 0}
          />
        </mesh>
        {/* Wireframe Synaptic Overlay */}
        <mesh>
          <icosahedronGeometry args={[1.05, 1]} />
          <meshBasicMaterial color="#bf5af2" wireframe transparent opacity={0.7} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 3]}>
          <ringGeometry args={[1.3, 1.4, 32]} />
          <meshBasicMaterial color="#8a2be2" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* 3. Quantum Prism */}
      <group
        ref={relic3Ref}
        position={ARTIFACTS[2].position}
        onClick={(e) => { e.stopPropagation(); handleClick(ARTIFACTS[2]); }}
        onPointerOver={() => handlePointerOver(ARTIFACTS[2].id)}
        onPointerOut={handlePointerOut}
      >
        <mesh>
          <octahedronGeometry args={[1.0, 0]} />
          <meshStandardMaterial
            color="#e2e8f0"
            metalness={0.98}
            roughness={0.06}
            emissive={hoveredId === ARTIFACTS[2].id || selectedArtifact?.id === ARTIFACTS[2].id ? '#00ffaa' : '#000000'}
            emissiveIntensity={hoveredId === ARTIFACTS[2].id ? 0.6 : 0}
          />
        </mesh>
        <mesh rotation={[Math.PI / 6, Math.PI / 4, 0]}>
          <octahedronGeometry args={[1.25, 0]} />
          <meshBasicMaterial color="#00ffaa" wireframe transparent opacity={0.65} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.5, 0.03, 12, 48]} />
          <meshBasicMaterial color="#00ffaa" transparent opacity={0.5} />
        </mesh>
      </group>
    </group>
  );
}
