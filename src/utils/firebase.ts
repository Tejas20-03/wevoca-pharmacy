// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  // apiKey: 'AIzaSyB_oLjxOdvuANjh-PEm6TXE55xlDbWd0xs',
  // authDomain: 'testing-pn-dvago.firebaseapp.com',
  // projectId: 'testing-pn-dvago',
  // storageBucket: 'testing-pn-dvago.appspot.com',
  // messagingSenderId: '936701484183',
  // appId: '1:936701484183:web:a649d24118a0ed014d9dd2',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;