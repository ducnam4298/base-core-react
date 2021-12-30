import { ActionType } from 'store/context';
import { ApplicationState } from 'store';

interface RoutesProps {
  [key: string]: {
    path: string;
    required?: string[];
    parentRole?: string;
    roles?: string[];
    thunk?: (dispatch: (action: any) => void, getState: () => ApplicationState) => void;
  };
}

const RoutesMap: RoutesProps = {
  Callback: {
    path: '/callback',
  },
  SplashStart: {
    path: '/splash-start',
  },
  SplashWaiting: {
    path: '/splash-waiting',
  },
  Signin: {
    path: '/sign-in',
  },
  Signup: {
    path: '/sign-up',
  },
  Home: {
    path: '/',
    required: ['auth'],
    parentRole: 'Dashboard',
    roles: ['Dashboard'],
    thunk: (dispatch: (action: any) => void, getState: () => ApplicationState) => {
      dispatch({
        type: ActionType.SWITCH_APP,
        app: 'Flash-Mobile',
      });
    },
  },
  Dashboard: {
    path: '/dashboard',
    required: ['auth'],
    parentRole: 'Dashboard',
    roles: ['Dashboard'],
    thunk: (dispatch: (action: any) => void, getState: () => ApplicationState) => {
      dispatch({
        type: ActionType.SWITCH_APP,
        app: 'Flash-Mobile',
      });
    },
  },
  SignIn: {
    path: '/sign-in',
  },
  SignUp: {
    path: '/sign-up',
  },
  Forgot: {
    path: '/forgot',
  },
  Activation: {
    path: '/verify',
    required: ['notAuth'],
  },
  Employee: {
    path: '/employees',
    required: ['auth'],
    parentRole: 'Employee',
    roles: ['View'],
    thunk: (dispatch: (action: any) => void, getState: () => ApplicationState) => {
      dispatch({
        type: ActionType.SWITCH_APP,
        app: 'Flash-Mobile',
      });
    },
  },
  'Employee/Details': {
    path: '/employees/:userId/details',
    required: ['auth'],
    parentRole: 'Employee',
    roles: ['View'],
    thunk: (dispatch: (action: any) => void, getState: () => ApplicationState) => {
      dispatch({
        type: ActionType.SWITCH_APP,
        app: 'Flash-Mobile',
      });
    },
  },
  'Employee/Create': {
    path: '/employees/create',
    required: ['auth'],
    parentRole: 'Employee',
    roles: ['Create'],
    thunk: (dispatch: (action: any) => void, getState: () => ApplicationState) => {
      dispatch({
        type: ActionType.SWITCH_APP,
        app: 'Flash-Mobile',
      });
    },
  },
  'Employee/Edit': {
    path: '/employees/:userId/edit',
    required: ['auth'],
    parentRole: 'Employee',
    roles: ['Update'],
    thunk: (dispatch: (action: any) => void, getState: () => ApplicationState) => {
      dispatch({
        type: ActionType.SWITCH_APP,
        app: 'Flash-Mobile',
      });
    },
  },
  Customer: {
    path: '/customers',
    required: ['auth'],
    parentRole: 'Employee',
    roles: ['View'],
    thunk: (dispatch: (action: any) => void, getState: () => ApplicationState) => {
      dispatch({
        type: ActionType.SWITCH_APP,
        app: 'Flash-Mobile',
      });
    },
  },
  'Customer/Details': {
    path: '/customers/:customerId/details',
    required: ['auth'],
    parentRole: 'User',
    roles: ['View'],
    thunk: (dispatch: (action: any) => void, getState: () => ApplicationState) => {
      dispatch({
        type: ActionType.SWITCH_APP,
        app: 'Flash-Mobile',
      });
    },
  },
  Role: {
    path: '/roles',
    required: ['auth'],
    parentRole: 'Role',
    roles: ['View'],
    thunk: (dispatch: (action: any) => void, getState: () => ApplicationState) => {
      dispatch({
        type: ActionType.SWITCH_APP,
        app: 'Flash-Mobile',
      });
    },
  },
  Product: {
    path: '/products',
    required: ['auth'],
    parentRole: 'Product',
    roles: ['View'],
    thunk: (dispatch: (action: any) => void, getState: () => ApplicationState) => {
      dispatch({
        type: ActionType.SWITCH_APP,
        app: 'Flash-Mobile',
      });
    },
  },
  Bill: {
    path: '/bills',
    required: ['auth'],
    parentRole: 'Bill',
    roles: ['View'],
    thunk: (dispatch: (action: any) => void, getState: () => ApplicationState) => {
      dispatch({
        type: ActionType.SWITCH_APP,
        app: 'Flash-Mobile',
      });
    },
  },
  Order: {
    path: '/orders',
    required: ['auth'],
    parentRole: 'Order',
    roles: ['View'],
    thunk: (dispatch: (action: any) => void, getState: () => ApplicationState) => {
      dispatch({
        type: ActionType.SWITCH_APP,
        app: 'Flash-Mobile',
      });
    },
  },
  Delivery: {
    path: '/deliveries',
    required: ['auth'],
    parentRole: 'Delivery',
    roles: ['View'],
    thunk: (dispatch: (action: any) => void, getState: () => ApplicationState) => {
      dispatch({
        type: ActionType.SWITCH_APP,
        app: 'Flash-Mobile',
      });
    },
  },
  Brand: {
    path: '/brands',
    required: ['auth'],
    parentRole: 'Brand',
    roles: ['View'],
    thunk: (dispatch: (action: any) => void, getState: () => ApplicationState) => {
      dispatch({
        type: ActionType.SWITCH_APP,
        app: 'Flash-Mobile',
      });
    },
  },
  Setting: {
    path: '/settings',
    required: ['auth'],
    parentRole: 'Setting',
    roles: ['Setting'],
    thunk: (dispatch: (action: any) => void, getState: () => ApplicationState) => {
      dispatch({
        type: ActionType.SWITCH_APP,
        app: 'Flash-Mobile',
      });
    },
  },
};
//#endregion
export default RoutesMap;

// map Action tương ứng với 1 Path
