
import { Container, Graphics } from 'pixi.js';

export class Cloud extends Container {
    constructor() {
        super();
        this.setup();
    }

    setup() {
        const cloud = new Graphics(); //TODO: Cloud shape should be changed
        cloud.ellipse(0, 0, 60, 40);
        cloud.ellipse(40, -10, 70, 50);
        cloud.ellipse(-40, -10, 70, 50);
        cloud.fill({ color: 0xFFFFFF, alpha: 0.8 });

        this.addChild(cloud);
    }
}