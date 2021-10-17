import { DialogMode, IMessage } from 'models/message';
import { IFormContext, InitFormContexts, InitQueryParams, IQueryParams } from 'models/shared';
import { initValuesDefault } from 'pages/user/configs';
import { User } from 'models/user';

export interface IFilterParams extends IQueryParams {}

export interface State {
  message: IMessage;
  formContext?: IFormContext;
  listUsers?: User[];
  user?: User;
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
  listUsers: [],
  initValues: initValuesDefault,
  filterParams: InitQueryParams,
};
