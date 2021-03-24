import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import * as AntIcon from '@ant-design/icons';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

// @withRouter 
// @inject('user') 
// @observer
const AppMenu = ({ theme }) => {
  const [activeKeys, setActiveKeys] = useState([]);
  // const { menuList, matchRoutes } = useModel('permission');

  // 监听地址栏变化
  // useEffect(() => {
  //   if (!matchRoutes.length) {
  //     return
  //   }
  //   const activeKeys = matchRoutes.map(v => v.activeMenuKey || v.key)
  //   setActiveKeys(activeKeys)
  // }, [matchRoutes])

  const renderSubMenu = (menu) => {
    let MenuIcon = AntIcon[menu.icon];
    const subMenuList = menu.routes.filter((v) => !v.hideInMenu && v.name);
    return (
      <SubMenu key={menu.key} icon={<MenuIcon />} title={menu.name}>
        {renderMenu(subMenuList)}
      </SubMenu>
    );
  }

  const renderMenuItem = (menu) => {
    let MenuIcon = AntIcon[menu.icon];
    return (
      <MenuItem
        key={menu.key}
        icon={<MenuIcon />}
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

  return (
    <Menu
      className="app-menu"
      mode="inline"
      theme={theme}
      // defaultOpenKeys={activeKeys}
      selectedKeys={activeKeys}
    >
      {/* {!!menuList.length && renderMenu(menuList)} */}
    </Menu>
  );
};

export default AppMenu;
