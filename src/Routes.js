import {Redirect, Route, Switch, useLocation} from 'react-router-dom';
import React, {useEffect} from 'react';
import { Helmet } from 'react-helmet-async';
import HomePage from './views/HomePage/HomePage';
import ContactUs from './views/ContactUs/ContactUs';
import Blog from './views/Blog/Blog';
import BlogPostArticle from './views/Blog/BlogPostArticle';
import BlogPostArticlePreview from './views/Blog/BlogPostArticlePreview';
import BlogCategory from './views/Blog/BlogCategory';
import Resource from './views/Resource/Resource';
import Company from './views/Company/Company';
import Security from './views/Security/Security';
import TlsTool from './views/TlsTool/TlsTool';
import Alerting from './views/Alerting/Alerting';
import AnomalyDetection from './views/AnomalyDetection/AnomalyDetection';
import Aim from './views/Aim/Aim';
import Faqs from './views/Faqs/Faqs';
import Compliance from './views/Compliance/Compliance';
import License from './views/License/License';
import Imprint from './views/Imprint/Imprint';
import WhitePapers from './views/WhitePapers/WhitePapers';
import WhitePaperArticle from './views/WhitePapers/WhitePaperArticle';
import Authors from './views/Author/Authors';
import Author from './views/Author/Author';
import Presentations from './views/Presentations/Presentations';
import Datenschutz from './views/DataProtection/Datenschutz';
import DataProtection from './views/DataProtection/DataProtection';
import SecurityInformation from './views/SecurityInformation/SecurityInformation';
import Advisory from './views/Advisory/Advisory';
import Disclosure from './views/Disclosure/Disclosure';
import NotFound from './views/NotFound/NotFound';
import Thanks from './views/Thanks/Thanks';
import Heise from './views/Heise/Heise';
import Certifications from './views/Certifications/Certifications';
import FreeTrial from './views/FreeTrial/FreeTrial';
import PressDEDach from './views/Press/DE/20200620_Vertrieb_Dach/20200620_Vertrieb_Dach';
import PressENDach from './views/Press/EN/20200620_Sales_Activities_Dach/20200620_Sales_Activities_Dach';
import PressDEAlerting from './views/Press/DE/20200723_Alerting/20200723_Alerting';
import PressENAlerting from './views/Press/EN/20200723_Alerting/20200723_Alerting';
import PressDECompliance from './views/Press/DE/20200910_DSGVO/20200723_DSGVO';
import FlxLandingPage from './views/FLXLandingPage/FLXLandingPage';
import OldElasticsearchVersions from './views/OldElasticsearchVersions/OldElasticsearchVersions';
import Newsletter from './views/Newsletter/Newsletter';
import HtmlSitemap from './views/HtmlSitemap/HtmlSitemap';
import Error from './views/Error/Error';
import EncryptionAtRest from "./views/EncryptionAtRest/EncryptionAtRest";
import PageWrapper from './components/PageWrapper/PageWrapper';

const PrerenderReadySignal = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    window.__PRERENDER_READY__ = false;
    const readyTimer = window.setTimeout(() => {
      window.__PRERENDER_READY__ = true;
    }, 0);

    return () => {
      window.clearTimeout(readyTimer);
    };
  }, [location.pathname]);

  return null;
};

