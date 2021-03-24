import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { withModel, toJS } from '@/store'
import * as AntIcon from '@ant-design/icons';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

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

const AppMenu = ({ theme, userModel }) => {
  const history = useHistory();
  const location = useLocation()

  const [activeKeys, setActiveKeys] = useState([]);

  const { menuList, matchRoutes } = userModel;

  // 监听地址栏变化
  useEffect(() => {
    const matchs = toJS(matchRoutes)
    if (!matchs.length) {
      history.replace('/404')
      return
    }
    const activeKeys = matchs.map(v => v.activeMenuKey || v.key)
    setActiveKeys(activeKeys)
  }, [matchRoutes])

  return (
    <Menu
      className="app-menu"
      mode="inline"
      theme={theme}
      // defaultOpenKeys={activeKeys}
      selectedKeys={activeKeys}
    >
      {!!menuList.length && renderMenu(menuList)}
    </Menu>
  );
};

export default withModel(AppMenu, 'userModel');
