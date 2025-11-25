export class SoundManager {
    constructor() {
        this.sounds = {
            pop: new Audio('assets/sounds/pop.mp3'),
            win: new Audio('assets/sounds/win.mp3'),
            wind: new Audio('assets/sounds/wind.mp3')
        };

        this.sounds.wind.loop = true;
        this.sounds.wind.volume = 0

        this.masterVolume = 0.3;
        this.isMuted = false;
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            Object.values(this.sounds).forEach(sound => sound.volume = 0);
        } else {
            this.sounds.pop.volume = this.masterVolume;
            this.sounds.win.volume = this.masterVolume;

            const currentWindVol = this.sounds.wind.volume;
            if (currentWindVol > 0) {
                this.updateWind(this.lastWindSpeed || 0);
            }
        }
        return this.isMuted;
    }

    init() {
        Object.values(this.sounds).forEach(sound => sound.load());
    }

    playPop() {
        this.playSound('pop');
    }

    playWin() {
        this.playSound('win');
    }

    startWind() {
        this.sounds.wind.play()
    }

    updateWind(speed) {
        this.lastWindSpeed = speed;
        const targetVol = this.isMuted ? 0 : Math.min(speed / 5, 0.2) * 0.2 * this.masterVolume;
        this.sounds.wind.volume = targetVol;
    }

    stopWind() {
        this.sounds.wind.pause();
        this.sounds.wind.currentTime = 0;
    }

    playSound(name) {
        const sound = this.sounds[name];
        if (sound) {
            sound.volume = this.isMuted ? 0 : this.masterVolume;
            sound.currentTime = 0;
            sound.play()
        }
    }
}
