import React, { useEffect, useState } from 'react';
import './index.less';
import { Layout, Spin } from 'antd';
import GlobalHeader from './components/GlobalHeader';
import AppMenu from './components/AppMenu';
import TabsNav from './components/TabsNav';
import { withRouter } from 'react-router-dom';
import { withModel } from '@/store'
import RouteList from './components/RouteList';
import Service from '@/service';

const { Sider, Content } = Layout;

const BasicLayout = ({ theme, location, userModel, ...rest }) => {
  // console.log('=== BasicLayout ===', rest);

  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const { onPathNameChange, flatRoutes } = userModel;

  useEffect(() => {
    // 根据后台权限过滤路由及菜单
    const fetchMenuList = async () => {
      const [data] = await Service.user.getMenuList();
      console.log(data);
      userModel.setRouteList(data)
      userModel.generateMenuList(data)
      setLoading(false)
    }

    fetchMenuList();
  }, [])

  useEffect(() => {
    onPathNameChange(location.pathname, flatRoutes)
  }, [location.pathname, flatRoutes])

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
          <div className="logo" />
          <AppMenu {...rest} theme={theme} />
        </Sider>
        <Layout className="app-content-layout">
          <GlobalHeader collapsed={collapsed} setCollapsed={setCollapsed} />
          <TabsNav {...rest} />
          <Content className="app-content">
            <RouteList routes={userModel.routeList} />
          </Content>
          {/* <Footer /> */}
        </Layout>
      </Layout>
    </Spin>

  );
};

export default withRouter(withModel(BasicLayout, 'userModel'));