// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDA2fUMZKC7En3UTMozbyrTK6NmBfMmELg",
  authDomain: "moodyworldforyou.firebaseapp.com",
  projectId: "moodyworldforyou",
  storageBucket: "moodyworldforyou.appspot.com",
  messagingSenderId: "441715460742",
  appId: "1:441715460742:web:925143529491220392df07"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth}