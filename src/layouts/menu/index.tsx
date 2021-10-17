import React from 'react';
import { connect } from 'react-redux';
import { LocationState } from 'redux-first-router';
import { Divider, Drawer, IconButton, List } from '@material-ui/core';
import clsx from 'clsx';
import { Menu } from '@material-ui/icons';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Image, Stack } from 'office-ui-fabric-react';

import { goToPage } from 'routes';
import { ApplicationState } from 'store';

import { IApp } from 'models/config';
import { useStyles } from 'layouts/config';
import Footer from 'layouts/footer';
import ContextMenu from './context-menu';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as Assets from 'assets';

interface State {
  isOpenMenu: boolean;
  setIsOpenMenu: () => void;
  type: LocationState['type'];
  goToPage: Function;
  apps: IApp[];
}

type Props = State;

const MenuLayout = (props: Props) => {
  const ClassName = useStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(ClassName.drawerPaper, !props.isOpenMenu && ClassName.drawerPaperClose),
      }}
      style={{ backgroundColor: '#0078d4' }}
      open={props.isOpenMenu}
    >
      <div className={ClassName.toolbarIcon}>
        {/* <Image src={Assets.SrcLogoBrand} height={64} width={'auto'} /> */}
      </div>
      <Divider />
      <List component="nav" disablePadding className={ClassName.toolbarMenu}>
        <Stack
          className={props.isOpenMenu ? ClassName.drawerPaper : ClassName.drawerPaperClose}
          style={{
            backgroundColor: '#0078d4',
            cursor: 'pointer',
          }}
          onClick={props.setIsOpenMenu}
        >
          <IconButton style={{ width: 48 }}>
            <Menu style={{ color: '#ffffff' }} />
          </IconButton>
        </Stack>
        {props.apps[0].menu &&
          props.apps[0].menu.map((menu, index) => {
            return (
              <ContextMenu
                key={'menu' + menu.name}
                menu={menu}
                goToPage={props.goToPage}
                type={props.type}
              />
            );
          })}
      </List>
      {props.isOpenMenu === true && <Footer />}
    </Drawer>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  apps: state.ConfigState.apps,
  type: state.location.type,
  location: state.location,
});

const mapDispatchToProps = {
  goToPage: goToPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuLayout as any);
