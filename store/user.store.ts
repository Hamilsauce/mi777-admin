import { computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import type { Order, Token, TokenResponse, UserModel, UserSubscriptions } from '@/models/user.model';
import Web3 from 'web3';
import { tokenCollectionRef, listenOnUser, getOrders, listenOnUserOrders, updateUserOrder, addOwnerToToken, setUser } from '@/firestore/db';
import { CONSTS } from '@/data/Constants';
import { firestore } from '@/firestore/firestore';
import { QueryDocumentSnapshot, where } from 'firebase/firestore';
const { doc, setDoc, getDocs, query } = firestore;

const initialUser: UserModel = {
  mi777Balance: null,
  wallet: null,
  orders: {},
};

export const useUserStore = defineStore('user', () => {
  const web3 = new Web3(Web3.givenProvider);

  const subscriptions: UserSubscriptions = {
    user: null,
    orders: null
  }

  const userState: UserModel = reactive(initialUser);
  const user = computed(() => userState);
  const orders = computed(() => userState.orders);
  const scatterUrl = computed(() => CONSTS.scatterMintUrl);
  const ownedTokenIds = computed(() => Object.keys(orders.value));

  const balance = computed(() => userState.mi777Balance);
  const assignedOrders = computed(() => Object.values(orders.value).filter(order => order.status !== 'SHIPPING_UNASSIGNED'));
  const unassignedOrders = computed(() => Object.values(orders.value).filter(order => order.status === 'SHIPPING_UNASSIGNED'));

  const hasBalance = computed(() => balance.value > 0);
  const hasUnassignedTokens = computed(() => unassignedOrders.value.length > 0);
  const unassignedTokenCount = computed(() => unassignedOrders.value.length);
  const isConnected = computed(() => !!userState.wallet);

  const startListeningOnUser = (wallet: string) => {
    if (subscriptions.user !== null) {
      subscriptions.user();
      subscriptions.user = null;
    }

    subscriptions.user = listenOnUser(wallet, (doc) => {
      const docData = doc.data()

      console.warn({ docData });
      Object.assign(userState, docData);
    })
  }

  const startListeningOnOrders = (wallet: string) => {
    if (subscriptions.orders !== null) {
      subscriptions.orders();
      subscriptions.orders = null;
    }

    subscriptions.orders = listenOnUserOrders(wallet, (ordersSnap) => {
      ordersSnap.forEach((doc) => {
        const docId = doc.id;
        const docData = doc.data() as Order;
        userState.orders[docId] = docData;
      });
    });
  }

  const init = async () => {
    const wallet = ((await web3.eth.getAccounts())[0]).toLowerCase();

    if (wallet) {
      await handleTokens(wallet);

      startListeningOnUser(wallet);
      startListeningOnOrders(wallet);
    }
  }

  const connect = async () => {
    const web3 = new Web3(Web3.givenProvider)

    let wallet = ((await web3.eth.getAccounts())[0] || (await web3.eth.requestAccounts())[0]).toLowerCase()

    if (wallet) {
      await handleTokens(wallet);

      startListeningOnUser(wallet);
      startListeningOnOrders(wallet);
    }
  }



  const handleTokens = async (wallet: string): Promise<void> => {
    const mi777Balance: TokenResponse[] | null = await queryWalletForTokens(wallet);

    const matchedUnOwnedTokenDocs = await getTokenDocs(wallet, ...mi777Balance.map(_ => _.TokenId))

    if (matchedUnOwnedTokenDocs !== null) {
      // 1) Get/Create User
      await setUser(wallet);

      const orderTokens = (await getOrders(wallet));
      const orderTokenIds = (orderTokens).map(order => order.tokenId || '');

      matchedUnOwnedTokenDocs.forEach(async (token) => {
        const tokenId = (token.id || '').toString();

        // 0) Update tokenDocs
        await addOwnerToToken(token.id.toString(), wallet);

        if (!orderTokenIds.includes(token.id.toString())) {
          const defaultOrder: Order = {
            tokenId: (token.id || '').toString(),
            jerseySize: null,
            shippingAddress: null,
            status: 'SHIPPING_UNASSIGNED',
            modified: firestore.Timestamp.now(),
            created: !!token.created ? token.created : firestore.Timestamp.now()
          }

          // 2) Get/Create orders collection and add Order for each token
          await setDoc(doc('users', wallet, 'orders', tokenId), defaultOrder, { merge: true });
        }
      })
    }

  }

  const getTokenDocs = async (wallet: string, ...tokenIds: string[]): Promise<Token[] | null> => {
    if (!tokenIds || !tokenIds.length) return [];

    const tokenQuery = query(tokenCollectionRef,
      where('id', 'in', tokenIds),
    );

    const tokenDocs: Token[] = (await getDocs(tokenQuery)).docs.map((_: QueryDocumentSnapshot<unknown>) => _.data() as Token);

    const unownedTokens = tokenDocs.filter(t => wallet == t.owner || !(!!t.owner));

    return unownedTokens || null;
  }

  const queryWalletForTokens = async (wallet?: string): Promise<TokenResponse[]> => {
    if (!(isConnected && wallet)) return []

    const endpoint = `${ CONSTS.MILADY_BALANCE_ENDPOINT }/${ wallet }`;

    try {
      const { tokens }: any = await (await fetch(endpoint, {
        method: 'GET',
      })).json();

      return tokens;
    } catch (error) {
      console.error('queryWalletForTokens' + error);
      return [];
    }
  }

  const updateOrder = async (id: string, updates: Partial<Order>): Promise<void> => {
    await updateUserOrder(user.value.wallet || '', id, updates);
  }

  const getOrder = (id: string): Order => {
    return user.value.orders[id];
  }

  return {
    user,
    orders,
    balance,
    queryWalletForTokens,
    isConnected,
    hasUnassignedTokens,
    hasBalance,
    unassignedTokenCount,
    assignedOrders,
    init,
    connect,
    unassignedOrders,
    getOrder,
    updateOrder,
    scatterUrl,
    ownedTokenIds
  };
});