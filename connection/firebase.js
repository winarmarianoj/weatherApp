import firebase from "firebase";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRHFJemDpXsExZYBmEY0tE3WoG3cI6KMo",
  authDomain: "weatherapp-684df.firebaseapp.com",
  projectId: "weatherapp-684df",
  storageBucket: "weatherapp-684df.appspot.com",
  messagingSenderId: "117839981850",
  appId: "1:117839981850:web:0d7dae20ed23ab3e87d0a3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db
};