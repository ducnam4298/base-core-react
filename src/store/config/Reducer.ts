import { Reducer as ReduxReducer } from 'redux';
import { InitState, State } from './InitState';

//#region declare actions
type KnownAction = any;
//#endregion

//#region ActionCreators
//#endregion

export const Reducer: ReduxReducer<State, KnownAction> = (
  state: State | undefined,
  incomingAction: KnownAction
): State => {
  return InitState;
};
