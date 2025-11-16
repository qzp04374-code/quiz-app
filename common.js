// Firebase v9 Modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { 
  getDatabase, ref, set, update, get, onValue, child 
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// あなたの Firebase 設定 (そのまま使用OK)
const firebaseConfig = {
  apiKey: "AIzaSyBke-wTU16skpbK8z80ddK04tE154dHERQ",
  authDomain: "satosan-41eac.firebaseapp.com",
  databaseURL: "https://satosan-41eac-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "satosan-41eac",
  storageBucket: "satosan-41eac.firebasestorage.app",
  messagingSenderId: "992482993229",
  appId: "1:992482993229:web:e2c59b078233b0ed16e804",
  measurementId: "G-VT9FKHN3LT"
};

// Firebase 初期化
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// 共通で使う Firebase 関数
export { ref, set, update, onValue, get, child };

