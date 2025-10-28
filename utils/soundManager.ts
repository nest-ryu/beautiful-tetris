
// Simple and reliable sound manager for Tetris
export class SoundManager {
  private audioContext: AudioContext | null = null;
  private sounds: { [key: string]: Float32Array } = {};
  private isEnabled: boolean = true;

  constructor() {
    this.initializeAudio();
  }

  private async initializeAudio() {
    try {
      // Only create AudioContext after user interaction
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Audio not supported');
    }
  }

  private createTone(frequency: number, duration: number, type: OscillatorType = 'sine'): void {
    if (!this.isEnabled || !this.audioContext) return;

    try {
      // Resume audio context if suspended (Chrome autoplay policy)
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      // Volume envelope
      const now = this.audioContext.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.15, now + 0.005);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

      oscillator.start(now);
      oscillator.stop(now + duration);
    } catch (error) {
      // Silently fail
    }
  }

  movePiece(): void {
    this.createTone(440, 0.03, 'square');
  }

  rotatePiece(): void {
    this.createTone(554, 0.04, 'sine');
  }

  dropPiece(): void {
    // Used for manual drop actions
    this.createTone(330, 0.03, 'sine');
  }

  hardDrop(): void {
    // Longer, more dramatic sound for hard drop
    this.createTone(220, 0.1, 'sawtooth');
  }

  lineClear(): void {
    // Double tone for line clear
    this.createTone(440, 0.1, 'sine');
    setTimeout(() => this.createTone(554, 0.1, 'sine'), 100);
  }

  levelUp(): void {
    // Ascending chord
    this.createTone(262, 0.15, 'sine');
    setTimeout(() => this.createTone(330, 0.15, 'sine'), 150);
    setTimeout(() => this.createTone(392, 0.15, 'sine'), 300);
  }

  gameOver(): void {
    // Descending sad sound
    this.createTone(392, 0.2, 'sine');
    setTimeout(() => this.createTone(330, 0.2, 'sine'), 200);
    setTimeout(() => this.createTone(262, 0.3, 'sine'), 400);
  }

  toggle(): void {
    this.isEnabled = !this.isEnabled;
  }

  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }
}

export const soundManager = new SoundManager();
