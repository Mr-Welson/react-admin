import React, { Suspense, lazy, useMemo, useState } from 'react'
import { HashRouter, BrowserRouter, Switch, Route } from 'react-router-dom'
import { staticRoutes } from '@/routes'
const Layout = lazy(() => import('@/layouts/basic'));

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
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {staticRoutes.map(route => (
            <Route exact={route.exact || true} key={route.path} path={route.path} component={route.component} />
          ))}
          {/* <Route exact path='/login' component={Login} /> */}
          <Route path='/' component={Layout} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;