// Human Tower - Character Definitions
// 切り抜き写真ベースのキャラクター対応

// キャラクター画像の設定
// images/ フォルダに透過PNG画像を入れて使う
// 画像がない場合はシルエットで表示

const CHARACTERS = [
  {
    id: 0,
    name: '腕組み',
    imageSrc: 'images/pose1.png',
    // 物理ボディのサイズ（ピクセル）
    physicsWidth: 50,
    physicsHeight: 70,
    // 表示サイズ
    displayWidth: 60,
    displayHeight: 84,
    color: '#FF6B6B',
    image: null,
    loaded: false
  },
  {
    id: 1,
    name: 'ファイティング',
    imageSrc: 'images/pose2.png',
    physicsWidth: 55,
    physicsHeight: 68,
    displayWidth: 66,
    displayHeight: 82,
    color: '#4ECDC4',
    image: null,
    loaded: false
  },
  {
    id: 2,
    name: 'キック',
    imageSrc: 'images/pose3.png',
    physicsWidth: 65,
    physicsHeight: 65,
    displayWidth: 78,
    displayHeight: 78,
    color: '#FF8C42',
    image: null,
    loaded: false
  },
  {
    id: 3,
    name: 'ガード',
    imageSrc: 'images/pose4.png',
    physicsWidth: 45,
    physicsHeight: 72,
    displayWidth: 54,
    displayHeight: 86,
    color: '#A8E6CF',
    image: null,
    loaded: false
  },
  {
    id: 4,
    name: 'アッパー',
    imageSrc: 'images/pose5.png',
    physicsWidth: 50,
    physicsHeight: 75,
    displayWidth: 60,
    displayHeight: 90,
    color: '#FFD93D',
    image: null,
    loaded: false
  },
  {
    id: 5,
    name: '構え',
    imageSrc: 'images/pose6.png',
    physicsWidth: 55,
    physicsHeight: 68,
    displayWidth: 66,
    displayHeight: 82,
    color: '#C3ACD0',
    image: null,
    loaded: false
  },
  {
    id: 6,
    name: 'ローキック',
    imageSrc: 'images/pose7.png',
    physicsWidth: 70,
    physicsHeight: 55,
    displayWidth: 84,
    displayHeight: 66,
    color: '#FF6F91',
    image: null,
    loaded: false
  },
  {
    id: 7,
    name: 'ヒザ蹴り',
    imageSrc: 'images/pose8.png',
    physicsWidth: 50,
    physicsHeight: 72,
    displayWidth: 60,
    displayHeight: 86,
    color: '#45B7D1',
    image: null,
    loaded: false
  },
  {
    id: 8,
    name: 'パンチ',
    imageSrc: 'images/pose9.png',
    physicsWidth: 65,
    physicsHeight: 65,
    displayWidth: 78,
    displayHeight: 78,
    color: '#F9C74F',
    image: null,
    loaded: false
  },
  {
    id: 9,
    name: '勝利ポーズ',
    imageSrc: 'images/pose10.png',
    physicsWidth: 55,
    physicsHeight: 70,
    displayWidth: 66,
    displayHeight: 84,
    color: '#96CEB4',
    image: null,
    loaded: false
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
      // 画像のアスペクト比に合わせてサイズ調整
      const scale = char.displayHeight / img.naturalHeight;
      char.displayWidth = img.naturalWidth * scale;
      char.physicsWidth = char.displayWidth * 0.8;
      attempted++;
      if (attempted >= totalImages) {
        allImagesAttempted = true;
        if (callback) callback();
      }
    };
    img.onerror = function() {
      // 画像が見つからない場合はシルエットを使う
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
    // 切り抜き写真を描画
    ctx.drawImage(character.image, -dw / 2, -dh / 2, dw, dh);
  } else {
    // 画像がない場合：シルエット人型を描画
    drawSilhouette(ctx, character, dw, dh);
  }

  ctx.restore();
}

// シルエット描画（画像がない場合のフォールバック）
function drawSilhouette(ctx, character, dw, dh) {
  const color = character.color;

  // 体のシルエット
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 8;

  // 頭
  const headR = dw * 0.2;
  ctx.beginPath();
  ctx.arc(0, -dh / 2 + headR + 2, headR, 0, Math.PI * 2);
  ctx.fill();

  // 胴体
  const bodyTop = -dh / 2 + headR * 2 + 4;
  const bodyW = dw * 0.45;
  const bodyH = dh * 0.35;
  ctx.beginPath();
  ctx.roundRect(-bodyW / 2, bodyTop, bodyW, bodyH, 4);
  ctx.fill();

  // 腕
  const armW = dw * 0.15;
  const armH = bodyH * 0.8;
  ctx.fillRect(-bodyW / 2 - armW, bodyTop + 2, armW, armH);
  ctx.fillRect(bodyW / 2, bodyTop + 2, armW, armH);

  // 脚
  const legTop = bodyTop + bodyH;
  const legW = bodyW * 0.38;
  const legH = dh - (bodyTop + bodyH) - (-dh / 2) - 4;
  ctx.fillRect(-bodyW / 2 + 2, legTop, legW, Math.max(legH, 10));
  ctx.fillRect(bodyW / 2 - legW - 2, legTop, legW, Math.max(legH, 10));

  ctx.shadowBlur = 0;

  // 名前表示
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 9px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(character.name, 0, dh / 2 + 12);
}

// ランダムキャラクター取得
function getRandomCharacter() {
  return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
}

// プレビュー描画
function drawCharacterPreview(canvas, character) {
  const ctx = canvas.getContext('2d');
  const size = canvas.width;
  ctx.clearRect(0, 0, size, size);
  drawCharacter(ctx, character, size / 2, size / 2, 0, 0.7);
}
