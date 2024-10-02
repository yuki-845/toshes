<script setup lang="ts">
import live2d from './components/live2d.vue';
import { user, submit } from './backend/dataAdd'; // submit.ts からインポート

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
   <button
     type="button"
     @click="submit"
   >
     Submit
   </button>
 </div>
</template>

