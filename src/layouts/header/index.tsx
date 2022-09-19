import React from 'react';
import { AppBar, Badge, IconButton, Toolbar, Typography, Avatar } from '@material-ui/core';
import clsx from 'clsx';
import { Notifications } from '@material-ui/icons';
import { useStyles } from 'layouts/config';
import { connect } from 'react-redux';
import { ApplicationState } from 'store';
import { IApplicationInfo } from 'store/config';
import { User } from 'models/user';

interface State {
  isOpenMenu: boolean;
  setIsOpenMenu: () => void;
  application: IApplicationInfo;
  user?: User;
  isAuthenticated?: boolean;
}

type Props = State;

const HeaderLayout = (props: Props) => {
  const ClassName = useStyles();
  return props.isAuthenticated ? (
    <AppBar
      position="absolute"
      className={clsx(ClassName.appBar, props.isOpenMenu && ClassName.appBarShift)}
    >
      <Toolbar className={ClassName.toolbar}>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={ClassName.title}>
          {props.application.title}
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary" overlap='rectangular'>
            <Notifications />
          </Badge>
        </IconButton>
        <IconButton color="inherit">
          <Avatar
            className={clsx(ClassName.avatar)}
            src={props.user?.profileImage ?? ''}
            variant={'circular'}
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  ) : (
    <AppBar
      position="absolute"
      className={clsx(ClassName.appBar, props.isOpenMenu && ClassName.appBarShift)}
    >
      <Toolbar className={ClassName.toolbar}>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={ClassName.title}>
          {props.application.title}
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary" overlap='rectangular'>
            <Notifications />
          </Badge>
        </IconButton>
        <IconButton color="inherit">
          <Avatar
            className={clsx(ClassName.avatar)}
            src={props.user?.profileImage ?? ''}
            variant={'circular'}
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
const mapStateToProps = (state: ApplicationState) => ({
  application: state.ConfigState.application,
  user: state.ContextState.user,
  isAuthenticated: state.ContextState.isAuthenticated,
});
export default connect(mapStateToProps)(HeaderLayout);
