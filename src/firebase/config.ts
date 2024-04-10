// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyB_QqSOC1YN4-WFfQENiVjAEAHo1q-3yaw",
  authDomain: "expense-calc-ae210.firebaseapp.com",
  projectId: "expense-calc-ae210",
  storageBucket: "expense-calc-ae210.appspot.com",
  messagingSenderId: "296770746705",
  appId: "1:296770746705:web:685e84dac504b13e573b70",
  measurementId: "G-RQ0ZWRMKZG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
