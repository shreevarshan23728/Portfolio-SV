export interface ArtifactData {
  id: string;
  name: string;
  code: string;
  classification: string;
  description: string;
  color: string;
  accentGlow: string;
  frequency: string;
  coherence: string;
  fluxDensity: string;
  origin: string;
  position: [number, number, number];
}

export type DimensionSection = 'intro' | 'transform' | 'immersion' | 'interaction' | 'conclusion';

export interface CameraState {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}
