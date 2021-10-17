import React from 'react';
import { Link, Typography } from '@material-ui/core';
import { Label, Stack } from 'office-ui-fabric-react';
import { connect } from 'react-redux';
import { ApplicationState } from 'store';
import { IApplicationInfo, ICompanyInfo } from 'store/config';
import { useStyles } from 'layouts/config';

interface State {
  application: IApplicationInfo;
  company: ICompanyInfo;
}

type Props = State;

const Footer = (props: Props) => {
  const ClassName = useStyles();
  return (
    <Typography
      component={'footer'}
      key={'footer'}
      variant="body2"
      align="center"
      className={ClassName.footer}
    >
      <Stack tokens={{ childrenGap: 5 }} horizontal style={{ justifyContent: 'center' }}>
        <Link color="inherit" onClick={() => window.open(props.company.webUrl)}>
          <Label style={{ color: '#ffffff' }}>{props.company.name}</Label>
        </Link>
        <Label style={{ color: '#ffffff' }}>v{props.application.version}</Label>
      </Stack>
    </Typography>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  application: state.ConfigState.application,
  company: state.ConfigState.company,
});
export default connect(mapStateToProps)(Footer);
