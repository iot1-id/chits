import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDfFEl9Fupz5JLrTAV5chE3Wzb840BWD6Y",
  authDomain: "accd-fa9dc.firebaseapp.com",
  projectId: "accd-fa9dc",
  storageBucket: "accd-fa9dc.appspot.com",
  messagingSenderId: "446510928143",
  appId: "1:446510928143:web:216ef548b81350d689ee7a",
  measurementId: "G-VYGHW3NZ1Y",
});

export const auth = app.auth();
export var db = app.firestore();
export default app;
