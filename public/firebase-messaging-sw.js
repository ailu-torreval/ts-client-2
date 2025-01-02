importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyDJUv4LDHfN--5hBWelGNgbqwgpA0K-kC0",
  authDomain: "exam-9a5fa.firebaseapp.com",
  projectId: "exam-9a5fa",
  storageBucket: "exam-9a5fa.firebasestorage.app",
  messagingSenderId: "136189553897",
  appId: "1:136189553897:web:bf9b118aa69d277cfa9478",
  measurementId: "G-PXJXBTPJJ9"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});