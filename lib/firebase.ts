import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

// Firebase configuration - use empty strings as fallback to avoid build-time errors
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Helper function to check if Firebase is properly configured
export function isFirebaseConfigured(): boolean {
  return !!(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.storageBucket &&
    firebaseConfig.messagingSenderId &&
    firebaseConfig.appId
  );
}

// Initialize Firebase only if configured, otherwise use a dummy app
// This allows the build to succeed even without Firebase credentials
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

try {
  // Only initialize if Firebase is configured
  if (isFirebaseConfigured()) {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
  } else {
    // Create a dummy initialization that won't fail during build
    // These will throw runtime errors if actually used without proper configuration
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
  }
} catch (error) {
  // If initialization fails (e.g., during build without env vars), create placeholder
  // This prevents build failures while still allowing runtime checks
  console.warn('Firebase initialization skipped - environment variables not configured');
  app = {} as FirebaseApp;
  auth = {} as Auth;
  db = {} as Firestore;
}

export { auth, db };
