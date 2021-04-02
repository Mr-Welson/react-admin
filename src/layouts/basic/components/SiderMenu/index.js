import React, { useState, useEffect, useMemo } from 'react';
import { Layout, Drawer } from 'antd';
import { withModel, toJS } from '@/store/withModel'
import BaseMenu from './BaseMenu';
import Logo from '../Logo'
import './index.less';

const WebAppMenu = ({ authModel, siderWidth, collapsed, theme, layout }) => {
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

  const mode = useMemo(() => layout === 'top' ? 'horizontal' : 'inline', [layout])
  const hasSiderMenu = useMemo(() => mode === 'inline', [mode])
  console.log(mode);
  
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
            <Logo collapsed={collapsed} />
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
  return <MemoMenu {...rest} />
}

export default SiderMenu;
