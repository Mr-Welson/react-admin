import React, { useCallback, useEffect, useState } from 'react';
import useAntdMediaQuery from 'use-media-antd-query';
import classNames from 'classnames';
import { withRouter, useHistory } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import { withModel } from '@/store'
import Service from '@/service';
import GlobalHeader from './components/GlobalHeader';
import SiderTrigger from './components/SiderTrigger';
import SiderMenu from './components/SiderMenu';
import TabRoute from './components/TabRoute';
import PageRouter from './components/PageRouter';
import GlobalFooter from './components/GlobalFooter';
import './index.less';

const { Content } = Layout;

const BasicLayout = ({ location, userModel, authModel, appModel, tabModel }) => {
  // console.log('=== BasicLayout ===');

  const { setTabStore, refreshKey } = tabModel;
  const { theme, loading, disableMobile } = appModel;
  const { token, setUserStore } = userModel;
  const { routeList, flatRoutes, onPathNameChange, generateMenuList, setAuthRoute, setIndexRoute, setAuthStore } = authModel;

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

  const initAsyncData = useCallback(async () => {
    const [data] = await Service.user.getMenuList();
    const indexRoute = data.find(v => !v.hideInMenu) || {};
    const { icon, key, name, path } = indexRoute;
    setAuthRoute(data)
    setIndexRoute({
      icon, key, name, path,
      pathname: path,
      location: {
        pathname: path
      }
    })
    generateMenuList(data)
    setCanRender(true)
  }, [])

  // 验证 token
  useEffect(() => {
    if (!token) {
      setUserStore({ token: undefined })
      return history.replace('/login')
    }
    initAsyncData()
  }, [token])

  if (!canRender) {
    return <Spin spinning={canRender} size="large" wrapperClassName="global-spinning"></Spin>
  }

  return (
    <Spin spinning={loading} size="large" wrapperClassName="global-spinning">
      <Layout className={classNames("app-layout", "screen-".concat(colSize), "theme-".concat(theme))}>
        <SiderMenu
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
          >
          </GlobalHeader>
          <TabRoute />
          <Content className="app-content">
            <PageRouter key={refreshKey} routes={routeList} />
          </Content>
          <GlobalFooter />
        </Layout>
      </Layout>
    </Spin >

  );
};

export default withRouter(withModel(BasicLayout, 'authModel', 'userModel', 'appModel', 'tabModel'));