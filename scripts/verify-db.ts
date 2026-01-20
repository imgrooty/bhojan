
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import * as dotenv from "dotenv";
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "dummy-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "dummy-auth-domain",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "dummy-project-id",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "dummy-app-id",
};

async function verify() {
  console.log("Verifying Firestore collections...");
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const collections = ["menuCategories", "menuItems", "gallery"];

  for (const col of collections) {
    try {
      const snapshot = await getDocs(collection(db, col));
      console.log(`Collection '${col}': ${snapshot.size} documents found.`);
    } catch (error) {
      console.error(`Error fetching collection '${col}':`, error);
    }
  }
}

verify().catch(console.error);
