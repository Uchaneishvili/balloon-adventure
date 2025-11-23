import { Application } from 'pixi.js';

(async () => {
    const app = new Application();

    await app.init({
        background: '#87CEEB',
        resizeTo: window,
        antialias: true
    });

    document.body.appendChild(app.canvas);

    console.log('PixiJS Application initialized');
})();