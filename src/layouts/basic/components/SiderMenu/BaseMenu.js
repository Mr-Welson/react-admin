import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import * as AntIcon from '@ant-design/icons';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const BaseMenu = ({ mode = 'inline', theme = 'dark', menuList = [], activeKeys }) => {
  console.log(mode);
  
  return (
    <Menu
      className="app-menu"
      mode={mode} // mode="horizontal"
      theme={theme}
      defaultOpenKeys={activeKeys}
      selectedKeys={activeKeys}
    >
      {!!menuList.length && renderMenu(menuList)}
    </Menu>
  );
};

const renderSubMenu = (menu) => {
  const MenuIcon = menu.icon && AntIcon[menu.icon];
  const subMenuList = menu.routes.filter((v) => !v.hideInMenu && v.name);
  return (
    <SubMenu key={menu.key} icon={menu.icon ? <MenuIcon /> : undefined} title={menu.name}>
      {renderMenu(subMenuList)}
    </SubMenu>
  );
}

const renderMenuItem = (menu) => {
  const MenuIcon = menu.icon && AntIcon[menu.icon];
  return (
    <MenuItem
      key={menu.key}
      icon={menu.icon ? <MenuIcon /> : undefined}
    >
      <Link to={menu.path}>{menu.name}</Link>
    </MenuItem>
  )
}

const renderMenu = (menuList) => {
  return menuList.map((menu) => {
    if (menu.routes && menu.routes.length) {
      return renderSubMenu(menu)
    } else {
      return renderMenuItem(menu)
    }
  })
}

export default BaseMenu;
