import { clientStorage, sessionStorage } from 'constant/clientStorage';
import { Permission } from 'models/role';
import { IFormContext, InitFormContexts } from 'models/shared';
import { Token, User } from 'models/user';
export interface State {
  app?: string;
  isAuthenticated?: boolean;
  siteConfiguration?: any[];
  permissions?: Permission[];
  user?: User;
  formContext?: IFormContext;
  token?: Token;
}
export const InitState: State = {
  app: 'Flash-Mobile',
  isAuthenticated: clientStorage.get('sp-flash') ? true : false,
  siteConfiguration: sessionStorage.get('config') ?? null,
  permissions: sessionStorage.get('pms') ?? [],
  user: sessionStorage.get('us') ?? null,
  formContext: InitFormContexts,
};
