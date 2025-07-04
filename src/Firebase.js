// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, EmailAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDSgCCuPB_OwMUJ1mtYU9S4M_RQppRGAvk",
  authDomain: "netflix-clone-7216c.firebaseapp.com",
  projectId: "netflix-clone-7216c",
  storageBucket: "netflix-clone-7216c.appspot.com",
  messagingSenderId: "31592676824",
  appId: "1:31592676824:web:d240ad0854539df7c106ad",
  measurementId: "G-G8S4J9WFFP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth and Firestore instances
const db = getFirestore(app);
const auth = getAuth(app);

// ✅ Export everything needed
export { auth, EmailAuthProvider };
export default db;
