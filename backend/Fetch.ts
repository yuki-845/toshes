import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';  // Firestoreの関数をインポート
import { db } from '@/plugin/firebase';  // Firestoreの初期化済みインスタンスをインポート

// Firestoreのコレクションデータを取得するカスタムフック
export function useUserCollection() {
  const users = ref<any[]>([]);  // Firestoreのドキュメントデータを格納する変数

  const fetchUsers = async () => {
    try {
      const userCollectionRef = collection(db, 'users');  // 'users' コレクションの参照を取得
      const querySnapshot = await getDocs(userCollectionRef);  // コレクション内の全ドキュメントを取得
      querySnapshot.forEach((doc) => {
        users.value.push(doc.data());  // 各ドキュメントのデータを配列に追加
      });
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  // コンポーネントがマウントされたらデータを取得
  onMounted(() => {
    fetchUsers();
  });

  return {
    users
  };
}
