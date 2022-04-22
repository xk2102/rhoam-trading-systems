import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDgl1E5hx_mGwSLRi0yBMVsk2DfSjxxI8o",
  authDomain: "react-firebase9-c95b9.firebaseapp.com",
  projectId: "react-firebase9-c95b9",
  storageBucket: "react-firebase9-c95b9.appspot.com",
  messagingSenderId: "825145174909",
  appId: "1:825145174909:web:118dbd50c85bd2be067a14",
};

// initialize app
initializeApp(firebaseConfig);
// initialize firestore
const db = getFirestore();
// initialize firebase auth
const auth = getAuth();

export { db, auth };
