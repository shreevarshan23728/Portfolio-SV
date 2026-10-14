import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { ArtifactData } from '../../types';

interface CameraRigProps {
  scrollProgress: number;
  pointer: { x: number; y: number };
  selectedArtifact: ArtifactData | null;
  isFreeFly: boolean;
}

export function CameraRig({ scrollProgress, pointer, selectedArtifact, isFreeFly }: CameraRigProps) {
  const targetPos = useRef(new THREE.Vector3(0, 0.4, 7.2));
  const lookAtPos = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(({ camera }, delta) => {
    if (isFreeFly) return; // OrbitControls takes over in free-fly mode

    // Choreographed stages based on scroll progress (0.0 -> 1.0)
    const p = Math.min(Math.max(scrollProgress, 0), 1);

    if (selectedArtifact && p >= 0.6 && p <= 0.85) {
      // Focus on specifically selected artifact
      targetPos.current.set(
        selectedArtifact.position[0],
        selectedArtifact.position[1] + 0.3,
        selectedArtifact.position[2] + 4.2
      );
      lookAtPos.current.set(...selectedArtifact.position);
    } else if (p < 0.22) {
      // Stage 1: Intro hero view
      const subP = p / 0.22;
      targetPos.current.set(
        THREE.MathUtils.lerp(0, 1.2, subP),
        THREE.MathUtils.lerp(0.4, 0.8, subP),
        THREE.MathUtils.lerp(7.2, 6.0, subP)
      );
      lookAtPos.current.set(0, 0, 0);
    } else if (p < 0.45) {
      // Stage 2: Transformation orbiting sweep
      const subP = (p - 0.22) / 0.23;
      targetPos.current.set(
        THREE.MathUtils.lerp(1.2, 4.4, subP),
        THREE.MathUtils.lerp(0.8, 1.8, subP),
        THREE.MathUtils.lerp(6.0, 4.8, subP)
      );
      lookAtPos.current.set(0, 0.2, 0);
    } else if (p < 0.68) {
      // Stage 3: Immersion dive into Monolith Field
      const subP = (p - 0.45) / 0.23;
      targetPos.current.set(
        THREE.MathUtils.lerp(4.4, 0, subP),
        THREE.MathUtils.lerp(1.8, 1.2, subP),
        THREE.MathUtils.lerp(4.8, -10.5, subP)
      );
      lookAtPos.current.set(0, 0, -22);
    } else if (p < 0.88) {
      // Stage 4: Showcase the Triad of Relics
      const subP = (p - 0.68) / 0.2;
      targetPos.current.set(
        THREE.MathUtils.lerp(0, 0, subP),
        THREE.MathUtils.lerp(1.2, 0.6, subP),
        THREE.MathUtils.lerp(-10.5, -18.5, subP)
      );
      lookAtPos.current.set(0, 0.2, -25);
    } else {
      // Stage 5: Grand Cinematic Conclusion Vista
      const subP = (p - 0.88) / 0.12;
      targetPos.current.set(
        THREE.MathUtils.lerp(0, 0, subP),
        THREE.MathUtils.lerp(0.6, 5.2, subP),
        THREE.MathUtils.lerp(-18.5, -12.0, subP)
      );
      lookAtPos.current.set(0, -1.0, -25);
    }

    // Add pointer parallax damping
    const parallaxX = pointer.x * 0.75;
    const parallaxY = pointer.y * 0.55;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetPos.current.x + parallaxX, 3.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetPos.current.y + parallaxY, 3.5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetPos.current.z, 3.5, delta);

    // Smooth lookAt target tracking
    camera.lookAt(lookAtPos.current);
  });

  return isFreeFly ? (
    <OrbitControls
      enableDamping
      dampingFactor={0.06}
      maxDistance={40}
      minDistance={2}
    />
  ) : null;
}
