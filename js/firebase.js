// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD66wnsulVcoDnmeMwCMnuD4yN_MruolY4",
  authDomain: "gamene-phamtruong.firebaseapp.com",
  projectId: "gamene-phamtruong",
  storageBucket: "gamene-phamtruong.appspot.com",
  messagingSenderId: "217162354893",
  appId: "1:217162354893:web:3d5aeba641dace0a2a5984",
  measurementId: "G-YBQ4GHBLRT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);