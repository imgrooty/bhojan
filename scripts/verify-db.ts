
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1QhXpSw3J8o0PWrU02A42EjZOXSwW_qw",
  authDomain: "bhojan-a035e.firebaseapp.com",
  projectId: "bhojan-a035e",
  storageBucket: "bhojan-a035e.firebasestorage.app",
  messagingSenderId: "1036132540604",
  appId: "1:1036132540604:web:687330e516303b523ab0b9",
  measurementId: "G-6QTYZ7WMP8"
};

async function verify() {
  console.log("Verifying Firestore collections with real config...");
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const collections = ["menuCategories", "menuItems", "gallery"];

  for (const col of collections) {
    try {
      const snapshot = await getDocs(collection(db, col));
      console.log(`Collection '${col}': ${snapshot.size} documents found.`);
    } catch (error) {
      console.error(`Error fetching collection '${col}':`, (error as any).message);
    }
  }
}

verify().catch(console.error);
