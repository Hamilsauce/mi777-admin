import { getAuth } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js'
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
  onSnapshot,
  query,
  deleteDoc,
  collectionGroup,
  where,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js'


const firebaseConfig = {
  apiKey: "AIzaSyDkAf6TexWWlmXaccIiy3BQ5iFBXEBAkxo",
  authDomain: "my-lady-8b48f.firebaseapp.com",
  projectId: "my-lady-8b48f",
  storageBucket: "my-lady-8b48f.appspot.com",
  messagingSenderId: "921457340252",
  appId: "1:921457340252:web:4ed71b5b2844f0ca4e5b99"
};

const app = initializeApp(firebaseConfig);

export const instance = getFirestore(app);

export const firestore = {
  collectionGroup: (path) => collectionGroup(instance, path),
  query,
  where,
  onSnapshot: (pathOrRef, pathSegments, callback) => onSnapshot(pathOrDocRef instanceof DocumentReference ? pathOrDocRef : doc(firestore, pathOrDocRef, ...pathSegments), callback),
  collection: (path, ...pathSegments) => collection(instance, path, ...pathSegments),
  doc: (path, ...pathSegments) => doc(firestore, path, ...pathSegments),
  setDoc: (documentReference, data, options) => setDoc(documentReference, data),
  getDoc: (documentReference) => getDoc(documentReference),
  getDocs: (query) => getDocs(query),
  updateDoc: (documentReference, data) => updateDoc(documentReference, data),
  getServerTimestamp: () => serverTimestamp(),
}