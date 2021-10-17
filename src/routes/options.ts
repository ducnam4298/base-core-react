import { Dispatch } from 'redux';
import { Bag } from 'redux-first-router';
// import { redirect, Bag } from 'redux-first-router';
// import { ActionCreators as ContextAction } from 'store/context';
import { goToPage } from './Actions';

// import { loadTranslations } from "react-redux-i18n";

const options = {
  onBeforeChange: async (dispatch: Dispatch<any>, getState: any, bag: Bag) => {
    // const {
    //   location: { routesMap },
    // } = getState();

    // const {
    //   isAuthenticated,
    //   user,
    //   siteConfiguration,
    //   permissions,
    //   languages,
    // } = getState().ContextState; // boolean
    // const { type } = bag.action; // {type, ...} = bag;
    // const required = (routesMap[type] && routesMap[type].required) || '';

    // if (!languages || !Object.keys(languages)?.length) {
    //   console.log(languages);
    //   dispatch(ContextAction.GetLanguage());
    // } else {
    //   console.log(languages);
    //   dispatch(loadTranslations(languages));
    // }

    // if (isAuthenticated && !user) {
    //   dispatch(ActionCreators.GetDataUser());
    // }

    // if (!siteConfiguration?.length) {
    //   dispatch(ContextAction.GetSiteConfiguration());
    // }

    // if (
    //   required.includes('auth') &&
    //   !isAuthenticated &&
    //   getState().location.type !== 'Activation'
    // ) {
    //   const splashStart = redirect({ type: 'SplashStart' });
    //   dispatch(splashStart);
    //   const splashWaiting = redirect({ type: 'SplashWaiting' });
    //   setTimeout(() => dispatch(splashWaiting), 1000);
    //   const action = redirect({ type: 'Signin' });
    //   setTimeout(() => dispatch(action), 3000);
    // } else if (
    //   isAuthenticated &&
    //   !required.includes('auth') &&
    //   routesMap[type] &&
    //   getState().location.type !== 'Activation'
    // ) {
    //   const action = redirect({ type: 'Home' });
    //   dispatch(action);
    // }
    goToPage('Home');
  },
};

export default options;
