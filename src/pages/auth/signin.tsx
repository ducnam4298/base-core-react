import React from 'react';
import { Avatar, CssBaseline, Link, Paper, Grid, Typography, Box } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { useStyles } from './config/sign-css';
import { connect } from 'react-redux';
import { ApplicationState } from 'store';
import { ActionCreators as AuthAction } from 'store/auth';
import { goToPage } from 'routes';
import { FormUI } from 'components/shared/FormUI/form-ui';
import { Forms, validationSignIn } from './config';
import { InitSignin } from 'models/account';
import { Permission } from 'models/role';

interface State {
  permissions: Permission[];
}

type Props = State & typeof AuthAction;

const Signin = (props: Props) => {
  const ClassName = useStyles();
  return (
    <Grid container component="main" className={ClassName.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={ClassName.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={ClassName.paper}>
          <Avatar className={ClassName.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <FormUI
            form={Forms[0]}
            initialValues={InitSignin}
            validationSchema={validationSignIn}
            onSave={(values: { email?: string; password?: string }) =>
              props.Signin({ email: values.email, password: values.password })
            }
          />

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
                  Your Website
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
  ...state.ContextState,
});

const mapDispatchToProps = {
  ...AuthAction,
  goToPage: goToPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin as any);
