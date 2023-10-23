// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJFp66O-Qmda3f22fDS7N3OapYppifZjY",
  authDomain: "week38project.firebaseapp.com",
  projectId: "week38project",
  storageBucket: "week38project.appspot.com",
  messagingSenderId: "973300453403",
  appId: "1:973300453403:web:d5011a12a1f82d4cbf68be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app)
const storage = getStorage(app)
export {app, database, storage}