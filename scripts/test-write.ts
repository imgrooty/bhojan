
import { initializeApp } from "firebase/app";
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

async function testWrite() {
  console.log("Testing Firestore write...");
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  try {
    const docRef = await addDoc(collection(db, "test"), {
      message: "Hello from Jules!",
      timestamp: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", (error as any).message);
  }
}

testWrite().catch(console.error);
