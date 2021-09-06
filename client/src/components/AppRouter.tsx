import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../route/route';

const AppRouter = (): JSX.Element => {
  const auth = true;
  return auth ? (
    <Switch>
      {privateRoutes.map((route) => (
        <Route
          path={route.path}
          exact={route.exact}
          component={route.component}
          key={route.path}
        />
      ))}
      <Redirect to="/not-found-page" />
    </Switch>
  ) : (
    <Switch>
      {publicRoutes.map((route) => (
        <Route
          path={route.path}
          exact={route.exact}
          component={route.component}
          key={route.path}
        />
      ))}
      <Redirect to="/not-found-page" />
    </Switch>
  );
};

export default AppRouter;
