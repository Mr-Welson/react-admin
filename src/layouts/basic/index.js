import React, { useEffect } from 'react';
import './index.less';
import { Layout } from 'antd';
import GlobalHeader from './components/GlobalHeader';
import AppMenu from './components/AppMenu';
import TabsNav from './components/TabsNav';
import { Switch, Route, Redirect } from 'react-router-dom'
import routes from '@/routes';

const { Sider, Content } = Layout;

const BasicLayout = ({ theme, collapsed, location, ...rest }) => {
  console.log('=== BasicLayout ===', rest);

  // Did Mount
  useEffect(() => {

  }, [])

  // const { flatRoutes, generateMenuList, initRoutes, onPathNameChange } = useModel('permission');

  // useEffect(() => {
  //   initRoutes()
  //   generateMenuList()
  // }, [])

  // useEffect(() => {
  //   onPathNameChange(location.pathname, flatRoutes)
  // }, [location.pathname, flatRoutes])

  return (
    <Layout className="app-layout sider-layout">
      <Sider
        className="app-sider"
        width={240}
        theme={theme}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="logo" />
        <AppMenu {...rest} theme={theme} />
      </Sider>
      <Layout className="app-content-layout">
        <GlobalHeader></GlobalHeader>
        <TabsNav {...rest} />
        <Content className="app-content">
          {rest.children}
        </Content>
        {/* <Footer /> */}
      </Layout>
    </Layout>
  );
};

export default BasicLayout;