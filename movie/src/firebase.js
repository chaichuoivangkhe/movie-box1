// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics"; // Không cần nếu không dùng

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQbCndPu2QrwMv_JmH7M7AJBRiPOV7qLk",
  authDomain: "movie-booking-93a66.firebaseapp.com",
  projectId: "movie-booking-93a66",
  storageBucket: "movie-booking-93a66.appspot.com", // Sửa lại .appspot.com
  messagingSenderId: "362109053779",
  appId: "1:362109053779:web:2062a08e03554f5f878fa6",
  measurementId: "G-W7VFMD09T0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // Không cần nếu không dùng

export const auth = getAuth(app);
