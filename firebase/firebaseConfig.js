import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAjmTW6ilyKiCKbktgdzLntsUQ3ee5uWNQ",
    authDomain: "trustfx-6f83b.firebaseapp.com",
    projectId: "trustfx-6f83b",
    storageBucket: "trustfx-6f83b.appspot.com",
    messagingSenderId: "365622265716",
    appId: "1:365622265716:web:e7e16dcd4c98d139e3ce21"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"



// export const auth = getAuth(app)
// const provider = new GoogleAuthProvider()
// provider.setCustomParameters({
//     prompt: "select_account"
// })



// export const googleLogin = () => signInWithPopup(auth, provider)






