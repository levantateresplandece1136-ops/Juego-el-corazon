class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private active = true;
  private currentTrack: string | null = null;
  private musicInterval: number | null = null;

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.85;
      this.masterGain.connect(this.ctx.destination);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = 0.40;
      this.musicGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = 0.80;
      this.sfxGain.connect(this.masterGain);
    } catch (e) {
      console.warn('Web Audio API not supported:', e);
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

  public tone(
    freq: number,
    dur: number,
    type: OscillatorType = 'sine',
    vol = 0.3,
    destGain?: GainNode,
    attack = 0.01,
    release = 0.1
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

  // --- NINTENDO PARTY SFX ---
  public playSFX(name: string) {
    if (!this.ctx || !this.active) return;
    this.resume();

    switch (name) {
      case 'click':
        this.tone(523.25, 0.06, 'triangle', 0.2);
        this.tone(659.25, 0.08, 'sine', 0.15);
        break;
      case 'hover':
        this.tone(880, 0.04, 'sine', 0.08);
        break;
      case 'dice_roll':
        [300, 450, 600, 750, 900].forEach((f, i) => {
          setTimeout(() => this.tone(f, 0.05, 'square', 0.12), i * 50);
        });
        break;
      case 'coin':
        this.tone(987.77, 0.08, 'square', 0.15);
        setTimeout(() => this.tone(1318.51, 0.25, 'square', 0.18), 70);
        break;
      case 'star':
        [523, 659, 784, 987, 1047, 1319, 1568].forEach((f, i) => {
          setTimeout(() => this.tone(f, 0.4, 'triangle', 0.18, undefined, 0.01, 0.3), i * 65);
        });
        break;
      case 'fanfare':
        [523, 523, 523, 659, 784, 1047].forEach((f, i) => {
          const delay = i === 5 ? 320 : i * 90;
          setTimeout(() => this.tone(f, i === 5 ? 0.8 : 0.12, 'square', 0.2), delay);
        });
        break;
      case 'applause':
        for (let i = 0; i < 12; i++) {
          setTimeout(() => {
            const f = 400 + Math.random() * 600;
            this.tone(f, 0.06, 'triangle', 0.1);
          }, i * 40);
        }
        break;
      case 'buzzer':
        this.tone(150, 0.25, 'sawtooth', 0.3);
        setTimeout(() => this.tone(120, 0.3, 'sawtooth', 0.3), 120);
        break;
      case 'countdown_tick':
        this.tone(880, 0.05, 'square', 0.12);
        break;
      case 'wheel_spin':
        this.tone(600, 0.04, 'triangle', 0.15);
        break;
      case 'party_horn':
        this.tone(350, 0.2, 'sawtooth', 0.25);
        this.tone(523, 0.3, 'square', 0.2);
        break;
      case 'victory_fanfare':
        [523, 659, 784, 1047, 1319, 1568, 2093].forEach((f, i) => {
          setTimeout(() => this.tone(f, 0.6, 'square', 0.22), i * 80);
        });
        break;
      case 'error':
        this.tone(200, 0.15, 'sawtooth', 0.2);
        setTimeout(() => this.tone(160, 0.2, 'sawtooth', 0.2), 90);
        break;
      default:
        this.tone(440, 0.1, 'sine', 0.1);
    }
  }

  // --- UPBEAT MARIO PARTY BGM ---
  public startPartyBGM() {
    if (!this.ctx) this.init();
    if (this.currentTrack === 'party') return;
    this.currentTrack = 'party';
    this.stopMusic();

    const melodyNotes = [
      523.25, 659.25, 784.00, 1047.00, // C5, E5, G5, C6
      659.25, 784.00, 880.00, 1047.00, // E5, G5, A5, C6
      587.33, 698.46, 880.00, 1174.66, // D5, F5, A5, D6
      523.25, 659.25, 784.00, 1047.00  // C5, E5, G5, C6
    ];

    let noteIdx = 0;

    const playStep = () => {
      if (!this.active || !this.ctx || !this.musicGain) return;
      
      const freq = melodyNotes[noteIdx % melodyNotes.length];
      noteIdx++;

      try {
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = 'triangle';
        o.frequency.value = freq;

        o.connect(g);
        g.connect(this.musicGain);

        const t = this.now();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.12, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

        o.start(t);
        o.stop(t + 0.25);
      } catch {
        // Safe node cleanup
      }
    };

    playStep();
    this.musicInterval = window.setInterval(playStep, 280);
  }

  public stopMusic() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    this.currentTrack = null;
  }
}

export const soundEngine = new SoundEngine();
