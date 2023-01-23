import { firestore } from './firebase.js';
// const { collection, doc, setDoc, addDoc, getDoc, getDocs } = db;
const { query, collection, getDocs, collectionGroup } = firestore


export const collections = {
  tokens: collection('tokens'),
  users: collection('users'),
  orders: collectionGroup('orders')
}

export const getCollectionDocs = async (collectionName = 'users') => {
  const querySnapshot = await getDocs(collections[collectionName]);

  return querySnapshot.docs.map(doc => {
    return collectionName === 'orders' ?
      { ...doc.data(), id: doc.id, owner: doc.ref.parent.parent.id } :
      { ...doc.data(), id: doc.id }
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