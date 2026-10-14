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
  const targetFov = useRef(44);
  const targetRoll = useRef(0);

  useFrame(({ camera, clock }, delta) => {
    if (isFreeFly) return; // OrbitControls handles camera in free-fly mode

    const t = clock.getElapsedTime();
    const p = Math.min(Math.max(scrollProgress, 0), 1);

    // Subtle cinematic camera breathing (handheld crane simulation)
    const breathX = Math.sin(t * 0.4) * 0.04;
    const breathY = Math.cos(t * 0.35) * 0.04;

    if (selectedArtifact && p >= 0.58 && p <= 0.88) {
      // Direct focus on the specifically selected artifact
      targetPos.current.set(
        selectedArtifact.position[0],
        selectedArtifact.position[1] + 0.25,
        selectedArtifact.position[2] + 3.8
      );
      lookAtPos.current.set(...selectedArtifact.position);
      targetFov.current = 36;
      targetRoll.current = 0;
    } else if (p < 0.22) {
      // Chapter 1: Dramatic Hero Shot (Looking slightly upward at the monumental sculpture)
      const subP = p / 0.22;
      targetPos.current.set(
        THREE.MathUtils.lerp(0, 0.8, subP),
        THREE.MathUtils.lerp(0.3, 0.6, subP),
        THREE.MathUtils.lerp(7.2, 5.8, subP)
      );
      lookAtPos.current.set(0, 0, 0);
      targetFov.current = 44;
      targetRoll.current = subP * -0.02;
    } else if (p < 0.45) {
      // Chapter 2: Reconfiguration Orbit Crane (Dutch angle, telephoto compression)
      const subP = (p - 0.22) / 0.23;
      targetPos.current.set(
        THREE.MathUtils.lerp(0.8, 4.6, subP),
        THREE.MathUtils.lerp(0.6, 1.8, subP),
        THREE.MathUtils.lerp(5.8, 4.2, subP)
      );
      lookAtPos.current.set(0, 0.2, 0);
      targetFov.current = 38; // tighter lens compression
      targetRoll.current = -0.05 + subP * 0.03; // cinematic dutch roll
    } else if (p < 0.68) {
      // Chapter 3: High-Speed Dive into the Monolith Void (Wide-angle immersion)
      const subP = (p - 0.45) / 0.23;
      targetPos.current.set(
        THREE.MathUtils.lerp(4.6, 0, subP),
        THREE.MathUtils.lerp(1.8, 0.8, subP),
        THREE.MathUtils.lerp(4.2, -11.0, subP)
      );
      lookAtPos.current.set(0, 0, -24);
      targetFov.current = 52; // wide angle creates velocity and scale
      targetRoll.current = Math.sin(subP * Math.PI) * 0.04;
    } else if (p < 0.88) {
      // Chapter 4: Inspection Arena facing The Triad
      const subP = (p - 0.68) / 0.2;
      targetPos.current.set(
        THREE.MathUtils.lerp(0, 0, subP),
        THREE.MathUtils.lerp(0.8, 0.5, subP),
        THREE.MathUtils.lerp(-11.0, -18.2, subP)
      );
      lookAtPos.current.set(0, 0.2, -25);
      targetFov.current = 40;
      targetRoll.current = 0;
    } else {
      // Chapter 5: Grand Majestic Crane Pull-Out (High-angle cinematic horizon)
      const subP = (p - 0.88) / 0.12;
      targetPos.current.set(
        THREE.MathUtils.lerp(0, 0, subP),
        THREE.MathUtils.lerp(0.5, 5.8, subP),
        THREE.MathUtils.lerp(-18.2, -10.5, subP)
      );
      lookAtPos.current.set(0, -1.2, -26);
      targetFov.current = 46;
      targetRoll.current = 0;
    }

    // Weighted pointer parallax
    const parallaxX = pointer.x * 0.65;
    const parallaxY = pointer.y * 0.45;

    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      targetPos.current.x + parallaxX + breathX,
      3.2,
      delta
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      targetPos.current.y + parallaxY + breathY,
      3.2,
      delta
    );
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      targetPos.current.z,
      3.2,
      delta
    );

    // Smooth focal length / FOV transition
    const perspCamera = camera as THREE.PerspectiveCamera;
    if (perspCamera.fov !== targetFov.current) {
      perspCamera.fov = THREE.MathUtils.damp(perspCamera.fov, targetFov.current, 2.5, delta);
      perspCamera.updateProjectionMatrix();
    }

    // LookAt smoothing
    camera.lookAt(lookAtPos.current);

    // Subtle cinematic camera roll
    camera.rotation.z += THREE.MathUtils.damp(0, targetRoll.current, 2.0, delta);
  });

  return isFreeFly ? (
    <OrbitControls
      enableDamping
      dampingFactor={0.06}
      maxDistance={45}
      minDistance={2}
    />
  ) : null;
}
