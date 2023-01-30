import { createRouter, createWebHashHistory } from 'vue-router'
import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
import TokensView from '../views/tokens.view.js';
import OrdersView from '../views/orders.view.js';
import UsersView from '../views/users.view.js';
import HomeView from '../views/home.view.js';
import SearchView from '../views/search.view.js';
import DocumentView from '../views/document.view.js';

const { template, utils } = ham;

const Users = { template: template('users-view')}

const routes = [
  // { path: '/', component: HomeView },
  { path: '/', component: OrdersView },
  { path: '/search', component: SearchView },
  { path: '/tokens', component: TokensView },
  { path: '/users', component: UsersView },
  { path: '/orders', component: OrdersView },
  { path: '/orders/:id', component: DocumentView },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

