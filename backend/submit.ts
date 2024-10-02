import { ref } from 'vue';
import { collection, addDoc } from "firebase/firestore";  // Firestoreから必要な関数をインポート
import { db } from '@/plugin/firebase';  // Firestoreの初期化

interface User {
  name: string;
  email: string;
}

export const user = ref<User>({
  name: "",
  email: ""
});



// Firestoreにデータを保存
export const submit = async () => {
  try {
    const userCollectionRef = collection(db, 'users');  // users コレクションを参照
    const docRef = await addDoc(userCollectionRef, {    // 自動で一意のIDを生成してドキュメントを追加
      name: user.value.name,
      email: user.value.email
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
