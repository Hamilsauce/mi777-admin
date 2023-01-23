import type { Order, UserModel } from '@/models/user.model';
import { firestore } from './firestore';
import { type DocumentReference, type DocumentData, type DocumentSnapshot, onSnapshot, type Unsubscribe, QueryDocumentSnapshot, QuerySnapshot } from 'firebase/firestore';

const { collection, doc, setDoc, addDoc, getDoc, getDocs } = firestore;

const COLLECTION_NAMES = {
  users: 'users',
  orders: 'orders',
}

export const userCollectionRef = collection(COLLECTION_NAMES.users);

export const tokenCollectionRef = collection('tokens');

export const getOrderCollectionRef = (wallet: string) => collection(COLLECTION_NAMES.users, wallet, 'orders');

export const getOrderRef = (wallet: string, id: string | number) => doc(COLLECTION_NAMES.users, wallet, 'orders', id.toString());

export const getUserDocRef = (wallet: string): DocumentReference<DocumentData> => doc(COLLECTION_NAMES.users, wallet)

export const listenOnUser = (wallet: string, callback: (doc: DocumentSnapshot<DocumentData>) => void): Unsubscribe => {
  return onSnapshot(getUserDocRef(wallet), callback);
}

export const listenOnUserOrders = (wallet: string, callback: (querySnapshot: QuerySnapshot) => void): Unsubscribe => {
  return onSnapshot(getOrderCollectionRef(wallet), callback);
}

export const getUserDoc = async (refOrPath: DocumentReference | string): Promise<DocumentSnapshot<unknown>> => {
  return await getDoc(typeof refOrPath === 'string' ? doc(refOrPath) : refOrPath);
}

export const getFireStoreDoc = async (refOrPath: DocumentReference | string): Promise<DocumentSnapshot<unknown>> => {
  return await getDoc(typeof refOrPath === 'string' ? doc(refOrPath) : refOrPath);
}

export const getOrders = async (wallet: string): Promise<Order[]> => {
  return (await getDocs(getOrderCollectionRef(wallet))).docs.map((_) => ({ ...(_ as QueryDocumentSnapshot<Order>).data(), id: _.id }) as Order);
}

export const addNewOrder = async (wallet: string, { index }: Partial<Order>): Promise<DocumentReference<unknown>> => {
  const defaultOrder: Order = {
    index,
    jerseySize: null,
    shippingAddress: null,
    status: 'SHIPPING_UNASSIGNED',
    created: firestore.Timestamp.now(),
    modified: firestore.Timestamp.now(),
  }

  const collRef = collection('users', wallet, 'orders');

  const res = await addDoc(collRef, defaultOrder);

  return res;
}

export const setUser = async (wallet: string,): Promise<void> => {
  const user = await getDoc(getUserDocRef(wallet));

  if (!user.exists()) {
    await setDoc(getUserDocRef(wallet), { wallet, modified: firestore.Timestamp.now(), created: firestore.Timestamp.now() });
  }

  else {
    const data = user.data() as UserModel;
    await setDoc(getUserDocRef(wallet), { ...data, wallet, modified: firestore.Timestamp.now() })
  };
}


export const updateUserOrder = async (wallet: string, id: string, updates: Partial<Order>): Promise<void> => {
  const order = await getDoc(doc('users', wallet, 'orders', id));

  if (!order.exists()) {
    await setDoc(doc('users', wallet, 'orders', id), {
      ...updates,
      modified: firestore.Timestamp.now(),
      created: firestore.Timestamp.now()
    },
      { merge: true }
    );
  }

  else {
    const data = order.data() as Order;
    await setDoc(doc('users', wallet, 'orders', id), {
      ...data,
      ...updates,
      modified: firestore.Timestamp.now(),
    },
      { merge: true }
    );

  }
}

export const addOwnerToToken = async (tokenId: string, wallet: string): Promise<void> => {
  await setDoc(
    doc('tokens', tokenId), {
    id: tokenId, owner: wallet, modified: firestore.Timestamp.now()
  }, { merge: true });
}