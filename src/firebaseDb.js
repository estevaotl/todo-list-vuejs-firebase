// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAKh7biBbXRllDnWq7ylLAKpED2PoEcaLc",
    authDomain: "todolist-com-vuejs-e-firebase.firebaseapp.com",
    projectId: "todolist-com-vuejs-e-firebase",
    storageBucket: "todolist-com-vuejs-e-firebase.firebasestorage.app",
    messagingSenderId: "206079307671",
    appId: "1:206079307671:web:01c3f4ce77b16bfc1d5ed2"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestone();