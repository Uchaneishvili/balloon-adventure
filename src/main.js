import { Application } from 'pixi.js';
import { Game } from './Game.js';

(async () => {
  const app = new Application();

  await app.init({
    background: '#87CEEB',
    resizeTo: window,
    antialias: true,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
  });

  document.body.appendChild(app.canvas);

  new Game(app);
})();
