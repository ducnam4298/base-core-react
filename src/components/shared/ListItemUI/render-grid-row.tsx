import React from 'react';
import { DetailsRow, IDetailsRowStyles } from 'office-ui-fabric-react';
import { theme } from 'theme';

export const onRenderRow = (props: any) => {
  const customStyles: Partial<IDetailsRowStyles> = {};
  if (props) {
    if (props.itemIndex % 2 === 0) {
      customStyles.root = { backgroundColor: theme.palette.themeLighterAlt };
    }
    return <DetailsRow {...props} styles={customStyles} />;
  }
  return null;
};
