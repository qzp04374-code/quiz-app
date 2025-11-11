// === Firebase 初期設定（Realtime Database 版）===

// FirebaseのライブラリをCDNから読み込み
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, set, get, onValue, update } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// あなたのFirebase設定（そのまま使えます）
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

// Firebaseアプリを初期化
const app = initializeApp(firebaseConfig);

// データベースを使えるようにする
const db = getDatabase(app);

// 他のファイル（index.html / student.html）で使うためにエクスポート
export { db, ref, set, get, onValue, update };

