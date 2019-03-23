import React from 'react';
import Home from './views/Home';
import App from './App';
import NoMatch from './views/NoMatch';
import { Route, Switch } from 'react-router-dom';

export const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/" component={App} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
};