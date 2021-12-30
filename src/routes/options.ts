import { client, Endpoint } from 'api';
import { unionBy } from 'lodash';
import { SwitchAuthenticated } from 'models/context';
import { Permission, Role } from 'models/role';
import { Dispatch } from 'redux';
import { redirect, Bag } from 'redux-first-router';
import { ActionCreators as ContextAction } from 'store/context';

const options = {
  onBeforeChange: async (dispatch: Dispatch<any>, getState: any, bag: Bag) => {
    const {
      location: { routesMap },
    } = getState();

    const { isAuthenticated, user, permissions } = getState().ContextState; // boolean
    const { type } = bag.action; // {type, ...} = bag;
    const required = (routesMap[type] && routesMap[type].required) || '';
    const parentRole = (routesMap[type] && routesMap[type].parentRole) || [];
    const roles = (routesMap[type] && routesMap[type].roles) || [];

    if (isAuthenticated && !user) {
      dispatch(ContextAction.GetDataUser());
    }

    let dataPer: Permission[] = [...permissions];
    if (isAuthenticated && !permissions?.length) {
      const res = await client.get(`${Endpoint.USER_URL}/my-roles`);
      if (res && res?.status === 200) {
        res.data.forEach((elem: Role) => {
          dataPer = unionBy(dataPer, elem.permissions, 'id');
        });
        dispatch(ContextAction.GetRolesUser(dataPer));
      } else {
        console.log('isAuthenticated');
        dispatch(ContextAction.SwitchAuthenticated(SwitchAuthenticated.LOGGEDOUT));
      }
    }

    let isPassedRole: boolean;
    let subRoles = (dataPer || [])
      .filter(elem => (elem?.parentPermissionName || elem?.title) === parentRole)
      .map(role => role.title);

    if (subRoles?.length) {
      isPassedRole = (roles || []).every((value: any) => subRoles.includes(value));
      if (!isPassedRole) {
        const action = redirect({ type: 'Home' });
        dispatch(action);
      }
    } else {
      dispatch(ContextAction.SwitchAuthenticated(SwitchAuthenticated.LOGGEDOUT));
    }

    if (
      required.includes('auth') &&
      !isAuthenticated &&
      getState().location.type !== 'Activation'
    ) {
      const splashStart = redirect({ type: 'SplashStart' });
      dispatch(splashStart);
      const splashWaiting = redirect({ type: 'SplashWaiting' });
      setTimeout(() => dispatch(splashWaiting), 1000);
      const action = redirect({ type: 'Signin' });
      setTimeout(() => dispatch(action), 3000);
    } else if (
      isAuthenticated &&
      !required.includes('auth') &&
      routesMap[type] &&
      getState().location.type !== 'Activation'
    ) {
      const action = redirect({ type: 'Home' });
      dispatch(action);
    }
  },
};

export default options;
