import React from 'react';
import {
  Dialog,
  IDialogContentProps,
  IModalProps,
  IStyleFunctionOrObject,
  IDialogStyleProps,
  IDialogStyles,
  Stack,
  Label,
} from 'office-ui-fabric-react';
interface UIProps {
  hidden?: boolean;
  content?: IDialogContentProps;
  modalProps?: IModalProps;
  onDismiss?: (ev?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
  onCancel?: () => void;
  onOK?: () => void;
  textOK?: string;
  textCancel?: string;
  styles?: IStyleFunctionOrObject<IDialogStyleProps, IDialogStyles>;
}

const DialogUI = (props: UIProps) => {
  const { hidden, onDismiss, content, modalProps, onCancel, onOK, textOK, textCancel } = props;

  return (
    <Dialog
      hidden={hidden}
      onDismiss={onDismiss}
      minWidth={360}
      dialogContentProps={content}
      modalProps={modalProps}
      styles={{
        main: {
          borderRadius: 5,
        },
      }}
    >
      <Stack horizontal style={{ width: '100%' }}>
        <Stack
          styles={{
            root: {
              width: '50%',
              alignItems: 'center',
              cursor: 'pointer',
              backgroundColor: '#0073BF',
              selectors: {
                '&:hover': {
                  opacity: 0.8,
                },
              },
            },
          }}
          onClick={onOK}
        >
          <Label style={{ color: '#fff', cursor: 'pointer' }}>{textOK}</Label>
        </Stack>
        <Stack
          styles={{
            root: {
              width: '50%',
              alignItems: 'center',
              cursor: 'pointer',
              border: '0.5px solid #f0f0f0',
              selectors: {
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              },
            },
          }}
          onClick={onCancel}
        >
          <Label>{textCancel}</Label>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default DialogUI;
