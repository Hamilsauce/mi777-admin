// const { collection, doc, setDoc, addDoc, getDoc, getDocs } = db;
import { firestore } from './firebase.js';
const { updateDoc, query, doc, where, collection, getDocs, collectionGroup } = firestore

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


const CACHE = {
  tokens: {},
  users: {},
  orders: {},
}

export const init = async () => {
  CACHE.tokens = normalizeCollection((await getCollectionDocs('tokens'))) //.sort((a, b) => +a.id - +b.id))
  CACHE.users = normalizeCollection(await getCollectionDocs('users'))
  CACHE.orders = (await getCollectionDocs('orders'))
    .sort((a, b) => +a.id - +b.id)
  // CACHE.tokens = (await getCollectionDocs('tokens')).sort((a, b) => +a.id - +b.id)
  // CACHE.orders = (await getCollectionDocs('orders')).sort((a, b) => +a.id - +b.id)
}

export const collections = {
  tokens: collection('tokens'),
  users: collection('users'),
  orders: collectionGroup('orders')
}

export const createOrder = async (wallet, tokenId, data) => {
  // 1. Find token by tokenId, check if owned;
  // 2. If owned, do not create order
  // 3. If NOT owned:
  //    a. set token owner field to wallet
  //    b. Find and delete any existing UNASSIGNED
  //       orders for token
  //    c. setDoc new ordse in user orders 

  const token = CACHE.tokens[tokenId];

  // if (!!t!/''oken.owner && token.owner !== wallet) {
  if (!!token.owner) {
    return console.error('TOKEN OWNED ALREADY, CANNOT CREATE ORDER');
  }
  const matchedOrders = CACHE.orders[tokenId];

  const querySnapshot = await getDocs(collections[collectionName]);

  return querySnapshot.docs.map(doc => {
    return collectionName === 'orders' ? { ...doc.data(), id: doc.id, owner: doc.ref.parent.parent.id } : { ...doc.data(), id: doc.id }
  })
}


export const updateOrder = async (wallet, id) => {
  const querySnapshot = await getDocs(collections[collectionName]);

  return querySnapshot.docs.map(doc => {
    return collectionName === 'orders' ? { ...doc.data(), id: doc.id, owner: doc.ref.parent.parent.id } : { ...doc.data(), id: doc.id }
  })
}


export const getQuery = async (collectionName = 'users', options = {}) => {
  const { params } = options

  const newQuery = query(
    collections[collectionName],
    where(params.field, params.operator, coerce(params.value))
  );

  const res = (await getDocs(newQuery)).docs.map(doc => doc.data())

  return res;
}

export const getCollectionDocs = async (collectionName = 'users', ) => {
  const querySnapshot = await getDocs(collections[collectionName]);

  return querySnapshot.docs.map(doc => {
    // return collectionName === 'orders' ?
    // { ...doc.data(), id: doc.id, user: doc.parent.parent.id }:
    return { ...doc.data(), id: doc.id }
  })
}

export const getOwnedTokens = async () => {
  const tokenQuery = query(
    collections.tokens,
    where('owner', '!=', null)
  );

  const querySnapshot = await getDocs(tokenQuery);

  return querySnapshot.docs.map(doc => {
    const data = doc.data();

    return {
      ...data,
      id: doc.id,
      modified: !!data.modified ? data.modified.toDate() : null
    };
  })
}

export const _getDocument = async (collectionName = 'users', ...segments) => {
  const querySnapshot = await doc(collectionName, ...segments)

  return querySnapshot;
}


export const getDocumentById = async (collectionName = 'users', ...segments) => {
  const newQuery = query(
    collections[collectionName],
    where('id', '==', params.id)
  );

  const res = (await getDocs(newQuery)).docs.map(doc => doc.data());

  // const res = (await doc('collectionName', ...segments).).docs.map(doc => doc.data());

  return res[0];
}


export const getDocCount = async (collectionName = 'users') => {
  const querySnapshot = await getDocs(collections[collectionName]);

  return querySnapshot.docs.count;
}

export const getCachedCollection = (collectionName) => CACHE[collectionName];

export const getCachedDocument = (collectionName, id) => {
  console.warn('CACHE[collectionName][id]', CACHE[collectionName][id])

  return CACHE[collectionName][id];
}


await init()

// export const orderDocs = await getCollectionDocs('orders');


// const museums = query(collectionGroup(db, 'landmarks'), where('type', '==', 'museum'));
// const querySnapshot = await getDocs(museums);
// queprySnapshot.forEach((doc) => {
//   console.log(doc.id, ' => ', doc.data());
// });