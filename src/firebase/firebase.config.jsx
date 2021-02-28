import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCoQkzuKrb8PHVtXeP83T6TVVIZwzB24C4",
  authDomain: "constructorapp-fdffb.firebaseapp.com",
  projectId: "constructorapp-fdffb",
  storageBucket: "constructorapp-fdffb.appspot.com",
  messagingSenderId: "623143406303",
  appId: "1:623143406303:web:f06c2bb547c1b644a3376a",
  measurementId: "G-XKGEBCZPC0",
  databaseURL: "https://constructorapp-fdffb-default-rtdb.firebaseio.com",
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

export const db = firebase.database();
