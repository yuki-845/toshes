<script setup lang="ts">
// TypeScript (ts)ファイルに変換

// ライブラリの読み込み
import * as PIXI from 'pixi.js';
import { Live2DModel } from 'pixi-live2d-display';
import { onMounted } from 'vue';

// グローバルオブジェクトに PIXI を設定
window.PIXI = PIXI as any;

onMounted(async () => {
  // PIXI.Application のインスタンスを生成
  const app = new PIXI.Application({
    width: window.innerWidth - 15,
    height: window.innerHeight - 300,
    backgroundColor: 0xffffff,
    view: document.getElementById('2d') as HTMLCanvasElement, // canvas要素を指定
  });

  // canvas要素をDOMに追加 (すでに view にバインドされているため、この行は不要です)
  // document.body.appendChild(app.view); 

  try {
    // モデルの読み込み
    const model = await Live2DModel.from('./Resources/Hiyori/Hiyori.model3.json');

    // モデルをpixiのステージに追加
    app.stage.addChild(model);

    // モデルの表示位置や表示場所などを設定
    model.x = window.innerWidth / 2;
    model.y = 100;
    model.scale.set(0.2, 0.2); // モデルの縮尺
    model.anchor.set(0.6, 0.1); // 表示の基準の位置

  } catch (error) {
    console.error("モデルの読み込みに失敗しました:", error);
  }
});

</script>

<template>
    <canvas id="2d"></canvas>
</template>