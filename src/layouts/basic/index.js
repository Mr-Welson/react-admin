import React, { useEffect, useState } from 'react';
import './index.less';
import { Layout, Spin } from 'antd';
import GlobalHeader from './components/GlobalHeader';
import Logo from './components/Logo'
import AppMenu from './components/AppMenu';
import TabRoute from './components/TabRoute';
import PageRouter from './components/PageRouter';
import { withRouter, useHistory } from 'react-router-dom';
import { withModel } from '@/store'
import Service from '@/service';

const { Sider, Content } = Layout;

const BasicLayout = ({ appModel, location, userModel }) => {
  // console.log('=== BasicLayout ===', rest);

  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const { routeList, onPathNameChange, flatRoutes, setRouteList, generateMenuList, setIndexRoute } = userModel;
  const { theme } = appModel;

  // 暂时使用这种方式在 mobx 中访问 history 对象
  const history = useHistory();
  useEffect(() => {
    userModel.setHistory(history);
  }, [])

  useEffect(() => {
    const fetchMenuList = async () => {
      const [data] = await Service.user.getMenuList();
      const indexRoute = data.find(v => !v.hideInMenu);
      setIndexRoute(indexRoute)
      setRouteList(data)
      generateMenuList(data)
      setLoading(false)
    }
    fetchMenuList();
  }, [])

  // 监听 pathname 
  useEffect(() => {
    onPathNameChange(location.pathname, flatRoutes)
  }, [location.pathname, flatRoutes])

  if (loading) {
    return <Spin spinning={loading} size="large" wrapperClassName="global-spinning"></Spin>
  }
  return (
    <Spin spinning={loading} size="large" wrapperClassName="global-spinning">
      <Layout className="app-layout sider-layout">
        <Sider
          className="app-sider"
          width={240}
          theme={theme}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <Logo collapsed={collapsed} />
          <AppMenu theme={theme} />
        </Sider>
        <Layout className="app-content-layout">
          <GlobalHeader collapsed={collapsed} setCollapsed={setCollapsed} />
          <TabRoute />
          <Content className="app-content">
            <PageRouter routes={routeList} />
          </Content>
          {/* <Footer /> */}
        </Layout>
      </Layout>
    </Spin>

  );
};

export default withRouter(withModel(BasicLayout, 'userModel', 'appModel'));