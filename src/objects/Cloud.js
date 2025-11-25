import { Container, Graphics } from 'pixi.js';

export class Cloud extends Container {
  constructor() {
    super();
    const cloud = new Graphics();

    cloud.circle(0, 0, 40); // Center
    cloud.circle(-35, 5, 35); // Inner Left
    cloud.circle(35, 5, 35); // Inner Right
    cloud.circle(-65, 10, 25); // Outer Left
    cloud.circle(65, 10, 25); // Outer Right
    cloud.circle(-20, -25, 25); // Top Left
    cloud.circle(20, -25, 25); // Top Right

    cloud.fill({ color: 0xffffff, alpha: 1 });

    this.addChild(cloud);
  }
}
