import { doc, getDoc } from "firebase/firestore";
import { db } from '@/plugin/firebase';  // Firestoreの初期化済みインスタンスをインポート

// Firestoreからユーザーデータを取得する関数
export const fetchUserData = async (userId: string) => {
  try {
    const userDocRef = doc(db, 'users', userId);  // ドキュメントの参照を取得
    const userDoc = await getDoc(userDocRef);     // ドキュメントのデータを取得
    if (userDoc.exists()) {
      return userDoc.data();  // ドキュメントのデータを返す
    } else {
      console.log("No such document!");  // ドキュメントが存在しない場合の処理
      return null;
    }
  } catch (error) {
    console.error("Error fetching document: ", error);  // エラーハンドリング
    return null;
  }
};
