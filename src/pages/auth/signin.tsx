import React, { useEffect } from 'react';
import { Avatar, Link, Paper, Grid, Typography, Box } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { useStyles } from './config/sign-css';
import { connect, useDispatch } from 'react-redux';
import { ApplicationState } from 'store';
import { ActionCreators as AuthAction } from 'store/auth';
import { ActionCreators as ContextAction } from 'store/context';
import { goToHome } from 'routes';
import { FormUI } from 'components/shared/FormUI/form-ui';
import { Forms, validationSignIn } from './config';
import { InitSignin } from 'models/account';
import { IMessage, MessageType } from 'models/message';
import { IFormAuthAction } from 'models/form';
import { SwitchAuthenticated } from 'models/context';
import { LocationState } from 'redux-first-router';
import { ICompanyInfo } from 'models/config';
import { IFormContext } from 'models/shared';
import { Token } from 'models/user';
import { ContainerUI } from 'components/shared';

interface State {
  location: LocationState;
  company: ICompanyInfo;
  formContext?: IFormContext;
  message: IMessage;
  goToHome: (params?: any) => void;
  token?: Token;
}

type Props = State & typeof AuthAction;

const Signin = (props: Props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.location.payload?.params?.content) {
      const content = props.location.payload?.params?.content;
      props.ShowToastMessage(MessageType.Success, content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location.payload]);

  useEffect(() => {
    if (props.formContext?.isComplete && props.token && props.token) {
      dispatch(ContextAction.SwitchAuthenticated(SwitchAuthenticated.LOGGEDIN, props.token));
      props.goToHome({ content: props.token?.content });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.formContext, props.token]);

  const ClassName = useStyles();
  return (
    <Grid container component="main" className={ClassName.root}>
      <Grid item xs={false} sm={4} md={7} className={ClassName.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={ClassName.paper}>
          <Avatar className={ClassName.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <ContainerUI message={props.message} width={'100%'} noCardTag>
            <FormUI
              form={Forms[0]}
              initialValues={InitSignin}
              validationSchema={validationSignIn}
              textButton={'Sign in'}
              iconButton={''}
              disabledButton={props.formContext?.isLoading}
              onSave={(values: { email?: string; password?: string }) =>
                props.CommitItem(
                  { email: values.email, password: values.password },
                  IFormAuthAction.Signin
                )
              }
            />
          </ContainerUI>

          <div className={ClassName.form}>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://mui.com/">
                  {props.company.webUrl}
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
              </Typography>
            </Box>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  location: state.location,
  company: state.ConfigState.company,
  ...state.AuthState,
});

const mapDispatchToProps = {
  ...AuthAction,
  goToHome: (params?: any) => goToHome(params),
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin as any);
