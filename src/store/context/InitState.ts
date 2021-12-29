import { clientStorage, sessionStorage } from 'constant/clientStorage';
import { Permission } from 'models/role';
import { IFormContext, InitFormContexts } from 'models/shared';
import { User } from 'models/user';
export interface State {
  app?: string;
  isAuthenticated?: boolean;
  siteConfiguration?: any[];
  permissions?: Permission[];
  user?: User;
  formContext?: IFormContext;
}
export const InitState: State = {
  app: 'Flash-Mobile',
  isAuthenticated: clientStorage.get('flash-cms') ? true : false,
  siteConfiguration: sessionStorage.get('config') ?? null,
  permissions: [],
  user: sessionStorage.get('user') ?? null,
  formContext: InitFormContexts,
};
