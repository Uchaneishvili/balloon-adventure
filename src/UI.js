import { Container, Text, Graphics, TextStyle } from 'pixi.js';

export class UI extends Container {
    constructor(game) {
        super();
        this.game = game;
        this.setup();
    }

    setup() {
        const style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fontWeight: 'bold',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4,
        });

        this.scoreText = new Text({ text: 'Altitude: 0m', style });
        this.scoreText.x = 20;
        this.scoreText.y = 20;
        this.addChild(this.scoreText);

        this.createLandButton();

        this.messageContainer = new Container();
        this.messageContainer.visible = false;
        this.addChild(this.messageContainer);
    }

    createLandButton() {
        this.landButton = new Container();

        const bg = new Graphics();
        bg.roundRect(0, 0, 200, 60, 15);
        bg.fill(0x4CAF50);

        const text = new Text({
            text: 'LAND NOW',
            style: {
                fontFamily: 'Arial',
                fontSize: 24,
                fill: 0xffffff,
                fontWeight: 'bold'
            }
        });
        text.anchor.set(0.5);
        text.x = 100;
        text.y = 30;

        this.landButton.addChild(bg, text);

        this.landButton.x = window.innerWidth / 2 - 100;
        this.landButton.y = window.innerHeight - 100;

        this.landButton.eventMode = 'static';
        this.landButton.cursor = 'pointer';

        this.landButton.on('pointerdown', () => {
            console.log('land *****', this.game.altitude);
            this.game.landBalloon();
            this.showGameOver(true);
        });
        this.addChild(this.landButton);
    }

    update() {
        this.scoreText.text = `Altitude: ${Math.floor(this.game.altitude)}m`;

        if (this.game.isGameOver && !this.messageContainer.visible) {
            if (!this.game.balloon.visible) {
                this.showGameOver(false);
            }
        }
    }

    showGameOver(success) {
        this.landButton.visible = false;
        this.messageContainer.visible = true;
        this.messageContainer.removeChildren();

        const bg = new Graphics();
        bg.rect(0, 0, window.innerWidth, window.innerHeight);
        bg.fill({ color: 0x000000, alpha: 0.7 });
        this.messageContainer.addChild(bg);

        const titleStyle = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 60,
            fontWeight: 'bold',
            fill: success ? '#4CAF50' : '#FF5733',
            stroke: '#ffffff',
            strokeThickness: 6,
        });

        const title = new Text({
            text: success ? 'SAFE LANDING!' : 'BALLOON POPPED!',
            style: titleStyle
        });
        title.anchor.set(0.5);
        title.x = window.innerWidth / 2;
        title.y = window.innerHeight / 2 - 50;

        const scoreStyle = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 40,
            fill: '#ffffff',
        });

        const score = new Text({
            text: `Score: ${this.game.score}`,
            style: scoreStyle
        });
        score.anchor.set(0.5);
        score.x = window.innerWidth / 2;
        score.y = window.innerHeight / 2 + 50;

        const rBg = new Graphics();
        rBg.roundRect(-100, -30, 200, 60, 10);
        rBg.fill(0xFFFFFF);

        const rText = new Text({
            text: 'PLAY AGAIN',
            style: {
                fontFamily: 'Arial',
                fontSize: 24,
                fill: 0x333333,
                fontWeight: 'bold'
            }
        });
        rText.anchor.set(0.5);


        const rButton = new Container();
        rButton.addChild(rBg, rText);
        rButton.x = window.innerWidth / 2;
        rButton.y = window.innerHeight / 2 + 100;

        rButton.eventMode = 'static';
        rButton.cursor = 'pointer';

        rButton.on('pointerdown', () => {
            this.game.restart();
            this.messageContainer.visible = false;
            this.landButton.visible = true;
        });

        this.messageContainer.addChild(title, score, rButton);
    }
}
