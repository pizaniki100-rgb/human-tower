// Human Tower - Physics Engine Setup (Matter.js)

const Physics = {
  engine: null,
  world: null,

  GROUND_HEIGHT: 30,
  PLATFORM_RATIO: 2/3,
  FALL_THRESHOLD: 100,

  init: function(canvas) {
    this.engine = Matter.Engine.create({
      gravity: { x: 0, y: 1.2 }, // 落下速度2/3に
      positionIterations: 15,     // 衝突精度アップ（突き抜け防止）
      velocityIterations: 12
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

    // メイン台座
    const platform = Bodies.rectangle(
      centerX, groundY + this.GROUND_HEIGHT / 2,
      platformWidth, this.GROUND_HEIGHT,
      {
        isStatic: true,
        label: 'platform',
        friction: 0.9,
        restitution: 0.05
      }
    );

    // 左壁（台座の端に小さな壁 → キャラが滑り落ちやすくする）
    const wallHeight = 6;
    const leftEdge = Bodies.rectangle(
      centerX - platformWidth / 2, groundY - wallHeight / 2,
      4, wallHeight,
      { isStatic: true, label: 'edge', friction: 0.3 }
    );
    const rightEdge = Bodies.rectangle(
      centerX + platformWidth / 2, groundY - wallHeight / 2,
      4, wallHeight,
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
      restitution: 0.15,       // 少し弾む → 衝突時に崩れやすい
      density: 0.002,
      frictionStatic: 0.8,
      frictionAir: 0.01,       // 空気抵抗少し
      label: 'character',
      chamfer: { radius: 3 },
      slop: 0.01               // 突き抜け防止
    });

    body.characterId = character.id;
    body.character = character;
    return body;
  },

  addBody: function(body) {
    Matter.World.add(this.world, body);
  },

  update: function(delta) {
    // 小さなステップで複数回更新（突き抜け防止）
    const steps = 2;
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
