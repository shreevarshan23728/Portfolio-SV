import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  scrollProgress: number;
}

export function ParticleField({ scrollProgress }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 2400;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const colorA = new THREE.Color('#00f0ff');
    const colorB = new THREE.Color('#8a2be2');
    const colorC = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      // Cylindrical / spherical volume spanning deep space
      const radius = 6 + Math.random() * 32;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 45;
      const z = (Math.random() - 0.6) * 90;

      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Color variation between cyan, violet, and silver
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
    // Base gentle rotation
    pointsRef.current.rotation.y += delta * 0.03;
    pointsRef.current.rotation.x = Math.sin(scrollProgress * Math.PI) * 0.2;

    // Stream particles forward based on scroll speed
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const idx = i * 3 + 2; // z-axis
      positions[idx] += delta * (1.2 + scrollProgress * 15);
      if (positions[idx] > 20) {
        positions[idx] = -70;
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
        size={0.065}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
