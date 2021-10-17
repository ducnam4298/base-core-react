import React from 'react';
import { Container } from '@material-ui/core';
import { LocationState } from 'redux-first-router';
import { useStyles } from 'layouts/config';
import MenuLayout from 'layouts/menu';
import Content from 'pages/content';

interface State {
  // isAuthenticated?: boolean;
  isOpenMenu: boolean;
  setIsOpenMenu: () => void;
  page?: string;
  locationType?: LocationState['type'];
}

type Props = State;

const ContainerLayout = (props: Props) => {
  const ClassName = useStyles();
  const MenuProps = {
    isOpenMenu: props.isOpenMenu,
    setIsOpenMenu: props.setIsOpenMenu,
  };
  return (
    <>
      <MenuLayout {...MenuProps} />
      <main key={'main'} className={ClassName.content}>
        <div key={'main-content'} className={ClassName.appBarSpacer} />
        <Container maxWidth="lg" className={ClassName.container}>
          <Content />
        </Container>
      </main>
    </>
  );
};

export default ContainerLayout;
