import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { GSAPSceneState } from '../../hooks/useGSAPScrollTrigger';

interface MonolithFieldProps {
  sceneState: GSAPSceneState;
}

export function MonolithField({ sceneState }: MonolithFieldProps) {
  const groupRef = useRef<THREE.Group>(null);

  const monoliths = [
    { pos: [-6, 3, -16], scale: [1.2, 7.5, 1.2], rot: [0.1, 0.4, 0.05] },
    { pos: [7, 4, -18], scale: [1.4, 9.0, 1.4], rot: [-0.15, -0.3, 0.1] },
    { pos: [-9, -4, -22], scale: [1.6, 11.0, 1.6], rot: [0.2, 0.5, -0.1] },
    { pos: [10, -3, -25], scale: [1.8, 12.0, 1.8], rot: [-0.1, -0.6, 0.2] },
    { pos: [-4, 7, -30], scale: [2.0, 14.0, 2.0], rot: [0.05, 0.2, 0.0] },
    { pos: [5, 6, -32], scale: [2.2, 15.0, 2.2], rot: [-0.08, -0.25, -0.05] },
    { pos: [0, -8, -38], scale: [3.0, 20.0, 3.0], rot: [0.0, 0.0, 0.0] },
  ];

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime() * 0.4;

    // Gentle levitation and sway
    groupRef.current.children.forEach((child, i) => {
      child.position.y += Math.sin(t + i) * 0.003;
      child.rotation.y += 0.001 * (i % 2 === 0 ? 1 : -1);
    });

    // Elevation directly driven by GSAP timeline state
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      sceneState.monolithY,
      3.5,
      delta
    );
  });

  return (
    <group ref={groupRef}>
      {monoliths.map((m, idx) => (
        <group key={idx} position={m.pos as [number, number, number]} rotation={m.rot as [number, number, number]}>
          {/* Main Obsidian Monolith Body */}
          <mesh>
            <boxGeometry args={m.scale as [number, number, number]} />
            <meshStandardMaterial
              color="#07090f"
              metalness={0.92}
              roughness={0.15}
            />
          </mesh>

          {/* Glowing Cybernetic Edge / Core Seam */}
          <mesh position={[0, 0, (m.scale[2] / 2) + 0.01]}>
            <planeGeometry args={[m.scale[0] * 0.08, m.scale[1] * 0.9]} />
            <meshBasicMaterial
              color={idx % 2 === 0 ? "#00f0ff" : "#8a2be2"}
              transparent
              opacity={sceneState.monolithVeinOpacity}
            />
          </mesh>

          {/* Floating Orbiting Halo Ring around Monolith */}
          <mesh rotation={[Math.PI / 2 + 0.2, 0, 0]}>
            <torusGeometry args={[m.scale[0] * 1.6, 0.02, 12, 48]} />
            <meshBasicMaterial
              color="#00f0ff"
              transparent
              opacity={0.4}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
