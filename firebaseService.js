// firebase/firebaseService.js
import { getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your config object
const firebaseConfig = {
  apiKey: 'AIzaSyAeok1BR-GvQYnetK-awIiCfQr-MYuu7uo',
  authDomain: 'inventory-app-4b5c2.firebaseapp.com',
  projectId: 'inventory-app-4b5c2',
  storageBucket: 'inventory-app-4b5c2.appspot.com',
  messagingSenderId: '134259440180',
  appId: '1:134259440180:web:abaa27c80b3bc4352c2861'
};

// Initialize the app only once
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Export the Firestore instance
export const db = getFirestore(app);