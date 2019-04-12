import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App';
import Blog from './views/Blog/Blog';
import BlogPostArticle from './views/Blog/BlogPostArticle';

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact={true} path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPostArticle} />
      </Switch>
    </div>
  );
};

export default Routes;
