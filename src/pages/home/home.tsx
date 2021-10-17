import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { LocationState } from 'redux-first-router';
import { Grid, Paper } from '@material-ui/core';
import { IBreadcrumbItem } from 'office-ui-fabric-react';
import clsx from 'clsx';

import { ContainerUI } from 'components/shared';

import { IMessage } from 'models/message';
import { IFormContext } from 'models/shared';

import { goToPage } from 'routes';
import { ApplicationState } from 'store';
import { ActionCreators as HomeAction } from 'store/home';

import { ChartUI, DepositsUI, OrdersUI } from './component';
import { useStyles } from 'layouts/config';
interface State {
  message: IMessage;
  location: LocationState;
  action: IFormContext;
}
type Props = State & typeof HomeAction;
const Home = (props: Props) => {
  const ClassName = useStyles();
  const fixedHeightPaper = clsx(ClassName.paper, ClassName.fixedHeight);
  useEffect(() => {
    props.HideToastMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const breadcrumbItems: IBreadcrumbItem[] = [
    {
      text: 'Dashboard',
      key: 'd1',
      style: { color: '#fff', fontStyle: 'italic' },
    },
  ];
  return (
    <ContainerUI
      message={props.message}
      breadcrumbItems={breadcrumbItems}
      width={'100%'}
      maxWidth={'75rem'}
      margin={0}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <ChartUI />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <DepositsUI />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={ClassName.paper}>
            <OrdersUI />
          </Paper>
        </Grid>
      </Grid>
    </ContainerUI>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  location: state.location,
  permissions: state.ContextState.permissions,
  ...state.HomeState,
});

const mapDispatchToProps = {
  ...HomeAction,
  goToPage: goToPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home as any);
