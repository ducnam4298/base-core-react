export type ConfigName =
  | 'DefaultGroupLogo'
  | 'LogoProduct'
  | 'DefaultUserAvatar'
  | 'LogoBrand'
  | 'DefaultUserCoverPhoto'
  | 'DefaultGroupCoverPhoto'
  | 'Title'
  | 'ColorTitleHeader';

export interface DefaultConfig {
  configName?: ConfigName;
  configValue?: string;
}
export interface IApplicationInfo {
  logo?: string;
  title: string;
  description?: string;
  version?: string;
  webUrl?: string;
}
export interface ICompanyInfo {
  name?: string;
  description?: string;
  webUrl?: string;
  address?: string;
  phone?: string;
  fax?: string;
}
export interface IApp {
  name: string;
  title: string;
  url: string;
  icon?: string | any;
  inactiveIcon?: string | any;
  menu?: IAppMenu[];
}
export interface IAppMenu {
  name: string;
  title?: string;
  url?: string;
  params?: any;
  icon?: string | any;
  inactiveIcon?: string | any;
  menu?: IAppMenu[];
  isDefault?: boolean;
  roles?: any[];
  parentRoles?: string;
}
