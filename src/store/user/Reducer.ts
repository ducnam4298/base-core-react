import { Reducer as ReduxReducer } from 'redux';
import { ActionType } from './ActionType';
import { InitState, State } from './InitState';
import { ThunkAction } from 'store';
import { Endpoint } from 'api';
import { client } from 'api/client';
import { DialogMode, MessageType } from 'models/message';
import { User } from 'models/user';
import { InitFormContexts } from 'models/shared';

interface GetUsersAction {
  type: string;
  dataEmployee: {
    listEmployees?: User[];
    totalEmployees?: number;
  };
  dataUser: {
    listUsers?: User[];
    totalUsers?: number;
  };
}
interface GetUserAction {
  type: string;
  user?: User;
  employee?: User;
}
interface FieldChangeAction {
  type: string;
  fieldName: string;
  fieldValue?: any;
}
interface ShowToastMessageAction {
  type: string;
  messageType?: MessageType;
  content?: string;
  mode?: DialogMode;
}

type KnownAction = GetUsersAction | GetUserAction | FieldChangeAction | ShowToastMessageAction;

export const ActionCreators = {
  GetEmployees: (): ThunkAction<KnownAction> => async (dispatch, getState) => {
    const state = getState().UserState;
    const res = await client.get(Endpoint.ADMIN_URL, state.filterParams);
    if (res && res.status === 200) {
      dispatch({
        type: ActionType.GET_USERS,
        dataEmployee: {
          listEmployees: res.data.items,
          totalEmployees: res.data.count,
        },
        dataUser: {
          listUsers: [],
          totalUsers: 0,
        },
      });
    } else {
      dispatch({
        type: ActionType.SHOW_NOTIFICATION,
        messageType: MessageType.ServerWarning,
        content: 'Users not found',
      });
    }
  },
  GetEmployee: (): ThunkAction<KnownAction> => async (dispatch, getState) => {
    const state = getState().UserState;
    const res = await client.get(Endpoint.ADMIN_URL, state.filterParams);
    if (res && res.status === 200) {
      dispatch({
        type: ActionType.GET_USER,
        employee: res.data,
      });
    } else {
      dispatch({
        type: ActionType.SHOW_NOTIFICATION,
        messageType: MessageType.ServerWarning,
        content: 'User not found',
      });
    }
  },
  GetUsers: (): ThunkAction<KnownAction> => async (dispatch, getState) => {
    const state = getState().UserState;
    const res = await client.get(Endpoint.USER_URL, state.filterParams);
    if (res && res.status === 200) {
      dispatch({
        type: ActionType.GET_USERS,
        dataUser: {
          listUsers: res.data.items,
          totalUsers: res.data.count,
        },
        dataEmployee: {
          listEmployees: [],
          totalEmployees: 0,
        },
      });
    } else {
      dispatch({
        type: ActionType.SHOW_NOTIFICATION,
        messageType: MessageType.ServerWarning,
        content: 'Users not found',
      });
    }
  },
  GetUser: (): ThunkAction<KnownAction> => async (dispatch, getState) => {
    const state = getState().UserState;
    const res = await client.get(Endpoint.USER_URL, state.filterParams);
    if (res && res.status === 200) {
      dispatch({
        type: ActionType.GET_USER,
        user: res.data,
      });
    } else {
      dispatch({
        type: ActionType.SHOW_NOTIFICATION,
        messageType: MessageType.ServerWarning,
        content: 'User not found',
      });
    }
  },
  FieldChange:
    (fieldName: string, fieldValue?: any): ThunkAction<KnownAction> =>
    (dispatch, getState) => {
      dispatch({
        type: ActionType.FIELD_CHANGE,
        fieldName: fieldName,
        fieldValue: fieldValue,
      });
    },
  ShowToastMessage:
    (messageType: MessageType, content?: string): ThunkAction<KnownAction> =>
    (dispatch, getState) => {
      dispatch({
        type: ActionType.SHOW_NOTIFICATION,
        messageType,
        content,
      });
    },
  HideToastMessage: (): ThunkAction<KnownAction> => (dispatch, getState) => {
    dispatch({
      type: ActionType.HIDE_NOTIFICATION,
    });
  },
};

export const Reducer: ReduxReducer<State, KnownAction> = (
  state: State | undefined,
  incomingAction: KnownAction
) => {
  if (state === undefined) {
    return InitState;
  }
  let action: any;
  switch (incomingAction.type) {
    case ActionType.FIELD_CHANGE:
      action = incomingAction as FieldChangeAction;
      return {
        ...state,
        [action.fieldName]: action.fieldValue,
      };
    case ActionType.SHOW_NOTIFICATION:
      action = incomingAction as ShowToastMessageAction;
      return {
        ...state,
        message: {
          hidden: false,
          title: 'Show notification: ',
          content: action.content,
          mode: action.mode || DialogMode.Toast,
          messageType: action.messageType,
        },
        formContext: InitFormContexts,
      };
    case ActionType.HIDE_NOTIFICATION:
      action = incomingAction as ShowToastMessageAction;
      return {
        ...state,
        message: {
          hidden: true,
          title: '',
          content: '',
          mode: DialogMode.Close,
        },
      };
    case ActionType.GET_USERS:
      action = incomingAction as GetUsersAction;
      return {
        ...state,
        dataEmployee: action.dataEmployee,
        dataUser: action.dataUser,
        formContext: InitFormContexts,
      };
    case ActionType.GET_USER:
      action = incomingAction as GetUserAction;
      return {
        ...state,
        user: action.user,
        employee: action.employee,
        initValues: action.user,
        formContext: InitFormContexts,
      };
    default:
      return {
        ...state,
      };
  }
};
