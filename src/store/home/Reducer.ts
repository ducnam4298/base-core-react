import { Reducer as ReduxReducer } from 'redux';
import { ActionType } from './ActionType';
import { InitState, State } from './InitState';
import { ThunkAction } from 'store';
import { DialogMode, MessageType } from 'models/message';

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

type KnownAction = FieldChangeAction | ShowToastMessageAction;

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
    default:
      return {
        ...state,
      };
  }
};
