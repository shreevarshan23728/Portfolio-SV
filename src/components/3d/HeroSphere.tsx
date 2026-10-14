import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Lightformer, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Background Particle Field
function ParticleField({ count = 500 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan = new THREE.Color('#00f0ff');
    const silver = new THREE.Color('#cbd5e1');
    const darkBlue = new THREE.Color('#0033aa');

    for (let i = 0; i < count; i++) {
      const radius = 7 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi) - 2;

      const choice = Math.random();
      const c = choice > 0.6 ? cyan : choice > 0.2 ? silver : darkBlue;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Intricate Mechanical Chrome Core & Rings
function MechanicalChromeOrb() {
  const groupRef = useRef<THREE.Group>(null);
  const outerRing1Ref = useRef<THREE.Mesh>(null);
  const outerRing2Ref = useRef<THREE.Mesh>(null);
  const outerRing3Ref = useRef<THREE.Mesh>(null);
  const innerMechRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const coreLightRef = useRef<THREE.PointLight>(null);

  // Materials
  const chromeMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#e8ecf2'),
    metalness: 0.98,
    roughness: 0.04,
    envMapIntensity: 1.5,
  }), []);

  const titaniumMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#333842'),
    metalness: 0.92,
    roughness: 0.2,
    envMapIntensity: 1.2,
  }), []);

  const latticeMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#0a101d'),
    metalness: 0.85,
    roughness: 0.35,
    wireframe: true,
  }), []);

  const coreGlowMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color('#00f0ff'),
  }), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const { pointer } = state;

    // Smooth subtle mouse responsiveness on master group
    if (groupRef.current) {
      const targetRotX = pointer.y * 0.35;
      const targetRotY = pointer.x * 0.45;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
    }

    // Counter-rotating rings at harmonic ratios
    if (outerRing1Ref.current) {
      outerRing1Ref.current.rotation.x = t * 0.25;
      outerRing1Ref.current.rotation.y = t * 0.15;
    }
    if (outerRing2Ref.current) {
      outerRing2Ref.current.rotation.y = -t * 0.3;
      outerRing2Ref.current.rotation.z = t * 0.18;
    }
    if (outerRing3Ref.current) {
      outerRing3Ref.current.rotation.z = -t * 0.22;
      outerRing3Ref.current.rotation.x = -t * 0.12;
    }

    // Inner mechanical assembly rotation
    if (innerMechRef.current) {
      innerMechRef.current.rotation.y = t * 0.4;
      innerMechRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
    }

    // Pulsing central quantum core
    if (coreRef.current && coreLightRef.current) {
      const pulse = 1 + Math.sin(t * 3.5) * 0.15;
      coreRef.current.scale.setScalar(pulse);
      coreLightRef.current.intensity = 2.5 + Math.sin(t * 3.5) * 1.0;
    }
  });

  return (
    <group ref={groupRef} scale={1.25}>
      {/* Central Pulsing Quantum Light Source */}
      <pointLight
        ref={coreLightRef}
        color="#00f0ff"
        intensity={2.5}
        distance={6}
        decay={2}
      />

      {/* Luminous Quantum Singularity */}
      <mesh ref={coreRef} material={coreGlowMaterial}>
        <sphereGeometry args={[0.28, 32, 32]} />
      </mesh>

      {/* Inner Mechanical Cage / Cog Lattice */}
      <group ref={innerMechRef}>
        <mesh material={latticeMaterial}>
          <icosahedronGeometry args={[0.75, 2]} />
        </mesh>
        
        {/* Radial titanium struts */}
        {[0, 60, 120, 180, 240, 300].map((angle, idx) => (
          <mesh
            key={idx}
            material={titaniumMaterial}
            rotation={[0, 0, (angle * Math.PI) / 180]}
          >
            <cylinderGeometry args={[0.02, 0.02, 1.3, 8]} />
          </mesh>
        ))}

        {/* Inner mechanical gimbal ring */}
        <mesh material={chromeMaterial} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[0.85, 0.04, 16, 64]} />
        </mesh>
      </group>

      {/* Sliced Chrome Sphere Segments (Revealing mechanical interior) */}
      <group>
        {/* Upper Sliced Chrome Hemisphere */}
        <mesh
          material={chromeMaterial}
          position={[0, 0.22, 0]}
          rotation={[-0.2, 0.3, 0]}
        >
          <sphereGeometry args={[1.2, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.38]} />
        </mesh>

        {/* Lower Sliced Chrome Hemisphere */}
        <mesh
          material={chromeMaterial}
          position={[0, -0.22, 0]}
          rotation={[0.2, -0.3, 0]}
        >
          <sphereGeometry args={[1.2, 48, 24, 0, Math.PI * 2, Math.PI * 0.62, Math.PI * 0.38]} />
        </mesh>

        {/* Lateral Chrome Segment Petals */}
        <mesh material={chromeMaterial} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[1.22, 0.035, 16, 64]} />
        </mesh>
      </group>

      {/* Outer Titanium & Chrome Orbital Gimbal Rings */}
      <mesh ref={outerRing1Ref} material={chromeMaterial}>
        <torusGeometry args={[1.65, 0.035, 24, 100]} />
      </mesh>

      <mesh ref={outerRing2Ref} material={titaniumMaterial} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.88, 0.03, 24, 100]} />
      </mesh>

      <mesh ref={outerRing3Ref} material={chromeMaterial} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[2.1, 0.025, 24, 100]} />
      </mesh>
    </group>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        {/* Ambient Dark Atmospheric Lighting */}
        <ambientLight intensity={0.4} />
        
        {/* Key Directional Light for Specular Metallic Reflections */}
        <directionalLight position={[5, 6, 5]} intensity={1.8} color="#f8fafc" />
        
        {/* Subtle Electric Blue Rim Lights */}
        <pointLight position={[-4, -3, 2]} intensity={2.2} color="#0066ff" distance={10} />
        <pointLight position={[3, -4, -3]} intensity={1.8} color="#00f0ff" distance={10} />
        <pointLight position={[0, 5, -2]} intensity={1.0} color="#8a2be2" distance={8} />

        {/* Procedural High-End Metallic Reflections (Zero external HDR downloads required) */}
        <Environment resolution={256}>
          {/* Key overhead softbox */}
          <Lightformer
            form="rect"
            intensity={2}
            position={[0, 6, 2]}
            scale={[8, 3, 1]}
            color="#ffffff"
          />
          {/* Cyan edge reflection */}
          <Lightformer
            form="circle"
            intensity={3}
            position={[-5, 2, -2]}
            scale={4}
            color="#00f0ff"
          />
          {/* Deep blue fill */}
          <Lightformer
            form="ring"
            intensity={2}
            position={[5, -2, 2]}
            scale={5}
            color="#0033aa"
          />
          {/* Chrome horizon line */}
          <Lightformer
            form="rect"
            intensity={1.5}
            position={[0, -4, 4]}
            scale={[12, 1, 1]}
            color="#e2e8f0"
          />
        </Environment>

        {/* Background Particle Field */}
        <ParticleField count={450} />

        {/* Natural Floating Motion for Chrome Hero Orb */}
        <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.6}>
          <MechanicalChromeOrb />
        </Float>
      </Canvas>
    </div>
  );
}
