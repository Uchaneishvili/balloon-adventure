import { Container, Graphics } from 'pixi.js';

export class Balloon extends Container {
  constructor() {
    super();
    this.setup();
  }

  setup() {
    const balloon = new Graphics();
    balloon.circle(0, 0, 60);
    balloon.fill(0xff5733);

    balloon.ellipse(-25, -10, 8, 20);
    balloon.fill({ color: 0xffffff, alpha: 0.3 });

    this.addChild(balloon);

    const strings = new Graphics();
    strings.moveTo(-15, 35);
    strings.lineTo(-10, 80);
    strings.moveTo(15, 35);
    strings.lineTo(10, 80);
    strings.stroke({ width: 2, color: 0xffffff });
    this.addChild(strings);

    const basket = new Graphics();
    basket.rect(-15, 80, 30, 20);
    basket.fill(0x8b4513);
    this.addChild(basket);
  }
}
