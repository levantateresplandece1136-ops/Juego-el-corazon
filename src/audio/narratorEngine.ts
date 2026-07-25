class NarratorEngine {
  private enabled = true;
  private synth: SpeechSynthesis | null = null;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private speechRate = 0.88;
  private speechPitch = 0.78;
  private onBoundaryCallback: ((word: string, charIndex: number) => void) | null = null;
  private onEndCallback: (() => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Prefer Spanish male/deep narrators if available, then any Spanish voice
    const spanishMale = voices.find(
      v => /es/i.test(v.lang) && /male|masculino|carlos|diego|jorge|enrique|miguel|pablo|javi/i.test(v.name)
    );
    const spanishAny = voices.find(v => /es/i.test(v.lang));
    this.selectedVoice = spanishMale || spanishAny || voices[0] || null;
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
    if (!val) {
      this.stop();
    }
    return this.enabled;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setRate(rate: number) {
    this.speechRate = Math.max(0.5, Math.min(1.5, rate));
  }

  public getRate(): number {
    return this.speechRate;
  }

  public setPitch(pitch: number) {
    this.speechPitch = Math.max(0.5, Math.min(1.5, pitch));
  }

  public speak(
    text: string,
    onEnd?: () => void,
    onWord?: (word: string, charIndex: number) => void
  ) {
    if (!this.enabled || !this.synth) {
      if (onEnd) onEnd();
      return;
    }

    this.stop();

    // Clean markdown/symbols for clean narration
    const cleanText = text
      .replace(/[""«»]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) {
      if (onEnd) onEnd();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    utterance.lang = 'es-ES';
    utterance.rate = this.speechRate;
    utterance.pitch = this.speechPitch;

    this.onEndCallback = onEnd || null;
    this.onBoundaryCallback = onWord || null;

    utterance.onboundary = (event) => {
      if (event.name === 'word' && this.onBoundaryCallback) {
        const word = cleanText.substring(event.charIndex, event.charIndex + event.charLength);
        this.onBoundaryCallback(word, event.charIndex);
      }
    };

    utterance.onend = () => {
      if (this.onEndCallback) {
        this.onEndCallback();
      }
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      if (this.onEndCallback) {
        this.onEndCallback();
      }
    };

    try {
      this.synth.speak(utterance);
    } catch (err) {
      console.warn('SpeechSynthesis speak failed:', err);
      if (onEnd) onEnd();
    }
  }

  public stop() {
    if (this.synth && this.synth.speaking) {
      this.synth.cancel();
    }
  }
}

export const narratorEngine = new NarratorEngine();
