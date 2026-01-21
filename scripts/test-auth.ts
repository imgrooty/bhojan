
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1QhXpSw3J8o0PWrU02A42EjZOXSwW_qw",
  authDomain: "bhojan-a035e.firebaseapp.com",
  projectId: "bhojan-a035e",
  storageBucket: "bhojan-a035e.firebasestorage.app",
  messagingSenderId: "1036132540604",
  appId: "1:1036132540604:web:687330e516303b523ab0b9",
  measurementId: "G-6QTYZ7WMP8"
};

async function testWithAuth() {
  console.log("Testing with Anonymous Auth...");
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  try {
    const userCredential = await signInAnonymously(auth);
    console.log("Signed in anonymously as: ", userCredential.user.uid);

    const docRef = await addDoc(collection(db, "test"), {
      message: "Auth test",
      uid: userCredential.user.uid,
      timestamp: new Date()
    });
    console.log("Document written: ", docRef.id);
  } catch (error) {
    console.error("Error: ", (error as any).message);
  }
}

testWithAuth().catch(console.error);
