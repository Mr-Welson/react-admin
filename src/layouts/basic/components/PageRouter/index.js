import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
// import P404 from '@/pages/404'

const renderRoutes = (routes) => {
  return routes.map(v => {
    const subRoutes = v.routes;
    if (!subRoutes || !subRoutes.length) {
      return renderRouteItem(v)
    }
    return renderSubRoutes(v)
  })
}

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
  )

  return (
    <Route key={route.path} path={route.path}>
      {Layout
        ? <Layout>{Routes}</Layout>
        : Routes
      }
    </Route>
  )
}

const renderRouteItem = (route) => {
  return (
    <Route exact key={route.path} path={route.path} component={route.component} />
  )
}

const RouteList = ({ routes = [] }) => {
  const indexRoute = routes.find(v => !v.hideInMenu)
  return (
    <Switch>
      <Redirect exact from='/' to={indexRoute.path} />
      {renderRoutes(routes)}
    </Switch>
  )
}

export default RouteList;