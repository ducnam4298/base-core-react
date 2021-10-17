import React from 'react';
import { useDispatch } from 'react-redux';
import { PrimaryButton, Stack } from 'office-ui-fabric-react';
import { goHome } from 'routes';
import './index.scss';

const NotFoundUI = () => {
  const dispatch = useDispatch();
  return (
    <Stack id="nate-team-not-found">
      <Stack className="nate-team-not-found">
        <Stack className="nate-team-not-found-404">
          <h1>404</h1>
        </Stack>
        <h2>we are sorry, but the page you requested was not found</h2>
        <PrimaryButton text={'Go Home'} className={'nate-team-home-btn'} onClick={() => dispatch(goHome())} />
      </Stack>
    </Stack>
  );
};

export default NotFoundUI;
