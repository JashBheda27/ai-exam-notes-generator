
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "authexamnotes-6cdc6.firebaseapp.com",
  projectId: "authexamnotes-6cdc6",
  storageBucket: "authexamnotes-6cdc6.firebasestorage.app",
  messagingSenderId: "15682676192",
  appId: "1:15682676192:web:a1a6e4527f7f52e75ff785"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export { auth, provider };