const Routes = () => {
  const LegacyRedirect = ({ to, title }) => {
    useEffect(() => {
      if (typeof window !== 'undefined') {
        window.location.replace(to);
      }
    }, [to]);

    return (
      <PageWrapper>
        <Helmet>
          <title>{title}</title>
          <meta
            name="description"
            content={`This page has moved permanently to ${to}`}
          />
          <link rel="canonical" href={`https://search-guard.com${to}`} />
          <meta property="og:url" content={`https://search-guard.com${to}`} />
          <meta name="robots" content="noindex,follow" />
          <meta httpEquiv="refresh" content={`0;url=${to}`} />
        </Helmet>
        <div className="row">
          <div className="col s12 center">
            <h1>Redirecting...</h1>
            <p>
              This page has moved. Continue to{' '}
              <a href={to}>{`https://search-guard.com${to}`}</a>.
            </p>
          </div>
        </div>
      </PageWrapper>
    );
  };

  return (
    <React.Fragment>
        <PrerenderReadySignal />

        <Switch>

          <Route exact path="/" component={HomePage} />

          <Route exact path="/search-guard-flx/">
            <FlxLandingPage />
          </Route>

          <Route exact path="/heise/" component={Heise} />
          <Route exact path="/heise" component={Heise} />

          <Route exact path="/search-guard-flx/" component={FlxLandingPage} />
          <Route exact path="/contacts/" component={ContactUs} />
          <Route exact path="/security/" component={Security} />
          <Route exact path="/alerting/" component={Alerting} />
          <Route exact path="/anomaly-detection/" component={AnomalyDetection} />
          <Route exact path="/tlstool/" component={TlsTool} />
          <Route exact path="/encryption-at-rest/" component={EncryptionAtRest} />
          <Route exact path="/indexmanagement/" component={Aim} />
          <Route exact path="/whitepapers/" component={WhitePapers} />
          <Route exact path="/compliance/" component={Compliance} />
          <Route exact path="/company/" component={Company} />
          <Route exact path="/resource/" component={Resource} />
          <Route exact path="/licensing/" component={License} />
          <Route exact path="/faq/" component={Faqs} />
          <Route exact path="/impressum/" component={Imprint} />
          <Route exact path="/presentations/" component={Presentations} />
          <Route exact path="/datenschutz/" component={Datenschutz} />
          <Route exact path="/dataprotection/" component={DataProtection} />
          <Route exact path="/outdated-elasticsearch-versions-suppport/" component={OldElasticsearchVersions} />
          <Route exact path="/newsletter/" component={Newsletter} />

          <Route exact path="/security-for-elasticsearch/">
            <LegacyRedirect
              to="/security/"
              title="Redirecting to Security | Search Guard"
            />
          </Route>

          <Route exact path="/elasticsearch-kibana-security/">
            <LegacyRedirect
              to="/security/"
              title="Redirecting to Security | Search Guard"
            />
          </Route>

          <Route exact path="/thanks/" component={Thanks} />
          <Route exact path="/error/" component={Error} />

          <Route
              exact
              path="/search-guard-free-trial/"
              component={FreeTrial}
          />
          <Route exact path="/security-information/" component={SecurityInformation} />
          <Route exact path="/cve-advisory/" component={Advisory} />
          <Route exact path="/disclosure-policy/" component={Disclosure} />

          <Route exact path="/tls-certificate-generator/">
            <LegacyRedirect
              to="/security/"
              title="Redirecting to Security | Search Guard"
            />
          </Route>

          <Route exact path="/authors/" component={Authors} />
          <Route exact path="/author/:slug" component={Author} />

          <Route exact path="/certificates/" component={Certifications} />


          <Route exact path="/blog/category/:slug/" component={BlogCategory} />
          <Route exact path="/blog/" component={Blog} />
          <Route exact path="/blog/page/:pageNumber/" component={Blog} />
          <Route exact path="/blog/:slug/" component={BlogPostArticle} />

          <Route exact path="/whitepapers/:slug" component={WhitePaperArticle} />



          <Route exact path="/press/de/search-guard-vertrieb-dach/" component={PressDEDach} />
          <Route exact path="/press/en/search-guard-sales-dach/" component={PressENDach} />

          <Route exact path="/press/de/search-guard-alerting/" component={PressDEAlerting} />
          <Route exact path="/press/en/search-guard-alerting/" component={PressENAlerting} />

          <Route exact path="/press/de/elasticsearch-dsgvo/" component={PressDECompliance} />

          {/* Not: This is the HTML version of the sitemap. The XML one is generated by scripts/sitemap.js after the build process */}
          <Route exact path="/sitemap/" component={HtmlSitemap} />

          <Route exact path="/404/" component={NotFound} />

          <Route exact path="/preview/blogpost/:slug" component={BlogPostArticlePreview} />

          <Redirect to="/404/" />

        </Switch>

    </React.Fragment>
  );
};

export default Routes;
