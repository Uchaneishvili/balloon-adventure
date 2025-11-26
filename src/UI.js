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

    this.altitudeText = new Text({ text: 'Altitude: 0m', style });
    this.altitudeText.x = 20;
    this.altitudeText.y = 20;
    this.hudContainer.addChild(this.altitudeText);

    this.scoreText = new Text({ text: 'Score: 0', style });
    this.scoreText.x = 20;
    this.scoreText.y = 60;
    this.hudContainer.addChild(this.scoreText);

    this.createLandButton();
    this.createMuteButton();

    this.messageContainer = new Container();
    this.messageContainer.visible = false;
    this.addChild(this.messageContainer);

    this.createStartMenu();
    this.createRulesModal();

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

    if (this.rulesContainer && this.rulesContainer.visible) {
      if (this.rulesBg) {
        this.rulesBg.clear();
        this.rulesBg.rect(0, 0, width, height);
        this.rulesBg.fill({ color: 0x000000, alpha: 0.8 });
      }
      if (this.rulesPanel) {
        this.rulesPanel.x = width / 2;
        this.rulesPanel.y = height / 2;
      }
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

    this.soundOn.width = 75;
    this.soundOn.height = 75;
    this.soundOff.width = 75;
    this.soundOff.height = 75;

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
    infoBg.roundRect(-30, -30, 60, 60, 15);
    infoBg.fill(0x2196f3);
    infoBg.stroke({ width: 2, color: 0xffffff });

    const infoSprite = Sprite.from('assets/ui/info.svg');
    infoSprite.width = 50;
    infoSprite.height = 50;
    infoSprite.anchor.set(0.5);
    infoSprite.tint = 0xffffff;
    this.infoButton.addChild(infoBg, infoSprite);
    this.infoButton.eventMode = 'static';
    this.infoButton.cursor = 'pointer';
    this.infoButton.on('pointerdown', () => {
      this.showRulesModal();
    });

    this.startMenuContainer.addChild(this.infoButton);

    this.playButton = new Container();
    const playBg = new Graphics();
    playBg.roundRect(-80, -30, 160, 60, 15);
    playBg.fill(0x4caf50);
    playBg.stroke({ width: 2, color: 0xffffff });

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
    this.altitudeText.text = `Altitude: ${Math.floor(this.game.altitude)}m`;
    this.scoreText.text = `Score: ${Math.floor(this.game.score)}`;

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
  createRulesModal() {
    this.rulesContainer = new Container();
    this.rulesContainer.visible = false;
    this.addChild(this.rulesContainer);

    this.rulesBg = new Graphics();
    this.rulesContainer.addChild(this.rulesBg);

    this.rulesPanel = new Container();
    this.rulesContainer.addChild(this.rulesPanel);

    const panelBg = new Graphics();
    panelBg.roundRect(-250, -200, 500, 400, 20);
    panelBg.fill(0xffffff);
    this.rulesPanel.addChild(panelBg);

    const titleStyle = new TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      fontWeight: 'bold',
      fill: '#333333',
    });

    const title = new Text({ text: 'HOW TO PLAY', style: titleStyle });
    title.anchor.set(0.5);
    title.y = -150;
    this.rulesPanel.addChild(title);

    const rulesTextStyle = new TextStyle({
      fontFamily: 'Arial',
      fontSize: 20,
      fill: '#555555',
      align: 'center',
      wordWrap: true,
      wordWrapWidth: 400,
      lineHeight: 30,
    });

    const rulesContent =
      '1. The balloon rises automatically.\n' +
      '2. Higher altitude means higher risk.\n' +
      '3. Press "LAND NOW" to land safely and bank your score.\n' +
      '4. Don\'t wait too long or the balloon will pop!';

    const rulesText = new Text({ text: rulesContent, style: rulesTextStyle });
    rulesText.anchor.set(0.5);
    rulesText.y = -20;
    this.rulesPanel.addChild(rulesText);

    const closeButton = new Container();
    const closeBg = new Graphics();
    closeBg.roundRect(-60, -25, 120, 50, 10);
    closeBg.fill(0x2196f3);

    const closeText = new Text({
      text: 'GOT IT',
      style: {
        fontFamily: 'Arial',
        fontSize: 20,
        fontWeight: 'bold',
        fill: '#ffffff',
      },
    });
    closeText.anchor.set(0.5);

    closeButton.addChild(closeBg, closeText);
    closeButton.y = 140;
    closeButton.eventMode = 'static';
    closeButton.cursor = 'pointer';
    closeButton.on('pointerdown', () => this.hideRulesModal());

    this.rulesPanel.addChild(closeButton);
  }

  showRulesModal() {
    this.rulesContainer.visible = true;
    this.startMenuContainer.visible = false;
    this.resize(this.game.app.screen.width, this.game.app.screen.height);
  }

  hideRulesModal() {
    this.rulesContainer.visible = false;
    this.startMenuContainer.visible = true;
    this.resize(this.game.app.screen.width, this.game.app.screen.height);
  }
}
