// Human Tower - Character Definitions

const CHARACTERS = [
  {
    id: 0, name: '腕組み',
    imageSrc: 'images/IMG_7579.png',
    physicsWidth: 36, physicsHeight: 66,
    displayWidth: 45, displayHeight: 75,
    color: '#E8A87C', pose: 'stand',
    image: null, loaded: false
  },
  {
    id: 1, name: 'しゃがみ',
    imageSrc: 'images/IMG_7572.png',
    physicsWidth: 45, physicsHeight: 54,
    displayWidth: 52, displayHeight: 63,
    color: '#FF6B6B', pose: 'crouch',
    image: null, loaded: false
  },
  {
    id: 2, name: '仁王立ち',
    imageSrc: 'images/IMG_7573.png',
    physicsWidth: 51, physicsHeight: 63,
    displayWidth: 60, displayHeight: 72,
    color: '#4ECDC4', pose: 'tpose',
    image: null, loaded: false
  },
  {
    id: 3, name: 'バナナ',
    imageSrc: 'images/IMG_7574.png',
    physicsWidth: 36, physicsHeight: 66,
    displayWidth: 45, displayHeight: 75,
    color: '#FFD93D', pose: 'stand',
    image: null, loaded: false
  },
  {
    id: 4, name: '寝そべり',
    imageSrc: 'images/IMG_7575.png',
    physicsWidth: 72, physicsHeight: 39,
    displayWidth: 82, displayHeight: 45,
    color: '#FF8C42', pose: 'sit',
    image: null, loaded: false
  },
  {
    id: 5, name: '仰向け',
    imageSrc: 'images/IMG_7576.png',
    physicsWidth: 60, physicsHeight: 45,
    displayWidth: 67, displayHeight: 52,
    color: '#C3ACD0', pose: 'sit',
    image: null, loaded: false
  },
  {
    id: 6, name: 'コート',
    imageSrc: 'images/IMG_7577.png',
    physicsWidth: 39, physicsHeight: 72,
    displayWidth: 48, displayHeight: 82,
    color: '#45B7D1', pose: 'stand',
    image: null, loaded: false
  },
  {
    id: 7, name: '片膝つき',
    imageSrc: 'images/IMG_7578.png',
    physicsWidth: 45, physicsHeight: 63,
    displayWidth: 52, displayHeight: 72,
    color: '#F9C74F', pose: 'crouch',
    image: null, loaded: false
  }
];

// 画像読み込み
let imagesLoaded = 0;
let totalImages = CHARACTERS.length;
let allImagesAttempted = false;

function loadCharacterImages(callback) {
  let attempted = 0;

  CHARACTERS.forEach((char) => {
    const img = new Image();
    img.onload = function() {
      char.image = img;
      char.loaded = true;
      const scale = char.displayHeight / img.naturalHeight;
      char.displayWidth = img.naturalWidth * scale;
      attempted++;
      if (attempted >= totalImages) {
        allImagesAttempted = true;
        if (callback) callback();
      }
    };
    img.onerror = function() {
      char.loaded = false;
      attempted++;
      if (attempted >= totalImages) {
        allImagesAttempted = true;
        if (callback) callback();
      }
    };
    img.src = char.imageSrc;
  });
}

// キャラクター描画関数
function drawCharacter(ctx, character, x, y, angle, scale) {
  scale = scale || 1;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.scale(scale, scale);

  const dw = character.displayWidth;
  const dh = character.displayHeight;

  if (character.loaded && character.image) {
    ctx.drawImage(character.image, -dw / 2, -dh / 2, dw, dh);
  } else {
    drawPose(ctx, character, dw, dh);
  }

  ctx.restore();
}

// ポーズ別の人型描画
function drawPose(ctx, character, dw, dh) {
  const color = character.color;
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 6;
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';

  const cx = 0;
  const cy = 0;
  const headR = Math.min(dw, dh) * 0.14;

  switch (character.pose) {
    case 'stand':
      drawStickFigure(ctx, cx, cy, dw, dh, headR, {
        leftArm: -30, rightArm: 30,
        leftLeg: -8, rightLeg: 8
      });
      break;

    case 'banzai':
      drawStickFigure(ctx, cx, cy, dw, dh, headR, {
        leftArm: -150, rightArm: 150,
        leftLeg: -10, rightLeg: 10
      });
      break;

    case 'kick':
      drawStickFigure(ctx, cx, cy, dw, dh, headR, {
        leftArm: -45, rightArm: 60,
        leftLeg: -10, rightLeg: 80
      });
      break;

    case 'crouch':
      drawCrouchFigure(ctx, cx, cy, dw, dh, headR, color);
      break;

    case 'tpose':
      drawStickFigure(ctx, cx, cy, dw, dh, headR, {
        leftArm: -90, rightArm: 90,
        leftLeg: -12, rightLeg: 12
      });
      break;

    case 'jump':
      drawStickFigure(ctx, cx, cy, dw, dh, headR, {
        leftArm: -130, rightArm: 130,
        leftLeg: -30, rightLeg: 30
      });
      break;

    case 'oneleg':
      drawStickFigure(ctx, cx, cy, dw, dh, headR, {
        leftArm: -60, rightArm: 60,
        leftLeg: -5, rightLeg: 70
      });
      break;

    case 'handstand':
      drawHandstandFigure(ctx, cx, cy, dw, dh, headR, color);
      break;

    case 'punch':
      drawStickFigure(ctx, cx, cy, dw, dh, headR, {
        leftArm: -30, rightArm: 90,
        leftLeg: -15, rightLeg: 20
      });
      break;

    case 'sit':
      drawSitFigure(ctx, cx, cy, dw, dh, headR, color);
      break;

    case 'fighter':
      drawFighterFigure(ctx, cx, cy, dw, dh, headR, color);
      break;

    default:
      drawStickFigure(ctx, cx, cy, dw, dh, headR, {
        leftArm: -30, rightArm: 30,
        leftLeg: -8, rightLeg: 8
      });
  }

  ctx.shadowBlur = 0;
}

