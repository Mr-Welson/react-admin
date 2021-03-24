import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import P404 from '@/pages/404'

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
  const Layout = route.component;
  if (!Layout) {
    return renderRoutes(subRoutes)
  }
  return (
    <Route key={route.path} path={route.path}>
      <Layout>
        <Switch>
          {renderRoutes(subRoutes)}
          <Redirect exact from={route.path} to={subRoutes[0].path} />
          <Route path={`${route.path === '/' ? '' : route.path}/*`} component={P404} />
        </Switch>
      </Layout>
    </Route>
  )
}

const renderRouteItem = (route) => {
  return (
    <Route exact key={route.path} path={route.path} component={route.component} />
  )
}

const RouteList = ({ routes = [] }) => {
  return (
    <Switch>
      {/* <Redirect exact from='/' to={routes[0].path} /> */}
      {renderRoutes(routes)}
    </Switch>
  )
}

export default RouteList;