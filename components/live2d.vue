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

  try {
    // PIXI.Loaderを使用して画像をプリロード
    const loader = new PIXI.Loader();
    
    loader.add('textImage', './image/Miku/Text.png')
          .add('backgroundImage', './image/Miku/BackInitilal.png')
          .load(async (loader, resources) => {
            // 画像がロードされたら、スプライトを作成
            const text = new PIXI.Sprite(resources.textImage.texture);
            const background = new PIXI.Sprite(resources.backgroundImage.texture);

            // 画像のスケールと位置設定
            text.scale.set(0.28);
            text.x = text.width / 8;
            text.y = window.innerHeight - text.height * 2.7;

            background.scale.set(0.3);
            background.x = window.innerWidth / 3.3;
            background.y = -50;

            // ステージに画像を追加
            app.stage.addChild(text);
            app.stage.addChild(background);

            // Live2Dモデルの読み込み
            const model = await Live2DModel.from('./Resources/runtime/miku_sample_t04.model3.json');
            app.stage.addChild(model);

            // モデルの表示位置や表示場所などを設定
            model.x = window.innerWidth / 2.3;
            model.y = 10;
            model.anchor.set(0.5, 0.045);
            model.scale.set(0.77);
          });

  } catch (error) {
    console.error("モデルの読み込みに失敗しました:", error);
  }
});
</script>

<template>
    <canvas id="2d" class="canvas-style"></canvas>
</template>
