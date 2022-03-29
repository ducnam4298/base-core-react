import * as React from 'react';
import { Typography, Link } from '@material-ui/core';
import Title from './title';

const preventDefault = (event: React.MouseEvent) => {
  event.preventDefault();
};

const Deposits = () => {
  return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="textSecondary" style={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Deposits;
