import React, { useCallback, useEffect, useState } from 'react';
import useAntdMediaQuery from 'use-media-antd-query';
import classNames from 'classnames';
import { withRouter, useHistory } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import { withModel } from '@/store'
import Service from '@/service';
import GlobalHeader from './components/GlobalHeader';
import TabRoute from './components/TabRoute';
import PageRouter from './components/PageRouter';
import SiderMenu from './components/SiderMenu';
import SiderTrigger from './components/SiderTrigger';
import './index.less';

const { Content } = Layout;

const BasicLayout = ({ location, userModel, appModel }) => {
  // console.log('=== BasicLayout ===', rest);

  const { theme, loading, disableMobile } = appModel;
  const { token, routeList, onPathNameChange, flatRoutes, setRouteList, generateMenuList, setIndexRoute } = userModel;

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
    userModel.setHistory(history);
  }, [])

  const initAppData = useCallback(async () => {
    const [data] = await Service.user.getMenuList();
    const indexRoute = data.find(v => !v.hideInMenu) || {};
    setIndexRoute(indexRoute)
    setRouteList(data)
    generateMenuList(data)
    setCanRender(true)
  }, [])

  // 验证 token
  useEffect(() => {
    if (!token) {
      console.log('== token 失效 ==');
      userModel.setToken(undefined)
      return history.replace('/login')
    }
    initAppData()
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
            <PageRouter routes={routeList} />
          </Content>
          {/* <Footer /> */}
        </Layout>
      </Layout>
    </Spin >

  );
};

export default withRouter(withModel(BasicLayout, 'userModel', 'appModel'));