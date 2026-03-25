// Human Tower - Physics Engine Setup (Matter.js)

const Physics = {
  engine: null,
  world: null,

  GROUND_HEIGHT: 40,
  WALL_THICKNESS: 20,
  FALL_THRESHOLD: 80,

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

    this.createBoundaries();
    return this.engine;
  },

  createBoundaries: function() {
    const Bodies = Matter.Bodies;
    const World = Matter.World;

    const groundY = this.canvasHeight - this.GROUND_HEIGHT / 2;
    const ground = Bodies.rectangle(
      this.canvasWidth / 2, groundY,
      this.canvasWidth * 3, this.GROUND_HEIGHT,
      {
        isStatic: true,
        label: 'ground',
        friction: 1.0,
        restitution: 0.05
      }
    );

    const leftWall = Bodies.rectangle(
      -this.WALL_THICKNESS / 2, this.canvasHeight / 2,
      this.WALL_THICKNESS, this.canvasHeight * 4,
      { isStatic: true, label: 'wall' }
    );

    const rightWall = Bodies.rectangle(
      this.canvasWidth + this.WALL_THICKNESS / 2, this.canvasHeight / 2,
      this.WALL_THICKNESS, this.canvasHeight * 4,
      { isStatic: true, label: 'wall' }
    );

    World.add(this.world, [ground, leftWall, rightWall]);
    this.ground = ground;
  },

  createCharacterBody: function(x, y, character) {
    const Bodies = Matter.Bodies;

    const w = character.physicsWidth;
    const h = character.physicsHeight;

    const body = Bodies.rectangle(x, y, w, h, {
      friction: 0.8,
      restitution: 0.03,
      density: 0.003,
      frictionStatic: 1.0,
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

  removeBody: function(body) {
    Matter.World.remove(this.world, body);
  },

  update: function(delta) {
    Matter.Engine.update(this.engine, delta);
  },

  checkFallen: function(bodies) {
    const fallLine = this.canvasHeight + this.FALL_THRESHOLD;
    for (let i = 0; i < bodies.length; i++) {
      if (bodies[i].position.y > fallLine) {
        return true;
      }
      // 画面横に大きく外れた場合も
      if (bodies[i].position.x < -100 || bodies[i].position.x > this.canvasWidth + 100) {
        return true;
      }
    }
    return false;
  },

  getGroundY: function() {
    return this.canvasHeight - this.GROUND_HEIGHT;
  },

  clear: function() {
    Matter.World.clear(this.world);
    Matter.Engine.clear(this.engine);
  }
};
