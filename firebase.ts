// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPFAhq5KPLkVrpjUezugQpfgdGFTrfCyQ",
  authDomain: "video-net-435b9.firebaseapp.com",
  projectId: "video-net-435b9",
  storageBucket: "video-net-435b9.appspot.com",
  messagingSenderId: "283868784537",
  appId: "1:283868784537:web:280ed1d93c3bf065739508",
  measurementId: "G-YZ9VN6JXK6"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore()
const auth = getAuth()
// const analytics = getAnalytics(app);


// export our database and app
export default app;
export  { auth , db }
