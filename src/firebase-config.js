// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDMb0qiwStlFEjN4A9cWW6qX9smqAgeotk",
  authDomain: "food-ordering-e4072.firebaseapp.com",
  projectId: "food-ordering-e4072",
  storageBucket: "food-ordering-e4072.appspot.com",
  messagingSenderId: "386808145827",
  appId: "1:386808145827:web:ed3c06b6ba380388001c16",
  measurementId: "G-NY1DTF29XF"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

export {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
}