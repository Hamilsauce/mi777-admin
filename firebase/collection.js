import { firestore } from './firebase.js';

const { collection, getDocs } = firestore

export class FirestoreCollection {
  constructor(name, path, ...pathSegments) {
    this.name = name;

    this.ref = collection(path, ...pathSegments);
  }
}