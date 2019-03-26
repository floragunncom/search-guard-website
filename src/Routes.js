import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App';
import ContactUs from './views/ContactUs';

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/contact" component={ContactUs} />
      </Switch>
    </div>
  );
};

export default Routes;
