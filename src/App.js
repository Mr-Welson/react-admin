import React, { useMemo, useState } from 'react'
import { HashRouter, BrowserRouter, Switch, Route } from 'react-router-dom'
import { staticRoutes } from '@/routes'

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
          {staticRoutes.map(route => (
            <Route exact={route.exact} key={route.path} path={route.path} component={route.component} />
          ))}
          {/* <Route exact path='/login' component={Login} />
          <Route path='/' component={Layout} /> */}
        </Switch>
    </Router>
  );
}

export default App;