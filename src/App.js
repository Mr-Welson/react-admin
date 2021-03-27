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