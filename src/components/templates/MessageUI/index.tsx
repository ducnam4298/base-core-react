import React, { useCallback, useEffect } from 'react';
import { IStackProps, MessageBar, MessageBarType, Stack } from 'office-ui-fabric-react';
import { MessageType, ToastType } from 'models/message';

interface IMessageProps {
  resetChoice?: () => void;
  errorMessage?: string;
}

const verticalStackProps: IStackProps = {
  styles: {
    root: {
      overflow: 'hidden',
      width: '20%',
      minWidth: 300,
      position: 'fixed',
      right: '15px',
      top: '70px',
      zIndex: 999999,
    },
  },
  tokens: { childrenGap: 20 },
};

const SuccessMessage = (props: IMessageProps) => (
  <MessageBar
    onDismiss={props.resetChoice}
    dismissButtonAriaLabel="Close"
    messageBarType={MessageBarType.success}
    // isMultiline={false}
  >
    {props.errorMessage}
  </MessageBar>
);

const BlockedMessage = (props: IMessageProps) => (
  <MessageBar
    messageBarType={MessageBarType.blocked}
    isMultiline={false}
    onDismiss={props.resetChoice}
    dismissButtonAriaLabel="Close"
    truncated={true}
    overflowButtonAriaLabel="See more"
  >
    {props.errorMessage}
  </MessageBar>
);

const DefaultMessage = (props: IMessageProps) => (
  <MessageBar isMultiline={false} onDismiss={props.resetChoice} dismissButtonAriaLabel="Close">
    {props.errorMessage}
  </MessageBar>
);

const ErrorMessage = (props: IMessageProps) => (
  <MessageBar
    messageBarType={MessageBarType.error}
    isMultiline={false}
    onDismiss={props.resetChoice}
    dismissButtonAriaLabel="Close"
  >
    {props.errorMessage}
  </MessageBar>
);

const WarningMessage = (props: IMessageProps) => (
  <MessageBar
    messageBarType={MessageBarType.warning}
    isMultiline={true}
    onDismiss={props.resetChoice}
    dismissButtonAriaLabel="Close"
  >
    {props.errorMessage}
  </MessageBar>
);

const SevereWarningMessage = (props: IMessageProps) => (
  <MessageBar
    messageBarType={MessageBarType.severeWarning}
    isMultiline={true}
    onDismiss={props.resetChoice}
    dismissButtonAriaLabel="Close"
  >
    {props.errorMessage}
  </MessageBar>
);

type UIProps = {
  type?: ToastType;
  messageType?: MessageType;
  messageText?: string;
  hideMessage?: Function;
};

const MessageUI = (props: UIProps) => {
  const type = props.type;
  const resetChoice = useCallback(() => {
    props.hideMessage && props.hideMessage();
  }, [props]);

  useEffect(() => {
    const time = setTimeout(
      () => {
        resetChoice();
      },
      props.messageType === MessageType.Blocked
        ? 1500
        : MessageType.ServerWarning
        ? 3000
        : MessageType.Error
        ? 5000
        : 1500
    );
    return () => clearTimeout(time);
  }, [props.messageType, resetChoice]);

  return (
    <Stack style={{ zIndex: 9999999 }} {...verticalStackProps}>
      {(type === ToastType.Success || props.messageType === MessageType.Success) && (
        <SuccessMessage resetChoice={resetChoice} errorMessage={props.messageText} />
      )}
      {(type === ToastType.Blocked || props.messageType === MessageType.Blocked) && (
        <BlockedMessage resetChoice={resetChoice} errorMessage={props.messageText} />
      )}
      {(type === ToastType.Error || props.messageType === MessageType.Error) && (
        <ErrorMessage resetChoice={resetChoice} errorMessage={props.messageText} />
      )}
      {type === ToastType.Default && (
        <DefaultMessage resetChoice={resetChoice} errorMessage={props.messageText} />
      )}
      {(type === ToastType.Warning || props.messageType === MessageType.Warning) && (
        <WarningMessage resetChoice={resetChoice} errorMessage={props.messageText} />
      )}
      {props.messageType === MessageType.ServerWarning && (
        <SevereWarningMessage resetChoice={resetChoice} errorMessage={props.messageText} />
      )}
    </Stack>
  );
};

export default MessageUI;
