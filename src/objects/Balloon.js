import { Container, Graphics } from 'pixi.js';

export class Balloon extends Container {
    constructor() {
        super();
        this.setup();
    }

    setup() {
        const balloon = new Graphics();
        balloon.circle(0, 0, 40);
        balloon.fill(0xFF5733);

        balloon.ellipse(-10, -10, 8, 10);
        balloon.fill({ color: 0xFFFFFF, alpha: 0.3 });

        this.addChild(balloon);

        const strings = new Graphics();
        strings.moveTo(-15, 15);
        strings.lineTo(-10, 60);
        strings.moveTo(15, 15);
        strings.lineTo(10, 60);
        strings.stroke({ width: 2, color: 0xFFFFFF });
        this.addChild(strings);

        const basket = new Graphics();
        basket.rect(-15, 60, 30, 20);
        basket.fill(0x8B4513);
        this.addChild(basket);
    }
}