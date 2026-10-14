import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { sound } from '../../utils/sound';

interface ChronoCoreProps {
  scrollProgress: number;
  pointer: { x: number; y: number };
  onInteract?: () => void;
}

export function ChronoCore({ scrollProgress, pointer, onInteract }: ChronoCoreProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const ring4Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const innerEnergyRef = useRef<THREE.Mesh>(null);
  const shockwaveRef = useRef<THREE.Mesh>(null);

  const [hovered, setHovered] = useState(false);
  const [shockwaveScale, setShockwaveScale] = useState(0);
  const [pulseIntensity, setPulseIntensity] = useState(1);

  // Click interaction: Trigger dramatic resonance reaction
  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    sound.playResonancePulse();
    setShockwaveScale(0.1);
    setPulseIntensity(4.0);
    if (onInteract) onInteract();
  };

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Smooth idle rotation + pointer responsiveness
    const targetRotX = pointer.y * 0.4 + (Math.sin(Date.now() * 0.0006) * 0.1);
    const targetRotY = pointer.x * 0.5 + (Date.now() * 0.0003);

    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 3.5, delta);
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 3.5, delta);

    // Section 2 Transformation: Rings expand outward as scroll increases (0.0 to 0.4)
    const transformFactor = Math.min(Math.max((scrollProgress - 0.05) / 0.35, 0), 1);

    // Differential counter-rotations
    const hoverSpeed = hovered ? 2.2 : 1.0;
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.35 * hoverSpeed;
      ring1Ref.current.position.z = THREE.MathUtils.lerp(0, 1.4, transformFactor);
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x += delta * 0.45 * hoverSpeed;
      ring2Ref.current.rotation.y += delta * 0.25 * hoverSpeed;
      ring2Ref.current.position.z = THREE.MathUtils.lerp(0, -1.4, transformFactor);
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y -= delta * 0.4 * hoverSpeed;
      ring3Ref.current.scale.setScalar(THREE.MathUtils.lerp(1, 1.35, transformFactor));
    }
    if (ring4Ref.current) {
      ring4Ref.current.rotation.z -= delta * 0.5 * hoverSpeed;
      ring4Ref.current.rotation.x += delta * 0.3 * hoverSpeed;
    }

    // Inner glowing core pulse
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.6;
      coreRef.current.rotation.x += delta * 0.4;
      const scale = 1 + Math.sin(Date.now() * 0.003) * 0.06;
      coreRef.current.scale.set(scale, scale, scale);
    }

    // Pulse decay back to normal
    if (pulseIntensity > 1) {
      setPulseIntensity(THREE.MathUtils.damp(pulseIntensity, 1, 3, delta));
    }

    // Animate shockwave on click
    if (shockwaveScale > 0) {
      const nextScale = shockwaveScale + delta * 8.5;
      if (nextScale > 7.5) {
        setShockwaveScale(0);
      } else {
        setShockwaveScale(nextScale);
      }
      if (shockwaveRef.current) {
        shockwaveRef.current.scale.set(nextScale, nextScale, nextScale);
        const mat = shockwaveRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = Math.max(0, 1 - nextScale / 7.5);
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Shockwave Ring on Click */}
      {shockwaveScale > 0 && (
        <mesh ref={shockwaveRef} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.9, 1.05, 64]} />
          <meshBasicMaterial
            color="#00f0ff"
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Interactive Raycast Hitbox */}
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
        <sphereGeometry args={[2.8, 16, 16]} />
      </mesh>

      {/* Central Quantum Core: Multi-faceted Chrome Icosahedron */}
      <mesh ref={coreRef} onClick={handleClick}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial
          color="#f8fafc"
          metalness={0.96}
          roughness={0.08}
          envMapIntensity={2.5}
        />
      </mesh>

      {/* Inner Radiant Energy Orb inside Core */}
      <mesh ref={innerEnergyRef}>
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={3.5 * pulseIntensity}
          toneMapped={false}
        />
      </mesh>

      {/* Ring 1: Primary Outer Chrome Gyro Ring */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.3, 0.08, 24, 100]} />
        <meshStandardMaterial
          color="#e2e8f0"
          metalness={0.95}
          roughness={0.12}
        />
      </mesh>

      {/* Ring 2: Concentric Angular Mechanical Ring */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.9, 0.065, 16, 80]} />
        <meshStandardMaterial
          color="#94a3b8"
          metalness={0.98}
          roughness={0.18}
        />
      </mesh>

      {/* Ring 3: Slotted Tech Collar */}
      <mesh ref={ring3Ref} rotation={[0, Math.PI / 4, Math.PI / 4]}>
        <torusGeometry args={[1.5, 0.05, 16, 60]} />
        <meshStandardMaterial
          color="#cbd5e1"
          metalness={0.92}
          roughness={0.14}
        />
      </mesh>

      {/* Ring 4: Inner Luminous Cyan Orbital Guide */}
      <mesh ref={ring4Ref} rotation={[Math.PI / 2, Math.PI / 6, 0]}>
        <torusGeometry args={[2.55, 0.02, 12, 120]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={hovered ? 0.95 : 0.65}
        />
      </mesh>

      {/* Floating Orbital Satellites / Nodes */}
      <group rotation={[0.4, 0.6, 0]}>
        <mesh position={[2.7, 0, 0]}>
          <octahedronGeometry args={[0.16, 0]} />
          <meshStandardMaterial color="#8a2be2" emissive="#8a2be2" emissiveIntensity={2} />
        </mesh>
        <mesh position={[-2.7, 0, 0]}>
          <octahedronGeometry args={[0.16, 0]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2} />
        </mesh>
      </group>
    </group>
  );
}
