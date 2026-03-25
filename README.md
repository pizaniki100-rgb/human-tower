# 人間タワー (Human Tower)

物理エンジンを使った人間積み上げゲーム！タップして人を落として、できるだけ高く積み上げよう！

## 遊び方

1. 「スタート」ボタンを押す
2. 人が左右に揺れるので、タイミングよくタップ（またはスペースキー）で落とす
3. うまく積み上げてタワーを高くしよう
4. 人が落ちたらゲームオーバー

## キャラクター画像の追加

`images/` フォルダに透過PNG画像を入れるとカスタムキャラクターとして使えます。

- `images/pose1.png` 〜 `images/pose10.png`
- 背景が透明な切り抜き画像（PNG）推奨
- 画像がない場合はシルエットで表示されます

## 技術スタック

- HTML5 Canvas
- Matter.js (物理エンジン)
- Vanilla JavaScript

## GitHub Pagesで遊ぶ

1. リポジトリの **Settings** → **Pages** を開く
2. Source: **Deploy from a branch**
3. Branch: **main** → **/ (root)** → **Save**
4. 数分後に公開URLでプレイ可能

## ローカル実行

```bash
npx serve .
```
