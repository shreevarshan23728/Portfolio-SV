import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { ArtifactData } from '../../types';
import type { GSAPSceneState } from '../../hooks/useGSAPScrollTrigger';

interface CameraRigProps {
  sceneState: GSAPSceneState;
  pointer: { x: number; y: number };
  selectedArtifact: ArtifactData | null;
  isFreeFly: boolean;
}

export function CameraRig({ sceneState, pointer, selectedArtifact, isFreeFly }: CameraRigProps) {
  const lookAtPos = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(({ camera, clock }, delta) => {
    if (isFreeFly) return; // OrbitControls handles camera in free-fly mode

    const t = clock.getElapsedTime();

    // Subtle cinematic camera breathing (handheld crane simulation)
    const breathX = Math.sin(t * 0.4) * 0.035;
    const breathY = Math.cos(t * 0.35) * 0.035;

    // Weighted pointer parallax
    const parallaxX = pointer.x * 0.55;
    const parallaxY = pointer.y * 0.35;

    if (selectedArtifact && sceneState.progress >= 0.58 && sceneState.progress <= 0.90) {
      // Direct focus on the specifically selected artifact
      const targetX = selectedArtifact.position[0];
      const targetY = selectedArtifact.position[1] + 0.25;
      const targetZ = selectedArtifact.position[2] + 3.8;

      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX + parallaxX, 3.2, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY + parallaxY, 3.2, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 3.2, delta);

      lookAtPos.current.set(...selectedArtifact.position);
    } else {
      // Synchronized directly by GSAP ScrollTrigger timeline
      const targetX = sceneState.cameraX + parallaxX + breathX;
      const targetY = sceneState.cameraY + parallaxY + breathY;
      const targetZ = sceneState.cameraZ;

      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 3.8, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 3.8, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 3.8, delta);

      lookAtPos.current.x = THREE.MathUtils.damp(lookAtPos.current.x, sceneState.targetX, 3.8, delta);
      lookAtPos.current.y = THREE.MathUtils.damp(lookAtPos.current.y, sceneState.targetY, 3.8, delta);
      lookAtPos.current.z = THREE.MathUtils.damp(lookAtPos.current.z, sceneState.targetZ, 3.8, delta);
    }

    // Smooth focal length / FOV transition
    const perspCamera = camera as THREE.PerspectiveCamera;
    const targetFov = selectedArtifact ? 36 : sceneState.cameraFov;
    if (Math.abs(perspCamera.fov - targetFov) > 0.1) {
      perspCamera.fov = THREE.MathUtils.damp(perspCamera.fov, targetFov, 3.0, delta);
      perspCamera.updateProjectionMatrix();
    }

    // LookAt smoothing
    camera.lookAt(lookAtPos.current);

    // Subtle cinematic camera roll (Dutch angle)
    camera.rotation.z += THREE.MathUtils.damp(0, sceneState.cameraRoll, 2.5, delta);
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
