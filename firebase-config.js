import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getAuth
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAN1ztj4w0-wfzL6HQ8vy7k8FmxPW-7Jk8",
  authDomain: "pearl-benin.firebaseapp.com",
  projectId: "pearl-benin",
  storageBucket: "pearl-benin.firebasestorage.app",
  messagingSenderId: "320745525176",
  appId: "1:320745525176:web:842c5e27ef172e5030c94d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
