import Phaser from 'phaser';

export default class Game extends Phaser.Scene {
   private platforms: Phaser.Physics.Arcade.StaticGroup;
   private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

   constructor() {
      super('GameScene');
   }

   preload() {
      this.load.image('sky', 'assets/sky.png');
      this.load.image('ground', 'assets/platform.png');
      this.load.image('star', 'assets/star.png');
      this.load.image('bomb', 'assets/bomb.png');
      this.load.spritesheet('player',
         'assets/dude.png',
         { frameWidth: 32, frameHeight: 48 }
      );
   }

   create() {
      this.add.image(400, 300, 'sky');
      this.createPlatforms();
      this.createPlayer();
   }

   update() {

   }

   createPlatforms() {
      this.platforms = this.physics.add.staticGroup();
      this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

      this.platforms.create(600, 400, 'ground');
      this.platforms.create(50, 250, 'ground');
      this.platforms.create(750, 220, 'ground');
   }

   createPlayer() {
      this.player = this.physics.add.sprite(100, 450, 'player');
      this.player.setBounce(0.2);
      this.player.setCollideWorldBounds(true);

      this.anims.create({
         key: 'left',
         frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
         frameRate: 10,
         repeat: -1
      })

      this.anims.create({
         key: 'turn',
         frames: [{ key: 'player', frame: 4 }],
         frameRate: 20
      })

      this.anims.create({
         key: 'right',
         frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
         frameRate: 10,
         repeat: -1
      })

      this.player.body.setGravityY(300);
      this.physics.add.collider(this.player, this.platforms);
   }

   createKeyboardCursor() {
      this.input.keyboard.createCursorKeys();
   }

   playerMovement() {
   }
}
