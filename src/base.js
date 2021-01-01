import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
    apiKey: "AIzaSyBQXbIH9aPIB3_2uZMD0g9fJSD0zVQm2Ok",
    authDomain: "rvproject-59000.firebaseapp.com",
    projectId: "rvproject-59000",
    storageBucket: "rvproject-59000.appspot.com",
    messagingSenderId: "540697986760",
    appId: "1:540697986760:web:19973ee07164cc477207fd",
    measurementId: "G-FND8RDEBBN"
});


export default app;