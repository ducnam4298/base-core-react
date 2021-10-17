import React, { useMemo } from 'react';
import { PrimaryButton, Stack, Icon, Text, IContextualMenuItem } from 'office-ui-fabric-react';

import './index.scss';

interface UIProps {
  id?: any;
  title?: string;
  iconName?: string;
  onItemClick?: any;
  menuItems: IContextualMenuItem[];
}

const DropdownVer2UI = (props: UIProps) => {
  const { title = 'Title', menuItems = [], onItemClick, iconName } = props;
  const dataActions: IContextualMenuItem[] = useMemo(() => {
    let data: IContextualMenuItem[] = [...menuItems];
    data = data.map((act: IContextualMenuItem) => {
      return {
        ...act,
        text: act.text ?? '',
      };
    });
    return data;
  }, [menuItems]);

  return (
    <PrimaryButton
      className="justify-content-between"
      style={{ whiteSpace: 'nowrap' }}
      menuProps={{
        shouldFocusOnMount: true,
        items: dataActions,
        onItemClick: onItemClick,
      }}
    >
      <Stack horizontal verticalAlign="center">
        <Icon style={{ paddingRight: '5px' }} iconName={iconName} aria-hidden="true" />
        <Text variant="smallPlus" className="font-weight-bold">
          {title}
        </Text>
      </Stack>
    </PrimaryButton>
  );
};

export default DropdownVer2UI;
