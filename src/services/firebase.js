// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtvojTlf950bvSNSdwqTSGZVcqQyeGGKY",
  authDomain: "saritasa-5e8f0.firebaseapp.com",
  projectId: "saritasa-5e8f0",
  storageBucket: "saritasa-5e8f0.appspot.com",
  messagingSenderId: "775983091203",
  appId: "1:775983091203:web:bda6ee10c1c41ca9e98836",
  measurementId: "G-GC2CX3EL7C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
