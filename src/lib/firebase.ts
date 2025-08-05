
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "novainhealth",
  "appId": "1:50257127794:web:92ccd2ffd5e5a2d47755eb",
  "storageBucket": "novainhealth.firebasestorage.app",
  "apiKey": "AIzaSyD02JtH4VTE1pfpJyuhFNnrvLH2_vb4xuc",
  "authDomain": "novain-health.firebaseapp.com",
  "messagingSenderId": "50257127794"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
