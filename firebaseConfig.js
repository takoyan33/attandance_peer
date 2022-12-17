// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBneneT3r5w8x07Qnutaz5yaE_dnfuxE44",
  authDomain: "attendance-peer.firebaseapp.com",
  projectId: "attendance-peer",
  storageBucket: "attendance-peer.appspot.com",
  messagingSenderId: "879718016669",
  appId: "1:879718016669:web:ab8c7c2c415b13fa4e5674",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

initializeFirestore(app, {
  ignoreUndefinedProperties: true,
});

export const database = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const firestore = getFirestore(app);
