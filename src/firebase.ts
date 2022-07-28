import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'video-54307.firebaseapp.com',
  projectId: 'video-54307',
  storageBucket: 'video-54307.appspot.com',
  messagingSenderId: '258765550630',
  appId: '1:258765550630:web:9d1ef32f915b6a8f09e2e7',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
