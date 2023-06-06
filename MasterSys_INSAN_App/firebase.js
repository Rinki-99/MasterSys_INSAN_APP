// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTY8BD6pTenaJTlLBZta4LRky_2xZEZIE",
  authDomain: "mastersys-insan-app.firebaseapp.com",
  projectId: "mastersys-insan-app",
  storageBucket: "mastersys-insan-app.appspot.com",
  messagingSenderId: "116729889118",
  appId: "1:116729889118:web:663048d3db01f9ff700fcf"
};

// Initialize Firebase
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };