// Human Tower - Physics Engine Setup (Matter.js)

const Physics = {
  engine: null,
  world: null,
  render: null,
  runner: null,

  GROUND_HEIGHT: 40,
  WALL_THICKNESS: 20,
  FALL_THRESHOLD: 50, // pixels below ground to trigger game over

  init: function(canvas) {
    const Engine = Matter.Engine;
    const World = Matter.World;

    this.engine = Engine.create({
      gravity: { x: 0, y: 1.8 }
    });
    this.world = this.engine.world;
    this.canvas = canvas;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;

    // Create boundaries
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
        friction: 0.8,
        restitution: 0.1,
        render: { fillStyle: '#2d2d5e' }
      }
    );

    // Invisible walls (very far so they don't interfere)
    const leftWall = Bodies.rectangle(
      -this.WALL_THICKNESS / 2, this.canvasHeight / 2,
      this.WALL_THICKNESS, this.canvasHeight * 3,
      { isStatic: true, label: 'wall' }
    );

    const rightWall = Bodies.rectangle(
      this.canvasWidth + this.WALL_THICKNESS / 2, this.canvasHeight / 2,
      this.WALL_THICKNESS, this.canvasHeight * 3,
      { isStatic: true, label: 'wall' }
    );

    World.add(this.world, [ground, leftWall, rightWall]);
    this.ground = ground;
  },

  createCharacterBody: function(x, y, character) {
    const Bodies = Matter.Bodies;
    const Body = Matter.Body;

    // Create compound body from character body parts
    const parts = character.bodyParts;

    if (parts.length === 1) {
      const p = parts[0];
      const body = Bodies.rectangle(x, y, p.w, p.h, {
        friction: 0.6,
        restitution: 0.05,
        density: 0.002,
        label: 'character',
        chamfer: { radius: 3 }
      });
      body.characterId = character.id;
      body.character = character;
      return body;
    }

    // For compound bodies, create parts relative to center
    const bodyParts = parts.map(p => {
      return Bodies.rectangle(x + p.x, y + p.y, p.w, p.h, {
        chamfer: { radius: 2 }
      });
    });

    const compound = Body.create({
      parts: bodyParts,
      friction: 0.6,
      restitution: 0.05,
      density: 0.002,
      label: 'character'
    });

    compound.characterId = character.id;
    compound.character = character;

    return compound;
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
