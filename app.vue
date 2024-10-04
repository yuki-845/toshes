<script setup lang="ts">
import live2d from './components/live2d.vue';
import { user, submit } from './backend/submit'; // submit.ts からインポート
import { useUserCollection } from './backend/Fetch';  // useUserCollection関数とsubmit関数をインポート

const { users } = useUserCollection();  // Firestoreからデータを取得するための関数を取得

    // ボタンクリック時にデータを取得して送信する関数
    const handleClick = async () => {
      await submit(); // Firestoreからデータを取得
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
        <button class="addTodoButton">
          Add Todo
        </button>
       
      </div>
    </div> 
    <div class="todoList">

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

