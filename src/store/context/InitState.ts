import { clientStorage, sessionStorage } from 'constant/clientStorage';
import { User } from 'models/user';
export interface State {
  language?: string;
  theme?: string;
  app?: string;
  isAuthenticated?: boolean;
  loading: boolean;
  listItems?: {};
  item?: {};
  siteConfiguration?: any[];
  permissions?: any[];
  languages: any;
  user?: User;
}
const InitState: State = {
  language: clientStorage.get('I18nLang') === 'en' ? 'en' : 'fr',
  app: 'Flash-Mobile',
  theme: 'Default',
  loading: false,
  isAuthenticated: clientStorage.get('flash-mobile-cms') ? true : false,
  user: sessionStorage.get('user') ?? null,
  siteConfiguration: sessionStorage.get('config') ?? null,
  languages: sessionStorage.get('lng') ?? null,
};
export default InitState;
