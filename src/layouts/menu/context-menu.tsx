import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';
import { IAppMenu } from 'models/config';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { LocationState } from 'redux-first-router';

interface UIProps {
  menu: IAppMenu;
  type: LocationState['type'];
  goToPage: Function;
}

const ContextMenu = (props: UIProps) => {
  const { menu, goToPage } = props;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return menu.menu ? (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <menu.icon
            width={20}
            height={20}
            fill={props.type === menu.name ? '#0078d4' : '#ffffff'}
          />
        </ListItemIcon>
        <ListItemText
          style={{ color: props.type === menu.name ? '#0078d4' : '#ffffff' }}
          primary={menu.title}
        />
        {open ? (
          <ExpandLess style={{ fill: '#ffffff' }} />
        ) : (
          <ExpandMore style={{ fill: '#ffffff' }} />
        )}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="nav">
          {menu.menu.map(subMenu => (
            <ListItem
              key={'subMenu' + subMenu.name}
              style={{
                backgroundColor: props.type === subMenu.name ? '#ffffff' : '#0078d4',
                paddingLeft: '2rem',
              }}
              button
              onClick={() => goToPage(subMenu.name, subMenu.params)}
            >
              <ListItemIcon>
                <subMenu.icon
                  width={18}
                  height={18}
                  fill={props.type === subMenu.name ? '#0078d4' : '#ffffff'}
                />
              </ListItemIcon>
              <ListItemText
                style={{ color: props.type === subMenu.name ? '#0078d4' : '#ffffff' }}
                primary={subMenu.title}
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  ) : (
    <ListItem
      key={'menu' + menu.name}
      style={{ backgroundColor: props.type === menu.name ? '#ffffff' : '#0078d4' }}
      button
      onClick={() => goToPage(menu.name, menu.params)}
    >
      <ListItemIcon>
        <menu.icon width={18} height={18} fill={props.type === menu.name ? '#0078d4' : '#ffffff'} />
      </ListItemIcon>
      <ListItemText
        style={{ color: props.type === menu.name ? '#0078d4' : '#ffffff' }}
        primary={menu.title}
      />
    </ListItem>
  );
};

export default ContextMenu;
