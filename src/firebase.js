// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCA8OtCvFntt8I7bmCMfE5M1P3AHGdBJFA",
  authDomain: "campuscare-cac86.firebaseapp.com",
  projectId: "campuscare-cac86",
  storageBucket: "campuscare-cac86.firebasestorage.app",
  messagingSenderId: "54278127231",
  appId: "1:54278127231:web:a19d794c55f25e70f7894a",
  measurementId: "G-5LH27Y0M15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;