import { BiomeId, MusicMood } from '../types';

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private active = true;
  private currentBiome: BiomeId | null = null;
  private activeOscillators: OscillatorNode[] = [];
  private musicInterval: number | null = null;
  private ambientNoiseInterval: number | null = null;
  private windNode: AudioBufferSourceNode | null = null;

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.85;
      this.masterGain.connect(this.ctx.destination);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = 0.45;
      this.musicGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = 0.75;
      this.sfxGain.connect(this.masterGain);
    } catch (e) {
      console.warn('Web Audio API not supported in this browser:', e);
    }
  }

  public resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleAudio(): boolean {
    this.active = !this.active;
    if (this.masterGain) {
      this.masterGain.gain.value = this.active ? 0.85 : 0;
    }
    return this.active;
  }

  public isAudioActive(): boolean {
    return this.active;
  }

  private now(): number {
    return this.ctx ? this.ctx.currentTime : 0;
  }

  private createNoiseBuffer(durSeconds: number): AudioBuffer | null {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * durSeconds;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  public tone(
    freq: number,
    dur: number,
    type: OscillatorType = 'sine',
    vol = 0.3,
    destGain?: GainNode,
    attack = 0.02,
    release = 0.3
  ) {
    if (!this.ctx || !this.active) return;
    try {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = type;
      o.frequency.value = freq;

      o.connect(g);
      g.connect(destGain || this.sfxGain || this.ctx.destination);

      const t = this.now();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vol, t + attack);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);

      o.start(t);
      o.stop(t + dur + release);
    } catch {
      // Audio node cleanup
    }
  }

  // --- SFX PRESETS ---
  public playSFX(name: string) {
    if (!this.ctx || !this.active) return;
    this.resume();

    switch (name) {
      case 'click':
        this.tone(440, 0.08, 'triangle', 0.18);
        this.tone(660, 0.06, 'sine', 0.12);
        break;
      case 'hover':
        this.tone(720, 0.04, 'sine', 0.05);
        break;
      case 'cristal':
        [523, 659, 784, 1047, 1319].forEach((f, i) => {
          setTimeout(() => this.tone(f, 0.9, 'sine', 0.22, undefined, 0.01, 0.8), i * 90);
        });
        break;
      case 'puerta':
        this.playNoiseEffect(1.6, 180, 0.4);
        this.tone(65, 1.4, 'sawtooth', 0.25);
        break;
      case 'latido':
        this.tone(55, 0.18, 'sine', 0.5);
        setTimeout(() => this.tone(50, 0.22, 'sine', 0.4), 180);
        break;
      case 'campana':
        [440, 880, 1320].forEach((f, i) => this.tone(f, 2.5, 'sine', 0.15 - i * 0.03, undefined, 0.005, 2.0));
        break;
      case 'runa':
        this.tone(880, 0.4, 'triangle', 0.15);
        this.tone(1320, 0.5, 'sine', 0.1);
        break;
      case 'moneda':
        [988, 1319, 1568].forEach((f, i) => setTimeout(() => this.tone(f, 0.3, 'square', 0.08), i * 60));
        break;
      case 'exito':
        [523, 659, 784, 1047, 1319, 1568].forEach((f, i) => {
          setTimeout(() => this.tone(f, 0.5, 'triangle', 0.16, undefined, 0.01, 0.4), i * 80);
        });
        break;
      case 'rugido':
        this.playNoiseEffect(1.2, 300, 0.35, true);
        break;
      case 'error':
        this.tone(180, 0.2, 'sawtooth', 0.2);
        setTimeout(() => this.tone(140, 0.25, 'sawtooth', 0.25), 100);
        break;
      case 'magic':
        [800, 1000, 1200, 1400, 1600].forEach((f, i) => {
          setTimeout(() => this.tone(f, 0.3, 'sine', 0.08, undefined, 0.01, 0.2), i * 50);
        });
        break;
      default:
        this.tone(440, 0.1, 'sine', 0.1);
    }
  }

  private playNoiseEffect(dur: number, cutoff: number, vol: number, sweep = false) {
    if (!this.ctx || !this.sfxGain) return;
    try {
      const buffer = this.createNoiseBuffer(dur);
      if (!buffer) return;
      const src = this.ctx.createBufferSource();
      src.buffer = buffer;

      const filt = this.ctx.createBiquadFilter();
      filt.type = 'lowpass';
      filt.frequency.value = cutoff;

      const g = this.ctx.createGain();
      g.gain.value = vol;

      src.connect(filt);
      filt.connect(g);
      g.connect(this.sfxGain);

      const t = this.now();
      if (sweep) {
        filt.frequency.setValueAtTime(cutoff * 2, t);
        filt.frequency.exponentialRampToValueAtTime(60, t + dur);
      }

      g.gain.setValueAtTime(vol, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + dur);

      src.start(t);
      src.stop(t + dur);
    } catch {
      // Noise playback guard
    }
  }

  // --- ADAPTIVE MUSIC ENGINE ---
  private SCENE_CONFIGS: Record<BiomeId, {
    chords: number[][];
    type: OscillatorType;
    tempo: number;
    filterCutoff: number;
    ambient?: 'jungle' | 'cave' | 'starlight' | 'wind';
  }> = {
    inicio: { chords: [[130.81, 164.81, 196]], type: 'triangle', tempo: 4200, filterCutoff: 600, ambient: 'wind' },
    avatar: { chords: [[130.81, 164.81, 196]], type: 'triangle', tempo: 4200, filterCutoff: 650, ambient: 'wind' },
    mapa: { chords: [[146.83, 185, 220], [130.81, 164.81, 196]], type: 'sine', tempo: 4500, filterCutoff: 700, ambient: 'wind' },
    templo: { chords: [[146.83, 220, 293.66], [164.81, 246.94, 329.63]], type: 'sine', tempo: 5000, filterCutoff: 800, ambient: 'cave' },
    selva: { chords: [[110, 164.81, 220]], type: 'sawtooth', tempo: 3500, filterCutoff: 400, ambient: 'jungle' },
    biblioteca: { chords: [[123.47, 155.56, 185]], type: 'triangle', tempo: 4800, filterCutoff: 500, ambient: 'wind' },
    minas: { chords: [[98, 146.83, 196]], type: 'sine', tempo: 5200, filterCutoff: 350, ambient: 'cave' },
    observatorio: { chords: [[174.61, 261.63, 349.23], [196, 293.66, 392]], type: 'sine', tempo: 3800, filterCutoff: 1200, ambient: 'starlight' },
    final: { chords: [[130.81, 196, 261.63], [174.61, 261.63, 349.23], [146.83, 220, 293.66]], type: 'sine', tempo: 3400, filterCutoff: 1100, ambient: 'starlight' }
  };

  public setBiome(biome: BiomeId, mood: MusicMood = 'ambient') {
    if (!this.ctx) this.init();
    if (this.currentBiome === biome) return;
    this.currentBiome = biome;
    this.stopMusic();

    const config = this.SCENE_CONFIGS[biome] || this.SCENE_CONFIGS.inicio;
    let chordIdx = 0;

    const playChord = () => {
      if (!this.active || !this.ctx || !this.musicGain) return;
      const chord = config.chords[chordIdx % config.chords.length];
      chordIdx++;

      // Shift frequencies slightly if mood is suspense or triumph
      const pitchMultiplier = mood === 'suspense' ? 0.95 : mood === 'triumph' ? 1.12 : 1.0;

      chord.forEach((baseFreq, i) => {
        try {
          const freq = baseFreq * pitchMultiplier;
          const o = this.ctx.createOscillator();
          const g = this.ctx.createGain();
          const filt = this.ctx.createBiquadFilter();

          o.type = config.type;
          o.frequency.value = freq;

          filt.type = 'lowpass';
          filt.frequency.value = config.filterCutoff * (mood === 'triumph' ? 1.4 : 1.0);

          o.connect(filt);
          filt.connect(g);
          g.connect(this.musicGain);

          const t = this.now();
          const durSeconds = config.tempo / 1000;
          g.gain.setValueAtTime(0, t);
          g.gain.linearRampToValueAtTime(0.12 - i * 0.02, t + 1.5);
          g.gain.linearRampToValueAtTime(0.08 - i * 0.015, t + durSeconds - 1.5);
          g.gain.linearRampToValueAtTime(0, t + durSeconds);

          o.start(t);
          o.stop(t + durSeconds + 0.2);
          this.activeOscillators.push(o);
        } catch {
          // Chord node cleanup
        }
      });
    };

    playChord();
    this.musicInterval = window.setInterval(playChord, config.tempo);
    this.startAmbientNoises(config.ambient);
  }

  private startAmbientNoises(type?: 'jungle' | 'cave' | 'starlight' | 'wind') {
    if (!type || !this.ctx) return;

    if (type === 'jungle') {
      this.ambientNoiseInterval = window.setInterval(() => {
        if (!this.active) return;
        if (Math.random() < 0.5) {
          const f = 800 + Math.random() * 1400;
          this.tone(f, 0.15, 'sine', 0.03, this.musicGain || undefined);
          setTimeout(() => this.tone(f * 1.25, 0.1, 'sine', 0.02, this.musicGain || undefined), 80);
        }
      }, 1600);
    } else if (type === 'cave') {
      this.ambientNoiseInterval = window.setInterval(() => {
        if (!this.active) return;
        if (Math.random() < 0.4) {
          this.tone(110 + Math.random() * 90, 1.4, 'sine', 0.04, this.musicGain || undefined, 0.3, 1.0);
        }
      }, 2800);
    } else if (type === 'starlight') {
      this.ambientNoiseInterval = window.setInterval(() => {
        if (!this.active) return;
        if (Math.random() < 0.6) {
          const f = 1200 + Math.random() * 800;
          this.tone(f, 0.6, 'sine', 0.03, this.musicGain || undefined, 0.1, 0.5);
        }
      }, 2000);
    }
  }

  public stopMusic() {
    this.activeOscillators.forEach(o => {
      try {
        o.stop();
      } catch {
        // Safe stop
      }
    });
    this.activeOscillators = [];

    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    if (this.ambientNoiseInterval) {
      clearInterval(this.ambientNoiseInterval);
      this.ambientNoiseInterval = null;
    }
    this.currentBiome = null;
  }
}

export const soundEngine = new SoundEngine();
