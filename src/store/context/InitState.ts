import { clientStorage, sessionStorage } from 'constant/clientStorage';
import { Permissions } from 'models/role';
import { User } from 'models/user';
export interface State {
  theme?: string;
  app?: string;
  isAuthenticated?: boolean;
  loading: boolean;
  listItems?: {};
  item?: {};
  siteConfiguration?: any[];
  permissions?: Permissions[];
  user?: User;
}
export const InitState: State = {
  app: 'Flash-Mobile',
  theme: 'Default',
  loading: false,
  isAuthenticated: clientStorage.get('flash-mobile-cms') ? true : false,
  user: sessionStorage.get('user') ?? null,
  siteConfiguration: sessionStorage.get('config') ?? null,
};
