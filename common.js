// ----- Firebase モジュール -----
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, update, onValue, child, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// ----- Firebase 設定 -----
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

// ----- 初期化 -----
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ----- URLから room を取得 -----
export function getRoom() {
  const params = new URLSearchParams(location.search);
  return params.get("room") || "kyoto-01";
}

export { db, ref, set, update, onValue, child, get };

