import { Container, Graphics } from 'pixi.js';

export class Cloud extends Container {
  constructor() {
    super();
    this.setup();
  }

  setup() {
    const type = Math.floor(Math.random() * 3);
    const cloud = new Graphics();

    switch (type) {
      case 0:
        cloud.circle(0, 0, 40);
        cloud.circle(-35, 5, 35);
        cloud.circle(35, 5, 35);
        cloud.circle(-65, 10, 25);
        cloud.circle(65, 10, 25);
        cloud.circle(-20, -25, 25);
        cloud.circle(20, -25, 25);
        break;
      case 1:
        cloud.circle(0, 10, 35);
        cloud.circle(-40, 15, 30);
        cloud.circle(40, 15, 30);
        cloud.circle(-75, 20, 20);
        cloud.circle(75, 20, 20);
        cloud.circle(-20, -5, 25);
        cloud.circle(20, -5, 25);
        break;
      case 2:
        cloud.circle(0, 0, 30);
        cloud.circle(-25, 5, 25);
        cloud.circle(25, 5, 25);
        cloud.circle(-15, -15, 20);
        cloud.circle(15, -15, 20);
        break;
    }

    cloud.fill({ color: 0xffffff, alpha: 0.5 });
    this.addChild(cloud);
  }
}
