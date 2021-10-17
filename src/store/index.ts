import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { connectRoutes, LocationState } from 'redux-first-router';
import Thunk from 'redux-thunk';
import queryString from 'query-string';

import { RoutesMap, options } from 'routes';

import * as RootReducer from './root';
import { State as ConfigState, Reducer as ConfigReducer } from './config';
import { State as ContextState, Reducer as ContextReducer } from './context';
import { State as UserState, Reducer as UserReducer } from './user';
import { State as ProductState, Reducer as ProductReducer } from './product';
import { State as RoleState, Reducer as RoleReducer } from './role';
import { State as OrderState, Reducer as OrderReducer } from './order';
import { State as BillState, Reducer as BillReducer } from './bill';
import { State as SettingState, Reducer as SettingReducer } from './setting';
import { State as BrandState, Reducer as BrandReducer } from './brand';
import { State as DeliveryState, Reducer as DeliveryReducer } from './delivery';
import { State as HomeState, Reducer as HomeReducer } from './home';

const AllReducers = {
  ConfigState: ConfigReducer,
  ContextState: ContextReducer,
  UserState: UserReducer,
  ProductState: ProductReducer,
  RoleState: RoleReducer,
  OrderReducer: OrderReducer,
  BillState: BillReducer,
  SettingState: SettingReducer,
  BrandState: BrandReducer,
  DeliveryState: DeliveryReducer,
  HomeState: HomeReducer,
};

export interface ApplicationState {
  page: string;
  location: LocationState;
  ConfigState: ConfigState;
  ContextState: ContextState;
  UserState: UserState;
  ProductState: ProductState;
  RoleState: RoleState;
  OrderReducer: OrderState;
  BillState: BillState;
  SettingState: SettingState;
  BrandState: BrandState;
  DeliveryState: DeliveryState;
  HomeState: HomeState;
}

export interface ThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}

const ConfigStore = () => {
  const { reducer, middleware, enhancer } = connectRoutes(RoutesMap, {
    querySerializer: queryString,
    ...options,
  });

  const windowIfDefined = typeof window === 'undefined' ? null : (window as any);
  const composeEnhancers = windowIfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? windowIfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

  const rootReducer = combineReducers({ ...RootReducer, ...AllReducers, location: reducer });
  const middlewares = applyMiddleware(middleware, Thunk);
  const enhancers = composeEnhancers(enhancer, middlewares);
  const store = createStore(rootReducer, enhancers);
  //   syncTranslationWithStore(store);
  // store.dispatch(loadTranslations(i18nDictionary))
  //   store.dispatch(setLocale(clientStorage.get('I18nLang') === 'en' ? 'en' : 'fr')); //fr
  return store;
};

export default ConfigStore;
