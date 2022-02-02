import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAClGqF3upOfLux6Z_MxdrYgjxwWxHUKbw",
	authDomain: "leashed-ca492.firebaseapp.com",
	projectId: "leashed-ca492",
	storageBucket: "leashed-ca492.appspot.com",
	messagingSenderId: "434720549247",
	appId: "1:434720549247:web:b35f0e47447167da2c924a",
	measurementId: "G-9X5LRGWEGS",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* FOR WHEN/IF WE WANT TO BEGIN GOOGLE AUTHENTICATION (REMEMBER TO ENABLE ON FIREBASE'S WEBSITE) */
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
