import { NOT_FOUND } from 'redux-first-router';

export const goToPage = (type: string, params?: any) => {
  return {
    type,
    payload: params,
  };
};

export const goHome = (params?: any) => ({
  type: 'Home',
  payload: params && { params },
});

export const notFound = () => ({
  type: NOT_FOUND,
});
