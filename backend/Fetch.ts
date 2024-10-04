import { ref, onMounted, onUnmounted } from 'vue';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';  // Firestoreのリアルタイムリスナーと削除関数をインポート
import { db } from '@/plugin/firebase';  // Firestoreの初期化済みインスタンスをインポート

export function useUserCollection() {
  const users = ref<any[]>([]);  // Firestoreのドキュメントデータを格納する変数

  // リアルタイムでFirestoreからデータを取得し、isDoneがtrueのものは削除
  const fetchUsers = () => {
    const userCollectionRef = collection(db, 'users');  // 'users' コレクションの参照を取得

    // リアルタイムでデータを取得するリスナー
    const unsubscribe = onSnapshot(userCollectionRef, (snapshot) => {
      users.value = [];  // 配列をリセット
      snapshot.forEach(async (doc) => {
        const data = doc.data();
        users.value.push({ ...data, id: doc.id });  // 各ドキュメントのデータを配列に追加

        // isDoneがtrueなら、そのドキュメントを削除する
        if (data.isDone === true) {
          try {
            await deleteDoc(doc.ref);  // Firestoreからドキュメントを削除
            console.log(`Deleted document with ID: ${doc.id}`);
          } catch (error) {
            console.error("Error deleting document: ", error);
          }
        }
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
