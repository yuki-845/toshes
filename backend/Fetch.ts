import { ref, onMounted, onUnmounted } from 'vue';
import { collection, onSnapshot } from 'firebase/firestore';  // Firestoreのリアルタイムリスナーをインポート
import { db } from '@/plugin/firebase';  // Firestoreの初期化済みインスタンスをインポート

export function useUserCollection() {
  const users = ref<any[]>([]);  // Firestoreのドキュメントデータを格納する変数

  // リアルタイムでFirestoreからデータを取得する関数
  const fetchUsers = () => {
    const userCollectionRef = collection(db, 'users');  // 'users' コレクションの参照を取得

    // リアルタイムでデータを取得するリスナー
    const unsubscribe = onSnapshot(userCollectionRef, (snapshot) => {
      users.value = [];  // 配列をリセット
      snapshot.forEach((doc) => {
        users.value.push(doc.data());  // 各ドキュメントのデータを配列に追加
      });
    }, (error) => {
      console.error("Error fetching documents: ", error);
    });

    // コンポーネントがアンマウントされたらリスナーを解除
    onUnmounted(() => {
      unsubscribe();
    });
  };

  // コンポーネントがマウントされたときにデータを取得
  onMounted(() => {
    fetchUsers();
  });

  return {
    users
  };
}
