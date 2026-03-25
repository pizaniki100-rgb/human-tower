// Human Tower - Character Definitions

const CHARACTERS = [
  {
    id: 0, name: '直立',
    imageSrc: 'images/pose1.png',
    physicsWidth: 22, physicsHeight: 38,
    displayWidth: 22, displayHeight: 38,
    color: '#FF6B6B', pose: 'stand',
    image: null, loaded: false
  },
  {
    id: 1, name: 'バンザイ',
    imageSrc: 'images/pose2.png',
    physicsWidth: 28, physicsHeight: 42,
    displayWidth: 28, displayHeight: 42,
    color: '#4ECDC4', pose: 'banzai',
    image: null, loaded: false
  },
  {
    id: 2, name: 'キック',
    imageSrc: 'images/pose3.png',
    physicsWidth: 35, physicsHeight: 32,
    displayWidth: 35, displayHeight: 32,
    color: '#FF8C42', pose: 'kick',
    image: null, loaded: false
  },
  {
    id: 3, name: 'しゃがみ',
    imageSrc: 'images/pose4.png',
    physicsWidth: 26, physicsHeight: 28,
    displayWidth: 26, displayHeight: 28,
    color: '#A8E6CF', pose: 'crouch',
    image: null, loaded: false
  },
  {
    id: 4, name: 'Tポーズ',
    imageSrc: 'images/pose5.png',
    physicsWidth: 40, physicsHeight: 35,
    displayWidth: 40, displayHeight: 35,
    color: '#FFD93D', pose: 'tpose',
    image: null, loaded: false
  },
  {
    id: 5, name: 'ジャンプ',
    imageSrc: 'images/pose6.png',
    physicsWidth: 24, physicsHeight: 40,
    displayWidth: 24, displayHeight: 40,
    color: '#C3ACD0', pose: 'jump',
    image: null, loaded: false
  },
  {
    id: 6, name: '片足立ち',
    imageSrc: 'images/pose7.png',
    physicsWidth: 22, physicsHeight: 38,
    displayWidth: 22, displayHeight: 38,
    color: '#FF6F91', pose: 'oneleg',
    image: null, loaded: false
  },
  {
    id: 7, name: '逆立ち',
    imageSrc: 'images/pose8.png',
    physicsWidth: 28, physicsHeight: 38,
    displayWidth: 28, displayHeight: 38,
    color: '#45B7D1', pose: 'handstand',
    image: null, loaded: false
  },
  {
    id: 8, name: 'パンチ',
    imageSrc: 'images/pose9.png',
    physicsWidth: 32, physicsHeight: 34,
    displayWidth: 32, displayHeight: 34,
    color: '#F9C74F', pose: 'punch',
    image: null, loaded: false
  },
  {
    id: 9, name: '座り',
    imageSrc: 'images/pose10.png',
    physicsWidth: 28, physicsHeight: 24,
    displayWidth: 28, displayHeight: 24,
    color: '#96CEB4', pose: 'sit',
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
      char.physicsWidth = char.displayWidth * 0.9;
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

function getRandomCharacter() {
  return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
}

function drawCharacterPreview(canvas, character) {
  const ctx = canvas.getContext('2d');
  const size = canvas.width;
  ctx.clearRect(0, 0, size, size);
  drawCharacter(ctx, character, size / 2, size / 2, 0, 1.5);
}
