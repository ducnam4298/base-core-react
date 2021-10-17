import { NOT_FOUND } from 'redux-first-router';

const Pages = (state = 'HOME', action: any = {}) => screens[action.type] || state;
export default Pages;

const screens: any = {
  Callback: 'Callback',

  SplashStart: 'auth/splash-start',
  SplashWaiting: 'auth/splash-waiting',

  Home: 'home/home',

  Self: 'self/home',
  SignIn: 'auth/sign-in',
  SignUp: 'auth/sign-up',
  Forgot: 'auth/forgot',
  Active: 'auth/active',
  Confirm: 'auth/confirm',

  Employees: 'user/home',
  'Employees/Details': 'user/details',
  'Employees/Create': 'user/create',
  'Employees/Edit': 'user/edit',
  Customers: 'customer/home',
  'Customers/Details': 'user/details',

  Roles: 'role/home',

  Products: 'product/home',

  Bills: 'bill/home',

  Orders: 'order/home',

  Deliveries: 'delivery/home',

  Brands: 'brand/home',

  Settings: 'setting/home',

  [NOT_FOUND]: 'not-found',
};

// NOTES: this is the primary reducer demonstrating how RFR replaces the need
// for React Router"s <Route /> component.
//
// ALSO:  Forget a switch, use a hash table for perf.

// Map Action với 1 Page (component) để render
