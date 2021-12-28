export const ActionType = {
  LOADING: 'context/LOADING',
  LOADED: 'context/LOADED',
  CHANGE_THEME: 'context/CHANGE_THEME',
  CHANGE_LANGUAGE: 'context/CHANGE_LANGUAGE',
  SWITCH_ROLE: 'context/SWITCH_ROLE',
  SWITCH_APP: 'context/SWITCH_APP',
  REQUEST_ITEMS: 'context/REQUEST_ITEMS', // Lấy danh sách items
  RECEIVED_ITEMS: 'context/RECEIVED_ITEMS', // Lấy xong (nhận về) danh sách items
  REQUEST_ITEM: 'context/REQUEST_ITEM', // Lấy item
  RECEIVED_ITEM: 'context/RECEIVED_ITEM', // Lấy xong (nhận về) item
  COMMITTING_ITEM: 'context/COMMITTING_ITEM',
  COMMITTED_ITEM: 'context/COMMITTED_ITEM',
  FORM_FIELD_CHANGE: 'context/FORM_FIELD_CHANGE',
  NEW_FORM: 'context/NEW_FORM',
  UPDATE_FORM: 'context/UPDATE_FORM',
  GET_LANGUAGE: 'context/GET_LANGUAGE',

  GET_CONFIGURATION: 'context/GET_CONFIGURATION',
  GET_ROLES_USER: 'context/GET_ROLES_USER',
  SWITCH_AUTHENTICATED: 'context/SWITCH_AUTHENTICATED',
  GET_DATA_USER: 'context/GET_DATA_USER',
  FIELD_CHANGE: 'context/FIELD_CHANGE',
};
