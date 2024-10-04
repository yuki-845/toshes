<script setup lang="ts">
import live2d from './components/live2d.vue';
import { user, submit } from './backend/submit'; // submit.ts からインポート
import { useUserCollection } from './backend/Fetch';  // useUserCollection関数とsubmit関数をインポート
import { ref, onMounted } from 'vue';
import { collection, query, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/plugin/firebase';  // Firestoreの初期化
const { users } = useUserCollection();  // Firestoreからデータを取得するための関数を取得

    // ボタンクリック時にデータを取得して送信する関数
    const addInput = async () => {
      const isSubmitted = await submit();  // Firestoreにデータを送信
  if (isSubmitted) {
    user.value.todo = ""; 
    toggleInput();  // 成功したらインプットを閉じる
  }
    };

import { ref } from 'vue';

// inputフィールドの表示・非表示を管理する状態
const showInput = ref(false);
const text = ref('');

// ボタンをクリックしたときに表示・非表示を切り替える関数
const toggleInput = () => {
  showInput.value = !showInput.value;
};
// FirestoreにisDoneの状態を更新する関数
const updateTaskStatus = async (task) => {
  const docRef = doc(db, 'users', task.id); // 更新するドキュメントの参照
  console.log("javascript")
  try {
    await updateDoc(docRef, { isDone: task.isDone }); // FirestoreのisDoneを更新
    console.log(`Task with ID: ${task.id} updated`);
  } catch (error) {
    console.error("Error updating task: ", error);
  }
};
</script>

<template>
  <header>
    <img src="./public/image/TOSHES.png" alt="画像がないよー" class="toshesImage" />
  </header>
  <div class="live2dBackGround">
    <live2d></live2d>
  </div>
  <div class="main">
    <div class="characterSelect">
    <img src="./public/image/Miku/Select.png" alt="画像がないよー" class="selectImage" />
    <!-- <img src="./public/image/Miroku/noSelect.png" alt="画像がないよー" class="noSelectImage"> -->
    </div>
    <div class="centerContainer">
    <div class="characterTalk">
      <div class="characterNameContainer">
        <div class="border">

        </div>
        <div  class="characterName">
          初音ミク
        </div>
      </div>
      <div class="Talk">
        何かをしゃべるよー
      </div>
    </div>
      <div class="addTodo">
        <button class="addTodoButton" @click="toggleInput">
          Add Todo
        </button>
       
      </div>
    </div> 
    <div class="todoList">
      <div class="todoListInner">
        <img src="./public/image/Miku/TodoList.png" alt="" class="todoListImage">
        <div>
          <div v-if="users && users.length > 0">  
            <div v-for="(user, index) in users" :key="user.id">
    <div class=""></div>
    <!-- チェックボックスの状態を v-model でバインドし、変更時に updateTaskStatus を呼び出す -->
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
        <input type="text" v-model=user.todo placeholder="Enter some text" class="custom-input" />
        <p>入力されたテキスト: {{ text }}</p>

        <!-- ボタンのコンテナ -->
        <div class="button-container">
          <button @click="toggleInput">Close</button>
          <button @click="addInput">Add</button>
        </div>
      </div>
    </div>
  <!-- <div class="page">
   <label>
     <span>
       お名前:
     </span>
     <input
       type="text"
       v-model="user.name"
     >
   </label>
   <label>
     <span>
       email:
     </span>
     <input
       type="text"
       v-model="user.email"
     >
   </label>
   <button type="button" @click="handleClick">Submit</button> 
 </div>
 <div class="page">
    <div v-if="users && users.length > 0">  
      <h2>Firestoreのコレクション内のすべてのドキュメント:</h2>
      <ul>
        <li v-for="(user, index) in users" :key="index">
          <pre>{{ user }}</pre>  
        </li>
      </ul>
    </div>
    <div v-else>
      <p>データを取得中...</p> 
    </div>
  </div> -->
</template>

