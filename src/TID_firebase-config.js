// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig_ = {
  apiKey: "AIzaSyByZanSBh8lU8XHjhzq1VcEAbNxhR8gn-0",
  authDomain: "techinnovationdrive.firebaseapp.com",
  projectId: "techinnovationdrive",
  storageBucket: "techinnovationdrive.appspot.com",
  messagingSenderId: "921553787621",
  appId: "1:921553787621:web:c09e675911eb7bdd27d20c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig_,'Techinnovationdrive');
export const db_ = getFirestore(app);
export const authentication_ = getAuth(app)