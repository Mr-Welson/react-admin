import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Spin } from 'antd';
// import P404 from '@/pages/404'

const renderRoutes = (routes) => {
  return routes.map((v) => {
    const subRoutes = v.routes;
    if (!subRoutes || !subRoutes.length) {
      return renderRouteItem(v);
    }
    return renderSubRoutes(v);
  });
};

const renderSubRoutes = (route) => {
  const subRoutes = route.routes;
  const Layout = route.component || null;

  // console.log('== from ==', route.path);
  // console.log('== to ==', subRoutes[0].path);
  const Routes = (
    <Switch>
      {renderRoutes(subRoutes)}
      <Redirect exact from={route.path} to={subRoutes[0].path} />
      <Redirect to={'/404'} />
      {/* <Route path={`${route.path === '/' ? '' : route.path}/*`} component={P404} /> */}
    </Switch>
  );

  return (
    <Route key={route.path} path={route.path}>
      {Layout ? <Layout>{Routes}</Layout> : Routes}
    </Route>
  );
};

const renderRouteItem = (route) => {
  return <Route exact key={route.path} path={route.path} component={route.component} />;
};

const RouteList = ({ indexRoute = {}, routes = [] }) => {
  return (
    <Suspense fallback={<Spin style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />}>
      <Switch>
        <Redirect exact from='/' to={indexRoute.path} />
        {renderRoutes(routes)}
      </Switch>
    </Suspense>
  );
};

export default RouteList;
