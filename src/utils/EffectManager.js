import { Container, Graphics } from 'pixi.js';

export class EffectManager extends Container {
    constructor() {
        super();
        this.effects = [];
    }

    burst(x, y, color = 0xFFFFFF, count = 20,) {
        for (let i = 0; i < count; i++) {
            const p = new Graphics();

            p.circle(0, 0, 3 + Math.random() * 4);
            p.fill(color);

            p.x = x;
            p.y = y;

            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 5;

            this.addChild(p);

            this.effects.push({
                sprite: p,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1.0,
                decay: 0.02 + Math.random() * 0.03,
            });
        }
    }

    update() {
        for (let i = this.effects.length - 1; i >= 0; i--) {
            const e = this.effects[i];

            e.sprite.x += e.vx;
            e.sprite.y += e.vy;
            e.life -= e.decay;

            e.vy += 0.1;

            e.sprite.alpha = e.life;

            if (e.life <= 0) {
                this.removeChild(e.sprite);
                e.sprite.destroy();
                this.effects.splice(i, 1);
            }
        }
    }
}
