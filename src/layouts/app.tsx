import React, { useState } from 'react';
import { initializeIcons } from 'office-ui-fabric-react';
import { CssBaseline } from '@material-ui/core';
import ContainerLayout from './container';
import HeaderLayout from './header';
import { useStyles } from './config';
import './app.scss';

const App = () => {
  initializeIcons();
  const ClassName = useStyles();
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const HeaderProps = {
    isOpenMenu: open,
    setIsOpenMenu: toggleDrawer,
  };
  const ContainerProps = {
    isOpenMenu: open,
    setIsOpenMenu: toggleDrawer,
  };
  return (
    <div key={'root-main'} className={ClassName.root}>
      <CssBaseline />
      <HeaderLayout key={'header'} {...HeaderProps} />
      <ContainerLayout key={'container'} {...ContainerProps} />
    </div>
  );
};

export default App;
