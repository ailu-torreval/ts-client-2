import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyDJUv4LDHfN--5hBWelGNgbqwgpA0KC0",
  authDomain: "exam-9a5fa.firebaseapp.com",
  projectId: "exam-9a5fa",
  storageBucket: "exam-9a5fa.firebasestorage.app",
  messagingSenderId: "136189553897",
  appId: "1:136189553897:web:bf9b118aa69d277cfa9478",
  measurementId: "G-PXJXBTPJJ9"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const messaging = firebase.messaging();

export { messaging };