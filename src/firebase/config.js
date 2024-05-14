import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBsT63Sm7UZbOYGnh9BOBmuyFizt8P3qjk",
    authDomain: "olx-clone-2affd.firebaseapp.com",
    projectId: "olx-clone-2affd",
    storageBucket: "olx-clone-2affd.appspot.com",
    messagingSenderId: "593916151647",
    appId: "1:593916151647:web:2a64fe47268bfdb8b0d8ea",
    measurementId: "G-KL5S974YXH"
  };


const app = initializeApp(firebaseConfig);

export default app;
