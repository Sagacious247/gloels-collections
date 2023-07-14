import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxXNqoa7zVToHES2erjIr1Y2YSZ9RlQ_I",
  authDomain: "gloels-collections.firebaseapp.com",
  projectId: "gloels-collections",
  storageBucket: "gloels-collections.appspot.com",
  messagingSenderId: "868321900930",
  appId: "1:868321900930:web:3f97883a853977d8deb79b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const db = getFirestore(app)
 const auth = getAuth()

 export { auth, db };