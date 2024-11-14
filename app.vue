<script setup lang="ts">
import live2d from './components/live2d.vue';
import { user, submit } from './backend/submit'; // submit.ts からインポート
import { useUserCollection } from './backend/Fetch';  // useUserCollection関数とsubmit関数をインポート
import { ref, onMounted, watchEffect } from 'vue';
import { collection, query, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/plugin/firebase';  // Firestoreの初期化
import axios from 'axios';

const { users } = useUserCollection();  // Firestoreからデータを取得するための関数を取得

const showInput = ref(false);
const text = ref('');
const speaker = ref('1'); // スピーカーIDの状態

// ボタンクリック時にデータを取得して送信する関数
const addInput = async () => {
  const isSubmitted = await submit();  // Firestoreにデータを送信
  if (isSubmitted) {
    user.value.todo = "";
    toggleInput();  // 成功したらインプットを閉じる
  }
};

// ボタンをクリックしたときに表示・非表示を切り替える関数
const toggleInput = () => {
  showInput.value = !showInput.value;
};

// FirestoreにisDoneの状態を更新する関数
const updateTaskStatus = async (task) => {
  const docRef = doc(db, 'users', task.id); // 更新するドキュメントの参照
  try {
    await updateDoc(docRef, { isDone: task.isDone }); // FirestoreのisDoneを更新
  } catch (error) {
    console.error("Error updating task: ", error);
  }
};



// 音声を再生するメソッド
const playAudio = async () => {
  try {
    const response = await axios.post('/api/audio', {
      text: text.value,
      speaker: speaker.value,
    });

    const base64Audio = response?.data?.response;
    if (!base64Audio) throw new Error('音声データの取得に失敗しました');

    const byteString = atob(base64Audio);
    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }

    const audioBlob = new Blob([byteArray], { type: 'audio/x-wav' });
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.volume = 1;
    audio.play();
  } catch (e) {
    console.error('音声再生エラー', e);
  }
};

import { GoogleGenerativeAI } from '@google/generative-ai';
const inputText = ref('');
const outputText = ref('');

const generateText = async () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('APIキーが設定されていません。');
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    console.log('Model:', model); // モデルを確認
    const prompt = inputText.value;

    // generateContent メソッドを使用
    const result = await model.generateContent(prompt);
    const response = await result.response;
    text.value = response.text(); // 正しいプロパティを取得
  } catch (error) {
    console.error('Error generating text:', error);
    outputText.value = 'テキスト生成中にエラーが発生しました。もう一度試してください。';
  }
};

watchEffect(() => {
  playAudio();
});

</script>

<template>
  <header>
    <img src="./public/image/TOSHES.png" alt="画像がないよー" class="toshesImage" />
  </header>
  <div>
    <input v-model="text" placeholder="テキストを入力" />
    <input v-model="speaker" placeholder="スピーカーIDを入力" />
    <button @click="playAudio">再生</button>
  </div>
  <div>
    <input type="text" v-model="inputText" />
    <button @click="generateText">生成</button>
    <p>{{ outputText }}</p>
  </div>
  <div class="live2dBackGround">
    <live2d></live2d>
  </div>
  <div class="main">
    <div class="characterSelect">
      <img src="./public/image/Miku/Select.png" alt="画像がないよー" class="selectImage" />
      <img src="./public/image/Miroku/noSelect.png" alt="画像がないよー" class="noSelectImage">
    </div>
    <div class="centerContainer">
      <div class="characterTalk">
        <div class="characterNameContainer">
          <div class="border"></div>
          <div class="characterName">初音ミク</div>
        </div>
        <div class="Talk">何かをしゃべるよー</div>
      </div>
      <div class="addTodo">
        <button class="addTodoButton" @click="toggleInput">Add Todo</button>
      </div>
    </div>
    <div class="todoList">
      <div class="todoListInner">
        <img src="./public/image/Miku/TodoList.png" alt="" class="todoListImage">
        <div>
          <div v-if="users && users.length > 0">
            <div v-for="(user, index) in users" :key="user.id">
              <input type="checkbox" id="scales" v-model="user.isDone" @change="updateTaskStatus(user)" />
              <label for="scales" class="todoText">{{ user.todo }}</label>
            </div>
          </div>
          <div v-else>
            <p>タスクがありません</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showInput" class="overlay">
    <div class="input-container">
      <input type="text" v-model="user.todo" placeholder="Enter some text" class="custom-input" />
      <p>入力されたテキスト: {{ text }}</p>
      <div class="button-container">
        <button @click="toggleInput">Close</button>
        <button @click="addInput">Add</button>
      </div>
    </div>
  </div>
</template>
