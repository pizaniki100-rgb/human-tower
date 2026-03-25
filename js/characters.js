// Human Tower - Character Definitions
// 10種類のポーズキャラクター

const CHARACTERS = [
  {
    id: 0,
    name: 'Tポーズ',
    pose: 't-pose',
    color: '#FF6B6B',
    skinColor: '#FDBCB4',
    hairColor: '#4A3728',
    // Physics body shape (relative vertices for compound body)
    width: 80,
    height: 50,
    // Body parts for physics (rectangles relative to center)
    bodyParts: [
      { x: 0, y: 0, w: 20, h: 40 },      // torso
      { x: -30, y: -8, w: 40, h: 10 },    // left arm
      { x: 30, y: -8, w: 40, h: 10 },     // right arm
      { x: -8, y: 22, w: 10, h: 16 },     // left leg
      { x: 8, y: 22, w: 10, h: 16 },      // right leg
    ],
    draw: function(ctx, x, y, angle, scale = 1) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(scale, scale);

      // Legs
      ctx.fillStyle = '#4A90D9';
      ctx.fillRect(-12, 8, 10, 22);
      ctx.fillRect(2, 8, 10, 22);

      // Shoes
      ctx.fillStyle = '#333';
      ctx.fillRect(-14, 26, 14, 6);
      ctx.fillRect(0, 26, 14, 6);

      // Body (T-shirt)
      ctx.fillStyle = this.color;
      ctx.fillRect(-12, -14, 24, 24);

      // Arms
      ctx.fillStyle = this.skinColor;
      ctx.fillRect(-42, -14, 30, 10);
      ctx.fillRect(12, -14, 30, 10);

      // Sleeves
      ctx.fillStyle = this.color;
      ctx.fillRect(-18, -14, 8, 10);
      ctx.fillRect(10, -14, 8, 10);

      // Head
      ctx.fillStyle = this.skinColor;
      ctx.beginPath();
      ctx.arc(0, -24, 12, 0, Math.PI * 2);
      ctx.fill();

      // Hair
      ctx.fillStyle = this.hairColor;
      ctx.beginPath();
      ctx.arc(0, -28, 12, Math.PI, Math.PI * 2);
      ctx.fill();

      // Eyes
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.arc(-4, -25, 2, 0, Math.PI * 2);
      ctx.arc(4, -25, 2, 0, Math.PI * 2);
      ctx.fill();

      // Smile
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, -22, 4, 0.1, Math.PI - 0.1);
      ctx.stroke();

      ctx.restore();
    }
  },
  {
    id: 1,
    name: 'おすわり',
    pose: 'sitting',
    color: '#4ECDC4',
    skinColor: '#F5D0C5',
    hairColor: '#8B4513',
    width: 40,
    height: 45,
    bodyParts: [
      { x: 0, y: -5, w: 20, h: 30 },     // torso
      { x: 0, y: 14, w: 36, h: 12 },      // legs folded
    ],
    draw: function(ctx, x, y, angle, scale = 1) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(scale, scale);

      // Folded legs
      ctx.fillStyle = '#4A90D9';
      ctx.fillRect(-18, 8, 36, 14);

      // Shoes
      ctx.fillStyle = '#333';
      ctx.fillRect(-20, 14, 10, 8);
      ctx.fillRect(10, 14, 10, 8);

      // Body
      ctx.fillStyle = this.color;
      ctx.fillRect(-12, -16, 24, 26);

      // Arms on knees
      ctx.fillStyle = this.skinColor;
      ctx.fillRect(-16, 0, 8, 10);
      ctx.fillRect(8, 0, 8, 10);

      // Sleeves
      ctx.fillStyle = this.color;
      ctx.fillRect(-16, -6, 8, 8);
      ctx.fillRect(8, -6, 8, 8);

      // Head
      ctx.fillStyle = this.skinColor;
      ctx.beginPath();
      ctx.arc(0, -26, 12, 0, Math.PI * 2);
      ctx.fill();

      // Hair (bob)
      ctx.fillStyle = this.hairColor;
      ctx.beginPath();
      ctx.arc(0, -30, 12, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(-12, -30, 3, 12);
      ctx.fillRect(9, -30, 3, 12);

      // Eyes
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.arc(-4, -27, 2, 0, Math.PI * 2);
      ctx.arc(4, -27, 2, 0, Math.PI * 2);
      ctx.fill();

      // Smile
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, -23, 3, 0.2, Math.PI - 0.2);
      ctx.stroke();

      ctx.restore();
    }
  },
  {
    id: 2,
    name: 'さかだち',
    pose: 'handstand',
    color: '#FF8C42',
    skinColor: '#FDBCB4',
    hairColor: '#2C1810',
    width: 30,
    height: 70,
    bodyParts: [
      { x: 0, y: -8, w: 20, h: 36 },     // torso (inverted)
      { x: -10, y: 22, w: 10, h: 14 },    // left hand on ground
      { x: 10, y: 22, w: 10, h: 14 },     // right hand
      { x: -6, y: -30, w: 10, h: 14 },    // left leg up
      { x: 6, y: -30, w: 10, h: 14 },     // right leg up
    ],
    draw: function(ctx, x, y, angle, scale = 1) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(scale, scale);

      // Arms (on ground)
      ctx.fillStyle = this.skinColor;
      ctx.fillRect(-14, 12, 8, 18);
      ctx.fillRect(6, 12, 8, 18);

      // Hands
      ctx.fillRect(-16, 26, 12, 6);
      ctx.fillRect(4, 26, 12, 6);

      // Body (inverted)
      ctx.fillStyle = this.color;
      ctx.fillRect(-12, -18, 24, 32);

      // Legs (up)
      ctx.fillStyle = '#4A90D9';
      ctx.fillRect(-10, -34, 8, 18);
      ctx.fillRect(2, -34, 8, 18);

      // Shoes (top)
      ctx.fillStyle = '#333';
      ctx.fillRect(-12, -38, 12, 6);
      ctx.fillRect(0, -38, 12, 6);

      // Head (bottom)
      ctx.fillStyle = this.skinColor;
      ctx.beginPath();
      ctx.arc(0, 18, 10, 0, Math.PI * 2);
      ctx.fill();

      // Hair (hanging down)
      ctx.fillStyle = this.hairColor;
      ctx.beginPath();
      ctx.arc(0, 22, 10, 0, Math.PI);
      ctx.fill();

      // Eyes (upside down face)
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.arc(-3, 16, 1.5, 0, Math.PI * 2);
      ctx.arc(3, 16, 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Mouth
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 20, 3, Math.PI + 0.2, -0.2);
      ctx.stroke();

      ctx.restore();
    }
  },
  {
    id: 3,
    name: 'スクワット',
    pose: 'squat',
    color: '#A8E6CF',
    skinColor: '#F5D0C5',
    hairColor: '#654321',
    width: 36,
    height: 40,
    bodyParts: [
      { x: 0, y: -4, w: 22, h: 24 },     // torso
      { x: -10, y: 14, w: 14, h: 12 },    // left leg bent
      { x: 10, y: 14, w: 14, h: 12 },     // right leg bent
    ],
    draw: function(ctx, x, y, angle, scale = 1) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(scale, scale);

      // Bent legs
      ctx.fillStyle = '#4A90D9';
      ctx.fillRect(-18, 6, 14, 16);
      ctx.fillRect(4, 6, 14, 16);

      // Shoes
      ctx.fillStyle = '#333';
      ctx.fillRect(-20, 18, 12, 6);
      ctx.fillRect(8, 18, 12, 6);

      // Body
      ctx.fillStyle = this.color;
      ctx.fillRect(-12, -12, 24, 20);

      // Arms forward
      ctx.fillStyle = this.skinColor;
      ctx.fillRect(-6, -6, 4, 14);
      ctx.fillRect(2, -6, 4, 14);

      // Head
      ctx.fillStyle = this.skinColor;
      ctx.beginPath();
      ctx.arc(0, -22, 11, 0, Math.PI * 2);
      ctx.fill();

      // Hair (spiky)
      ctx.fillStyle = this.hairColor;
      ctx.beginPath();
      ctx.moveTo(-10, -26);
      ctx.lineTo(-6, -36);
      ctx.lineTo(-2, -26);
      ctx.lineTo(2, -38);
      ctx.lineTo(6, -26);
      ctx.lineTo(10, -34);
      ctx.lineTo(12, -24);
      ctx.lineTo(-12, -24);
      ctx.fill();

      // Eyes (determined)
      ctx.fillStyle = '#333';
      ctx.fillRect(-6, -24, 4, 2);
      ctx.fillRect(2, -24, 4, 2);

      // Mouth
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-3, -18);
      ctx.lineTo(3, -18);
      ctx.stroke();

      ctx.restore();
    }
  },
  {
    id: 4,
    name: 'バンザイ',
    pose: 'banzai',
    color: '#FFD93D',
    skinColor: '#FDBCB4',
    hairColor: '#1A1A1A',
    width: 40,
    height: 75,
    bodyParts: [
      { x: 0, y: 6, w: 20, h: 36 },      // torso
      { x: -8, y: -24, w: 8, h: 24 },     // left arm up
      { x: 8, y: -24, w: 8, h: 24 },      // right arm up
      { x: -8, y: 28, w: 10, h: 18 },     // left leg
      { x: 8, y: 28, w: 10, h: 18 },      // right leg
    ],
    draw: function(ctx, x, y, angle, scale = 1) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(scale, scale);

      // Legs
      ctx.fillStyle = '#4A90D9';
      ctx.fillRect(-12, 18, 10, 22);
      ctx.fillRect(2, 18, 10, 22);

      // Shoes
      ctx.fillStyle = '#E74C3C';
      ctx.fillRect(-14, 36, 14, 6);
      ctx.fillRect(0, 36, 14, 6);

      // Body
      ctx.fillStyle = this.color;
      ctx.fillRect(-12, -8, 24, 28);

      // Arms up
      ctx.fillStyle = this.skinColor;
      ctx.fillRect(-14, -36, 8, 30);
      ctx.fillRect(6, -36, 8, 30);

      // Sleeves
      ctx.fillStyle = this.color;
      ctx.fillRect(-14, -10, 8, 8);
      ctx.fillRect(6, -10, 8, 8);

      // Hands
      ctx.fillStyle = this.skinColor;
      ctx.beginPath();
      ctx.arc(-10, -38, 5, 0, Math.PI * 2);
      ctx.arc(10, -38, 5, 0, Math.PI * 2);
      ctx.fill();

      // Head
      ctx.fillStyle = this.skinColor;
      ctx.beginPath();
      ctx.arc(0, -16, 12, 0, Math.PI * 2);
      ctx.fill();

      // Hair
      ctx.fillStyle = this.hairColor;
      ctx.beginPath();
      ctx.arc(0, -20, 12, Math.PI, Math.PI * 2);
      ctx.fill();

      // Eyes (happy closed)
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(-4, -17, 3, Math.PI + 0.3, -0.3);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(4, -17, 3, Math.PI + 0.3, -0.3);
      ctx.stroke();

      // Big smile
      ctx.beginPath();
      ctx.arc(0, -12, 5, 0.1, Math.PI - 0.1);
      ctx.stroke();

      ctx.restore();
    }
  },
  {
    id: 5,
    name: '片足立ち',
    pose: 'one-leg',
    color: '#C3ACD0',
    skinColor: '#F5D0C5',
    hairColor: '#D4A574',
    width: 40,
    height: 65,
    bodyParts: [
      { x: 0, y: 0, w: 20, h: 36 },      // torso
      { x: 6, y: 22, w: 10, h: 20 },      // standing leg
      { x: -12, y: 8, w: 20, h: 8 },      // raised leg horizontal
    ],
    draw: function(ctx, x, y, angle, scale = 1) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(scale, scale);

      // Standing leg
      ctx.fillStyle = '#4A90D9';
      ctx.fillRect(2, 14, 10, 22);

      // Standing shoe
      ctx.fillStyle = '#333';
      ctx.fillRect(0, 32, 14, 6);

      // Raised leg (bent)
      ctx.fillStyle = '#4A90D9';
      ctx.fillRect(-20, 4, 18, 8);

      // Raised shoe
      ctx.fillStyle = '#333';
      ctx.fillRect(-24, 4, 8, 8);

      // Body
      ctx.fillStyle = this.color;
      ctx.fillRect(-10, -14, 24, 30);

      // Arms out for balance
      ctx.fillStyle = this.skinColor;
      ctx.fillRect(-22, -10, 14, 8);
      ctx.fillRect(14, -8, 14, 8);

      // Head
      ctx.fillStyle = this.skinColor;
      ctx.beginPath();
      ctx.arc(2, -24, 12, 0, Math.PI * 2);
      ctx.fill();

      // Long hair
      ctx.fillStyle = this.hairColor;
      ctx.beginPath();
      ctx.arc(2, -28, 13, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(-11, -28, 4, 20);
      ctx.fillRect(11, -28, 4, 20);

      // Eyes
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.arc(-2, -25, 2, 0, Math.PI * 2);
      ctx.arc(6, -25, 2, 0, Math.PI * 2);
      ctx.fill();

      // Focused mouth
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(2, -20, 2, 0.3, Math.PI - 0.3);
      ctx.stroke();

      ctx.restore();
    }
  },
  {
    id: 6,
    name: '腕立て',
    pose: 'pushup',
    color: '#FF6F91',
    skinColor: '#FDBCB4',
    hairColor: '#4A3728',
    width: 70,
    height: 28,
    bodyParts: [
      { x: 0, y: 0, w: 60, h: 14 },      // body horizontal
      { x: -24, y: 8, w: 8, h: 12 },      // left arm
      { x: 24, y: 8, w: 8, h: 12 },       // right arm
    ],
    draw: function(ctx, x, y, angle, scale = 1) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(scale, scale);

      // Body (horizontal)
      ctx.fillStyle = this.color;
      ctx.fillRect(-28, -8, 44, 14);

      // Legs
      ctx.fillStyle = '#4A90D9';
      ctx.fillRect(14, -6, 20, 10);

      // Shoes
      ctx.fillStyle = '#333';
      ctx.fillRect(32, -8, 6, 10);

      // Arms down
      ctx.fillStyle = this.skinColor;
      ctx.fillRect(-22, 4, 8, 12);
      ctx.fillRect(-6, 4, 8, 12);

      // Hands
      ctx.fillRect(-24, 14, 12, 4);
      ctx.fillRect(-8, 14, 12, 4);

      // Head
      ctx.fillStyle = this.skinColor;
      ctx.beginPath();
      ctx.arc(-32, -2, 10, 0, Math.PI * 2);
      ctx.fill();

      // Hair
      ctx.fillStyle = this.hairColor;
      ctx.beginPath();
      ctx.arc(-32, -6, 10, Math.PI, Math.PI * 2);
      ctx.fill();

      // Eyes (strained)
      ctx.fillStyle = '#333';
      ctx.fillRect(-36, -4, 3, 2);
      ctx.fillRect(-31, -4, 3, 2);

      // Strained mouth
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(-33, 2, 3, Math.PI + 0.3, -0.3);
      ctx.stroke();

      ctx.restore();
    }
  },
  {
    id: 7,
    name: 'ブリッジ',
    pose: 'bridge',
    color: '#45B7D1',
    skinColor: '#F5D0C5',
    hairColor: '#8B0000',
    width: 60,
    height: 30,
    bodyParts: [
      { x: 0, y: -4, w: 44, h: 10 },     // arched body
      { x: -20, y: 8, w: 8, h: 14 },      // left hand
      { x: 20, y: 8, w: 8, h: 14 },       // right hand
      { x: -16, y: 8, w: 8, h: 14 },      // left foot
      { x: 16, y: 8, w: 8, h: 14 },       // right foot
    ],
    draw: function(ctx, x, y, angle, scale = 1) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(scale, scale);

      // Arch body
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(-22, 8);
      ctx.quadraticCurveTo(0, -20, 22, 8);
      ctx.lineTo(22, 2);
      ctx.quadraticCurveTo(0, -12, -22, 2);
      ctx.closePath();
      ctx.fill();

      // Legs
      ctx.fillStyle = '#4A90D9';
      ctx.fillRect(16, 0, 8, 14);
      ctx.fillRect(-24, 0, 8, 14);

      // Feet
      ctx.fillStyle = '#333';
      ctx.fillRect(14, 12, 12, 5);
      ctx.fillRect(-26, 12, 12, 5);

      // Arms
      ctx.fillStyle = this.skinColor;
      ctx.fillRect(6, 0, 8, 14);
      ctx.fillRect(-14, 0, 8, 14);

      // Hands
      ctx.fillRect(4, 12, 12, 5);
      ctx.fillRect(-16, 12, 12, 5);

      // Head (upside down under arch)
      ctx.fillStyle = this.skinColor;
      ctx.beginPath();
      ctx.arc(0, 4, 8, 0, Math.PI * 2);
      ctx.fill();

      // Hair
      ctx.fillStyle = this.hairColor;
      ctx.beginPath();
      ctx.arc(0, 7, 8, 0, Math.PI);
      ctx.fill();

      // Eyes
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.arc(-3, 3, 1.5, 0, Math.PI * 2);
      ctx.arc(3, 3, 1.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  },
  {
    id: 8,
    name: 'ジャンプ星',
    pose: 'star-jump',
    color: '#F9C74F',
    skinColor: '#FDBCB4',
    hairColor: '#2C1810',
    width: 70,
    height: 70,
    bodyParts: [
      { x: 0, y: 0, w: 18, h: 30 },      // torso
      { x: -22, y: -16, w: 20, h: 8 },    // left arm up-diagonal
      { x: 22, y: -16, w: 20, h: 8 },     // right arm up-diagonal
      { x: -16, y: 20, w: 8, h: 20 },     // left leg diagonal
      { x: 16, y: 20, w: 8, h: 20 },      // right leg diagonal
    ],
    draw: function(ctx, x, y, angle, scale = 1) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(scale, scale);

      // Legs spread
      ctx.fillStyle = '#4A90D9';
      ctx.save();
      ctx.rotate(-0.4);
      ctx.fillRect(-6, 10, 10, 24);
      ctx.restore();
      ctx.save();
      ctx.rotate(0.4);
      ctx.fillRect(-4, 10, 10, 24);
      ctx.restore();

      // Shoes
      ctx.fillStyle = '#E74C3C';
      ctx.beginPath();
      ctx.arc(-18, 32, 5, 0, Math.PI * 2);
      ctx.arc(18, 32, 5, 0, Math.PI * 2);
      ctx.fill();

      // Body
      ctx.fillStyle = this.color;
      ctx.fillRect(-10, -10, 20, 24);

      // Arms spread up
      ctx.fillStyle = this.skinColor;
      ctx.save();
      ctx.rotate(-0.6);
      ctx.fillRect(-36, -14, 28, 8);
      ctx.restore();
      ctx.save();
      ctx.rotate(0.6);
      ctx.fillRect(8, -14, 28, 8);
      ctx.restore();

      // Hands
      ctx.beginPath();
      ctx.arc(-30, -22, 5, 0, Math.PI * 2);
      ctx.arc(30, -22, 5, 0, Math.PI * 2);
      ctx.fill();

      // Head
      ctx.fillStyle = this.skinColor;
      ctx.beginPath();
      ctx.arc(0, -22, 12, 0, Math.PI * 2);
      ctx.fill();

      // Hair
      ctx.fillStyle = this.hairColor;
      ctx.beginPath();
      ctx.arc(0, -26, 12, Math.PI, Math.PI * 2);
      ctx.fill();

      // Excited eyes
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.arc(-4, -23, 2.5, 0, Math.PI * 2);
      ctx.arc(4, -23, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(-3, -24, 1, 0, Math.PI * 2);
      ctx.arc(5, -24, 1, 0, Math.PI * 2);
      ctx.fill();

      // Big open smile
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.arc(0, -17, 5, 0.1, Math.PI - 0.1);
      ctx.fill();

      ctx.restore();
    }
  },
  {
    id: 9,
    name: 'まるまり',
    pose: 'ball',
    color: '#96CEB4',
    skinColor: '#F5D0C5',
    hairColor: '#4A3728',
    width: 32,
    height: 32,
    bodyParts: [
      { x: 0, y: 0, w: 30, h: 28 },      // curled up body
    ],
    draw: function(ctx, x, y, angle, scale = 1) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(scale, scale);

      // Curled body (ball shape)
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.ellipse(0, 2, 16, 14, 0, 0, Math.PI * 2);
      ctx.fill();

      // Knees visible
      ctx.fillStyle = '#4A90D9';
      ctx.beginPath();
      ctx.arc(-8, 10, 7, 0, Math.PI * 2);
      ctx.arc(8, 10, 7, 0, Math.PI * 2);
      ctx.fill();

      // Shoes peeking
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.ellipse(-10, 14, 5, 3, -0.3, 0, Math.PI * 2);
      ctx.ellipse(10, 14, 5, 3, 0.3, 0, Math.PI * 2);
      ctx.fill();

      // Head on top
      ctx.fillStyle = this.skinColor;
      ctx.beginPath();
      ctx.arc(0, -10, 10, 0, Math.PI * 2);
      ctx.fill();

      // Hair
      ctx.fillStyle = this.hairColor;
      ctx.beginPath();
      ctx.arc(0, -14, 10, Math.PI, Math.PI * 2);
      ctx.fill();

      // Arms hugging knees
      ctx.fillStyle = this.skinColor;
      ctx.fillRect(-14, 0, 6, 8);
      ctx.fillRect(8, 0, 6, 8);

      // Sleepy eyes
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(-4, -10, 2, 0.3, Math.PI - 0.3);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(4, -10, 2, 0.3, Math.PI - 0.3);
      ctx.stroke();

      // Sleepy mouth
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, -6, 2, 0.3, Math.PI - 0.3);
      ctx.stroke();

      ctx.restore();
    }
  }
];

// Get a random character
function getRandomCharacter() {
  return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
}

// Draw character on a small preview canvas
function drawCharacterPreview(canvas, character) {
  const ctx = canvas.getContext('2d');
  const size = canvas.width;
  ctx.clearRect(0, 0, size, size);
  character.draw(ctx, size / 2, size / 2, 0, 0.6);
}
