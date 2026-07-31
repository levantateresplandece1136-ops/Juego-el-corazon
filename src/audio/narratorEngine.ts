class NarratorEngine {
  private enabled = true;
  private synth: SpeechSynthesis | null = null;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private speechRate = 1.05; // Fast, energetic TV host pacing
  private speechPitch = 1.15; // Cheerful, enthusiastic pitch
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
    // Prioritize Mexican Spanish female voices, then any Mexican Spanish voice, then any Spanish female voice
    const mexicanFemale = voices.find(
      v => /es[-_]MX/i.test(v.lang) && /female|femenino|paulina|sabina|hilda|mia|dalia|sofia|monica|lucia|laura|silvia|esperanza/i.test(v.name)
    );
    const mexicanAny = voices.find(v => /es[-_]MX/i.test(v.lang));
    const spanishFemale = voices.find(
      v => /es/i.test(v.lang) && /female|femenino|paulina|sabina|hilda|mia|dalia|sofia|monica|lucia|laura|silvia|esperanza/i.test(v.name)
    );
    const spanishAny = voices.find(v => /es/i.test(v.lang));

    this.selectedVoice = mexicanFemale || mexicanAny || spanishFemale || spanishAny || voices[0] || null;
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

  public speak(text: string, onEnd?: () => void) {
    if (!this.enabled || !this.synth) {
      if (onEnd) onEnd();
      return;
    }

    this.stop();

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
    utterance.lang = this.selectedVoice?.lang || 'es-MX';
    utterance.rate = this.speechRate;
    utterance.pitch = this.speechPitch;

    this.onEndCallback = onEnd || null;

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
