import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Lighting() {
  const blueLightRef = useRef<THREE.PointLight>(null);
  const violetLightRef = useRef<THREE.PointLight>(null);
  const keyLightRef = useRef<THREE.DirectionalLight>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.7;

    // Orbiting Electric Blue light
    if (blueLightRef.current) {
      blueLightRef.current.position.x = Math.sin(t) * 9;
      blueLightRef.current.position.z = Math.cos(t) * 9;
      blueLightRef.current.position.y = Math.sin(t * 0.8) * 4 + 2;
    }

    // Orbiting Neon Violet light
    if (violetLightRef.current) {
      violetLightRef.current.position.x = Math.sin(t + Math.PI) * 10;
      violetLightRef.current.position.z = Math.cos(t + Math.PI) * 10;
      violetLightRef.current.position.y = Math.cos(t * 0.6) * 4 - 1;
    }
  });

  return (
    <>
      {/* Deep Space Ambient */}
      <ambientLight intensity={0.4} color="#0b0e17" />

      {/* Cinematic Sharp Key Light for Chrome Reflections */}
      <directionalLight
        ref={keyLightRef}
        position={[12, 18, 10]}
        intensity={2.4}
        color="#ffffff"
      />

      {/* Soft Rim Light */}
      <directionalLight
        position={[-10, -8, -12]}
        intensity={1.2}
        color="#38bdf8"
      />

      {/* Dynamic Orbiting Electric Blue Light */}
      <pointLight
        ref={blueLightRef}
        color="#00f0ff"
        intensity={18}
        distance={30}
        decay={2}
      />

      {/* Dynamic Orbiting Neon Violet Light */}
      <pointLight
        ref={violetLightRef}
        color="#8a2be2"
        intensity={16}
        distance={28}
        decay={2}
      />

      {/* Central Underglow */}
      <pointLight
        position={[0, -3.5, 0]}
        color="#0066ff"
        intensity={8}
        distance={15}
        decay={2}
      />
    </>
  );
}
