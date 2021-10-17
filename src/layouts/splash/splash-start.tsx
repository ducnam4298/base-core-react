import React from 'react';
import { Image, Label, Stack } from 'office-ui-fabric-react';
import * as Assets from 'assets';

const SplashStart = () => {
  return (
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
      <Image
        src={Assets.SrcLogo}
        styles={{ root: { maxWidth: '50%' }, image: { maxWidth: '100%' } }}
      />
      <Label
        style={{
          fontSize: '1.5rem',
          color: '#ECB025',
          margin: '15% 0',
          width: '70%',
        }}
      >
        Immunization Supply Chain m-learning programme
      </Label>
      {/* <Image
        // src={Assets.SrcMotorBike}
        styles={{ root: { maxWidth: '100%' }, image: { maxWidth: '100%' } }}
      /> */}
    </Stack>
  );
};

export default SplashStart;
