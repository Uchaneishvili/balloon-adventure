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
        this.sounds.wind.volume = 0.5
        this.sounds.wind.play()
    }

    updateWind(speed) {
        //TODO: implement changing wind volume based on speed
    }

    stopWind() {
        this.sounds.wind.pause();
        this.sounds.wind.currentTime = 0;
    }

    playSound(name) {
        const sound = this.sounds[name];
        if (sound) {
            sound.volume = this.masterVolume;
            sound.currentTime = 0;
            sound.play()
        }
    }
}
