import React from 'react';
import { IRenderFunction } from '@uifabric/utilities';
import {
  DetailsHeader,
  IColumn,
  IDetailsColumnStyles,
  IDetailsHeaderProps,
  Sticky,
  StickyPositionType,
} from 'office-ui-fabric-react';
import { theme } from 'theme';

export const onRenderDetailsHeader: IRenderFunction<IDetailsHeaderProps> = (
  props?: IDetailsHeaderProps
) => {
  if (props) {
    let Columns: IColumn[] = [...(props.columns ?? [])];
    Columns = Columns.map(col => {
      return {
        ...col,
        name: col.name,
        styles: DetailHeaderStyles,
      };
    });
    return (
      <Sticky stickyPosition={StickyPositionType.Header} stickyBackgroundColor={'transparent'}>
        <DetailsHeader {...props} columns={Columns} styles={{ root: { paddingTop: 0 } }} />
      </Sticky>
    );
  } else {
    return null;
  }
};

export const DetailHeaderStyles: Partial<IDetailsColumnStyles> = {
  root: {
    backgroundColor: theme.palette.themePrimary,
    color: 'white',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, Lato, Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important",
  },
};
