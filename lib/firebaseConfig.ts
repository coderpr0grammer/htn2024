// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAptV0Enzj53TUss8uNh88HhRdL-S67f7A",
    authDomain: "notfa-co.firebaseapp.com",
    projectId: "notfa-co",
    storageBucket: "notfa-co.appspot.com",
    messagingSenderId: "561386642364",
    appId: "1:561386642364:web:174938659d1e899bd4a9b9",
    measurementId: "G-CCQJS4LWGB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

let analytics: Analytics;
if (process.env.NODE_ENV === "production") {
    if (typeof window !== "undefined") {
        analytics = getAnalytics(app);
    }
}