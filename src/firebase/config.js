import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBH_bpdqfuWtOa5hHAWvfZJLWJHKiASrAo",
  authDomain: "rhoam-trading-systems.firebaseapp.com",
  projectId: "rhoam-trading-systems",
  storageBucket: "rhoam-trading-systems.appspot.com",
  messagingSenderId: "214990121997",
  appId: "1:214990121997:web:0486bbb43e24d4855cb944",
};

// initialize app
initializeApp(firebaseConfig);
// initialize firestore
const db = getFirestore();
// initialize firebase auth
const auth = getAuth();

export { db, auth };
