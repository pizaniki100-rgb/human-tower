// Human Tower - Main Game Logic

const Game = {
  canvas: null,
  ctx: null,
  // States: start, waiting, moving, dropping, settling, gameover
  //  waiting: キャラが上で静止
  //  moving: ドラッグで左右に動かせる（離したら落下）
  //  dropping: 落下中
  //  settling: 着地待ち
  state: 'start',
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

  // キャラクター位置
  charX: 0,
  charY: 50,
  moveSpeed: 4,
  movingLeft: false,
  movingRight: false,
  touchX: null,
  isDragging: false,

  init: function() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();

    this.bestScore = parseInt(localStorage.getItem('humanTowerBest') || '0');
    this.updateBestScoreDisplay();

    Physics.init(this.canvas);
    this.setupInput();

    this.nextCanvas = document.getElementById('nextCanvas');

    loadCharacterImages(() => {
      console.log('Character images loaded');
    });

    this.showStartScreen();
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
    // タッチ操作: ドラッグで移動、離したら落下
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = this.canvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;

      if (this.state === 'waiting') {
        // ドラッグ開始 → 移動状態へ
        this.state = 'moving';
        this.isDragging = true;
        this.touchX = x;
      }
    }, { passive: false });

    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (this.state === 'moving' && this.isDragging) {
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        this.touchX = touch.clientX - rect.left;
      }
    }, { passive: false });

    this.canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      if (this.state === 'moving' && this.isDragging) {
        // 指を離した → 落下！
        this.isDragging = false;
        this.dropCharacter();
      }
    }, { passive: false });

    this.canvas.addEventListener('touchcancel', (e) => {
      if (this.state === 'moving' && this.isDragging) {
        this.isDragging = false;
        this.dropCharacter();
      }
    }, { passive: false });

    // マウス操作（PC用）
    this.canvas.addEventListener('mousedown', (e) => {
      if (this.state === 'waiting') {
        this.state = 'moving';
        this.isDragging = true;
        const rect = this.canvas.getBoundingClientRect();
        this.touchX = e.clientX - rect.left;
      }
    });

    this.canvas.addEventListener('mousemove', (e) => {
      if (this.state === 'moving' && this.isDragging) {
        const rect = this.canvas.getBoundingClientRect();
        this.touchX = e.clientX - rect.left;
      }
    });

    this.canvas.addEventListener('mouseup', (e) => {
      if (this.state === 'moving' && this.isDragging) {
        this.isDragging = false;
        this.dropCharacter();
      }
    });

    // キーボード操作
    document.addEventListener('keydown', (e) => {
      if (e.code === 'ArrowLeft') {
        if (this.state === 'waiting') this.state = 'moving';
        this.movingLeft = true;
      } else if (e.code === 'ArrowRight') {
        if (this.state === 'waiting') this.state = 'moving';
        this.movingRight = true;
      } else if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        if (this.state === 'moving') {
          this.dropCharacter();
        }
      }
    });

    document.addEventListener('keyup', (e) => {
      if (e.code === 'ArrowLeft') this.movingLeft = false;
      if (e.code === 'ArrowRight') this.movingRight = false;
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
    this.dropCount = 0;
    this.shakeAmount = 0;
    this.updateScoreDisplay();

    Physics.clear();
    Physics.init(this.canvas);

    this.highestY = Physics.getGroundY();

    this.nextCharacter = getRandomCharacter();
    this.prepareNextCharacter();

    this.state = 'waiting';
  },

  prepareNextCharacter: function() {
    this.currentCharacter = this.nextCharacter;
    this.nextCharacter = getRandomCharacter();

    if (this.nextCanvas) {
      drawCharacterPreview(this.nextCanvas, this.nextCharacter);
    }

    // 中央に静止
    this.charX = this.canvas.width / 2;
    this.touchX = null;
    this.isDragging = false;
    this.movingLeft = false;
    this.movingRight = false;
  },

  dropCharacter: function() {
    if (this.state !== 'moving') return;

    const dropY = this.charY - this.cameraY;
    const body = Physics.createCharacterBody(this.charX, dropY, this.currentCharacter);
    Physics.addBody(body);
    this.bodies.push(body);
    this.dropCount++;

    this.state = 'dropping';

    setTimeout(() => {
      this.shakeAmount = 5;
    }, 400);

    setTimeout(() => {
      if (this.state === 'dropping') {
        this.state = 'settling';
      }
    }, 1200);

    setTimeout(() => {
      if (this.state === 'settling' || this.state === 'dropping') {
        this.afterDrop();
      }
    }, 2200);
  },

  afterDrop: function() {
    if (this.state !== 'settling' && this.state !== 'dropping') return;

    if (Physics.checkFallen(this.bodies)) {
      this.gameOver();
      return;
    }

    this.score = this.bodies.length;
    this.updateScoreDisplay();

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
    this.state = 'waiting';
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
    }, 1000);
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

    // キャラクター移動（moving状態のとき）
    if (this.state === 'moving') {
      const margin = 20;

      // タッチ/マウス操作：指の位置に追従
      if (this.touchX !== null && this.isDragging) {
        const diff = this.touchX - this.charX;
        this.charX += diff * 0.25;
      }

      // キーボード操作
      if (this.movingLeft) this.charX -= this.moveSpeed;
      if (this.movingRight) this.charX += this.moveSpeed;

      this.charX = Math.max(margin, Math.min(this.canvas.width - margin, this.charX));
    }

    // 落下中チェック
    if (this.state === 'dropping' || this.state === 'settling') {
      if (Physics.checkFallen(this.bodies)) {
        this.gameOver();
      }
    }

    this.cameraY += (this.targetCameraY - this.cameraY) * 0.05;

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

    // 背景
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#0f0c29');
    grad.addColorStop(0.5, '#302b63');
    grad.addColorStop(1, '#24243e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    this.drawStars(ctx, w, h);

    ctx.save();

    if (this.shakeAmount > 0) {
      ctx.translate(
        (Math.random() - 0.5) * this.shakeAmount,
        (Math.random() - 0.5) * this.shakeAmount
      );
    }

    ctx.translate(0, this.cameraY);

    this.drawStage(ctx, w, h);

    // 積まれたキャラクター
    this.bodies.forEach(body => {
      const char = body.character;
      if (char) {
        drawCharacter(ctx, char, body.position.x, body.position.y, body.angle, 1);
      }
    });

    // 操作中のキャラクター
    if ((this.state === 'waiting' || this.state === 'moving') && this.currentCharacter) {
      const previewY = this.charY - this.cameraY;

      if (this.state === 'waiting') {
        ctx.globalAlpha = 0.6 + Math.sin(performance.now() / 300) * 0.3;
      } else {
        ctx.globalAlpha = 0.9;
      }

      drawCharacter(ctx, this.currentCharacter, this.charX, previewY, 0, 1);
      ctx.globalAlpha = 1;
    }

    // 操作ヒント
    if (this.state === 'waiting') {
      const msgY = this.charY - this.cameraY + 60;
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('ドラッグで移動、離して落下！', w / 2, msgY);
    }

    ctx.restore();

    if (this.state !== 'start' && this.state !== 'gameover') {
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

  drawStage: function(ctx, w, h) {
    const groundY = Physics.getGroundY();
    const pLeft = Physics.getPlatformLeft();
    const pRight = Physics.getPlatformRight();
    const pWidth = Physics.platformWidth;
    const centerX = w / 2;
    const bH = Physics.GROUND_HEIGHT + 16;

    // 浮遊感の影
    ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
    ctx.beginPath();
    ctx.ellipse(centerX, groundY + bH + 30, pWidth * 0.35, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // バナナ本体（まっすぐ）
    ctx.save();
    const r = 12; // 角丸
    ctx.beginPath();
    ctx.moveTo(pLeft - 6 + r, groundY);
    ctx.lineTo(pRight + 6 - r, groundY);
    ctx.quadraticCurveTo(pRight + 6, groundY, pRight + 6, groundY + r);
    ctx.lineTo(pRight + 6, groundY + bH - r);
    ctx.quadraticCurveTo(pRight + 6, groundY + bH, pRight + 6 - r, groundY + bH);
    ctx.lineTo(pLeft - 6 + r, groundY + bH);
    ctx.quadraticCurveTo(pLeft - 6, groundY + bH, pLeft - 6, groundY + bH - r);
    ctx.lineTo(pLeft - 6, groundY + r);
    ctx.quadraticCurveTo(pLeft - 6, groundY, pLeft - 6 + r, groundY);
    ctx.closePath();

    // バナナの黄色グラデーション
    const bananaGrad = ctx.createLinearGradient(0, groundY, 0, groundY + bH);
    bananaGrad.addColorStop(0, '#ffe135');
    bananaGrad.addColorStop(0.3, '#ffd700');
    bananaGrad.addColorStop(0.7, '#f5c800');
    bananaGrad.addColorStop(1, '#d4a800');
    ctx.fillStyle = bananaGrad;
    ctx.fill();

    // 輪郭線
    ctx.strokeStyle = '#b8920a';
    ctx.lineWidth = 2;
    ctx.stroke();

    // ハイライト（上部の光沢）
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.fillRect(pLeft + 5, groundY + 3, pWidth - 10, 6);

    // 中央の筋（バナナっぽさ）
    ctx.strokeStyle = 'rgba(180, 140, 0, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pLeft + 10, groundY + bH * 0.45);
    ctx.lineTo(pRight - 10, groundY + bH * 0.45);
    ctx.stroke();

    // 左端のヘタ
    ctx.fillStyle = '#8B7332';
    ctx.beginPath();
    ctx.moveTo(pLeft - 4, groundY + 10);
    ctx.quadraticCurveTo(pLeft - 20, groundY + 2, pLeft - 16, groundY - 6);
    ctx.quadraticCurveTo(pLeft - 12, groundY - 2, pLeft - 2, groundY + 6);
    ctx.closePath();
    ctx.fill();

    // 右端のヘタ
    ctx.fillStyle = '#6B5322';
    ctx.beginPath();
    ctx.moveTo(pRight + 4, groundY + 10);
    ctx.quadraticCurveTo(pRight + 18, groundY, pRight + 14, groundY - 5);
    ctx.quadraticCurveTo(pRight + 10, groundY - 1, pRight + 2, groundY + 6);
    ctx.closePath();
    ctx.fill();

    // 茶色い斑点（熟れた感じ）
    ctx.fillStyle = 'rgba(139, 90, 10, 0.2)';
    for (let i = 0; i < 5; i++) {
      const sx = pLeft + 30 + i * (pWidth / 5);
      const sy = groundY + bH * 0.5 + (i % 2 === 0 ? -3 : 3);
      ctx.beginPath();
      ctx.ellipse(sx, sy, 4, 2.5, i * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  },

  drawHeightIndicator: function(ctx, w, h) {
    if (this.bodies.length === 0) return;

    const groundY = Physics.getGroundY();
    const towerHeight = groundY - this.highestY;
    const meters = (towerHeight / 70).toFixed(1);

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

document.addEventListener('DOMContentLoaded', () => {
  Game.init();
});

function startGame() {
  Game.startGame();
}

function retryGame() {
  Game.startGame();
}
