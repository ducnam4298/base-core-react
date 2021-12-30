import React, { useEffect, useState } from 'react';
import { Image, Label, ProgressIndicator, Stack } from 'office-ui-fabric-react';
import * as Assets from 'assets';
import { Grid } from '@material-ui/core';
import { useStyles } from './config/sign-css';
import { ContainerUI } from 'components/shared';

const SplashWaiting = () => {
  const [percentComplete, setPercentComplete] = useState(0);
  const [increment, setIncrement] = useState(0.01);
  const delay = 5;
  useEffect(() => {
    const id = setInterval(() => {
      if (percentComplete > 0.99) {
        setIncrement(0);
      } else setPercentComplete((increment + percentComplete) % 1);
    }, delay);
    return () => clearInterval(id);
  }, [increment, percentComplete]);
  const ClassName = useStyles();
  return (
    <Grid container component={'main'} className={ClassName.root}>
      <ContainerUI width={'100%'} noCardTag>
        <Stack
          style={{
            alignItems: 'center',
            textAlign: 'center',
            width: '100%',
            height: '100%',
            maxWidth: '30rem',
            margin: 'auto',
            justifyContent: 'center',
            textShadow: '2px 2px 3px #00000029',
          }}
        >
          {/* <Image
        src={Assets.SrcLogoAfro}
        styles={{ root: { maxWidth: "50%" }, image: { maxWidth: "100%" } }}
      /> */}
          <Label style={{ fontSize: '1.5rem' }}>WELCOME</Label>
          <ProgressIndicator
            styles={{
              root: {
                width: '100%',
              },
            }}
            percentComplete={percentComplete}
          />
        </Stack>
      </ContainerUI>
    </Grid>
  );
};

export default SplashWaiting;
