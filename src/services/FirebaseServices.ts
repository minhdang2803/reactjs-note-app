import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA5tLtvHAinn3Ts34t6s6WTyuQcjjFV6Vw",
    authDomain: "flutter-learn-crashlyst.firebaseapp.com",
    databaseURL: "https://flutter-learn-crashlyst-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "flutter-learn-crashlyst",
    storageBucket: "flutter-learn-crashlyst.firebasestorage.app",
    messagingSenderId: "48409509686",
    appId: "1:48409509686:web:400070d620f27453aefd97",
    measurementId: "G-Y3XLNBQY97"
};

let cachedApp: FirebaseApp | undefined;

export function getFirebaseApp(): FirebaseApp {
    if (cachedApp) return cachedApp;
    if (!getApps().length) {
        cachedApp = initializeApp(firebaseConfig);
    } else {
        cachedApp = getApp();
    }
    return cachedApp;
}

// Backwards-compatible name used in App.tsx
export function initFirebase(): FirebaseApp {
    return getFirebaseApp();
}

