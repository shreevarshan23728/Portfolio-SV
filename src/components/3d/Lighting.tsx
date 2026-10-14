import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

export function Lighting() {
  const blueLightRef = useRef<THREE.PointLight>(null);
  const violetLightRef = useRef<THREE.PointLight>(null);
  const spotlightRef = useRef<THREE.SpotLight>(null);
  const coneRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.6;

    // Orbiting primary electric blue key light
    if (blueLightRef.current) {
      blueLightRef.current.position.x = Math.sin(t) * 8.5;
      blueLightRef.current.position.z = Math.cos(t) * 8.5;
      blueLightRef.current.position.y = Math.sin(t * 0.7) * 3 + 2.5;
    }

    // Orbiting counter-balancing neon violet rim light
    if (violetLightRef.current) {
      violetLightRef.current.position.x = Math.sin(t + Math.PI) * 9.5;
      violetLightRef.current.position.z = Math.cos(t + Math.PI) * 9.5;
      violetLightRef.current.position.y = Math.cos(t * 0.5) * 3 + 1.0;
    }

    // Subtle breathing intensity on the volumetric cone
    if (coneRef.current) {
      const mat = coneRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.055 + Math.sin(t * 1.5) * 0.015;
    }
  });

  return (
    <>
      {/* Deep Space Black Base Atmosphere */}
      <ambientLight intensity={0.25} color="#05070e" />

      {/* Main Overhead Cinematic Key Spotlight */}
      <spotLight
        ref={spotlightRef}
        position={[0, 14, 4]}
        angle={0.45}
        penumbra={0.8}
        intensity={8.5}
        color="#ffffff"
        castShadow
      />

      {/* Volumetric Light Shaft Simulation */}
      <mesh ref={coneRef} position={[0, 5.5, 0]} rotation={[Math.PI, 0, 0]}>
        <cylinderGeometry args={[0.6, 5.2, 12, 32, 1, true]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Sharp Metallic Rim Light (Backlight to pop chrome silhouettes) */}
      <directionalLight
        position={[-8, 6, -10]}
        intensity={3.5}
        color="#00f0ff"
      />

      {/* Warm Fill Grazing Light from Below */}
      <directionalLight
        position={[8, -5, -6]}
        intensity={1.8}
        color="#8a2be2"
      />

      {/* Dynamic Orbiting Electric Blue Point Light */}
      <pointLight
        ref={blueLightRef}
        color="#00f0ff"
        intensity={18}
        distance={28}
        decay={2}
      />

      {/* Dynamic Orbiting Neon Violet Point Light */}
      <pointLight
        ref={violetLightRef}
        color="#8a2be2"
        intensity={15}
        distance={26}
        decay={2}
      />

      {/* Procedural High-Dynamic-Range Studio Environment Map for Chrome Reflections */}
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 4, -0.2, 0.4]}>
          {/* Overhead Main Softbox */}
          <Lightformer
            form="rect"
            intensity={4}
            position={[0, 10, -2]}
            scale={[12, 6]}
            color="#ffffff"
          />
          {/* Electric Cyan Edge Strip */}
          <Lightformer
            form="ring"
            intensity={3.5}
            position={[-8, 2, -1]}
            scale={6}
            color="#00f0ff"
          />
          {/* Neon Violet Edge Strip */}
          <Lightformer
            form="rect"
            intensity={3.0}
            position={[8, 1, 1]}
            scale={[8, 4]}
            color="#8a2be2"
          />
          {/* Subtle Golden Horizon Reflection Accent */}
          <Lightformer
            form="circle"
            intensity={1.5}
            position={[0, -5, -4]}
            scale={8}
            color="#38bdf8"
          />
        </group>
      </Environment>
    </>
  );
}
