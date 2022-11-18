import { Reducer as ReduxReducer } from 'redux';
import { ActionType } from './ActionType';
import { InitState, State } from './InitState';
import { ThunkAction } from 'store';
import { DialogMode, MessageType } from 'models/message';
import { InitFormContexts } from 'models/shared';
import { Account } from 'models/account';
import { Endpoint } from 'api';
import { client } from 'api/client';
import { Token } from 'models/user';
import { IFormAuthAction } from 'models/form';

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

interface SigninAction {
  type: string;
  token?: Token;
}

type KnownAction = FieldChangeAction | ShowToastMessageAction | SigninAction;

export const ActionCreators = {
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
  CommitItem:
    (item?: Account, action?: IFormAuthAction): ThunkAction<KnownAction> =>
    async (dispatch, getState) => {
      dispatch({
        type: ActionType.LOADING,
      });
      if (action === IFormAuthAction.Signin) {
        const res = await client.post(`${Endpoint.ADMIN_URL}/login`, {
          email: item?.email,
          password: item?.password,
        });
        if (res && res?.status === 200) {
          dispatch({
            type: ActionType.SIGNIN,
            token: {
              ...res.data,
              content: 'Signin success',
              userId: res.data?.user?.id,
            },
          });
        } else if (res?.status === 403) {
          dispatch({
            type: ActionType.SHOW_NOTIFICATION,
            messageType: MessageType.ServerWarning,
            content: res.data.message,
          });
        } else if (res?.status === 406) {
          dispatch({
            type: ActionType.SHOW_NOTIFICATION,
            messageType: MessageType.ServerWarning,
            content: 'AccountIncorrect',
          });
        } else {
          dispatch({
            type: ActionType.SHOW_NOTIFICATION,
            messageType: MessageType.Error,
            content: 'ServerError',
          });
        }
      }
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
    case ActionType.LOADING:
      return {
        ...state,
        formContext: {
          ...state.formContext,
          isLoading: true,
        },
      };
    case ActionType.SIGNIN:
      action = incomingAction as SigninAction;
      return {
        ...state,
        token: action.token,
        formContext: {
          ...state.formContext,
          isComplete: true,
        },
      };
    default:
      return {
        ...state,
      };
  }
};
