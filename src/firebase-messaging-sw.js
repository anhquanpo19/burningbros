/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAT7s3a01nDIplh-rBLYX--BbMHd6nxF5Y",
  authDomain: "topskills-68987.firebaseapp.com",
  projectId: "topskills-68987",
  storageBucket: "topskills-68987.appspot.com",
  messagingSenderId: "852923733301",
  appId: "1:852923733301:web:eddbce960f1c1f481ae87c",
});

import { useNotiStore } from "./store/notification";

const messaging = firebase.messaging();
messaging.onBackgroundMessage(async (payload) => {
  const noti = useNotiStore();
  await noti.getList({ sort: "-created_at" });
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
});
