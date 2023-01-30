import { EventEmitter } from 'https://hamilsauce.github.io/hamhelper/event-emitter.js';
import { firestore } from './firebase.js';
import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';

const { utils } = ham;
const {
  updateDoc,
  query,
  doc,
  where,
  collection,
  getDocs,
  collectionGroup,
  onSnapshot,
} = firestore

export const collections = {
  tokens: collection('tokens'),
  users: collection('users'),
  orders: collectionGroup('orders')
}


const select = (collectionName) => {
  const collRef = collections[collectionName];

  return {
    where(field, operator, value) {
      return query(collRef, where(field, operator, value))
    },
    byId(...segments) {
      return getDoc(doc(collectionName, ...segments))
      // return query(collRef, where(field, operator, value))
    },
  }
};

// const { collection, doc, setDoc, addDoc, getDoc, getDocs } = db;

export const coerce = (value) => {
  const specials = new Map([['null', null]])

  if (specials.has(value)) return specials.get(value)

  return value.toString()
}

export const normalizeCollection = (collection, keyField = 'id') => {
  return collection.reduce((acc, curr, i) => ({
    ...acc,
    [curr[keyField]]: curr
  }), {});
}



export class DB extends EventEmitter {
  #db = null;
  #collections = new Map([
    ['tokens', collection('tokens')],
    ['users', collection('users')],
    ['orders', collectionGroup('orders')]
  ]);

  constructor(firestoreInstance, options = {}) {
    super();

    if (!firestoreInstance) throw new Error('No firestore pased to db');

    this.#db = firestoreInstance;
  }

  init() {

  }

  listenOnUser(wallet, callback) {
    return onSnapshot(getUserDocRef(wallet), callback);
  }

};