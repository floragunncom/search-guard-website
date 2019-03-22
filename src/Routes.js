import React from 'react';
import Home from './views/Home';
import App from './App';
import NoMatch from './views/NoMatch';
import { Route, Switch, Redirect } from 'react-router-dom';

export const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/" component={App}>
          <Redirect to="/Home" />
        </Route>
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
};