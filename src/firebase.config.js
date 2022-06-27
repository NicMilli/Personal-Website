// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcqS1JHOCYAcEql5vpgG4Rl868Gw-Ae2c",
  authDomain: "personal-website-b4960.firebaseapp.com",
  projectId: "personal-website-b4960",
  storageBucket: "personal-website-b4960.appspot.com",
  messagingSenderId: "701020255463",
  appId: "1:701020255463:web:d7ec6b058b903bb3df9e42",
  measurementId: "G-6C234WYV34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore()