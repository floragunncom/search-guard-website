import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App';
import ContactUs from './views/ContactUs';
import Blog from './views/Blog/Blog';
import Resource from './views/Resource/Resource';
import Company from './views/Company/Company';
import Product from './views/Product/Product';
import Faqs from './views/Faqs/Faqs';
import License from './views/License/License';
import BlogPostArticle from './views/Blog/BlogPostArticle';
import Imprint from './views/Imprint/Imprint';
import WhitePapers from './views/WhitePapers/WhitePapers';
import WhitePaperDetail from './views/WhitePapers/WhitePaperDetail';
import Presentations from './views/Presentations/Presentations';
import DataProtection from './views/DataProtection/DataProtection';
import Security from './views/Security/Security';
import Advisory from './views/Advisory/Advisory';
import Disclosure from './views/Disclosure/Disclosure';
import Education from './views/Education/Education';
import TlsGenerator from './views/TlsGenerator/TlsGenerator';
import NotFound from './views/NotFound/NotFound';
import Thanks from './views/Thanks/Thanks';
import Certifications from './views/Certifications/Certifications';

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/contacts" component={ContactUs} />
        <Route exact path="/product" component={Product} />
        <Route exact path="/company" component={Company} />
        <Route exact path="/resource" component={Resource} />
        <Route exact path="/licensing" component={License} />
        <Route exact path="/faq" component={Faqs} />
        <Route exact path="/imprint" component={Imprint} />
        <Route exact path="/prese" component={Imprint} />
        <Route exact path="/imprint" component={Imprint} />
        <Route exact path="/white-papers" component={WhitePapers} />
        <Route exact path="/presentations" component={Presentations} />
        <Route exact path="/data-protection" component={DataProtection} />
        <Route exact path="/education-program" component={Education} />
        <Route exact path="/security" component={Security} />
        <Route exact path="/advisory" component={Advisory} />
        <Route exact path="/disclosure" component={Disclosure} />
        <Route exact path="/tls-certificate-generator" component={TlsGenerator} />
        <Route exact path="/certifications" component={Certifications} />
        <Route exact path="/NotFound" component={NotFound} />
        <Route exact path="/thanks" component={Thanks} />
        <Route exact={true} path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPostArticle} />
        <Route exact={true} path="/white-papers" component={WhitePapers} />
        <Route path="/white-papers/:slug" component={WhitePaperDetail} />
      </Switch>
    </div>
  );
};

export default Routes;
