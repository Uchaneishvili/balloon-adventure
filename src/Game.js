import { Container } from 'pixi.js';
import { Balloon } from './objects/Balloon.js';
import { Cloud } from './objects/Cloud.js';

export class Game {
    constructor(app) {
        this.app = app;
        this.container = new Container();
        this.app.stage.addChild(this.container);

        this.clouds = [];
        this.balloon = null;

        this.init();
    }

    init() {
        this.createBackground();
        this.createBalloon();
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

        this.container.addChildAt(cloud, 0);
        this.clouds.push(cloud);
    }

    createBalloon() {
        this.balloon = new Balloon();
        this.balloon.x = this.app.screen.width / 2;
        this.balloon.y = this.app.screen.height - 150;
        this.container.addChild(this.balloon);
    }
}
