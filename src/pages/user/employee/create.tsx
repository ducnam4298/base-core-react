import React from 'react';
import { connect } from 'react-redux';
import { IBreadcrumbItem } from 'office-ui-fabric-react';
import { goToPage } from 'routes';
import { ApplicationState } from 'store';
import { ActionCreators as UserAction } from 'store/user';
import { IMessage } from 'models/message';
import { User } from 'models/user';
import { ContainerUI } from 'components/shared';
import { FormUI } from 'components/shared/FormUI/form-ui';
import { Forms, validationCreateSchema } from './configs';

interface State {
  goToPage: Function;
  message: IMessage;
  initValues?: User;
}

type Props = State & typeof UserAction;

const Create = (props: Props) => {
  const breadcrumbItems: IBreadcrumbItem[] = [
    {
      text: 'Employee',
      key: 'd1',
      style: { color: '#fff', fontStyle: 'italic' },
      onClick: () => props.goToPage('Employees'),
    },
    {
      text: 'Create',
      key: 'd2',
      style: { color: '#fff', fontStyle: 'italic' },
    },
  ];
  const listRightOptions = [
    {
      title: 'Profile Image',
      required: true,
      show: true,
    },
    {
      title: 'Cover Image',
      required: true,
      show: true,
    },
    {
      title: 'Contract',
      required: true,
      show: true,
    },
  ];
  return (
    <ContainerUI
      message={props.message}
      breadcrumbItems={breadcrumbItems}
      width={'100%'}
      maxWidth={'75rem'}
    >
      <FormUI
        form={Forms[0]}
        initialValues={props.initValues}
        numberBox={listRightOptions.length}
        listRightOptions={listRightOptions}
        validationSchema={validationCreateSchema}
      />
    </ContainerUI>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  ...state.UserState,
});

const mapDispatchToProps = {
  ...UserAction,
  goToPage: goToPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Create as any);
