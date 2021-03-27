import React, { useState, useEffect, useMemo } from 'react';
import { Layout, Drawer } from 'antd';
import { withModel, toJS } from '@/store'
import BaseMenu from './BaseMenu';
import Logo from '../Logo'
import './index.less';

const WebAppMenu = ({ siderWidth, collapsed, theme, userModel }) => {
  const { menuList, matchRoutes } = userModel;
  const [activeKeys, setActiveKeys] = useState([]);
  const [matchs, setMatchs] = useState([]);

  useEffect(() => {
    setMatchs(toJS(matchRoutes))
  }, [matchRoutes])

  // 监听地址栏变化
  useEffect(() => {
    if (!matchs.length) {
      return
    }
    const activeKeys = matchs.map(v => v.activeMenuKey || v.key)
    setActiveKeys(activeKeys)
  }, [matchs])

  return (
    <Layout.Sider
      className="app-sider"
      width={siderWidth}
      theme={theme}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <div className="app-sider-content">
        <Logo collapsed={collapsed} />
        <BaseMenu
          theme={theme}
          menuList={menuList}
          activeKeys={activeKeys}
        />
      </div>
    </Layout.Sider>
  )
}

const WebAppMenuWithModel = withModel(WebAppMenu, 'userModel');

const MobileAppMenu = ({ siderWidth, collapsed, setCollapsed, ...theme }) => {
  return (
    <Drawer
      // className="app-menu-drawer"
      placement='left'
      width={siderWidth}
      closable={false}
      bodyStyle={{ padding: 0 }}
      onClose={() => setCollapsed(collapsed => !collapsed)}
      visible={!collapsed}
    >
      <WebAppMenuWithModel siderWidth={siderWidth} collapsed={collapsed} theme={theme} />
    </Drawer>
  )
}

const SiderMenu = ({ isMobile, appModel, ...rest }) => {
  const { theme } = appModel;
  const MemoMenu = useMemo(() => isMobile ? MobileAppMenu : WebAppMenuWithModel, [isMobile])
  return <MemoMenu {...rest} theme={theme} />
}

export default withModel(SiderMenu, 'appModel');
