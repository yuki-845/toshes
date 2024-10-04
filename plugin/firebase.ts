import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebaseプロジェクトの設定
const firebaseConfig = {
  apiKey: "AIzaSyB6nIyoUsLcWDi5BjPP38SNAxl7Oftc6XQ",
  authDomain: "toshes-48066.firebaseapp.com",
  databaseURL: "https://toshes-48066-default-rtdb.firebaseio.com",
  projectId: "toshes-48066",
  storageBucket: "toshes-48066.appspot.com",
  messagingSenderId: "700384523694",
  appId: "1:700384523694:web:26549f1d5260fdf04c043f",
  measurementId: "G-66PXKF4XNB"
};

// Firebaseの初期化
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);  // Firestoreの初期化
export { db };
