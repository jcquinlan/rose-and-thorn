// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuencj8LgyOP5GEoXcVbEos7iXoZs7P88",
  authDomain: "rose-and-thorn.firebaseapp.com",
  databaseURL: "https://rose-and-thorn.firebaseio.com",
  projectId: "rose-and-thorn",
  storageBucket: "rose-and-thorn.appspot.com",
  messagingSenderId: "351299228334",
  appId: "1:351299228334:web:6b3f299577a56d8c61133f"
};;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default () => firebase;