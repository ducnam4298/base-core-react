import { DialogMode, IMessage } from 'models/message';
import { IFormContext, InitFormContexts } from 'models/shared';

export interface State {
  message: IMessage;
  formContext?: IFormContext;
}

export const InitState: State = {
  message: {
    hidden: true,
    mode: DialogMode.None,
    title: '',
    content: '',
  },
  formContext: InitFormContexts,
};
