// Human Tower - Physics Engine Setup (Matter.js)

const Physics = {
  engine: null,
  world: null,

  GROUND_HEIGHT: 40,
  PLATFORM_RATIO: 2/3,
  FALL_THRESHOLD: 100,

  init: function(canvas) {
    this.engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.6 },
      positionIterations: 20,
      velocityIterations: 15
    });
    this.world = this.engine.world;
    this.canvas = canvas;
    const dpr = window.devicePixelRatio || 1;
    this.canvasWidth = canvas.width / dpr;
    this.canvasHeight = canvas.height / dpr;

    this.createStage();
    return this.engine;
  },

  createStage: function() {
    const Bodies = Matter.Bodies;
    const World = Matter.World;

    const groundY = Math.floor(this.canvasHeight * 0.6);
    const centerX = this.canvasWidth / 2;
    const platformWidth = Math.floor(this.canvasWidth * this.PLATFORM_RATIO);

    // メイン台座（厚めにして突き抜け防止）
    const platform = Bodies.rectangle(
      centerX, groundY + this.GROUND_HEIGHT / 2,
      platformWidth, this.GROUND_HEIGHT,
      {
        isStatic: true,
        label: 'platform',
        friction: 0.5,
        restitution: 0.05
      }
    );

    // 台座の端に小さな壁
    const wallHeight = 4;
    const leftEdge = Bodies.rectangle(
      centerX - platformWidth / 2, groundY - wallHeight / 2,
      3, wallHeight,
      { isStatic: true, label: 'edge', friction: 0.3 }
    );
    const rightEdge = Bodies.rectangle(
      centerX + platformWidth / 2, groundY - wallHeight / 2,
      3, wallHeight,
      { isStatic: true, label: 'edge', friction: 0.3 }
    );

    this.platform = platform;
    this.platformWidth = platformWidth;
    this.platformLeft = centerX - platformWidth / 2;
    this.platformRight = centerX + platformWidth / 2;
    this.groundY = groundY;

    World.add(this.world, [platform, leftEdge, rightEdge]);
  },

  createCharacterBody: function(x, y, character) {
    const Bodies = Matter.Bodies;

    const w = character.physicsWidth;
    const h = character.physicsHeight;

    const body = Bodies.rectangle(x, y, w, h, {
      friction: 0.6,
      restitution: 0.0,
      density: 0.012,
      frictionStatic: 0.8,
      frictionAir: 0.015,
      label: 'character',
      chamfer: { radius: 3 },
      slop: 0.02
    });

    body.characterId = character.id;
    body.character = character;
    return body;
  },

  addBody: function(body) {
    Matter.World.add(this.world, body);
  },

  update: function(delta) {
    // 3ステップ分割で突き抜け防止
    const steps = 3;
    const stepDelta = delta / steps;
    for (let i = 0; i < steps; i++) {
      Matter.Engine.update(this.engine, stepDelta);
    }
  },

  checkFallen: function(bodies) {
    for (let i = 0; i < bodies.length; i++) {
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
