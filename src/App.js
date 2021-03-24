import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import P404 from '@/pages/404'
import routes from './routes';

const App = (props) => {
  console.log('=== App ===', props);

  return (
    <BrowserRouter>
      <Switch>
        {routes.map(v => {
          const subRoutes = v.routes;
          const Layout = v.component;
          if (!subRoutes || !subRoutes.length) {
            return (
              <Route exact key={v.path} path={v.path} component={v.component} />
            )
          }
          if (!Layout) {
            subRoutes.map(sub => {
              return (
                <Route exact key={v.path} path={sub.path} component={sub.component} />
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
      </Switch>
    </BrowserRouter>
  );
}

export default App;

/**

   <Route exact path='/login' component={Login} />
        <Route path='/'>
          <Layout>
            <Switch>
              <Route exact path='/home' component={Home} />
              <Route exact path='/test' component={Test} />
              <Redirect exact from='/' to="/home" />
              <Route path='/*' component={P404} />
            </Switch>
          </Layout>
        </Route>

 */