# 人間タワー (Human Tower)

どうぶつタワー風の人間積み上げゲーム！

## 遊び方

- タップ or スペースキーで人間を落とす
- できるだけ高く積み上げよう
- 人間が落ちたらゲームオーバー

## キャラクター（10種類）

1. Tポーズ - 腕を広げたポーズ
2. おすわり - 座ったポーズ
3. さかだち - 逆立ちポーズ
4. スクワット - しゃがんだポーズ
5. バンザイ - 両手を上げたポーズ
6. 片足立ち - バランスポーズ
7. 腕立て - 腕立て伏せポーズ
8. ブリッジ - ブリッジポーズ
9. ジャンプ星 - 大の字ジャンプ
10. まるまり - 丸まったポーズ

## 技術スタック

- HTML5 Canvas
- Matter.js (物理エンジン)
- Vanilla JavaScript

## ローカル実行

```bash
npx serve .
```

## アプリ化 (将来対応)

Capacitor を使用して iOS/Android アプリ化が可能です。

```bash
npm install @capacitor/core @capacitor/cli
npx cap init
npx cap add android
npx cap add ios
npx cap sync
```
