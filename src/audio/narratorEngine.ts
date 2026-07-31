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
    if (!voices || voices.length === 0) return;

    // Latin female name keywords & browser voice names
    const femaleNameRegex = /female|femenino|paulina|sabina|hilda|mia|dalia|sofia|monica|lucia|laura|silvia|esperanza|lupe|penelope|francisca|paloma|elena|victoria|alva|soledad/i;
    const maleNameRegex = /male|masculino|jorge|diego|carlos|miguel|pablo|enrique|raul|rodrigo|mateo|esteban|alberto/i;

    const isMexican = (v: SpeechSynthesisVoice) => /es[-_]MX/i.test(v.lang);
    const isLatin = (v: SpeechSynthesisVoice) => /es[-_](MX|419|US|AR|CO|CL|PE|GT|EC|VE|CR|CL)/i.test(v.lang);
    const isSpanish = (v: SpeechSynthesisVoice) => /^es/i.test(v.lang);

    const isFemale = (v: SpeechSynthesisVoice) => femaleNameRegex.test(v.name) || (!maleNameRegex.test(v.name));

    // Priority Tier List:
    // 1. Mexican Spanish Female Voice
    const mexicanFemale = voices.find(v => isMexican(v) && isFemale(v));
    // 2. Latin American Spanish Female Voice
    const latinFemale = voices.find(v => isLatin(v) && isFemale(v));
    // 3. Any Mexican Spanish Voice
    const mexicanAny = voices.find(v => isMexican(v));
    // 4. Any Latin American Spanish Voice
    const latinAny = voices.find(v => isLatin(v));
    // 5. Any Spanish Female Voice
    const spanishFemale = voices.find(v => isSpanish(v) && isFemale(v));
    // 6. Any Spanish Voice
    const spanishAny = voices.find(v => isSpanish(v));

    this.selectedVoice = mexicanFemale || latinFemale || mexicanAny || latinAny || spanishFemale || spanishAny || voices[0] || null;
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
