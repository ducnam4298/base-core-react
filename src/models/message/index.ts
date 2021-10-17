export enum MessageType {
  Info = 0,
  Error,
  Blocked,
  ServerWarning,
  Success,
  Warning,
  Pending,
  Loading,
}

export enum DialogMode {
  None,
  Confirm,
  Alert,
  Close,
  Toast,
  Add,
}

export enum ToastType {
  None = 0,
  Success = 1,
  Blocked = 2,
  Default = 3,
  Error = 4,
  Warning = 5,
}
export interface IMessage {
  mode: DialogMode;
  title: string;
  content: string;
  hidden?: boolean;
  messageType?: MessageType;
}
