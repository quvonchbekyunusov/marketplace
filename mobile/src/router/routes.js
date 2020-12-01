import MainShell from '@/shells/MainShell';
import EmptyShell from '@/shells/EmptyShell';
import ToolbarShell from '@/shells/ToolbarShell';
import BrandPage from '@/pages/BrandPage';
import BrandsPage from '@/pages/BrandsPage';
import CartPage from '@/pages/CartPage';
import CategoriesPage from '@/pages/CategoriesPage';
import CategoryPage from '@/pages/CategoryPage';
import ProductsPreviewPage from '@/pages/ProductsPreviewPage';
import CheckoutPage from '@/pages/CheckoutPage';
import ChooseCardPage from '@/pages/ChooseCardPage';
import ComparePage from '@/pages/ComparePage';
import Error404Page from '@/pages/Error404Page';
import HomePage from '@/pages/HomePage';
import InDevelopmentPage from '@/pages/InDevelopmentPage';
import LoginPage from '@/pages/LoginPage';
import ModifyAddress from '@/pages/ModifyAddress';
import OrderCompleted from '@/pages/OrderCompleted';
import OrderDetailsPage from '@/pages/OrderDetailsPage';
import CatalogPage from '@/pages/CatalogPage';
import ProductPage from '@/pages/ProductPage';
import ProfilePage from '@/pages/ProfilePage';
import RegisterPage from '@/pages/RegisterPage';
import SearchPage from '@/pages/SearchPage';
import SellerPage from '@/pages/SellerPage';
import TestingPage from '@/pages/TestingPage';
import UserOrdersPage from '@/pages/UserOrdersPage';
import WishListPageOne from '@/pages/WishListPageOne';
import UserPaymentCardsPage from '@/pages/UserPaymentCardsPage';
import SellersPage from '@/pages/SellersPage';
import store from '@/store';

const routes = [
  {
    path: '/',
    redirect: { name: 'home' },
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      shell: MainShell,
    },
    component: HomePage,
  },
  {
    path: '/products/:id',
    name: 'product',
    meta: {
      shell: ToolbarShell,
    },
    component: ProductPage,
    props: (route) => ({ productId: route.params.id }),
  },
  {
    path: '/catalogs/:id',
    name: 'catalog',
    meta: {
      shell: ToolbarShell,
    },
    component: CatalogPage,
    props: ((route) => ({ catalogId: route.params.id })),
  },
  {
    path: '/cart',
    name: 'cart',
    meta: {
      shell: ToolbarShell,
    },
    component: CartPage,
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    meta: {
      shell: ToolbarShell,
    },
    component: WishListPageOne,
  },
  {
    path: '/in-development',
    name: 'in-development',
    meta: {
      shell: ToolbarShell,
    },
    component: InDevelopmentPage,
  },
  {
    path: '/brands',
    name: 'brands',
    meta: {
      shell: ToolbarShell,
    },
    component: BrandsPage,
  },
  {
    path: '/choose-card',
    name: 'choose-card',
    meta: {
      shell: ToolbarShell,
    },
    component: ChooseCardPage,
  },
  {
    path: '/search',
    name: 'search',
    meta: {
      shell: ToolbarShell,
    },
    component: SearchPage,
    props: (route) => ({ query: route.query.q }),
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      shell: ToolbarShell,
    },
    component: RegisterPage,
    props: (route) => ({ redirectTo: route.query.redirectTo }),
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      shell: ToolbarShell,
    },
    component: LoginPage,
    props: (route) => ({ redirectTo: route.query.redirectTo }),
  },
  // start: Azimjon Toirov 10.10.2020
  {
    path: '/checkout/products-preview',
    name: 'products-preview',
    meta: {
      shell: ToolbarShell,
      protected: false,
    },
    component: ProductsPreviewPage,
  },
  {
    path: '/profile/payment-cards',
    name: 'payment-cards',
    meta: {
      shell: ToolbarShell,
      protected: false,
    },
    component: UserPaymentCardsPage,
    beforeEnter: (to, from, next) => {
      if (from.name === 'checkout') {
        store.dispatch('creditCard/changeCrditCard', true);
      } else {
        store.dispatch('creditCard/changeCreditCard', false);
      }
      next();
    },
  },
  // end: Azimjon Toirov
  {
    path: '/checkout',
    name: 'checkout',
    meta: {
      shell: ToolbarShell,
      protected: false,
    },
    component: CheckoutPage,
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {
      shell: MainShell,
    },
    component: CategoriesPage,
  },
  {
    path: '/categories/:id',
    name: 'category',
    meta: {
      shell: ToolbarShell,
    },
    component: CategoryPage,
    props: (route) => ({ categoryId: route.params.id }),
  },
  {
    path: '/brands/:id',
    name: 'brand',
    meta: {
      shell: MainShell,
    },
    component: BrandPage,
    props: (route) => ({ brandId: route.params.id }),
  },
  {
    path: '/sellers/:id',
    name: 'seller',
    meta: {
      shell: ToolbarShell,
    },
    component: SellerPage,
    props: ((route) => ({ sellerId: route.params.id })),
  },
  {
    path: '/sellers',
    name: 'sellers',
    meta: {
      shell: ToolbarShell,
    },
    component: SellersPage,
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      shell: MainShell,
      protected: true,
    },
    component: ProfilePage,
  },
  {
    path: '/profile/orders',
    name: 'orders',
    meta: {
      shell: ToolbarShell,
    },
    component: UserOrdersPage,
  },
  {
    path: '/modify-address',
    name: 'modify-address',
    meta: {
      shell: ToolbarShell,
    },
    component: ModifyAddress,
  },
  {
    path: '/order-completed',
    name: 'order-completed',
    meta: {
      shell: EmptyShell,
    },
    component: OrderCompleted,
  },
  {
    path: '/compare',
    name: 'compare',
    meta: {
      shell: ToolbarShell,
    },
    component: ComparePage,
  },
  {
    path: '/profile/orders/:id',
    name: 'order',
    meta: {
      shell: ToolbarShell,
    },
    component: OrderDetailsPage,
    props: (route) => ({ orderId: route.params.id }),
  },
  {
    path: '/testing',
    name: 'testing',
    meta: {
      shell: MainShell,
    },
    component: TestingPage,
  },
  {
    path: '*',
    meta: {
      shell: ToolbarShell,
    },
    component: Error404Page,
  },
];

export default routes;
