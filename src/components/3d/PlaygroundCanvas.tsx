import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Lightformer, Environment } from '@react-three/drei';
import * as THREE from 'three';

export interface PlaygroundArtifact {
  id: string;
  name: string;
  code: string;
  category: string;
  description: string;
  geometryType: string;
  specifications: {
    material: string;
    reflectance: string;
    damping: string;
  };
}

export const PLAYGROUND_OBJECTS: PlaygroundArtifact[] = [
  {
    id: 'icosahedron',
    name: 'CHRONO ICOSAHEDRON',
    code: 'ART // 01',
    category: 'POLYHEDRAL GEOMETRY',
    description: 'A 20-faced precision faceted chrome monolith containing an internal laser resonator. Reacts to harmonic soundwaves and spatial pointer vectors.',
    geometryType: 'Dual-frequency Icosahedron',
    specifications: {
      material: 'Polished Specular Chrome',
      reflectance: '98.5% Index',
      damping: '0.04 Critical'
    }
  },
  {
    id: 'torus-knot',
    name: 'QUANTUM TORUS KNOT',
    code: 'ART // 02',
    category: 'TOPOLOGICAL MANIFOLD',
    description: 'An interlaced (2,3) trefoil manifold forged from aerospace-grade titanium. Demonstrates continuous non-orientable surface curvature.',
    geometryType: 'Trefoil Torus Knot (p=2, q=3)',
    specifications: {
      material: 'Brushed Dark Titanium',
      reflectance: '89.0% Index',
      damping: '0.08 Critical'
    }
  },
  {
    id: 'astrolabe',
    name: 'ORBITAL ASTROLABE',
    code: 'ART // 03',
    category: 'CELESTIAL COMPUTATION',
    description: 'A 3-tier counter-rotating gimbal ring lattice enclosing a floating platinum octahedron. Used for mapping high-dimensional coordinate vectors.',
    geometryType: 'Tricyclic Nested Gimbals',
    specifications: {
      material: 'Liquid Platinum & Obsidian',
      reflectance: '96.2% Index',
      damping: '0.02 Critical'
    }
  }
];

interface ArtifactProps {
  artifact: PlaygroundArtifact;
  position: [number, number, number];
  isSelected: boolean;
  onSelect: () => void;
  wireframe: boolean;
  speed: number;
}

function Artifact1({ isSelected, onSelect, wireframe, speed, position }: ArtifactProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    if (meshRef.current) {
      meshRef.current.rotation.x = t * (isSelected ? 0.9 : 0.35);
      meshRef.current.rotation.y = t * (isSelected ? 1.1 : 0.45);
      const targetScale = isSelected ? 1.25 : hovered ? 1.1 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
    if (coreRef.current) {
      coreRef.current.rotation.z = -t * 0.8;
      const pulse = 1 + Math.sin(t * 4) * 0.2;
      coreRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color={isSelected ? '#f0f9ff' : '#cbd5e1'}
          metalness={0.96}
          roughness={isSelected ? 0.05 : 0.12}
          wireframe={wireframe}
          envMapIntensity={2}
        />
        {/* Sub-mesh for inner wireframe halo */}
        {isSelected && (
          <mesh>
            <icosahedronGeometry args={[1.05, 1]} />
            <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.35} />
          </mesh>
        )}
      </mesh>

      {/* Internal glowing node */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.3, 0]} />
        <meshBasicMaterial color="#00f0ff" wireframe />
      </mesh>
    </group>
  );
}

function Artifact2({ isSelected, onSelect, wireframe, speed, position }: ArtifactProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    if (meshRef.current) {
      meshRef.current.rotation.x = t * (isSelected ? 0.8 : 0.25);
      meshRef.current.rotation.y = -t * (isSelected ? 1.0 : 0.35);
      const targetScale = isSelected ? 1.25 : hovered ? 1.1 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <torusKnotGeometry args={[0.65, 0.22, 120, 24, 2, 3]} />
        <meshStandardMaterial
          color={isSelected ? '#38bdf8' : '#475569'}
          metalness={0.92}
          roughness={isSelected ? 0.08 : 0.22}
          wireframe={wireframe}
          envMapIntensity={2}
        />
        {isSelected && (
          <mesh>
            <torusKnotGeometry args={[0.72, 0.24, 60, 16, 2, 3]} />
            <meshBasicMaterial color="#0066ff" wireframe transparent opacity={0.25} />
          </mesh>
        )}
      </mesh>
    </group>
  );
}

