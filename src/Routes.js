import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './views/HomePage/HomePage';
import ContactUs from './views/ContactUs/ContactUs';
import Blog from './views/Blog/Blog';
import Resource from './views/Resource/Resource';
import Company from './views/Company/Company';
import Product from './views/Product/Product';
import Faqs from './views/Faqs/Faqs';
import License from './views/License/License';
import BlogPostArticle from './views/Blog/BlogPostArticle';
import Imprint from './views/Imprint/Imprint';
import WhitePapers from './views/WhitePapers/WhitePapers';
// import WhitePaperDetail from './views/WhitePapers/WhitePaperDetail';
import Presentations from './views/Presentations/Presentations';
import DataProtection from './views/DataProtection/DataProtection';
import Security from './views/Security/Security';
import Advisory from './views/Advisory/Advisory';
import Disclosure from './views/Disclosure/Disclosure';
import Education from './views/Education/Education';
import TlsGenerator from './views/TlsGenerator/TlsGenerator';
import NotFound from './views/NotFound/NotFound';
import Thanks from './views/Thanks/Thanks';
import CertificatesOnTheWay from './views/CertificatesOnTheWay/CertificatesOnTheWay';
import Certifications from './views/Certifications/Certifications';
import Marketing from './views/Marketing/Marketing';
import { BlogContext } from './contexts/BlogContext';

const Routes = () => {
  const posts = useContext(BlogContext);

  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/contacts/" component={ContactUs} />
        <Route exact path="/product/" component={Product} />
        <Route exact path="/company/" component={Company} />
        <Route exact path="/resource/" component={Resource} />
        <Route exact path="/licensing/" component={License} />
        <Route exact path="/faq/" component={Faqs} />
        <Route exact path="/impressum/" component={Imprint} />
        <Route exact path="/white-papers/" component={WhitePapers} />
        <Route exact path="/presentations/" component={Presentations} />
        <Route exact path="/datenschutz/" component={DataProtection} />
        <Route exact path="/education-program/" component={Education} />
        <Route
          exact
          path="/security-for-elasticsearch/"
          component={Marketing}
        />
        <Route
          exact
          path="/elasticsearch-kibana-security/"
          component={Marketing}
        />
        <Route exact path="/thanks/" component={Thanks} />
        <Route exact path="/certificates-on-the-way/" component={CertificatesOnTheWay} />
        <Route exact path="/security/" component={Security} />
        <Route exact path="/cve-advisory/" component={Advisory} />
        <Route exact path="/disclosure-policy/" component={Disclosure} />
        <Route
          exact
          path="/tls-certificate-generator/"
          component={TlsGenerator}
        />
        <Route exact path="/certificates/" component={Certifications} />
        <Route exact path="/category/:slug" component={Blog} />
        <Route
          exact
          path="/blog"
          render={props => <Blog {...props} posts={posts} />}
        />
        <Route
          path="/:slug"
          render={props => <BlogPostArticle {...props} posts={posts} />}
        />
        <Route exact path="/white-papers/" component={WhitePapers} />
        {/* <Route path="/white-papers/:slug" component={WhitePaperDetail} /> */}
        <Route path="/404/" component={NotFound} />
      </Switch>
    </div>
  );
};

export default Routes;
