import { DialogMode, IMessage } from 'models/message';
import { IFormContext, InitFormContexts, InitQueryParams, IQueryParams } from 'models/shared';
import { Token } from 'models/user';

export interface IFilterParams extends IQueryParams {}
export interface State {
  message: IMessage;
  formContext?: IFormContext;
  filterParams?: IFilterParams;
  token?: Token;
}

export const InitState: State = {
  message: {
    hidden: true,
    mode: DialogMode.None,
    title: '',
    content: '',
  },
  formContext: InitFormContexts,
  filterParams: InitQueryParams,
};
