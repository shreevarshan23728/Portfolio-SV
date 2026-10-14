import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { ContactShadows, Sparkles } from '@react-three/drei';
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
      relic1Ref.current.rotation.y += delta * 0.65;
      relic1Ref.current.rotation.x += delta * 0.35;
    }
    // Artifact 2 Animation: Neural Monolith
    if (relic2Ref.current) {
      relic2Ref.current.rotation.y -= delta * 0.45;
      relic2Ref.current.rotation.z += delta * 0.28;
    }
    // Artifact 3 Animation: Quantum Prism
    if (relic3Ref.current) {
      relic3Ref.current.rotation.x += delta * 0.55;
      relic3Ref.current.rotation.y += delta * 0.55;
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
        <ContactShadows
          position={[0, -1.6, 0]}
          opacity={0.65}
          scale={5}
          blur={2.0}
          far={4}
          color="#00f0ff"
        />

        {/* Central Faceted Titanium Dodecahedron */}
        <mesh>
          <dodecahedronGeometry args={[0.92, 0]} />
          <meshPhysicalMaterial
            color="#f1f5f9"
            metalness={0.98}
            roughness={0.06}
            clearcoat={1.0}
            clearcoatRoughness={0.04}
            iridescence={0.8}
            iridescenceIOR={1.35}
            envMapIntensity={3.5}
            emissive={hoveredId === ARTIFACTS[0].id || selectedArtifact?.id === ARTIFACTS[0].id ? '#00f0ff' : '#000000'}
            emissiveIntensity={hoveredId === ARTIFACTS[0].id ? 0.75 : 0}
          />
        </mesh>

        {/* Ring A */}
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.38, 0.045, 20, 80]} />
          <meshPhysicalMaterial
            color="#38bdf8"
            metalness={0.95}
            roughness={0.1}
            clearcoat={1.0}
            envMapIntensity={3.0}
          />
        </mesh>

        {/* Ring B */}
        <mesh rotation={[0, Math.PI / 4, 0]}>
          <torusGeometry args={[1.6, 0.035, 16, 80]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.7} />
        </mesh>

        <Sparkles count={25} scale={3} size={3} speed={0.4} color="#00f0ff" opacity={0.6} />
      </group>

      {/* 2. Neural Monolith */}
      <group
        ref={relic2Ref}
        position={ARTIFACTS[1].position}
        onClick={(e) => { e.stopPropagation(); handleClick(ARTIFACTS[1]); }}
        onPointerOver={() => handlePointerOver(ARTIFACTS[1].id)}
        onPointerOut={handlePointerOut}
      >
        <ContactShadows
          position={[0, -1.6, 0]}
          opacity={0.65}
          scale={5}
          blur={2.0}
          far={4}
          color="#8a2be2"
        />

        {/* Obsidian Lacquer Sphere */}
        <mesh>
          <sphereGeometry args={[0.96, 32, 32]} />
          <meshPhysicalMaterial
            color="#08070d"
            metalness={0.92}
            roughness={0.14}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            envMapIntensity={2.8}
            emissive={hoveredId === ARTIFACTS[1].id || selectedArtifact?.id === ARTIFACTS[1].id ? '#8a2be2' : '#000000'}
            emissiveIntensity={hoveredId === ARTIFACTS[1].id ? 0.9 : 0}
          />
        </mesh>

        {/* Glowing Synaptic Wireframe Shell */}
        <mesh>
          <icosahedronGeometry args={[1.08, 1]} />
          <meshBasicMaterial color="#bf5af2" wireframe transparent opacity={0.75} />
        </mesh>

        {/* Floating Halo Ring */}
        <mesh rotation={[0, 0, Math.PI / 3]}>
          <ringGeometry args={[1.35, 1.45, 48]} />
          <meshBasicMaterial color="#8a2be2" transparent opacity={0.55} side={THREE.DoubleSide} />
        </mesh>

        <Sparkles count={25} scale={3} size={3} speed={0.4} color="#bf5af2" opacity={0.6} />
      </group>

      {/* 3. Quantum Prism */}
      <group
        ref={relic3Ref}
        position={ARTIFACTS[2].position}
        onClick={(e) => { e.stopPropagation(); handleClick(ARTIFACTS[2]); }}
        onPointerOver={() => handlePointerOver(ARTIFACTS[2].id)}
        onPointerOut={handlePointerOut}
      >
        <ContactShadows
          position={[0, -1.6, 0]}
          opacity={0.65}
          scale={5}
          blur={2.0}
          far={4}
          color="#00ffaa"
        />

        {/* Translucent Refractive Mirror Octahedron */}
        <mesh>
          <octahedronGeometry args={[1.02, 0]} />
          <meshPhysicalMaterial
            color="#f1fdf8"
            metalness={0.96}
            roughness={0.04}
            clearcoat={1.0}
            clearcoatRoughness={0.02}
            iridescence={0.9}
            iridescenceIOR={1.4}
            envMapIntensity={3.8}
            emissive={hoveredId === ARTIFACTS[2].id || selectedArtifact?.id === ARTIFACTS[2].id ? '#00ffaa' : '#000000'}
            emissiveIntensity={hoveredId === ARTIFACTS[2].id ? 0.7 : 0}
          />
        </mesh>

        {/* Outer Stellation Wireframe */}
        <mesh rotation={[Math.PI / 6, Math.PI / 4, 0]}>
          <octahedronGeometry args={[1.28, 0]} />
          <meshBasicMaterial color="#00ffaa" wireframe transparent opacity={0.7} />
        </mesh>

        {/* Orbiting Quantum Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.55, 0.03, 16, 64]} />
          <meshBasicMaterial color="#00ffaa" transparent opacity={0.5} />
        </mesh>

        <Sparkles count={25} scale={3} size={3} speed={0.4} color="#00ffaa" opacity={0.6} />
      </group>
    </group>
  );
}
