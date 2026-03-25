// Human Tower - Main Game Logic

const Game = {
  canvas: null,
  ctx: null,
  state: 'start', // start, playing, dropping, gameover
  score: 0,
  bestScore: 0,
  bodies: [],
  currentCharacter: null,
  nextCharacter: null,
  cameraY: 0,
  targetCameraY: 0,
  highestY: 0,
  animationId: null,
  lastTime: 0,
  shakeAmount: 0,
  dropCount: 0,

  // Swinging character
  swingX: 0,
  swingSpeed: 2.5,
  swingDirection: 1,

  init: function() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();

    // Load best score
    this.bestScore = parseInt(localStorage.getItem('humanTowerBest') || '0');
    this.updateBestScoreDisplay();

    // Initialize physics
    Physics.init(this.canvas);

    // Setup input
    this.setupInput();

    // Next preview canvas
    this.nextCanvas = document.getElementById('nextCanvas');

    // Load character images
    loadCharacterImages(() => {
      console.log('Character images loaded');
    });

    // Show start screen
    this.showStartScreen();

    // Start loop
    this.lastTime = performance.now();
    this.loop();

    window.addEventListener('resize', () => this.resizeCanvas());
  },

  resizeCanvas: function() {
    const maxWidth = 420;
    const w = Math.min(window.innerWidth, maxWidth);
    const h = window.innerHeight;
    this.canvas.width = w;
    this.canvas.height = h;
  },

  setupInput: function() {
    const handleDrop = (e) => {
      e.preventDefault();
      if (this.state === 'playing') {
        this.dropCharacter();
      }
    };

    this.canvas.addEventListener('click', handleDrop);
    this.canvas.addEventListener('touchstart', handleDrop, { passive: false });

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        if (this.state === 'playing') {
          this.dropCharacter();
        }
      }
    });
  },

  showStartScreen: function() {
    document.getElementById('startScreen').style.display = 'flex';
    document.getElementById('gameOverScreen').style.display = 'none';
    this.drawCharacterParade();
  },

  drawCharacterParade: function() {
    const parade = document.querySelector('.character-parade');
    if (!parade) return;
    parade.innerHTML = '';

    CHARACTERS.forEach(char => {
      const c = document.createElement('canvas');
      c.width = 80;
      c.height = 80;
      drawCharacterPreview(c, char);
      parade.appendChild(c);
    });
  },

  startGame: function() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('gameOverScreen').style.display = 'none';

    this.score = 0;
    this.bodies = [];
    this.cameraY = 0;
    this.targetCameraY = 0;
    this.highestY = Physics.getGroundY();
    this.dropCount = 0;
    this.shakeAmount = 0;
    this.updateScoreDisplay();

    Physics.clear();
    Physics.init(this.canvas);

    this.nextCharacter = getRandomCharacter();
    this.prepareNextCharacter();

    this.state = 'playing';
  },

  prepareNextCharacter: function() {
    this.currentCharacter = this.nextCharacter;
    this.nextCharacter = getRandomCharacter();

    if (this.nextCanvas) {
      drawCharacterPreview(this.nextCanvas, this.nextCharacter);
    }

    this.swingX = this.canvas.width / 2;
    this.swingDirection = (Math.random() > 0.5) ? 1 : -1;
    this.swingSpeed = Math.min(2.5 + this.dropCount * 0.12, 5.5);
  },

  dropCharacter: function() {
    if (this.state !== 'playing') return;

    const dropY = 50 - this.cameraY;
    const body = Physics.createCharacterBody(this.swingX, dropY, this.currentCharacter);
    Physics.addBody(body);
    this.bodies.push(body);
    this.dropCount++;

    this.state = 'dropping';

    // Landing shake
    setTimeout(() => {
      this.shakeAmount = 5;
    }, 400);

    setTimeout(() => {
      if (this.state === 'dropping') {
        this.afterDrop();
      }
    }, 1800);
  },

  afterDrop: function() {
    if (this.state !== 'dropping') return;

    if (Physics.checkFallen(this.bodies)) {
      this.gameOver();
      return;
    }

    this.score = this.bodies.length;
    this.updateScoreDisplay();

    // Update highest point & camera
    let minY = Physics.getGroundY();
    this.bodies.forEach(b => {
      if (b.position.y < minY) {
        minY = b.position.y;
      }
    });

    if (minY < this.canvas.height * 0.4) {
      this.targetCameraY = -(minY - this.canvas.height * 0.4);
    }

    this.highestY = minY;
    this.prepareNextCharacter();
    this.state = 'playing';
  },

  gameOver: function() {
    this.state = 'gameover';
    this.shakeAmount = 15;

    if (this.score > this.bestScore) {
      this.bestScore = this.score;
      localStorage.setItem('humanTowerBest', this.bestScore.toString());
      document.getElementById('newBest').style.display = 'block';
    } else {
      document.getElementById('newBest').style.display = 'none';
    }

    this.updateBestScoreDisplay();

    setTimeout(() => {
      document.getElementById('gameOverScreen').style.display = 'flex';
      document.getElementById('finalScore').textContent = this.score + '人';
    }, 800);
  },

  loop: function() {
    const now = performance.now();
    const delta = Math.min(now - this.lastTime, 32);
    this.lastTime = now;

    this.update(delta);
    this.render();

    this.animationId = requestAnimationFrame(() => this.loop());
  },

  update: function(delta) {
    Physics.update(delta);

    // Swing character
    if (this.state === 'playing') {
      this.swingX += this.swingSpeed * this.swingDirection;
      const margin = 30;
      if (this.swingX > this.canvas.width - margin) {
        this.swingDirection = -1;
      } else if (this.swingX < margin) {
        this.swingDirection = 1;
      }
    }

    // Check fallen during dropping
    if (this.state === 'dropping') {
      if (Physics.checkFallen(this.bodies)) {
        this.gameOver();
      }
    }

    // Smooth camera
    this.cameraY += (this.targetCameraY - this.cameraY) * 0.05;

    // Shake decay
    if (this.shakeAmount > 0) {
      this.shakeAmount *= 0.9;
      if (this.shakeAmount < 0.5) this.shakeAmount = 0;
    }
  },

  render: function() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Background
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#0f0c29');
    grad.addColorStop(0.5, '#302b63');
    grad.addColorStop(1, '#24243e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Stars
    this.drawStars(ctx, w, h);

    ctx.save();

    // Camera shake
    if (this.shakeAmount > 0) {
      ctx.translate(
        (Math.random() - 0.5) * this.shakeAmount,
        (Math.random() - 0.5) * this.shakeAmount
      );
    }

    // Camera offset
    ctx.translate(0, this.cameraY);

    // Ground
    this.drawGround(ctx, w, h);

    // Draw placed characters
    this.bodies.forEach(body => {
      const char = body.character;
      if (char) {
        drawCharacter(ctx, char, body.position.x, body.position.y, body.angle, 1);
      }
    });

    // Draw swinging character (preview)
    if (this.state === 'playing' && this.currentCharacter) {
      ctx.globalAlpha = 0.7 + Math.sin(performance.now() / 200) * 0.3;
      drawCharacter(ctx, this.currentCharacter, this.swingX, 50 - this.cameraY, 0, 1);
      ctx.globalAlpha = 1;

      // Drop guide line
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(this.swingX, 90 - this.cameraY);
      ctx.lineTo(this.swingX, Physics.getGroundY());
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.restore();

    // Height indicator
    if (this.state === 'playing' || this.state === 'dropping') {
      this.drawHeightIndicator(ctx, w, h);
    }
  },

  drawStars: function(ctx, w, h) {
    if (!this._stars) {
      this._stars = [];
      for (let i = 0; i < 50; i++) {
        this._stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.5 + 0.5,
          a: Math.random()
        });
      }
    }

    this._stars.forEach(star => {
      const twinkle = Math.sin(performance.now() / 1000 + star.a * 10) * 0.3 + 0.7;
      ctx.fillStyle = 'rgba(255, 255, 255, ' + (twinkle * 0.6) + ')';
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fill();
    });
  },

  drawGround: function(ctx, w, h) {
    const groundY = Physics.getGroundY();

    ctx.fillStyle = '#2d2d5e';
    ctx.fillRect(0, groundY, w, Physics.GROUND_HEIGHT + 300);

    // Surface line
    ctx.strokeStyle = '#6a6aaa';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    ctx.lineTo(w, groundY);
    ctx.stroke();

    // Platform marker
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.fillRect(w / 2 - 50, groundY, 100, 4);

    // Texture
    ctx.strokeStyle = 'rgba(74, 74, 138, 0.3)';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 3; i++) {
      ctx.beginPath();
      ctx.moveTo(0, groundY + i * 10);
      ctx.lineTo(w, groundY + i * 10);
      ctx.stroke();
    }
  },

  drawHeightIndicator: function(ctx, w, h) {
    if (this.bodies.length === 0) return;

    // Show height in terms of people stacked
    const groundY = Physics.getGroundY();
    const towerHeight = groundY - this.highestY;
    const meters = (towerHeight / 70).toFixed(1); // rough estimate

    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(meters + 'm', 10, h - 10);
  },

  updateScoreDisplay: function() {
    document.getElementById('score').textContent = this.score + '人';
  },

  updateBestScoreDisplay: function() {
    document.getElementById('bestScore').textContent = 'BEST: ' + this.bestScore + '人';
  }
};

// DOM ready
document.addEventListener('DOMContentLoaded', () => {
  Game.init();
});

// Global button handlers
function startGame() {
  Game.startGame();
}

function retryGame() {
  Game.startGame();
}
