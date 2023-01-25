// const { collection, doc, setDoc, addDoc, getDoc, getDocs } = db;
import { firestore } from './firebase.js';
const { query, where, collection, getDocs, collectionGroup } = firestore

export const coerce = (value) => {
  const specials = new Map([['null', null]])
 
  if (specials.has(value)) return specials.get(value)
  
  return value.toString()
}

export const collections = {
  tokens: collection('tokens'),
  users: collection('users'),
  orders: collectionGroup('orders')
}

export const getQuery = async (collectionName = 'users', options = {}) => {
  const { params } = options

  const newQuery = query(
    collections[collectionName],
    where(params.field, params.operator, coerce(params.value))
  );

  // const querySnapshot = (await getDocs(newQuery))

  const res = (await getDocs(newQuery)).docs.map(doc => doc.data())
  
  return res
}

export const getCollectionDocs = async (collectionName = 'users', ) => {
  const querySnapshot = await getDocs(collections[collectionName]);

  return querySnapshot.docs.map(doc => {
    return collectionName === 'orders' ? { ...doc.data(), id: doc.id, owner: doc.ref.parent.parent.id } : { ...doc.data(), id: doc.id }
  })
}

export const getOwnedTokens = async () => {
  const tokenQuery = query(
    collections.tokens,
    where('owner', '!=', null)
  );

  const querySnapshot = await getDocs(tokenQuery);

  return querySnapshot.docs.map(doc => {
    console.log('!!doc.modified ', !!doc.modified)
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      modified: !!data.modified ? data.modified.toDate() : null
    };
  })
}

export const getDocCount = async (collectionName = 'users') => {
  const querySnapshot = await getDocs(collections[collectionName]);

  return querySnapshot.docs.count
}

// export const orderDocs = await getCollectionDocs('orders');


// const museums = query(collectionGroup(db, 'landmarks'), where('type', '==', 'museum'));
// const querySnapshot = await getDocs(museums);
// queprySnapshot.forEach((doc) => {
//   console.log(doc.id, ' => ', doc.data());
// });