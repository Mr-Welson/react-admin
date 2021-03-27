import React, { useMemo, useState } from 'react'
import { HashRouter, BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from '@/pages/login'
import Layout from '@/layouts/basic'

const getRouteType = (routeType) => {
  switch (routeType) {
    case "browser":
      return BrowserRouter;
    default:
      return HashRouter;
  }
}

const App = () => {
  const [routeType] = useState('browser')
  const Router = useMemo(() => getRouteType(routeType), [routeType])
  return (
    <Router>
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route path='/' component={Layout} />
      </Switch>
    </Router>
  );
}

export default App;
/*
  {routes.map(v => {
    const subRoutes = v.routes;
    const Layout = v.component;
    if (!subRoutes || !subRoutes.length) {
      return (
        <Route exact key={v.path} path={v.path} component={v.component} />
      )
    }
    if (!Layout) {
      return subRoutes.map(sub => {
        return (
          <Route exact key={sub.path} path={sub.path} component={sub.component} />
        )
      })
    }
    return (
      <Route key={v.path} path={v.path}>
        <Layout>
          <Switch>
            {subRoutes.map(sub => {
              return (
                <Route exact key={v.path} path={sub.path} component={sub.component} />
              )
            })}
            <Redirect exact from={v.path} to={subRoutes[0].path} />
            <Route path={`${v.path === '/' ? '' : v.path}/*`} component={P404} />
          </Switch>
        </Layout>
      </Route>
    )
  })}
  */