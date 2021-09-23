import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_KEY_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_KEY_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const fb = initializeApp(config);

export const firebase = {
    auth: getAuth(fb),
    functions: getFunctions(fb),
    db: getFirestore(fb),
    storage: getStorage(fb),
};

export default ({ app }, inject) => {
    // Can be accessed via this.$firebase in components etc.
    inject('firebase', firebase);
};

