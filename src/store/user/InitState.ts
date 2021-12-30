import { DialogMode, IMessage } from 'models/message';
import { IFormContext, InitFormContexts, InitQueryParams, IQueryParams } from 'models/shared';
import { initValuesDefault } from 'pages/user/employee/configs';
import { User } from 'models/user';

export interface IFilterParams extends IQueryParams {}

export interface State {
  message: IMessage;
  formContext?: IFormContext;
  dataEmployee: {
    listEmployees?: User[];
    totalEmployees?: number;
  };
  dataUser: {
    listUsers?: User[];
    totalUsers?: number;
  };
  user?: User;
  employee?: User;
  initValues: User;
  filterParams?: IFilterParams;
}

export const InitState: State = {
  message: {
    hidden: true,
    mode: DialogMode.None,
    title: '',
    content: '',
  },
  formContext: InitFormContexts,
  dataEmployee: {
    listEmployees: [],
    totalEmployees: 0,
  },
  dataUser: {
    listUsers: [],
    totalUsers: 0,
  },
  initValues: initValuesDefault,
  filterParams: InitQueryParams,
};
