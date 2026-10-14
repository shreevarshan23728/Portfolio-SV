import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface GSAPSceneState {
  progress: number;
  activeAct: number;

  // Camera
  cameraX: number;
  cameraY: number;
  cameraZ: number;
  targetX: number;
  targetY: number;
  targetZ: number;
  cameraFov: number;
  cameraRoll: number;

  // ChronoCore Sculpture
  ring1Z: number;
  ring2Z: number;
  ring3Scale: number;
  ringRotationSpeed: number;
  coreEmissiveIntensity: number;

  // Monolith Sanctuary
  monolithY: number;
  monolithVeinOpacity: number;

  // Particle Stream Velocity
  particleVelocity: number;

  // Lighting
  keyLightIntensity: number;
  blueLightIntensity: number;
  violetLightIntensity: number;
  volumetricOpacity: number;
}

export const INITIAL_SCENE_STATE: GSAPSceneState = {
  progress: 0,
  activeAct: 0,

  cameraX: 0,
  cameraY: 0.35,
  cameraZ: 7.2,
  targetX: 0,
  targetY: 0,
  targetZ: 0,
  cameraFov: 44,
  cameraRoll: 0,

  ring1Z: 0,
  ring2Z: 0,
  ring3Scale: 1.0,
  ringRotationSpeed: 1.0,
  coreEmissiveIntensity: 3.2,

  monolithY: -10,
  monolithVeinOpacity: 0.1,

  particleVelocity: 1.2,

  keyLightIntensity: 8.5,
  blueLightIntensity: 18,
  violetLightIntensity: 15,
  volumetricOpacity: 0.06,
};

export function useGSAPScrollTrigger(
  scrollContainerRef: React.RefObject<HTMLDivElement | null>,
  scrollTrackRef: React.RefObject<HTMLDivElement | null>
) {
  const [sceneState, setSceneState] = useState<GSAPSceneState>(INITIAL_SCENE_STATE);
  const stateRef = useRef<GSAPSceneState>({ ...INITIAL_SCENE_STATE });

  useEffect(() => {
    if (!scrollContainerRef.current || !scrollTrackRef.current) return;

    // Reset ScrollTrigger instances
    ScrollTrigger.getAll().forEach(t => t.kill());

    const track = scrollTrackRef.current;
    const currentState = stateRef.current;

    // Master GSAP Timeline synchronized directly with smooth scroll scrubbing
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2, // Buttery smooth scrubbing with physical inertia
        onUpdate: (self) => {
          currentState.progress = self.progress;

          // Determine active chapter (0 to 4)
          if (self.progress < 0.22) {
            currentState.activeAct = 0;
          } else if (self.progress < 0.46) {
            currentState.activeAct = 1;
          } else if (self.progress < 0.70) {
            currentState.activeAct = 2;
          } else if (self.progress < 0.90) {
            currentState.activeAct = 3;
          } else {
            currentState.activeAct = 4;
          }

          // Trigger state update
          setSceneState({ ...currentState });
        },
      },
    });

    // -------------------------------------------------------------------------
    // ACT I -> ACT II: THE SINGULARITY TO RECONFIGURATION (0% -> 25%)
    // -------------------------------------------------------------------------
    tl.to(currentState, {
      cameraX: 4.6,
      cameraY: 1.8,
      cameraZ: 4.4,
      targetX: 0,
      targetY: 0.2,
      targetZ: 0,
      cameraFov: 38, // Telephoto lens compression
      cameraRoll: -0.05, // Subtle cinematic dutch angle
      ring1Z: 1.8, // Ring 1 separates forward
      ring2Z: -1.8, // Ring 2 separates backward
      ring3Scale: 1.45, // Iris expands
      ringRotationSpeed: 2.2,
      coreEmissiveIntensity: 4.5,
      keyLightIntensity: 10.0,
      volumetricOpacity: 0.08,
      duration: 1.0,
      ease: 'power2.inOut',
    });

    // -------------------------------------------------------------------------
    // ACT II -> ACT III: HIGH-SPEED DIVE INTO DEEP SPACE (25% -> 55%)
    // -------------------------------------------------------------------------
    tl.to(currentState, {
      cameraX: 0,
      cameraY: 0.9,
      cameraZ: -11.0,
      targetX: 0,
      targetY: 0,
      targetZ: -24,
      cameraFov: 54, // Wide-angle high-speed dive
      cameraRoll: 0.02,
      particleVelocity: 16.0, // Starfield acceleration warp!
      monolithY: 0, // Monoliths elevate into position
      monolithVeinOpacity: 0.95,
      blueLightIntensity: 24,
      violetLightIntensity: 22,
      duration: 1.2,
      ease: 'power2.inOut',
    });

    // -------------------------------------------------------------------------
    // ACT III -> ACT IV: SETTLING BEFORE THE TRIAD OF RELICS (55% -> 80%)
    // -------------------------------------------------------------------------
    tl.to(currentState, {
      cameraX: 0,
      cameraY: 0.5,
      cameraZ: -18.4,
      targetX: 0,
      targetY: 0.2,
      targetZ: -25,
      cameraFov: 40, // Balanced portrait focal length
      cameraRoll: 0,
      particleVelocity: 2.5,
      keyLightIntensity: 7.5,
      duration: 1.0,
      ease: 'power2.out',
    });

    // -------------------------------------------------------------------------
    // ACT IV -> ACT V: CELESTIAL HORIZON CRANE PULL-OUT (80% -> 100%)
    // -------------------------------------------------------------------------
    tl.to(currentState, {
      cameraX: 0,
      cameraY: 5.8,
      cameraZ: -10.5,
      targetX: 0,
      targetY: -1.2,
      targetZ: -26,
      cameraFov: 46, // Grand majestic vista
      cameraRoll: 0,
      particleVelocity: 1.5,
      keyLightIntensity: 9.0,
      blueLightIntensity: 20,
      violetLightIntensity: 20,
      volumetricOpacity: 0.05,
      duration: 0.8,
      ease: 'power3.inOut',
    });

    // Refresh ScrollTrigger after layout calculation
    ScrollTrigger.refresh();

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [scrollContainerRef, scrollTrackRef]);

  return sceneState;
}
