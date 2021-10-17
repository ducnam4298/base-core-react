import React, { useEffect, useState } from 'react';
import { IBreadcrumbItem, Stack, Text } from 'office-ui-fabric-react';
import { Col, Row } from 'reactstrap';
import { IDialog } from 'models/shared';
import { DialogMode, IMessage } from 'models/message';
import { LoadingUI } from 'components/shared';
import { BreadcrumbUI, DialogUI, MessageUI, ModalUI } from 'components/templates';
import './index.scss';

type UIProps = {
  message?: IMessage;
  children: React.ReactNode;
  allowed?: boolean;
  width?: number | string;
  maxWidth?: number | string;
  height?: number | string;
  maxHeight?: number | string;
  margin?: number | string;
  backgroundImage?: string;
  breadcrumbItems?: IBreadcrumbItem[];
  onRenderNavigation?: () => React.ReactNode;
  isLoading?: boolean;

  // DIALOG
  dialog?: IDialog;
  onCancelDialog?: () => void;
  onOkDialog?: any;

  // MODAL
  titleModal?: string;
  isOpenModal?: boolean;
  onHideModal?: () => void;
  minWidthModal?: string | number;
  widthModal?: string | number;
  maxWidthModal?: string | number;
  minHeightModal?: string | number;
  overflowY?: 'scroll' | 'auto' | 'initial' | 'inherit' | 'unset' | 'hidden' | 'visible';
  onRenderModalContent?: () => React.ReactNode;
  noCardTag?: boolean;
};

const ContainerUI = (props: UIProps) => {
  const [show, setShow] = useState(false);

  const hideMessage = () => {
    setShow(false);
  };

  // Destructuring
  const {
    children,
    message,
    allowed,
    width,
    maxWidth,
    height,
    maxHeight,
    backgroundImage,
    breadcrumbItems = [],
    onRenderNavigation,
    dialog,
    onCancelDialog,
    onOkDialog,
    titleModal,
    isOpenModal,
    onHideModal,
    minWidthModal,
    widthModal,
    maxWidthModal,
    minHeightModal,
    isLoading,
    overflowY,
    onRenderModalContent,
    noCardTag,
  } = props;

  useEffect(() => {
    if (message && message.hidden === false) {
      setShow(true);
    }
  }, [message]);

  return (
    <>
      {dialog && (
        <DialogUI
          hidden={false}
          content={dialog?.content}
          textOK={'Confirm'}
          textCancel={'Cancel'}
          onCancel={onCancelDialog}
          onOK={() => onOkDialog(dialog?.item)}
        />
      )}
      <ModalUI
        style={{ height: 'auto', width: widthModal ?? 800 }}
        title={titleModal}
        isOpen={isOpenModal}
        hideModal={onHideModal}
        overflowY={overflowY}
        mainStyle={{ minHeight: minHeightModal ?? '600px' }}
        minWidth={minWidthModal}
        width={widthModal}
        maxWidth={maxWidthModal}
      >
        {isLoading ? (
          <Text variant="medium">Loading</Text>
        ) : (
          onRenderModalContent && onRenderModalContent()
        )}
      </ModalUI>
      {message?.mode === DialogMode.Toast && show && (
        <MessageUI
          messageType={message.messageType}
          messageText={message.content}
          hideMessage={hideMessage}
        />
      )}
      {allowed === false ? (
        <LoadingUI />
      ) : !noCardTag ? (
        <>
          <Row style={{ marginTop: '0.5rem' }}>
            <Col xs="12">
              <Stack
                horizontal
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  borderTopLeftRadius: '0.5rem',
                  borderTopRightRadius: '0.5rem',
                  background: '#3699ff',
                  padding: '0 1rem',
                  width: width ?? '60%',
                  maxWidth: maxWidth,
                  margin: '0 auto',
                }}
              >
                <BreadcrumbUI source={breadcrumbItems} />
                {onRenderNavigation && onRenderNavigation()}
              </Stack>
              <Stack
                className={'nate-team-container'}
                style={{
                  width: width ?? '60%',
                  maxWidth: maxWidth,
                  height: height ?? 'auto',
                  maxHeight: maxHeight ?? 'auto',
                  padding: '1rem',
                  boxShadow: '0 2px 6px #0000001f',
                  margin: '0 auto',
                }}
              >
                <Stack
                  className={'nate-team-content card'}
                  style={{
                    backgroundImage: `url(${backgroundImage ?? ''})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPositionX: 'center',
                  }}
                >
                  {children}
                </Stack>
              </Stack>
            </Col>
          </Row>
        </>
      ) : (
        <Stack
          className={'nate-team-container'}
          style={{
            width: width ?? '70%',
            maxWidth: maxWidth,
          }}
        >
          <Stack
            className={'nate-team-content card'}
            style={{ backgroundImage: `url(${backgroundImage ?? ''})` }}
          >
            {children}
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default ContainerUI;
