import React, { useState, useEffect, useMemo } from 'react';
import { Layout, Drawer } from 'antd';
import { withModel, toJS } from '@/store/withModel'
import BaseMenu from './BaseMenu';
import LogoAndTitle from '../LogoAndTitle'
import './index.less';

const WebAppMenu = ({ authModel, siderWidth, collapsed, theme, layout, isMobile }) => {
  const { menuList, matchRoutes } = authModel;
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

  const mode = useMemo(() => (layout === 'top' && !isMobile) ? 'horizontal' : 'inline', [layout, isMobile])
  const hasSiderMenu = useMemo(() => mode === 'inline', [mode])

  return (
    hasSiderMenu
      ? (
        <Layout.Sider
          className="app-sider"
          width={siderWidth}
          theme={theme}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="app-sider-content">
            <LogoAndTitle collapsed={collapsed} theme={theme} />
            <BaseMenu
              mode={mode}
              theme={theme}
              menuList={menuList}
              activeKeys={activeKeys}
            />
          </div>
        </Layout.Sider >
      ) : (
        <BaseMenu
          mode={mode}
          theme={theme}
          menuList={menuList}
          activeKeys={activeKeys}
        />
      )
  )
}

const WebAppMenuWithModel = withModel(WebAppMenu, 'authModel');

const MobileAppMenu = ({ siderWidth, collapsed, setCollapsed, ...rest }) => {
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
      <WebAppMenuWithModel siderWidth={siderWidth} collapsed={collapsed} {...rest} />
    </Drawer>
  )
}

const SiderMenu = ({ isMobile, ...rest }) => {
  const MemoMenu = useMemo(() => isMobile ? MobileAppMenu : WebAppMenuWithModel, [isMobile])
  return <MemoMenu {...rest} isMobile={isMobile} />
}

export default SiderMenu;
