// Human Tower - Physics Engine Setup (Matter.js)

const Physics = {
  engine: null,
  world: null,

  GROUND_HEIGHT: 30,
  PLATFORM_RATIO: 2/3, // ステージ幅 = 画面幅の2/3
  FALL_THRESHOLD: 100,

  init: function(canvas) {
    this.engine = Matter.Engine.create({
      gravity: { x: 0, y: 1.8 },
      positionIterations: 10,
      velocityIterations: 8
    });
    this.world = this.engine.world;
    this.canvas = canvas;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;

    this.createStage();
    return this.engine;
  },

  createStage: function() {
    const Bodies = Matter.Bodies;
    const World = Matter.World;

    const groundY = this.canvasHeight - 60;
    const centerX = this.canvasWidth / 2;
    const platformWidth = Math.floor(this.canvasWidth * this.PLATFORM_RATIO);

    // 中央の台座のみ（左右は穴）
    const platform = Bodies.rectangle(
      centerX, groundY + this.GROUND_HEIGHT / 2,
      platformWidth, this.GROUND_HEIGHT,
      {
        isStatic: true,
        label: 'platform',
        friction: 1.0,
        restitution: 0.05
      }
    );

    this.platform = platform;
    this.platformWidth = platformWidth;
    this.platformLeft = centerX - platformWidth / 2;
    this.platformRight = centerX + platformWidth / 2;
    this.groundY = groundY;

    World.add(this.world, [platform]);
  },

  createCharacterBody: function(x, y, character) {
    const Bodies = Matter.Bodies;

    const w = character.physicsWidth;
    const h = character.physicsHeight;

    const body = Bodies.rectangle(x, y, w, h, {
      friction: 0.8,
      restitution: 0.03,
      density: 0.003,
      frictionStatic: 1.2,
      label: 'character',
      chamfer: { radius: 3 }
    });

    body.characterId = character.id;
    body.character = character;
    return body;
  },

  addBody: function(body) {
    Matter.World.add(this.world, body);
  },

  update: function(delta) {
    Matter.Engine.update(this.engine, delta);
  },

  // 台座から落ちたかチェック
  checkFallen: function(bodies) {
    for (let i = 0; i < bodies.length; i++) {
      // 画面下に落ちた
      if (bodies[i].position.y > this.canvasHeight + this.FALL_THRESHOLD) {
        return true;
      }
    }
    return false;
  },

  getGroundY: function() {
    return this.groundY;
  },

  getPlatformLeft: function() {
    return this.platformLeft;
  },

  getPlatformRight: function() {
    return this.platformRight;
  },

  clear: function() {
    Matter.World.clear(this.world);
    Matter.Engine.clear(this.engine);
  }
};
