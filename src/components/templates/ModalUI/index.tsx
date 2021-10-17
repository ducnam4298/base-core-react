import React from 'react';
import { Modal, IconButton, Stack, Separator, Label } from 'office-ui-fabric-react';
import './index.scss';

interface UIProps {
  style?: any;
  title?: string;
  header?: React.ReactNode;
  isOpen?: boolean;
  hideModal?: () => void;
  children?: React.ReactNode;
  minWidth?: number | string;
  width?: number | string;
  maxWidth?: number | string;
  overflowY?: 'initial' | 'inherit' | 'unset' | 'auto' | 'hidden' | 'scroll' | 'visible';
  mainStyle?: any;
}

const ModalUI = (props: UIProps) => {
  return (
    <Modal
      className="nate-team-modal-ui"
      containerClassName={props.style}
      isOpen={props.isOpen}
      onDismiss={props.hideModal}
      styles={{
        main: {
          minWidth: props.minWidth ?? '700px',
          width: props.width,
          maxWidth: props.maxWidth ?? 'auto',
          overflowY: props.overflowY ?? 'scroll',
          ...props.mainStyle,
        },
        scrollableContent: {
          overflowY: 'unset',
        },
      }}
      isBlocking={true}
    >
      <Stack
        horizontal
        styles={{
          root: {
            flex: 1,
            justifyContent: 'space-between',
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 20,
            width: '100%',
            maxWidth: '100%',
          },
        }}
      >
        {props.header ? props.header : <Label>{props.title}</Label>}
        <IconButton
          styles={{
            root: { alignSelf: 'flex-end' },
            icon: { fontWeight: '700' },
          }}
          iconProps={{ iconName: 'Cancel' }}
          ariaLabel="Close popup modal"
          onClick={props.hideModal}
        />
      </Stack>
      {props.header && <Separator style={{ margin: 0, padding: 0 }} />}
      <Stack style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
        {props.children}
      </Stack>
    </Modal>
  );
};

export default ModalUI;
