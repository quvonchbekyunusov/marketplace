/* start|AzimjonToirov|10/20/2020 */

import HomePage from '@/pages/HomePage.vue';
import CartPage from '@/pages/CartPage';
import About from '@/pages/AboutPage.vue';
import WishlistPage from '@/pages/WishlistPage';
import ProductPage from '@/pages/ProductPage';
import IndexPage from '@/pages/IndexPage';
import CheckOutPage from '@/pages/CheckOutPage';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/index',
    name: 'index',
    component: IndexPage,
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckOutPage,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartPage,
  },
  {
    path: '/profile',
    name: 'profile',
    component: CartPage,
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: WishlistPage,
  },
  // start|AxrorbekNisonboyev|2020-10-21
  {
    path: '/product', /* '/product/:id', */
    name: 'product',
    component: ProductPage,
    props: (route) => ({ productId: route.params.id }),
  },
  // end|AxrorbekNisonboyev|2020-10-21

];
export default routes;

/* end|AzimjonToirov|10/20/2020 14lines */
