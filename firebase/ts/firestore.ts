import type { Order, UserModel } from "@/models/user.model";
import { initializeApp } from "firebase/app";
import { Timestamp, getDocs, writeBatch, type DocumentData, type DocumentSnapshot, type PartialWithFieldValue, type SetOptions, type Unsubscribe, Query, QuerySnapshot, } from 'firebase/firestore'
import {
  Firestore,
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  getDoc,
  serverTimestamp,
  CollectionReference,
  DocumentReference,
  updateDoc,
  onSnapshot,
  FieldValue,
  query,
  deleteDoc,
} from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDkAf6TexWWlmXaccIiy3BQ5iFBXEBAkxo",
  authDomain: "my-lady-8b48f.firebaseapp.com",
  projectId: "my-lady-8b48f",
  storageBucket: "my-lady-8b48f.appspot.com",
  messagingSenderId: "921457340252",
  appId: "1:921457340252:web:4ed71b5b2844f0ca4e5b99"
};

const app = initializeApp(firebaseConfig);

const instance: Firestore = getFirestore(app);

export const firestore = {
  // instance,
  // Timestamp,
  query,
  writeBatch: () => writeBatch(instance),
  onSnapshot(pathOrDocRef: string | DocumentReference<DocumentData>, pathSegments: string[], callback: (doc: DocumentSnapshot) => void) { return onSnapshot(pathOrDocRef instanceof DocumentReference < DocumentData > ? pathOrDocRef : doc(instance, pathOrDocRef, ...pathSegments), callback)},
  collection: (path: string, ...pathSegments: string[]): CollectionReference => collection(instance, path, ...pathSegments),
  doc: (path: string, ...pathSegments: string[]): DocumentReference < DocumentData > => doc(instance, path, ...pathSegments),
  setDoc: (documentReference: DocumentReference < DocumentData > , data ? : PartialWithFieldValue < DocumentData > , options ? : SetOptions): Promise < void > => setDoc(documentReference, data),
  async deleteDoc2(documentReference: DocumentReference < DocumentData > , data: PartialWithFieldValue < DocumentData > , options: SetOptions): Promise < string > {
    const id = documentReference.id;
    await deleteDoc(documentReference);

    return id;
  },
  addDoc: (collectionReference: CollectionReference < unknown > , data: Partial < Order > | Partial < UserModel > ): Promise < DocumentReference < Order > | DocumentReference < Order >> => addDoc(collectionReference, data) as Promise < DocumentReference < Order > | DocumentReference < Order >> ,
  getDoc: (documentReference: DocumentReference < unknown > ): Promise < DocumentSnapshot < unknown >> => getDoc(documentReference),
  getDocs: (query: Query < unknown > ): Promise < QuerySnapshot < unknown >> => getDocs(query),
  updateDoc: (documentReference: DocumentReference < unknown > , data: Partial < unknown > ): Promise < void > => updateDoc(documentReference, data),
  getServerTimestamp: (): FieldValue => serverTimestamp(),
}