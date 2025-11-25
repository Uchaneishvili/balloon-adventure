import { Container, Assets } from 'pixi.js';
import { Balloon } from './objects/Balloon.js';
import { Cloud } from './objects/Cloud.js';
import { UI } from './UI.js';
import { EffectManager } from './utils/EffectManager.js';
import { SoundManager } from './utils/SoundManager.js';

export class Game {
    constructor(app) {
        this.app = app;
        this.container = new Container();
        this.app.stage.addChild(this.container);

        this.clouds = [];
        this.balloon = null;

        this.isPlaying = false;
        this.score = 0;
        this.altitude = 0;
        this.speed = 5;
        this.isGameOver = false;

        this.riskLevel = 0;
        this.popChance = 0.001;

        this.effectManager = new EffectManager();
        this.app.stage.addChild(this.effectManager)

        this.soundManager = new SoundManager();

        this.loadAssets();
    }

    async loadAssets() {
        await Assets.load([
            'assets/ui/sound_on.svg',
            'assets/ui/sound_off.svg',
            'assets/sounds/pop.mp3',
            'assets/sounds/win.mp3',
            'assets/sounds/wind.mp3',
        ]);

        this.soundManager.init();

        this.ui = new UI(this);
        this.app.stage.addChild(this.ui);

        this.init();
    }

    init() {
        this.createBackground();
        this.createBalloon();

        const startAudio = () => {
            this.soundManager.startWind();
            window.removeEventListener('click', startAudio);
            window.removeEventListener('touchstart', startAudio);
        };
        window.addEventListener('click', startAudio);
        window.addEventListener('touchstart', startAudio);

        this.app.ticker.add((ticker) => this.update(ticker));
        this.isPlaying = true;
    }

    restart() {
        this.isPlaying = false;
        this.isGameOver = false;
        this.score = 0;
        this.altitude = 0;
        this.speed = 5;
        this.riskLevel = 0;

        this.container.removeChildren();
        this.clouds = [];
        this.balloon = null;

        this.createBackground();
        this.createBalloon();

        this.isPlaying = true;
        this.soundManager.startWind();
    }

    createBackground() {
        for (let i = 0; i < 5; i++) {
            this.spawnCloud(true);
        }
    }

    spawnCloud(randomY = false) {
        const cloud = new Cloud();
        cloud.x = Math.random() * this.app.screen.width;
        cloud.y = randomY ? Math.random() * this.app.screen.height : -100;
        const scale = 0.5 + Math.random() * 0.5;
        cloud.scale.set(scale);
        cloud.speed = (1 + Math.random()) * 0.5;

        this.container.addChildAt(cloud, 0);
        this.clouds.push(cloud);
    }


    popBalloon() {
        this.effectManager.burst(this.balloon.x, this.balloon.y, 0xFF0000, 100, 'pop');

        this.soundManager.playPop();
        this.soundManager.stopWind();

        this.isGameOver = true;
        this.isPlaying = false;
        this.balloon.visible = false;
        this.ui.showGameOver(false);
    }

    landBalloon() {
        this.effectManager.burst(this.balloon.x, this.balloon.y, 0xFF0000, 100, 'land');

        this.isPlaying = false;
        this.isGameOver = true;
        this.balloon.visible = false;
        this.ui.showGameOver(true);
        this.soundManager.playWin();
        this.soundManager.stopWind();

    }

    update(ticker) {
        this.effectManager.update();
        if (!this.isPlaying) return;
        this.ui.update();



        const delta = ticker.deltaTime;

        this.altitude += this.speed * delta;
        this.score = Math.floor(this.altitude / 10);

        this.balloon.rotation = Math.sin(Date.now() / 500) * 0.05;

        this.soundManager.updateWind(this.speed);
        this.clouds.forEach((cloud, index) => {
            cloud.y += (this.speed * cloud.speed) * delta;

            if (cloud.y > this.app.screen.height + 100) {
                this.container.removeChild(cloud);
                this.clouds.splice(index, 1);
                this.spawnCloud();
            }
        });

        this.speed += 0.001 * delta;


        //TODO: Remove max height limit. now it's 6000m (1000m safe zone).
        if (this.altitude > 1000) {
            this.riskLevel = Math.min((this.altitude - 1000) / 5000, 1);
            if (Math.random() < this.popChance * this.riskLevel * delta) {
                this.popBalloon();
            }
        }
    }
    createBalloon() {
        this.balloon = new Balloon();
        this.balloon.x = this.app.screen.width / 2;
        this.balloon.y = this.app.screen.height - 300;
        this.container.addChild(this.balloon);
    }
}
