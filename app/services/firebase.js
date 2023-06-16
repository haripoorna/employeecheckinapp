import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  getAdditionalUserInfo,
} from "firebase/auth";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxiFif2EAQDMD4oYdooF8kldQhMlkFTEU",
  authDomain: "employeecheckin-efe7b.firebaseapp.com",
  projectId: "employeecheckin-efe7b",
  storageBucket: "employeecheckin-efe7b.appspot.com",
  messagingSenderId: "619635891114",
  appId: "1:619635891114:web:aa327b56f01d3c7c4fe9d3",
  measurementId: "G-7HKFNCMTVH",
};

const app = initializeApp(firebaseConfig);
const dataBase = getFirestore(app);
const auth = getAuth(app);

export {
  dataBase,
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  getAdditionalUserInfo,
};
