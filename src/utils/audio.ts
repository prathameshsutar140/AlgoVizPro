// Web Audio API synthesizer for sorting visualization sound effects
class SoundController {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (enabled && !this.ctx) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          this.ctx = new AudioContextClass();
        }
      } catch (e) {
        console.warn('AudioContext not supported', e);
      }
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public playTone(value: number, minVal = 5, maxVal = 100, type: 'compare' | 'swap' | 'complete' = 'compare') {
    if (!this.enabled) return;
    try {
      if (!this.ctx) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioContextClass();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const normalized = Math.max(0, Math.min(1, (value - minVal) / (maxVal - minVal || 1)));
      const freq = 180 + normalized * 700;

      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      if (type === 'swap') {
        osc.type = 'triangle';
        gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.08);
      } else if (type === 'complete') {
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.15);
      } else {
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.04);
      }
    } catch {
      // Audio autoplay restrictions or headless environment
    }
  }
}

export const soundController = new SoundController();
