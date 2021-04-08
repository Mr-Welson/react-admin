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
import { siderWidth } from './defaultProps';
import './index.less';

/**
 * 移动端布局说明：
 * 1. 顶部导航栏不生效
 * 2. 自动屏蔽面包屑和多页签
 * 3. Header 自动添加小Logo 和 SiderTrigger
 */

const BasicLayout = ({ location, userModel, authModel, appModel, tabModel }) => {
  const { setTabStore, refreshKey } = tabModel;
  const { theme, settings, loading, disableMobile } = appModel;
  const { token, setUserStore } = userModel;
  const { indexRoute, flatRoutes, onPathNameChange, generateMenuList, setRouteList, setAuthList, setIndexRoute, setAuthStore } = authModel;

  const colSize = useAntdMediaQuery();
  const isMobile = (colSize === 'sm' || colSize === 'xs') && !disableMobile;

  const [canRender, setCanRender] = useState(false);
  const [collapsed, setCollapsed] = useState(isMobile ? true : false);
  const [routes, setRoutes] = useState([]);

  // 监听 resize 
  useEffect(() => {
    // colSize: "xs" | "sm" | "md" | "lg" | "xl" | "xxl"
    ['xs', 'sm', 'md'].includes(colSize) && setCollapsed(true);
    ['lg', 'xl', 'xxl'].includes(colSize) && setCollapsed(false)
  }, [colSize])

  // 监听 pathname 
  useEffect(() => {
    onPathNameChange(location.pathname, flatRoutes)
  }, [location.pathname, flatRoutes])

  // 暂时使用这种方式在 mobx 中访问 history 对象
  const history = useHistory();
  useEffect(() => {
    setAuthStore({ history });
    setTabStore({ history });
  }, [])

  const initApp = useCallback(async () => {
    const [data] = await Service.user.getUserPermissionByToken();
    setAuthList(data.auth)
    const routeList = await setRouteList(data.menu);
    setRoutes(routeList)
    generateMenuList(routeList)
    const indexRoute = routeList.find(v => !v.hideInMenu && v.name);
    // console.log('== indexRoute ==', indexRoute);
    const { name, path, icon, key } = indexRoute
    setIndexRoute({
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
      setUserStore({ token: undefined })
      return history.replace('/login')
    }
    initApp()
  }, [token])

  const MemoPageRouter = useMemo(() => {
    return <PageRouter key={refreshKey} indexRoute={indexRoute} routes={routes} />
  }, [refreshKey, indexRoute, routes])

  if (!canRender) {
    return <Spin spinning={!canRender} size="large" wrapperClassName="global-spinning"></Spin>
  }

  const { layout, fixedHeader } = settings;
  return (
    <Spin spinning={loading} size="large" wrapperClassName="global-spinning">
      <Layout className={classNames("app-layout", "screen-".concat(colSize), "theme-".concat(theme))}>
        {layout === 'top' && !isMobile
          ? (
            <>
              <Layout className="app-content-layout">
                <GlobalHeader
                  layout={layout}
                  theme={theme}
                  fixedHeader={fixedHeader}
                  hasBreadcrumb={false}
                  leftExtraContent={
                    <LogoAndTitle />
                  }
                  rightExtraContent={
                    <LayoutSetting />
                  }
                >
                  <SiderMenu
                    layout={layout}
                    siderWidth={siderWidth}
                    theme={theme}
                    isMobile={isMobile}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                  />
                </GlobalHeader>
                <Layout.Content className="app-content">
                  {MemoPageRouter}
                </Layout.Content>
                <GlobalFooter />
              </Layout>
            </>
          ) : (
            <>
              <SiderMenu
                layout={layout}
                siderWidth={siderWidth}
                theme={theme}
                isMobile={isMobile}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
              />
              <Layout className="app-content-layout">
                <GlobalHeader
                  layout={layout}
                  theme={theme}
                  fixedHeader={fixedHeader}
                  hasBreadcrumb={!isMobile}
                  leftExtraContent={
                    <>
                      {isMobile && <MLogo />}
                      <SiderTrigger collapsed={collapsed} setCollapsed={setCollapsed} />
                    </>
                  }
                  rightExtraContent={
                    <LayoutSetting />
                  }
                >
                </GlobalHeader>
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