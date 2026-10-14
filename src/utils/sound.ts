// Web Audio API Synthesizer for futuristic sci-fi sound design
// Generates ambient drones, clicks, resonance pulses without external assets

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private droneOsc: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;
    
    if (this.isMuted) {
      this.stopDrone();
    } else {
      this.startDrone();
      this.playChime(520, 0.4);
    }
    return !this.isMuted;
  }

  public getMutedState(): boolean {
    return this.isMuted;
  }

  public startDrone() {
    if (this.isMuted || !this.ctx) return;
    try {
      if (this.droneOsc) return;

      this.droneOsc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      this.droneGain = this.ctx.createGain();

      this.droneOsc.type = 'sawtooth';
      this.droneOsc.frequency.setValueAtTime(48, this.ctx.currentTime); // Deep cosmic drone 48Hz

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, this.ctx.currentTime);

      this.droneGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.droneGain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 3);

      this.droneOsc.connect(filter);
      filter.connect(this.droneGain);
      this.droneGain.connect(this.ctx.destination);

      this.droneOsc.start();
    } catch {
      // AudioContext policy gracefully handled
    }
  }

  public stopDrone() {
    if (this.droneGain && this.ctx) {
      try {
        this.droneGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
        setTimeout(() => {
          if (this.droneOsc) {
            this.droneOsc.stop();
            this.droneOsc.disconnect();
            this.droneOsc = null;
          }
        }, 500);
      } catch {
        this.droneOsc = null;
      }
    }
  }

  public playHover() {
    if (this.isMuted || !this.ctx) return;
    try {
      this.initContext();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {
      // fallback
    }
  }

  public playResonancePulse() {
    if (this.isMuted || !this.ctx) return;
    try {
      this.initContext();
      const osc = this.ctx.createOscillator();
      const subOsc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.8);

      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(60, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.9);

      osc.connect(filter);
      subOsc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      subOsc.start();
      osc.stop(this.ctx.currentTime + 0.9);
      subOsc.stop(this.ctx.currentTime + 0.9);
    } catch {
      // fallback
    }
  }

  public playChime(freq = 660, duration = 0.5) {
    if (this.isMuted || !this.ctx) return;
    try {
      this.initContext();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // fallback
    }
  }
}

export const sound = new SoundEngine();
