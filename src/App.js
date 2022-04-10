import React, { useEffect, useMemo, useState } from 'react';
import { HashRouter, BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { staticRoutes } from '@/routes';
import Service from '@/service';
import store from '@/store';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

const getRouteType = (routeType) => {
  switch (routeType) {
    case 'browser':
      return BrowserRouter;
    default:
      return HashRouter;
  }
};

const App = () => {
  const [canRender, setCanRender] = useState(false);
  const routeType = store.appModel.settings.routeType || 'browser';
  const Router = useMemo(() => getRouteType(routeType), [routeType]);

  useEffect(() => {
    Service.user.systemConfig().then((systemConfig) => {
      store.userModel.updateUserStore({ systemConfig });
      setCanRender(true);
    });
  }, []);

  if (!canRender) {
    return null;
  }

  return (
    <ConfigProvider locale={zhCN}>
      <Provider {...store}>
        <Router basename='/build'>
          <Switch>
            {staticRoutes.map((route) => (
              <Route exact={route.exact} key={route.path} path={route.path} component={route.component} />
            ))}
            {/* 
                  <Route exact path='/login' component={Login} />
                  <Route path='/' component={Layout} /> 
              */}
          </Switch>
        </Router>
      </Provider>
    </ConfigProvider>
  );
};

export default App;
