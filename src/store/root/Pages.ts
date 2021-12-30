import { NOT_FOUND } from 'redux-first-router';

const Pages = (state = 'HOME', action: any = {}) => screens[action.type] || state;
export default Pages;

const screens: any = {
  Callback: 'Callback',

  Home: 'home/home',

  Self: 'self/home',

  Signin: 'auth/signin',
  Signup: 'auth/signup',
  Forgot: 'auth/forgot',
  Active: 'auth/active',
  Confirm: 'auth/confirm',

  Loading: 'auth/waiting',

  Employee: 'user/employee/home',
  'Employee/Details': 'user/employee/details',
  'Employee/Create': 'user/employee/create',
  'Employee/Edit': 'user/employee/edit',
  Customer: 'user/customer/home',
  'Customer/Details': 'user/customer/details',

  Role: 'role/home',

  Product: 'product/home',

  Bill: 'bill/home',

  Order: 'order/home',

  Delivery: 'delivery/home',

  Brand: 'brand/home',

  Setting: 'setting/home',

  [NOT_FOUND]: 'not-found',
};

// NOTES: this is the primary reducer demonstrating how RFR replaces the need
// for React Router"s <Route /> component.
//
// ALSO:  Forget a switch, use a hash table for perf.

// Map Action với 1 Page (component) để render
