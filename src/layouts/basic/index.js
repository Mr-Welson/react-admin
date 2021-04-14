import React, { useCallback, useEffect, useState, useMemo } from 'react';
import useAntdMediaQuery from 'use-media-antd-query';
import classNames from 'classnames';
import { withRouter, useHistory } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import { withModel } from '@/store/withModel'
import Service from '@/service';
import GlobalHeader from './components/GlobalHeader';
import SiderTrigger from './components/SiderTrigger';
import SiderMenu from './components/SiderMenu';
import TabRoute from './components/TabRoute';
import PageRouter from './components/PageRouter';
import GlobalFooter from './components/GlobalFooter';
import LayoutSetting from './components/LayoutSetting';
import LogoAndTitle, { MLogo } from "./components/LogoAndTitle";
import { siderWidth, collapsedWidth } from './defaultProps';
import './index.less';

/**
 * 移动端布局说明：
 * 1. 顶部导航栏不生效
 * 2. 自动屏蔽面包屑和多页签
 * 3. Header 自动添加小Logo 和 SiderTrigger
 */

const BasicLayout = ({ location, userModel, authModel, appModel, tabModel }) => {
  const { theme, settings, loading, disableMobile } = appModel;
  const { token, updateUserStore } = userModel;
  const { pageKey, indexRoute, flatRoutes, onPathNameChange, generateMenuList, updateRouteList, updateAuthList, updateIndexRoute, updateAuthStore } = authModel;
  const colSize = useAntdMediaQuery();
  const isMobile = (colSize === 'sm' || colSize === 'xs') && !disableMobile;
  const { layout, fixedHeader } = settings;

  const [canRender, setCanRender] = useState(false);
  const [collapsed, setCollapsed] = useState(isMobile ? true : false);
  const [routes, setRoutes] = useState([]);

  // 暂时使用这种方式在 mobx 中访问 history 对象
  const history = useHistory();
  useEffect(() => {
    updateAuthStore({ history });
    tabModel.updateTabStore({ history });
  }, [])

  // 监听 resize 
  useEffect(() => {
    // colSize: "xs" | "sm" | "md" | "lg" | "xl" | "xxl"
    if (['xs', 'sm', 'md'].includes(colSize)) {
      setCollapsed(true)
    }
    if (['lg', 'xl', 'xxl'].includes(colSize)) {
      setCollapsed(false)
    }
  }, [colSize])

  // 监听 pathname 
  useEffect(() => {
    onPathNameChange(location.pathname, flatRoutes)
  }, [location.pathname, flatRoutes])

  // 初始化应用数据
  const initApp = useCallback(async () => {
    const [data] = await Service.user.getUserPermissionByToken();
    updateAuthList(data.auth)
    const routeList = await updateRouteList(data.menu);
    setRoutes(routeList)
    generateMenuList(routeList)
    const indexRoute = routeList.find(v => !v.hideInMenu && v.name);
    // console.log('== indexRoute ==', indexRoute);
    const { name, path, icon, key } = indexRoute
    updateIndexRoute({
      icon,
      key,
      name,
      path,
      pathname: path,
      location: {
        pathname: path
      }
    })
    setCanRender(true)
  }, [])

  // 验证 token
  useEffect(() => {
    if (!token) {
      updateUserStore({ token: undefined })
      return history.replace('/login')
    }
    initApp()
  }, [token])

  const MemoPageRouter = useMemo(() => {
    return <PageRouter key={pageKey} indexRoute={indexRoute} routes={routes} />
  }, [pageKey, indexRoute, routes]);

  if (!canRender) {
    return <Spin spinning={!canRender} size="large" wrapperClassName="global-spinning"></Spin>
  }

  const headerWidth = (isMobile || !fixedHeader) ? "100%" : `calc(100% - ${collapsed ? collapsedWidth : siderWidth}px)`
  return (
    <Spin spinning={loading} size="large" wrapperClassName="global-spinning">
      <Layout className={classNames("app-layout", "screen-".concat(colSize), "theme-".concat(theme))}>
        {layout === 'top' && !isMobile
          ? (
            <Layout className="app-content-layout">
              <GlobalHeader
                hasBreadcrumb={false}
                headerWidth='100%'
                leftExtraContent={
                  <LogoAndTitle theme={theme} />
                }
                rightExtraContent={
                  <LayoutSetting />
                }
              >
                <SiderMenu
                  isMobile={isMobile}
                  collapsedWidth={collapsedWidth}
                  siderWidth={siderWidth}
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                />
              </GlobalHeader>
              <Layout.Content className="app-content">
                {MemoPageRouter}
              </Layout.Content>
              <GlobalFooter />
            </Layout>
          ) : (
            <>
              <SiderMenu
                isMobile={isMobile}
                collapsedWidth={collapsedWidth}
                siderWidth={siderWidth}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
              />
              <Layout className="app-content-layout">
                <GlobalHeader
                  hasBreadcrumb={!isMobile}
                  headerWidth={headerWidth}
                  leftExtraContent={
                    <>
                      {isMobile && <MLogo />}
                      <SiderTrigger collapsed={collapsed} setCollapsed={setCollapsed} />
                    </>
                  }
                  rightExtraContent={
                    <LayoutSetting />
                  }
                />
                {!isMobile && <TabRoute />}
                <Layout.Content className="app-content">
                  {MemoPageRouter}
                </Layout.Content>
                <GlobalFooter />
              </Layout>
            </>
          )}
      </Layout>
    </Spin >
  );
};

export default withRouter(withModel(BasicLayout, 'authModel', 'userModel', 'appModel', 'tabModel'));