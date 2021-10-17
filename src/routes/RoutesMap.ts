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
  Home: {
    path: '/',
    required: ['auth'],
    parentRole: 'Dashboard',
    roles: ['Dashboard'],
    thunk: (dispatch: (action: any) => void, getState: () => ApplicationState) => {
      dispatch({
        type: ActionType.SWITCH_APP,
        app: 'AFRO',
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
        app: 'AFRO',
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
  Employees: {
    path: '/employees',
    required: ['auth'],
    parentRole: 'Users',
    roles: ['View'],
    thunk: (dispatch: (action: any) => void, getState: () => ApplicationState) => {
      dispatch({
        type: ActionType.SWITCH_APP,
        app: 'AFRO',
      });
    },
  },
  'Employees/Details': {
    path: '/employees/:userId/details',
    required: ['auth'],
    parentRole: 'Users',
    roles: ['View'],
    thunk: (dispatch: (action: any) => void, getState: () => ApplicationState) => {
      dispatch({
        type: ActionType.SWITCH_APP,
        app: 'AFRO',
      });
    },
  },
  'Employees/Create': {
    path: '/employees/create',
    required: ['auth'],
    parentRole: 'Users',
    roles: ['View'],
    thunk: (dispatch: (action: any) => void, getState: () => ApplicationState) => {
      dispatch({
        type: ActionType.SWITCH_APP,
        app: 'AFRO',
      });
    },
  },
  'Employees/Edit': {
    path: '/employees/:userId/edit',
    required: ['auth'],
    parentRole: 'Users',
    roles: ['View'],
    thunk: (dispatch: (action: any) => void, getState: () => ApplicationState) => {
      dispatch({
        type: ActionType.SWITCH_APP,
        app: 'AFRO',
      });
    },
  },
  Customers: {
    path: '/customers',
    required: ['auth'],
    parentRole: 'Users',
    roles: ['View'],
    thunk: (dispatch: (action: any) => void, getState: () => ApplicationState) => {
      dispatch({
        type: ActionType.SWITCH_APP,
        app: 'AFRO',
      });
    },
  },
  'Customers/Details': {
    path: '/customers/:customerId/details',
    required: ['auth'],
    parentRole: 'Users',
    roles: ['View'],
    thunk: (dispatch: (action: any) => void, getState: () => ApplicationState) => {
      dispatch({
        type: ActionType.SWITCH_APP,
        app: 'AFRO',
      });
    },
  },
  Roles: {
    path: '/roles',
    required: ['auth'],
    parentRole: 'Roles',
    roles: ['View'],
    thunk: (dispatch: (action: any) => void, getState: () => ApplicationState) => {
      dispatch({
        type: ActionType.SWITCH_APP,
        app: 'AFRO',
      });
    },
  },
  Products: {
    path: '/products',
    required: ['auth'],
    parentRole: 'Products',
    roles: ['View'],
    thunk: (dispatch: (action: any) => void, getState: () => ApplicationState) => {
      dispatch({
        type: ActionType.SWITCH_APP,
        app: 'AFRO',
      });
    },
  },
  Bills: {
    path: '/bills',
    required: ['auth'],
    parentRole: 'Bills',
    roles: ['View'],
    thunk: (dispatch: (action: any) => void, getState: () => ApplicationState) => {
      dispatch({
        type: ActionType.SWITCH_APP,
        app: 'AFRO',
      });
    },
  },
  Orders: {
    path: '/orders',
    required: ['auth'],
    parentRole: 'Orders',
    roles: ['View'],
    thunk: (dispatch: (action: any) => void, getState: () => ApplicationState) => {
      dispatch({
        type: ActionType.SWITCH_APP,
        app: 'AFRO',
      });
    },
  },
  Deliveries: {
    path: '/deliveries',
    required: ['auth'],
    parentRole: 'Deliveries',
    roles: ['View'],
    thunk: (dispatch: (action: any) => void, getState: () => ApplicationState) => {
      dispatch({
        type: ActionType.SWITCH_APP,
        app: 'AFRO',
      });
    },
  },
  Brands: {
    path: '/brands',
    required: ['auth'],
    parentRole: 'Brands',
    roles: ['View'],
    thunk: (dispatch: (action: any) => void, getState: () => ApplicationState) => {
      dispatch({
        type: ActionType.SWITCH_APP,
        app: 'AFRO',
      });
    },
  },
  Settings: {
    path: '/settings',
    required: ['auth'],
    parentRole: 'Settings',
    roles: ['Settings'],
    thunk: (dispatch: (action: any) => void, getState: () => ApplicationState) => {
      dispatch({
        type: ActionType.SWITCH_APP,
        app: 'AFRO',
      });
    },
  },
};
//#endregion
export default RoutesMap;

// map Action tương ứng với 1 Path
