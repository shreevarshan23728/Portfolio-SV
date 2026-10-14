import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { GSAPSceneState } from '../../hooks/useGSAPScrollTrigger';

interface ParticleFieldProps {
  sceneState: GSAPSceneState;
}

export function ParticleField({ sceneState }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 2600;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const colorA = new THREE.Color('#00f0ff');
    const colorB = new THREE.Color('#8a2be2');
    const colorC = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      const radius = 6 + Math.random() * 34;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 45;
      const z = (Math.random() - 0.6) * 90;

      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      const mix = Math.random();
      const chosenColor = mix < 0.45 ? colorA : mix < 0.85 ? colorB : colorC;
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.025;
    pointsRef.current.rotation.x = Math.sin(sceneState.progress * Math.PI) * 0.15;

    // Stream particles forward based on GSAP timeline velocity state
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const velocity = sceneState.particleVelocity;

    for (let i = 0; i < count; i++) {
      const idx = i * 3 + 2; // z-axis
      positions[idx] += delta * (velocity * 2.2);
      if (positions[idx] > 22) {
        positions[idx] = -72;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
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
        size={0.068}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
