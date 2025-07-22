// Import the functions SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCA8OtCvFntt8I7bmCMfE5M1P3AHGdBJFA",
  authDomain: "campuscare-cac86.firebaseapp.com",
  projectId: "campuscare-cac86",
  storageBucket: "campuscare-cac86.appspot.com",
  messagingSenderId: "54278127231",
  appId: "1:54278127231:web:a19d794c55f25e70f7894a",
  measurementId: "G-5LH27Y0M15",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Export auth
export const googleProvider = new GoogleAuthProvider();

export default app;
