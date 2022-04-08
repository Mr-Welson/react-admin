import React, { useState, useEffect, useMemo } from 'react';
import { Layout, Drawer } from 'antd';
import { withModel, toJS } from '@/store/withModel';
import BaseMenu from './BaseMenu';
import LogoAndTitle from '../LogoAndTitle';
import classNames from 'classnames';
import './index.less';

const AppMenu = ({ className, appModel, authModel, siderWidth, collapsed, collapsedWidth, isMobile, hasLogo = true }) => {
  const { menuList, matchRoutes } = authModel;
  const { settings } = appModel;
  const { layout, theme } = settings;
  const [activeKeys, setActiveKeys] = useState([]);
  const [matchs, setMatchs] = useState([]);

  useEffect(() => {
    setMatchs(toJS(matchRoutes));
  }, [matchRoutes]);

  // 监听地址栏变化设置激活的菜单
  useEffect(() => {
    if (!matchs.length) {
      return;
    }
    const activeKeys = matchs.map((v) => v.activeMenuKey || v.key);
    setActiveKeys(activeKeys);
  }, [matchs]);

  // 除了顶部导航且非移动端其他都是侧边栏导航模式
  const isSiderMenu = useMemo(() => layout !== 'top' || isMobile, [layout]);

  return isSiderMenu ? (
    <Layout.Sider
      className={classNames('app-sider', { 'app-sider-light': theme === 'light' }, { 'app-sider-dark': theme === 'dark' }, className)}
      width={siderWidth}
      collapsedWidth={collapsedWidth}
      theme={theme}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <div className='app-sider-content'>
        {hasLogo && <LogoAndTitle collapsed={collapsed} theme={theme} />}
        <BaseMenu mode={'inline'} theme={theme} menuList={menuList} activeKeys={activeKeys} />
      </div>
    </Layout.Sider>
  ) : (
    <BaseMenu mode={'horizontal'} theme={theme} menuList={menuList} activeKeys={activeKeys} />
  );
};

export const WebAppMenu = withModel(AppMenu, 'authModel', 'appModel');

export const MobileAppMenu = ({ siderWidth, collapsed, setCollapsed, ...rest }) => {
  return (
    <Drawer
      className='app-menu-drawer'
      placement='left'
      width={siderWidth}
      closable={false}
      bodyStyle={{ padding: 0 }}
      onClose={() => setCollapsed((collapsed) => !collapsed)}
      visible={!collapsed}
    >
      <WebAppMenu className='app-sider-mobile' siderWidth={siderWidth} collapsed={collapsed} {...rest} />
    </Drawer>
  );
};
