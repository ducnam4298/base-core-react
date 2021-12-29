// import { Endpoint } from 'api';
import { clientStorage, sessionStorage } from 'constant/clientStorage';
import { Reducer as ReduxReducer } from 'redux';
import { ActionType } from './ActionType';
import { SwitchAuthenticated, IUser } from 'models/context';
import { InitState, State } from './InitState';

import { client, setToken, clearToken } from 'api/client';
import { Endpoint } from 'api';
import { ThunkAction } from 'store';

interface FieldChangAction {
  type: string;
  fieldName: string;
  fieldValue?: any;
}

interface SwitchRoleAction {
  type: string;
  roleId: number;
}

interface SwitchAppAction {
  type: string;
  app: string;
}

interface SwitchAuthenticatedAction {
  type: string;
  action: SwitchAuthenticated;
  dataItem?: any;
}

interface GetDataUserAction {
  type: string;
  user?: IUser;
}

interface GetConfigurationAction {
  type: string;
  configs?: any[];
}

interface GetRolesUserAction {
  type: string;
  permissions?: any[];
}

type KnownAction =
  | FieldChangAction
  | SwitchRoleAction
  | SwitchAppAction
  | SwitchAuthenticatedAction
  | GetDataUserAction
  | GetConfigurationAction
  | GetRolesUserAction;
//#endregion

//#region ActionCreators
export const ActionCreators = {
  FieldChange:
    (fieldName: string, fieldValue?: any): ThunkAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: ActionType.FIELD_CHANGE,
        fieldName: fieldName,
        fieldValue: fieldValue,
      });
    },
  SwitchAuthenticated:
    (action: SwitchAuthenticated, dataItem?: any, cb?: any): ThunkAction<KnownAction> =>
    (dispatch, getState) => {
      if (action === SwitchAuthenticated.LOGGEDIN) {
        clientStorage.set('sp-afro4isc', dataItem.accessToken);
        clientStorage.set('rt-afro4isc', dataItem.refreshToken);
        setToken(dataItem.accessToken);
        cb && cb();
      } else {
        clientStorage.remove('sp-afro4isc');
        clientStorage.remove('rt-afro4isc');
        sessionStorage.clear();
        dispatch({
          type: ActionType.GET_DATA_USER,
          user: undefined,
        });
        dispatch({
          type: ActionType.GET_ROLES_USER,
          permissions: [],
        });
        clearToken();
        cb && cb();
      }
      dispatch({
        type: ActionType.SWITCH_AUTHENTICATED,
        action,
      });
    },

  GetSiteConfiguration: (): ThunkAction<KnownAction> => async (dispatch, getState) => {
    const res = await client.get(`${Endpoint.CONFIGURATION_URL}/all`);
    if (res?.status === 200) {
      const data = (res?.data ?? [])?.map((item: any) => {
        return {
          configName: item.configName,
          configValue: item.configValue,
        };
      });
      sessionStorage.set('cf', data);
      dispatch({
        type: ActionType.GET_CONFIGURATION,
        configs: data,
      });
    } else {
      ActionCreators.SwitchAuthenticated(SwitchAuthenticated.LOGGEDOUT);
    }
  },
};
//#endregion

export const Reducer: ReduxReducer<State, KnownAction> = (
  state: State | undefined,
  incomingAction: KnownAction
): State => {
  if (state === undefined) {
    return InitState;
  }
  let action;
  switch (incomingAction.type) {
    case ActionType.FIELD_CHANGE:
      action = incomingAction as FieldChangAction;
      return {
        ...state,
        [action.fieldName]: action.fieldValue,
      };
    case ActionType.SWITCH_AUTHENTICATED:
      action = incomingAction as SwitchAuthenticatedAction;
      if (action.action === SwitchAuthenticated.LOGGEDIN) {
        return {
          ...state,
          isAuthenticated: true,
        };
      } else {
        return {
          ...state,
          isAuthenticated: false,
          user: undefined,
          permissions: [],
        };
      }
    case ActionType.GET_DATA_USER:
      action = incomingAction as GetDataUserAction;
      return {
        ...state,
        user: action.user,
      };
    case ActionType.GET_CONFIGURATION:
      action = incomingAction as GetConfigurationAction;
      return {
        ...state,
        siteConfiguration: action.configs,
      };
    case ActionType.GET_ROLES_USER:
      action = incomingAction as GetConfigurationAction;
      return {
        ...state,
        permissions: action.permissions,
      };
    default:
      return {
        ...state,
      };
  }
};
