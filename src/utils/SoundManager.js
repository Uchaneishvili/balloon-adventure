import { sound } from '@pixi/sound';
import { Assets } from 'pixi.js';

export class SoundManager {
  constructor() {
    this.sounds = {};
    this.masterVolume = 0.3;
    this.isMuted = false;
    this.lastWindSpeed = 0;
  }

  init() {
    this.sounds = {
      pop: Assets.get('assets/sounds/pop.mp3'),
      win: Assets.get('assets/sounds/win.mp3'),
      wind: Assets.get('assets/sounds/wind.mp3'),
    };

    if (this.sounds.wind) {
      this.sounds.wind.loop = true;
      this.sounds.wind.volume = 0;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      sound.muteAll();
    } else {
      sound.unmuteAll();
      if (this.sounds.wind && this.sounds.wind.isPlaying) {
        this.updateWind(this.lastWindSpeed);
      }
    }
    return this.isMuted;
  }

  playPop() {
    this.playSound('pop');
  }

  playWin() {
    this.playSound('win');
  }

  startWind() {
    this.sounds.wind.play();
  }

  updateWind(speed) {
    this.lastWindSpeed = speed;
    if (!this.sounds.wind) return;

    const targetVol = Math.min(speed / 5, 0.2) * 0.2 * this.masterVolume;
    this.sounds.wind.volume = targetVol;
  }

  stopWind() {
    this.sounds.wind.stop();
  }

  playSound(name) {
    const s = this.sounds[name];
    if (s) {
      s.volume = this.masterVolume;
      s.play();
    }
  }
}
