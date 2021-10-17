import React from 'react';
import { Overlay, Stack } from 'office-ui-fabric-react';
import './index.scss';

const LoadingUI = () => {
  return (
    <Stack style={{ width: '100%', height: 'calc(100vh - 4rem)', position: 'relative' }}>
      <div className="nate-team-loading-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <Overlay className="nate-team-loading-spinner" />
    </Stack>
  );
};

export default LoadingUI;
