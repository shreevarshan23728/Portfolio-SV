import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { ContactShadows, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { sound } from '../../utils/sound';
import type { GSAPSceneState } from '../../hooks/useGSAPScrollTrigger';

interface ChronoCoreProps {
  sceneState: GSAPSceneState;
  pointer: { x: number; y: number };
  onInteract?: () => void;
}

export function ChronoCore({ sceneState, pointer, onInteract }: ChronoCoreProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const ring4Ref = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const coreInnerRef = useRef<THREE.Mesh>(null);
  const shockwaveRef = useRef<THREE.Mesh>(null);
  const datumRingRef = useRef<THREE.Mesh>(null);

  const [hovered, setHovered] = useState(false);
  const [shockwaveScale, setShockwaveScale] = useState(0);
  const [energyPulse, setEnergyPulse] = useState(1);

  const targetRotation = useRef({ x: 0, y: 0 });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    sound.playResonancePulse();
    setShockwaveScale(0.1);
    setEnergyPulse(3.8);
    if (onInteract) onInteract();
  };

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Pointer-driven physical tilt
    targetRotation.current.x = pointer.y * 0.45 + Math.sin(Date.now() * 0.0008) * 0.08;
    targetRotation.current.y = pointer.x * 0.6 + (Date.now() * 0.0004);

    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotation.current.x,
      2.8,
      delta
    );
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotation.current.y,
      2.8,
      delta
    );

    const speedMultiplier = (hovered ? 2.4 : 1.0) * sceneState.ringRotationSpeed;

    // Ring 1: Driven by GSAP ScrollTrigger timeline
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.32 * speedMultiplier;
      ring1Ref.current.position.z = THREE.MathUtils.damp(ring1Ref.current.position.z, sceneState.ring1Z, 4, delta);
    }

    // Ring 2: Driven by GSAP ScrollTrigger timeline
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x += delta * 0.42 * speedMultiplier;
      ring2Ref.current.rotation.y += delta * 0.22 * speedMultiplier;
      ring2Ref.current.position.z = THREE.MathUtils.damp(ring2Ref.current.position.z, sceneState.ring2Z, 4, delta);
    }

    // Ring 3: Iris Scale driven by GSAP timeline
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y -= delta * 0.38 * speedMultiplier;
      const currentScale = ring3Ref.current.scale.x;
      const targetScale = sceneState.ring3Scale;
      const newScale = THREE.MathUtils.damp(currentScale, targetScale, 4, delta);
      ring3Ref.current.scale.set(newScale, newScale, newScale);
    }

    // Ring 4: Luminous Laser Ring
    if (ring4Ref.current) {
      ring4Ref.current.rotation.z -= delta * 0.55 * speedMultiplier;
      ring4Ref.current.rotation.x += delta * 0.28 * speedMultiplier;
    }

    // Central Core Floating Oscillation & Breathing
    if (coreRef.current && coreInnerRef.current) {
      coreRef.current.rotation.y += delta * 0.7;
      coreRef.current.rotation.x += delta * 0.5;

      const scale = 1 + Math.sin(Date.now() * 0.0035) * 0.06;
      coreRef.current.scale.set(scale, scale, scale);
      coreInnerRef.current.rotation.y -= delta * 0.9;
    }

    // Datum pedestal ring slow rotation
    if (datumRingRef.current) {
      datumRingRef.current.rotation.z += delta * 0.08;
    }

    // Energy pulse decay
    if (energyPulse > 1) {
      setEnergyPulse(THREE.MathUtils.damp(energyPulse, 1, 3.2, delta));
    }

    // Shockwave expansion on click
    if (shockwaveScale > 0) {
      const next = shockwaveScale + delta * 9.5;
      if (next > 8.5) {
        setShockwaveScale(0);
      } else {
        setShockwaveScale(next);
      }
      if (shockwaveRef.current) {
        shockwaveRef.current.scale.set(next, next, next);
        const mat = shockwaveRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = Math.max(0, 1 - next / 8.5);
      }
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Ground Pedestal Datum Ring */}
      <mesh
        ref={datumRingRef}
        position={[0, -2.5, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[2.2, 2.24, 64]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Secondary Concentric Datum Ring */}
      <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.2, 3.22, 64]} />
        <meshBasicMaterial
          color="#8a2be2"
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* High-Resolution Contact Shadow Anchoring the Object */}
      <ContactShadows
        position={[0, -2.55, 0]}
        opacity={0.75}
        scale={14}
        blur={2.4}
        far={6}
        resolution={512}
        color="#00f0ff"
      />

      {/* Main Interactive Floating Mechanical Sculpture */}
      <group ref={groupRef}>
        {/* Click Shockwave Ring */}
        {shockwaveScale > 0 && (
          <mesh ref={shockwaveRef} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.9, 1.05, 64]} />
            <meshBasicMaterial
              color="#00f0ff"
              transparent
              opacity={0.9}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}

        {/* Raycasting Hover & Click Hitbox */}
        <mesh
          visible={false}
          onClick={handleClick}
          onPointerOver={() => {
            setHovered(true);
            sound.playHover();
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = 'default';
          }}
        >
          <sphereGeometry args={[2.9, 16, 16]} />
        </mesh>

        {/* 1. Outer Heavy Titanium Gimbal Ring */}
        <group ref={ring1Ref}>
          <mesh onClick={handleClick}>
            <torusGeometry args={[2.35, 0.09, 32, 120]} />
            <meshPhysicalMaterial
              color="#e2e8f0"
              metalness={0.96}
              roughness={0.12}
              clearcoat={1.0}
              clearcoatRoughness={0.06}
              reflectivity={1.0}
              envMapIntensity={3.2}
            />
          </mesh>
          {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, i) => (
            <mesh
              key={i}
              position={[Math.cos(angle) * 2.35, Math.sin(angle) * 2.35, 0]}
            >
              <cylinderGeometry args={[0.07, 0.07, 0.22, 12]} />
              <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.8} />
            </mesh>
          ))}
        </group>

        {/* 2. Chrome Mirror Gyro Ring */}
        <group ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
          <mesh onClick={handleClick}>
            <torusGeometry args={[1.92, 0.075, 24, 100]} />
            <meshPhysicalMaterial
              color="#f8fafc"
              metalness={0.99}
              roughness={0.05}
              clearcoat={1.0}
              clearcoatRoughness={0.04}
              iridescence={0.7}
              iridescenceIOR={1.3}
              iridescenceThicknessRange={[100, 380]}
              envMapIntensity={3.5}
            />
          </mesh>
        </group>

        {/* 3. High-Precision Segmented Iris Ring */}
        <group ref={ring3Ref} rotation={[0, Math.PI / 4, Math.PI / 4]}>
          <mesh onClick={handleClick}>
            <torusGeometry args={[1.52, 0.06, 20, 80]} />
            <meshPhysicalMaterial
              color="#94a3b8"
              metalness={0.92}
              roughness={0.16}
              clearcoat={0.8}
              envMapIntensity={2.6}
            />
          </mesh>
        </group>

        {/* 4. Inner Luminous Cyan Energy Ring */}
        <group ref={ring4Ref} rotation={[Math.PI / 2, Math.PI / 6, 0]}>
          <mesh>
            <torusGeometry args={[2.58, 0.025, 16, 120]} />
            <meshBasicMaterial
              color="#00f0ff"
              transparent
              opacity={hovered ? 0.95 : 0.65}
            />
          </mesh>
        </group>

        {/* 5. Central Quantum Core: Multi-Faceted Stellation Frame */}
        <mesh ref={coreRef} onClick={handleClick}>
          <icosahedronGeometry args={[1.12, 1]} />
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={0.98}
            roughness={0.06}
            clearcoat={1.0}
            clearcoatRoughness={0.02}
            iridescence={0.85}
            iridescenceIOR={1.4}
            iridescenceThicknessRange={[120, 420]}
            envMapIntensity={3.8}
          />
        </mesh>

        {/* 6. Inner Glowing Energy Core */}
        <mesh ref={coreInnerRef}>
          <octahedronGeometry args={[0.72, 0]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={sceneState.coreEmissiveIntensity * energyPulse}
            toneMapped={false}
          />
        </mesh>

        {/* Quantum Energy Sparks */}
        <Sparkles
          count={75}
          scale={5.5}
          size={4.2}
          speed={hovered ? 1.2 : 0.4}
          color="#00f0ff"
          opacity={0.85}
        />

        {/* Counter-Spinning Magnetic Nodes */}
        <group rotation={[0.45, 0.6, 0]}>
          <mesh position={[2.75, 0, 0]}>
            <octahedronGeometry args={[0.18, 0]} />
            <meshStandardMaterial color="#8a2be2" emissive="#8a2be2" emissiveIntensity={3} />
          </mesh>
          <mesh position={[-2.75, 0, 0]}>
            <octahedronGeometry args={[0.18, 0]} />
            <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={3} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