// 棒人間ベース描画
function drawStickFigure(ctx, cx, cy, dw, dh, headR, angles) {
  const top = cy - dh / 2;
  const headCY = top + headR + 1;
  const shoulderY = headCY + headR + 2;
  const bodyLen = dh * 0.35;
  const hipY = shoulderY + bodyLen;
  const armLen = dw * 0.35;
  const legLen = dh / 2 - (hipY - cy) - 2;

  // 頭
  ctx.beginPath();
  ctx.arc(cx, headCY, headR, 0, Math.PI * 2);
  ctx.fill();

  // 胴体
  ctx.beginPath();
  ctx.moveTo(cx, shoulderY);
  ctx.lineTo(cx, hipY);
  ctx.stroke();

  // 左腕
  const laRad = angles.leftArm * Math.PI / 180;
  ctx.beginPath();
  ctx.moveTo(cx, shoulderY);
  ctx.lineTo(cx + Math.sin(laRad) * armLen, shoulderY + Math.cos(laRad) * armLen);
  ctx.stroke();

  // 右腕
  const raRad = angles.rightArm * Math.PI / 180;
  ctx.beginPath();
  ctx.moveTo(cx, shoulderY);
  ctx.lineTo(cx + Math.sin(raRad) * armLen, shoulderY + Math.cos(raRad) * armLen);
  ctx.stroke();

  // 左脚
  const llRad = angles.leftLeg * Math.PI / 180;
  ctx.beginPath();
  ctx.moveTo(cx, hipY);
  ctx.lineTo(cx + Math.sin(llRad) * legLen, hipY + Math.cos(llRad) * legLen);
  ctx.stroke();

  // 右脚
  const rlRad = angles.rightLeg * Math.PI / 180;
  ctx.beginPath();
  ctx.moveTo(cx, hipY);
  ctx.lineTo(cx + Math.sin(rlRad) * legLen, hipY + Math.cos(rlRad) * legLen);
  ctx.stroke();
}

// しゃがみポーズ
function drawCrouchFigure(ctx, cx, cy, dw, dh, headR, color) {
  const top = cy - dh / 2;
  const headCY = top + headR + 1;
  const shoulderY = headCY + headR + 1;
  const hipY = shoulderY + dh * 0.2;

  ctx.beginPath();
  ctx.arc(cx, headCY, headR, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(cx, shoulderY);
  ctx.lineTo(cx, hipY);
  ctx.stroke();

  // 腕（前に出す）
  ctx.beginPath();
  ctx.moveTo(cx, shoulderY);
  ctx.lineTo(cx - dw * 0.3, shoulderY + 4);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx, shoulderY);
  ctx.lineTo(cx + dw * 0.3, shoulderY + 4);
  ctx.stroke();

  // 脚（曲げ）
  const kneeY = hipY + dh * 0.15;
  ctx.beginPath();
  ctx.moveTo(cx, hipY);
  ctx.lineTo(cx - dw * 0.2, kneeY);
  ctx.lineTo(cx - dw * 0.25, cy + dh / 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx, hipY);
  ctx.lineTo(cx + dw * 0.2, kneeY);
  ctx.lineTo(cx + dw * 0.25, cy + dh / 2);
  ctx.stroke();
}