function Artifact3({ isSelected, onSelect, wireframe, speed, position }: ArtifactProps) {
  const groupRef = useRef<THREE.Group>(null);
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    if (groupRef.current) {
      const targetScale = isSelected ? 1.25 : hovered ? 1.1 : 1.0;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
    if (r1.current) r1.current.rotation.x = t * (isSelected ? 1.2 : 0.4);
    if (r2.current) r2.current.rotation.y = -t * (isSelected ? 1.4 : 0.5);
    if (r3.current) r3.current.rotation.z = t * (isSelected ? 0.9 : 0.3);
    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.6;
      coreRef.current.rotation.y = t * 0.8;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh ref={r1}>
        <torusGeometry args={[0.9, 0.03, 16, 64]} />
        <meshStandardMaterial
          color={isSelected ? '#ffffff' : '#94a3b8'}
          metalness={0.98}
          roughness={0.06}
          wireframe={wireframe}
          envMapIntensity={2}
        />
      </mesh>

      <mesh ref={r2} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[0.75, 0.025, 16, 64]} />
        <meshStandardMaterial
          color="#00f0ff"
          metalness={0.9}
          roughness={0.15}
          wireframe={wireframe}
        />
      </mesh>

      <mesh ref={r3} rotation={[0, Math.PI / 3, 0]}>
        <torusGeometry args={[0.6, 0.02, 16, 64]} />
        <meshStandardMaterial
          color={isSelected ? '#60a5fa' : '#64748b'}
          metalness={0.95}
          roughness={0.1}
          wireframe={wireframe}
        />
      </mesh>

      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.98}
          roughness={0.02}
          wireframe={wireframe}
        />
      </mesh>
    </group>
  );
}

// Slowly moving background ambient dust
function AmbientDriftParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions] = useMemo(() => {
    const pos = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return [pos];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00f0ff"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Camera controller with subtle pointer tracking and selected object focus
function SceneCameraController({ selectedId }: { selectedId: string | null }) {
  useFrame((state) => {
    const { pointer, camera } = state;
    
    // Default camera target
    let targetX = pointer.x * 0.4;
    let targetY = pointer.y * 0.3;
    let targetZ = 5.2;

    if (selectedId === 'icosahedron') {
      targetX = -1.2 + pointer.x * 0.2;
      targetZ = 4.4;
    } else if (selectedId === 'torus-knot') {
      targetX = pointer.x * 0.2;
      targetZ = 4.2;
    } else if (selectedId === 'astrolabe') {
      targetX = 1.2 + pointer.x * 0.2;
      targetZ = 4.4;
    }

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.04);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.04);
  });

  return null;
}

interface PlaygroundSceneProps {
  selectedId: string | null;
  onSelectId: (id: string | null) => void;
  wireframe: boolean;
  speed: number;
  lightMood: 'cyan' | 'violet' | 'chrome';
}

export function PlaygroundCanvas({
  selectedId,
  onSelectId,
  wireframe,
  speed,
  lightMood
}: PlaygroundSceneProps) {
  const moodColor = lightMood === 'cyan' ? '#00f0ff' : lightMood === 'violet' ? '#8a2be2' : '#ffffff';

  return (
    <div className="relative w-full h-[540px] sm:h-[620px] rounded-2xl overflow-hidden border border-white/10 bg-[#07070a] shadow-2xl">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 46 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        onPointerMissed={() => onSelectId(null)}
      >
        <SceneCameraController selectedId={selectedId} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[6, 8, 6]} intensity={1.8} color="#ffffff" />
        <pointLight position={[-4, 2, 2]} intensity={2.5} color={moodColor} distance={12} />
        <pointLight position={[4, -3, 2]} intensity={1.5} color="#0066ff" distance={10} />

        {/* Photorealistic chrome reflections */}
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={2} position={[0, 6, 2]} scale={[8, 3, 1]} color="#ffffff" />
          <Lightformer form="circle" intensity={3} position={[-4, 2, -2]} scale={3} color={moodColor} />
          <Lightformer form="ring" intensity={2} position={[4, -2, 2]} scale={4} color="#0033aa" />
        </Environment>

        <AmbientDriftParticles />

        {/* 3 Floating Objects in Responsive Spatial Layout */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <Artifact1
            artifact={PLAYGROUND_OBJECTS[0]}
            position={[-2.4, 0, 0]}
            isSelected={selectedId === 'icosahedron'}
            onSelect={() => onSelectId(selectedId === 'icosahedron' ? null : 'icosahedron')}
            wireframe={wireframe}
            speed={speed}
          />
        </Float>

        <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.6}>
          <Artifact2
            artifact={PLAYGROUND_OBJECTS[1]}
            position={[0, 0, 0]}
            isSelected={selectedId === 'torus-knot'}
            onSelect={() => onSelectId(selectedId === 'torus-knot' ? null : 'torus-knot')}
            wireframe={wireframe}
            speed={speed}
          />
        </Float>

        <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.5}>
          <Artifact3
            artifact={PLAYGROUND_OBJECTS[2]}
            position={[2.4, 0, 0]}
            isSelected={selectedId === 'astrolabe'}
            onSelect={() => onSelectId(selectedId === 'astrolabe' ? null : 'astrolabe')}
            wireframe={wireframe}
            speed={speed}
          />
        </Float>
      </Canvas>

      {/* Floating Instructions HUD Banner */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-widest text-gray-300">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
          <span>INTERACTIVE SPATIAL LAB // CLICK ANY OBJECT</span>
        </div>
        <div className="hidden sm:block text-[10px] font-mono text-gray-500 tracking-wider">
          ROTATION: MOUSE TILT · RAYCASTING ACTIVE
        </div>
      </div>
    </div>
  );
}
