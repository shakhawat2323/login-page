import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBU8CJctNbT9Rh4hkatIQoa4gnEyynfFeE",
  authDomain: "email-password-beb7d.firebaseapp.com",
  projectId: "email-password-beb7d",
  storageBucket: "email-password-beb7d.firebasestorage.app",
  messagingSenderId: "825139543297",
  appId: "1:825139543297:web:b233cd8f5c24595bd36f00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service


export  const auth = getAuth(app);