// 逆立ちポーズ
function drawHandstandFigure(ctx, cx, cy, dw, dh, headR, color) {
  const bottom = cy + dh / 2;
  const headCY = bottom - headR - 1;
  const shoulderY = headCY - headR - 2;
  const hipY = shoulderY - dh * 0.35;

  // 頭（下）
  ctx.beginPath();
  ctx.arc(cx, headCY, headR, 0, Math.PI * 2);
  ctx.fill();

  // 胴体（逆）
  ctx.beginPath();
  ctx.moveTo(cx, shoulderY);
  ctx.lineTo(cx, hipY);
  ctx.stroke();

  // 腕（地面に着く）
  ctx.beginPath();
  ctx.moveTo(cx, shoulderY);
  ctx.lineTo(cx - dw * 0.3, bottom);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx, shoulderY);
  ctx.lineTo(cx + dw * 0.3, bottom);
  ctx.stroke();

  // 脚（上に伸ばす）
  ctx.beginPath();
  ctx.moveTo(cx, hipY);
  ctx.lineTo(cx - 4, cy - dh / 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx, hipY);
  ctx.lineTo(cx + 4, cy - dh / 2);
  ctx.stroke();
}

// 座りポーズ
function drawSitFigure(ctx, cx, cy, dw, dh, headR, color) {
  const top = cy - dh / 2;
  const headCY = top + headR + 1;
  const shoulderY = headCY + headR + 1;
  const hipY = shoulderY + dh * 0.25;

  ctx.beginPath();
  ctx.arc(cx, headCY, headR, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(cx, shoulderY);
  ctx.lineTo(cx, hipY);
  ctx.stroke();

  // 腕
  ctx.beginPath();
  ctx.moveTo(cx, shoulderY);
  ctx.lineTo(cx - dw * 0.25, hipY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx, shoulderY);
  ctx.lineTo(cx + dw * 0.25, hipY);
  ctx.stroke();

  // 脚（前に伸ばす）
  ctx.beginPath();
  ctx.moveTo(cx, hipY);
  ctx.lineTo(cx - dw * 0.4, cy + dh / 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx, hipY);
  ctx.lineTo(cx + dw * 0.4, cy + dh / 2);
  ctx.stroke();
}

// 格闘家ポーズ（腕組み・がっしり体型）
function drawFighterFigure(ctx, cx, cy, dw, dh, headR, color) {
  const top = cy - dh / 2;
  const headCY = top + headR + 1;
  const shoulderY = headCY + headR + 2;
  const bodyLen = dh * 0.38;
  const hipY = shoulderY + bodyLen;

  // 頭（少し大きめ）
  ctx.beginPath();
  ctx.arc(cx, headCY, headR * 1.15, 0, Math.PI * 2);
  ctx.fill();

  // 太い胴体
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(cx, shoulderY);
  ctx.lineTo(cx, hipY);
  ctx.stroke();

  // 肩幅を広く
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(cx - dw * 0.28, shoulderY + 2);
  ctx.lineTo(cx + dw * 0.28, shoulderY + 2);
  ctx.stroke();

  // 腕組み（左腕）
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(cx - dw * 0.28, shoulderY + 2);
  ctx.lineTo(cx - dw * 0.15, shoulderY + bodyLen * 0.45);
  ctx.lineTo(cx + dw * 0.12, shoulderY + bodyLen * 0.4);
  ctx.stroke();

  // 腕組み（右腕）
  ctx.beginPath();
  ctx.moveTo(cx + dw * 0.28, shoulderY + 2);
  ctx.lineTo(cx + dw * 0.15, shoulderY + bodyLen * 0.45);
  ctx.lineTo(cx - dw * 0.12, shoulderY + bodyLen * 0.4);
  ctx.stroke();

  // 脚
  ctx.lineWidth = 4;
  const legLen = dh / 2 - (hipY - cy) - 2;
  ctx.beginPath();
  ctx.moveTo(cx, hipY);
  ctx.lineTo(cx - dw * 0.15, hipY + legLen);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx, hipY);
  ctx.lineTo(cx + dw * 0.15, hipY + legLen);
  ctx.stroke();

  // タトゥー風の模様（腕）
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(cx - dw * 0.22, shoulderY + 8, 3, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx + dw * 0.22, shoulderY + 8, 3, 0, Math.PI * 2);
  ctx.stroke();

  // 線の太さを戻す
  ctx.lineWidth = 3;
  ctx.strokeStyle = color;
}

// シャッフルキュー方式のランダム
let _charQueue = [];

function getRandomCharacter() {
  if (_charQueue.length === 0) {
    _charQueue = CHARACTERS.slice();
    // Fisher-Yatesシャッフル
    for (let i = _charQueue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [_charQueue[i], _charQueue[j]] = [_charQueue[j], _charQueue[i]];
    }
  }
  return _charQueue.pop();
}

function drawCharacterPreview(canvas, character) {
  const dpr = window.devicePixelRatio || 1;
  const logicalSize = 80;
  canvas.width = logicalSize * dpr;
  canvas.height = logicalSize * dpr;
  canvas.style.width = logicalSize + 'px';
  canvas.style.height = logicalSize + 'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.clearRect(0, 0, logicalSize, logicalSize);
  drawCharacter(ctx, character, logicalSize / 2, logicalSize / 2, 0, 1.2);
}
