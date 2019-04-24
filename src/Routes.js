import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App';
import Blog from './views/Blog/Blog';
import Resource from './views/Resource/Resource';
import Company from './views/Company/Company';
import Product from './views/Product/Product';
import License from './views/License/License';
import BlogPostArticle from './views/Blog/BlogPostArticle';

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/product" component={Product} />
        <Route exact path="/company" component={Company} />
        <Route exact path="/resource" component={Resource} />
        <Route exact path="/license" component={License} />
        <Route exact={true} path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPostArticle} />
      </Switch>
    </div>
  );
};

export default Routes;
