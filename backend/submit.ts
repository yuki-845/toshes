import { ref } from 'vue';
import { collection, addDoc } from "firebase/firestore";  // Firestoreから必要な関数をインポート
import { db } from '@/plugin/firebase';  // Firestoreの初期化

interface User {
  todo: string;
  isDone: Boolean;
}

export const user = ref<User>({
  todo: "",
  isDone: false
});



// Firestoreにデータを保存
export const submit = async () => {
  try {
    const userCollectionRef = collection(db, 'users');  // users コレクションを参照
    const docRef = await addDoc(userCollectionRef, {    // 自動で一意のIDを生成してドキュメントを追加
      name: user.value.todo,
      email: user.value.isDone
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
