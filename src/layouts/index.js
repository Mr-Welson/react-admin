import React, { useCallback, useEffect, useState, useMemo } from 'react';
import useAntdMediaQuery from 'use-media-antd-query';
import { useHistory, useLocation } from 'react-router-dom';
import _ from 'lodash';
import { Spin } from 'antd';
import { withModel } from '@/store/withModel';
import Service from '@/service';
import PageRouter from './components/PageRouter';
import './index.less';
import TopLayout from './components/AppLayout/TopLayout';
import SideLayout from './components/AppLayout/SideLayout';
import MixLayout from './components/AppLayout/MixLayout';
import MobileLayout from './components/AppLayout/MobileLayout';

const BasicLayout = ({ userModel, authModel, appModel, tabModel }) => {
  const { settings, loading, disableMobile } = appModel;
  const { token, updateUserStore } = userModel;
  const { pageKey, indexRoute, flatRoutes, onPathNameChange, generateMenuList, updateRouteList, updateAuthList, updateIndexRoute, updateAuthStore } = authModel;
  const colSize = useAntdMediaQuery();
  const isMobile = (colSize === 'sm' || colSize === 'xs') && !disableMobile;
  const { layout, theme, siderWidth, collapsedWidth } = settings;

  const [canRender, setCanRender] = useState(false);
  const [collapsed, setCollapsed] = useState(isMobile ? true : false);
  const [routes, setRoutes] = useState([]);

  // 暂时使用这种方式在 mobx 中访问 history 对象
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    updateAuthStore({ history });
    tabModel.updateTabStore({ history });
  }, []);

  // 主题切换
  useEffect(() => {
    document.body.setAttribute('theme', theme);
  }, [theme]);

  // 监听 resize
  useEffect(() => {
    // colSize: "xs" | "sm" | "md" | "lg" | "xl" | "xxl"
    if (['xs', 'sm', 'md'].includes(colSize)) {
      setCollapsed(true);
    } else if (['lg', 'xl', 'xxl'].includes(colSize)) {
      setCollapsed(false);
    }
  }, [colSize]);

  // 监听 pathname
  useEffect(() => {
    onPathNameChange(location.pathname, flatRoutes);
  }, [location.pathname, flatRoutes]);

  // 初始化应用数据
  const initApp = useCallback(async () => {
    const [data] = await Service.user.getUserPermissionByToken();
    updateAuthList(data.auth);
    const routeList = await updateRouteList(data.menu);
    setRoutes(_.cloneDeep(routeList));
    generateMenuList(_.cloneDeep(routeList));
    const indexRoute = routeList.find((v) => !v.hideInMenu && v.title);
    // console.log('== indexRoute ==', indexRoute);
    const { title, path, icon, key } = indexRoute;
    updateIndexRoute({
      icon,
      key,
      title,
      path,
      pathname: path,
      location: {
        pathname: path,
      },
    });
    setCanRender(true);
  }, []);

  // 验证 token
  useEffect(() => {
    if (!token) {
      updateUserStore({ token: undefined });
      return history.replace('/login');
    }
    initApp();
  }, [token]);

  const MemoPageRouter = useMemo(() => {
    return <PageRouter key={pageKey} indexRoute={indexRoute} routes={routes} />;
  }, [pageKey, indexRoute, routes]);

  const renderLayout = () => {
    if (!canRender) {
      return null;
    }
    if (isMobile) {
      return <MobileLayout collapsedWidth={collapsedWidth} collapsed={collapsed} setCollapsed={setCollapsed} siderWidth={siderWidth} MemoPageRouter={MemoPageRouter} />;
    }
    if (layout === 'top') {
      return <TopLayout theme={theme} collapsedWidth={collapsedWidth} collapsed={collapsed} siderWidth={siderWidth} MemoPageRouter={MemoPageRouter} />;
    }
    if (layout === 'side') {
      return <SideLayout collapsedWidth={collapsedWidth} collapsed={collapsed} setCollapsed={setCollapsed} siderWidth={siderWidth} MemoPageRouter={MemoPageRouter} />;
    }
    if (layout === 'mix') {
      return <MixLayout theme={theme} collapsedWidth={collapsedWidth} collapsed={collapsed} siderWidth={siderWidth} setCollapsed={setCollapsed} MemoPageRouter={MemoPageRouter} />;
    }
  };

  return (
    <Spin
      spinning={loading}
      size='large'
      wrapperClassName='global-spinning'
      style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {renderLayout()}

      {/* <Layout className={classNames('app-layout', 'screen-'.concat(colSize))}>
      </Layout> */}
    </Spin>
  );
};

export default withModel(BasicLayout, 'authModel', 'userModel', 'appModel', 'tabModel');
