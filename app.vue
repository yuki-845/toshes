<script setup lang="ts">
import live2d from './components/live2d.vue';
import { user, submit } from './backend/submit'; // submit.ts からインポート
import { useUserCollection } from './backend/Fetch';  // useUserCollection関数とsubmit関数をインポート

const { users, fetchUsers } = useUserCollection();  // Firestoreからデータを取得するための関数を取得

    // ボタンクリック時にデータを取得して送信する関数
    const handleClick = async () => {
      await submit(); // Firestoreからデータを取得
    };

   
</script>

<template>
  <div class="section">
    <live2d></live2d>
  </div>
  <div class="page">
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
    <div v-if="users && users.length > 0">  <!-- usersが存在し、配列に要素があるか確認 -->
      <h2>Firestoreのコレクション内のすべてのドキュメント:</h2>
      <ul>
        <li v-for="(user, index) in users" :key="index">
          <pre>{{ user }}</pre>  <!-- 各ドキュメントのデータをそのまま描画 -->
        </li>
      </ul>
    </div>
    <div v-else>
      <p>データを取得中...</p>  <!-- データが取得される前に表示するメッセージ -->
    </div>
  </div>
</template>

