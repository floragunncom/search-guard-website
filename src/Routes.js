import { Route, Switch } from 'react-router-dom';
import  { Redirect } from 'react-router-dom'
import React from 'react';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import HomePage from './views/HomePage/HomePage';
import ContactUs from './views/ContactUs/ContactUs';
import Blog from './views/Blog/Blog';
import BlogPostArticle from './views/Blog/BlogPostArticle';
import BlogCategory from './views/Blog/BlogCategory';
import Resource from './views/Resource/Resource';
import Company from './views/Company/Company';
import Security from './views/Security/Security';
import Alerting from './views/Alerting/Alerting';
import Faqs from './views/Faqs/Faqs';
import Compliance from './views/Compliance/Compliance';
import License from './views/License/License';
import Imprint from './views/Imprint/Imprint';
import WhitePapers from './views/WhitePapers/WhitePapers';
import WhitePaperArticle from './views/WhitePapers/WhitePaperArticle';
import Presentations from './views/Presentations/Presentations';
import DataProtection from './views/DataProtection/DataProtection';
import SecurityInformation from './views/SecurityInformation/SecurityInformation';
import Advisory from './views/Advisory/Advisory';
import Disclosure from './views/Disclosure/Disclosure';
import Education from './views/Education/Education';
import TlsGenerator from './views/TlsGenerator/TlsGenerator';
import NotFound from './views/NotFound/NotFound';
import Thanks from './views/Thanks/Thanks';
import Error from './views/Error/Error';
import CertificatesOnTheWay from './views/CertificatesOnTheWay/CertificatesOnTheWay';
import Certifications from './views/Certifications/Certifications';
import SecurityForElasticsearch from './views/SecurityForElasticsearch/SecurityForElasticsearch';
import FreeTrial from './views/FreeTrial/FreeTrial';
import PressDEDach from './views/Press/DE/20200620_Vertrieb_Dach/20200620_Vertrieb_Dach';
import PressENDach from './views/Press/EN/20200620_Sales_Activities_Dach/20200620_Sales_Activities_Dach';
import PressDEAlerting from './views/Press/DE/20200723_Alerting/20200723_Alerting';
import PressENAlerting from './views/Press/EN/20200723_Alerting/20200723_Alerting';
import PressDECompliance from './views/Press/DE/20200910_DSGVO/20200723_DSGVO';
import FlxLandingPage from './views/FLXLandingPage/FLXLandingPage';

const Routes = () => {
  return (
    <React.Fragment>
      <ScrollToTop>
        <Switch>

          <Route exact path="/" component={HomePage} />
          <Route exact path="/search-guard-flx/" component={FlxLandingPage} />
          <Route exact path="/flx/" component={Faqs} />
          <Route exact path="/contacts/" component={ContactUs} />
          <Route exact path="/security/" component={Security} />
          <Route exact path="/alerting/" component={Alerting} />
          <Route exact path="/whitepapers/" component={WhitePapers} />
          <Route exact path="/compliance/" component={Compliance} />
          <Route exact path="/company/" component={Company} />
          <Route exact path="/resource/" component={Resource} />
          <Route exact path="/licensing/" component={License} />
          <Route exact path="/faq/" component={Faqs} />
          <Route exact path="/impressum/" component={Imprint} />
          <Route exact path="/presentations/" component={Presentations} />
          <Route exact path="/datenschutz/" component={DataProtection} />
          <Route exact path="/education-program/" component={Education} />

          <Route
            exact
            path="/security-for-elasticsearch/"
            component={SecurityForElasticsearch}
          />
          <Route
            exact
            path="/elasticsearch-kibana-security/"
            component={SecurityForElasticsearch}
          />
          <Route exact path="/thanks/" component={Thanks} />
          <Route exact path="/error/" component={Error} />
          <Route
            exact
            path="/certificates-on-the-way/"
            component={CertificatesOnTheWay}
          />
          <Route
              exact
              path="/search-guard-free-trial/"
              component={FreeTrial}
          />
          <Route exact path="/security-information/" component={SecurityInformation} />
          <Route exact path="/cve-advisory/" component={Advisory} />
          <Route exact path="/disclosure-policy/" component={Disclosure} />
          <Route
            exact
            path="/tls-certificate-generator/"
            component={TlsGenerator}
          />

          <Route exact path="/certificates/" component={Certifications} />
          <Route exact path="/category/:slug" component={BlogCategory} />
          <Route exact path="/blog/" component={Blog} />
          <Route exact path="/blog/page/:slug" component={Blog} />

          <Route exact path="/whitepapers/:slug" component={WhitePaperArticle} />
          <Route exact path="/press/de/search-guard-vertrieb-dach/" component={PressDEDach} />
          <Route exact path="/press/en/search-guard-sales-dach/" component={PressENDach} />

          <Route exact path="/press/de/search-guard-alerting/" component={PressDEAlerting} />
          <Route exact path="/press/en/search-guard-alerting/" component={PressENAlerting} />

          <Route exact path="/press/de/elasticsearch-dsgvo/" component={PressDECompliance} />

          <Route exact path="/404/" component={NotFound} />

          {/* this is not really good, it interferes with the 404 page! Need to handle that explicitely on BlogPostArticle Page now. Otherwise, we need to change all URLs for all blog posts :( */}
          <Route exact path="/:slug" component={BlogPostArticle} />

          <Redirect to="/404/" />

        </Switch>
      </ScrollToTop>
    </React.Fragment>
  );
};

export default Routes;
