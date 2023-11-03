import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBAAISqN4H3R88rqkzvpZ5WVBUu2iy5Uzo",
    authDomain: "clinic-pharmacy-21dea.firebaseapp.com",
    projectId: "clinic-pharmacy-21dea",
    storageBucket: "clinic-pharmacy-21dea.appspot.com",
    messagingSenderId: "949064476195",
    appId: "1:949064476195:web:31cc2cc4364c0646abb396"
  };

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export {app,storage}