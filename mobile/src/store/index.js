import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import auth from './auth';
import wishlist from './wishlist';
import cart from './cart';
import drawer from './drawer';
import toolbar from './toolbar';
import filters from './filters';
import compare from './compare';
import search from './search';
import locations from './locations';
import creditCard from './credit-card';
import checkout from './checkout';

Vue.use(Vuex);

const wishlistState = createPersistedState({
  key: 'wishlist',
  paths: ['wishlist'],
});
const cartState = createPersistedState({
  key: 'cart',
  paths: ['cart'],
});
const compareListState = createPersistedState({
  key: 'compare',
  paths: ['compare'],
});
const searchState = createPersistedState({
  key: 'search',
  paths: ['search'],
});
const locationsState = createPersistedState({
  key: 'locations',
  paths: ['locations'],
});
const creditCardState = createPersistedState({
  key: 'creditCard',
  paths: ['creditCard'],
});
const checkoutState = createPersistedState({
  key: 'checkout',
  paths: ['checkout'],
});

const store = new Vuex.Store({
  modules: {
    auth,
    wishlist,
    cart,
    drawer,
    toolbar,
    filters,
    compare,
    search,
    locations,
    creditCard,
    checkout,
  },

  plugins: [
    wishlistState,
    cartState,
    compareListState,
    searchState,
    locationsState,
    creditCardState,
    checkoutState,
  ],
  strict: process.env.DEV,
});

export default store;
