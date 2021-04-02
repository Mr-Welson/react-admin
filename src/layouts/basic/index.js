import React, { useCallback, useEffect, useState } from 'react';
import useAntdMediaQuery from 'use-media-antd-query';
import classNames from 'classnames';
import { withRouter, useHistory } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import { withModel, toJS } from '@/store/withModel'
import Service from '@/service';
import GlobalHeader from './components/GlobalHeader';
import SiderTrigger from './components/SiderTrigger';
import SiderMenu from './components/SiderMenu';
import TabRoute from './components/TabRoute';
import PageRouter from './components/PageRouter';
import GlobalFooter from './components/GlobalFooter';
import LayoutSetting from './components/LayoutSetting';
import Logo from './components/Logo';
import './index.less';

const BasicLayout = ({ location, userModel, authModel, appModel, tabModel }) => {
  // console.log('=== BasicLayout ===');

  const { setTabStore, refreshKey } = tabModel;
  const { theme, settings, loading, disableMobile } = appModel;
  const { token, setUserStore } = userModel;
  const { indexRoute, routeList, flatRoutes, onPathNameChange, generateMenuList, setRouteList, setAuthList, setIndexRoute, setAuthStore } = authModel;

  const colSize = useAntdMediaQuery();
  const isMobile = (colSize === 'sm' || colSize === 'xs') && !disableMobile;

  const [canRender, setCanRender] = useState(false);
  const [collapsed, setCollapsed] = useState(isMobile ? true : false);

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

  if (!canRender) {
    return <Spin spinning={!canRender} size="large" wrapperClassName="global-spinning"></Spin>
  }

  return (
    <Spin spinning={loading} size="large" wrapperClassName="global-spinning">
      <Layout className={classNames("app-layout", "screen-".concat(colSize), "theme-".concat(theme))}>
        {settings.layout === 'top'
          ? (
            <>
              <Layout className="app-content-layout">
                <GlobalHeader
                  hasBreadcrumb={false}
                  leftExtraContent={
                    <Logo />
                  }
                  rightExtraContent={
                    <LayoutSetting />
                  }
                >
                  <SiderMenu
                    layout={settings.layout}
                    siderWidth={256}
                    theme={theme}
                    isMobile={isMobile}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    hasBreadcrumbs={false}
                  />
                </GlobalHeader>
                {/* <TabRoute /> */}
                <Layout.Content className="app-content">
                  <PageRouter key={refreshKey} indexRoute={indexRoute} routes={toJS(routeList)} />
                </Layout.Content>
                <GlobalFooter />
              </Layout>
            </>
          ) : (
            <>
              <SiderMenu
                layout={settings.layout}
                siderWidth={256}
                theme={theme}
                isMobile={isMobile}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
              />
              <Layout className="app-content-layout">
                <GlobalHeader
                  leftExtraContent={
                    <SiderTrigger collapsed={collapsed} setCollapsed={setCollapsed} />
                  }
                  rightExtraContent={
                    <LayoutSetting />
                  }
                >
                </GlobalHeader>
                <TabRoute />
                <Layout.Content className="app-content">
                  <PageRouter key={refreshKey} indexRoute={indexRoute} routes={toJS(routeList)} />
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