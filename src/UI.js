import { Container, Text, Graphics, TextStyle, Sprite } from 'pixi.js';

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

    this.hudContainer = new Container();
    this.hudContainer.visible = false;
    this.addChild(this.hudContainer);

    this.scoreText = new Text({ text: 'Altitude: 0m', style });
    this.scoreText.x = 20;
    this.scoreText.y = 20;
    this.hudContainer.addChild(this.scoreText);

    this.velocityText = new Text({ text: 'Velocity: 0 m/s', style });
    this.velocityText.x = 20;
    this.velocityText.y = 60;
    this.hudContainer.addChild(this.velocityText);

    this.riskText = new Text({ text: 'Risk: 0%', style });
    this.riskText.x = 20;
    this.riskText.y = 100;
    this.hudContainer.addChild(this.riskText);

    this.createLandButton();
    this.createMuteButton();

    this.messageContainer = new Container();
    this.messageContainer.visible = false;
    this.addChild(this.messageContainer);

    this.createStartMenu();

    this.resize(this.game.app.screen.width, this.game.app.screen.height);
  }

  resize(width, height) {
    if (this.landButton) {
      this.landButton.x = width / 2 - 100;
      this.landButton.y = height - 100;
    }

    if (this.startMenuContainer) {
      if (this.startMenuBg) {
        this.startMenuBg.clear();
        this.startMenuBg.rect(0, 0, width, height);
        this.startMenuBg.fill({ color: 0x000000, alpha: 0.7 });
      }

      if (this.startTitle) {
        this.startTitle.x = width / 2;
        this.startTitle.y = height / 2 - 100;

        const maxTitleWidth = width * 0.9;
        this.startTitle.scale.set(1);
        if (this.startTitle.width > maxTitleWidth) {
          const scale = maxTitleWidth / this.startTitle.width;
          this.startTitle.scale.set(scale);
        }
      }

      const buttonsY = height / 2 + 50;
      if (this.infoButton) {
        this.infoButton.x = width / 2 - 150;
        this.infoButton.y = buttonsY;
      }
      if (this.playButton) {
        this.playButton.x = width / 2;
        this.playButton.y = buttonsY;
      }
    }

    if (this.messageContainer) {
      if (this.messageBg) {
        this.messageBg.clear();
        this.messageBg.rect(0, 0, width, height);
        this.messageBg.fill({ color: 0x000000, alpha: 0.7 });
      }
      if (this.messageTitle) {
        this.messageTitle.x = width / 2;
        this.messageTitle.y = height / 2 - 50;

        const maxTitleWidth = width * 0.9;
        this.messageTitle.scale.set(1);
        if (this.messageTitle.width > maxTitleWidth) {
          const scale = maxTitleWidth / this.messageTitle.width;
          this.messageTitle.scale.set(scale);
        }
      }
      if (this.messageScore) {
        this.messageScore.x = width / 2;
        this.messageScore.y = height / 2 + 50;
      }
      if (this.replayButton) {
        this.replayButton.x = width / 2;
        this.replayButton.y = height / 2 + 150;
      }
    }

    if (this.startMenuContainer && this.startMenuContainer.visible) {
      this.muteButton.x = width / 2 + 150;
      this.muteButton.y = height / 2 + 50;
    } else {
      this.muteButton.x = width - 50;
      this.muteButton.y = 40;
    }
  }

  createLandButton() {
    this.landButton = new Container();

    const bg = new Graphics();
    bg.roundRect(0, 0, 200, 60, 15);
    bg.fill(0x4caf50);

    const text = new Text({
      text: 'LAND NOW',
      style: {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0xffffff,
        fontWeight: 'bold',
      },
    });
    text.anchor.set(0.5);
    text.x = 100;
    text.y = 30;

    this.landButton.addChild(bg, text);

    this.landButton.eventMode = 'static';
    this.landButton.cursor = 'pointer';

    this.landButton.on('pointerdown', () => {
      this.game.landBalloon();
    });
    this.hudContainer.addChild(this.landButton);
  }

  createMuteButton() {
    this.muteButton = new Container();

    this.soundOn = Sprite.from('assets/ui/sound_on.svg');
    this.soundOff = Sprite.from('assets/ui/sound_off.svg');

    this.soundOn.width = 50;
    this.soundOn.height = 50;
    this.soundOff.width = 50;
    this.soundOff.height = 50;

    this.soundOn.anchor.set(0.5);
    this.soundOff.anchor.set(0.5);

    this.soundOff.visible = false;
    this.soundOn.visible = true;

    this.muteButton.addChild(this.soundOn, this.soundOff);

    this.muteButton.eventMode = 'static';
    this.muteButton.cursor = 'pointer';

    this.muteButton.on('pointerdown', () => {
      const isMuted = this.game.soundManager.toggleMute();
      this.soundOn.visible = !isMuted;
      this.soundOff.visible = isMuted;
    });

    this.addChild(this.muteButton);
  }

  createStartMenu() {
    this.startMenuContainer = new Container();
    this.addChild(this.startMenuContainer);

    this.startMenuBg = new Graphics();
    this.startMenuContainer.addChild(this.startMenuBg);

    const titleStyle = new TextStyle({
      fontFamily: 'Arial',
      fontSize: 60,
      fontWeight: 'bold',
      fill: '#FFFFFF',
      stroke: '#000000',
      strokeThickness: 6,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
    });

    this.startTitle = new Text({
      text: 'BALLOON ADVENTURE',
      style: titleStyle,
    });
    this.startTitle.anchor.set(0.5);
    this.startMenuContainer.addChild(this.startTitle);

    this.infoButton = new Container();
    const infoBg = new Graphics();
    infoBg.circle(0, 0, 30);
    infoBg.fill(0x2196f3);
    const infoText = new Text({
      text: 'i',
      style: {
        fontFamily: 'Arial',
        fontSize: 36,
        fill: '#ffffff',
        fontWeight: 'bold',
      },
    });
    infoText.anchor.set(0.5);
    this.infoButton.addChild(infoBg, infoText);
    this.infoButton.eventMode = 'static';
    this.infoButton.cursor = 'pointer';
    this.infoButton.on('pointerdown', () => {
      console.log('Info clicked');
    });

    this.startMenuContainer.addChild(this.infoButton);

    this.playButton = new Container();
    const playBg = new Graphics();
    playBg.roundRect(-80, -30, 160, 60, 15);
    playBg.fill(0x4caf50);
    const playText = new Text({
      text: 'PLAY',
      style: {
        fontFamily: 'Arial',
        fontSize: 32,
        fill: '#ffffff',
        fontWeight: 'bold',
      },
    });
    playText.anchor.set(0.5);
    this.playButton.addChild(playBg, playText);
    this.playButton.eventMode = 'static';
    this.playButton.cursor = 'pointer';

    this.playButton.on('pointerdown', () => {
      this.game.startGame();
    });

    this.startMenuContainer.addChild(this.playButton);
  }

  showStartMenu() {
    this.startMenuContainer.visible = true;
    this.hudContainer.visible = false;

    this.startMenuContainer.addChild(this.muteButton);

    const { width, height } = this.game.app.screen;
    this.muteButton.x = width / 2 + 150;
    this.muteButton.y = height / 2 + 50;
  }

  hideStartMenu() {
    this.startMenuContainer.visible = false;

    this.addChild(this.muteButton);

    const { width } = this.game.app.screen;
    this.muteButton.x = width - 50;
    this.muteButton.y = 40;
  }

  showGameHUD() {
    this.hudContainer.visible = true;
  }

  update() {
    this.scoreText.text = `Altitude: ${Math.floor(this.game.altitude)}m`;
    this.velocityText.text = `Velocity: ${this.game.speed.toFixed(1)} m/s`;
    this.riskText.text = `Risk: ${(this.game.riskLevel * 100).toFixed(0)}%`;

    if (this.game.isGameOver && !this.messageContainer.visible) {
      if (!this.game.balloon.visible) {
        this.showGameOver(false);
      }
    }
  }

  showGameOver(success) {
    this.hudContainer.visible = false;
    this.landButton.visible = false;
    this.messageContainer.visible = true;
    this.messageContainer.removeChildren();

    this.messageBg = new Graphics();
    this.messageBg.rect(
      0,
      0,
      this.game.app.screen.width,
      this.game.app.screen.height,
    );
    this.messageBg.fill({ color: 0x000000, alpha: 0.7 });
    this.messageContainer.addChild(this.messageBg);

    const titleStyle = new TextStyle({
      fontFamily: 'Arial',
      fontSize: 60,
      fontWeight: 'bold',
      fill: success ? '#4CAF50' : '#FF5733',
      stroke: '#ffffff',
      strokeThickness: 6,
    });

    this.messageTitle = new Text({
      text: success ? 'SAFE LANDING!' : 'BALLOON POPPED!',
      style: titleStyle,
    });
    this.messageTitle.anchor.set(0.5);
    this.messageContainer.addChild(this.messageTitle);

    const scoreStyle = new TextStyle({
      fontFamily: 'Arial',
      fontSize: 40,
      fill: '#ffffff',
    });

    this.messageScore = new Text({
      text: `Score: ${this.game.score}`,
      style: scoreStyle,
    });
    this.messageScore.anchor.set(0.5);
    this.messageContainer.addChild(this.messageScore);

    const rBg = new Graphics();
    rBg.roundRect(-100, -30, 200, 60, 10);
    rBg.fill(0xffffff);

    const rText = new Text({
      text: 'PLAY AGAIN',
      style: {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0x333333,
        fontWeight: 'bold',
      },
    });
    rText.anchor.set(0.5);

    this.replayButton = new Container();
    this.replayButton.addChild(rBg, rText);

    this.replayButton.eventMode = 'static';
    this.replayButton.cursor = 'pointer';

    this.replayButton.on('pointerdown', () => {
      this.game.restart();
      this.messageContainer.visible = false;
      this.landButton.visible = true;
      this.hudContainer.visible = true;
    });

    this.messageContainer.addChild(this.replayButton);

    this.resize(this.game.app.screen.width, this.game.app.screen.height);
  }
}
