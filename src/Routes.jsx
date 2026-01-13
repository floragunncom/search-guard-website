import { Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
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

const AppRoutes = () => {
  return (
    <React.Fragment>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/search-guard-flx/" element={<FlxLandingPage />} />

          <Route path="/heise/" element={<Heise />} />
          <Route path="/heise" element={<Heise />} />

          <Route path="/contacts/" element={<ContactUs />} />
          <Route path="/security/" element={<Security />} />
          <Route path="/alerting/" element={<Alerting />} />
          <Route path="/tlstool/" element={<TlsTool />} />
          <Route path="/encryption-at-rest/" element={<EncryptionAtRest />} />
          <Route path="/indexmanagement/" element={<Aim />} />
          <Route path="/whitepapers/" element={<WhitePapers />} />
          <Route path="/compliance/" element={<Compliance />} />
          <Route path="/company/" element={<Company />} />
          <Route path="/resource/" element={<Resource />} />
          <Route path="/licensing/" element={<License />} />
          <Route path="/faq/" element={<Faqs />} />
          <Route path="/impressum/" element={<Imprint />} />
          <Route path="/presentations/" element={<Presentations />} />
          <Route path="/datenschutz/" element={<Datenschutz />} />
          <Route path="/dataprotection/" element={<DataProtection />} />
          <Route path="/outdated-elasticsearch-versions-suppport/" element={<OldElasticsearchVersions />} />
          <Route path="/newsletter/" element={<Newsletter />} />

          {/* Redirects */}
          <Route path="/security-for-elasticsearch/" element={<Navigate to="/security/" replace />} />
          <Route path="/elasticsearch-kibana-security/" element={<Navigate to="/security/" replace />} />
          <Route path="/tls-certificate-generator/" element={<Navigate to="/security/" replace />} />

          <Route path="/thanks/" element={<Thanks />} />
          <Route path="/error/" element={<Error />} />

          <Route path="/search-guard-free-trial/" element={<FreeTrial />} />
          <Route path="/security-information/" element={<SecurityInformation />} />
          <Route path="/cve-advisory/" element={<Advisory />} />
          <Route path="/disclosure-policy/" element={<Disclosure />} />

          <Route path="/authors/" element={<Authors />} />
          <Route path="/author/:slug" element={<Author />} />

          <Route path="/certificates/" element={<Certifications />} />

          <Route path="/blog/category/:slug/" element={<BlogCategory />} />
          <Route path="/blog/" element={<Blog />} />
          <Route path="/blog/page/:pageNumber/" element={<Blog />} />
          <Route path="/blog/:slug/" element={<BlogPostArticle />} />

          <Route path="/whitepapers/:slug" element={<WhitePaperArticle />} />

          <Route path="/press/de/search-guard-vertrieb-dach/" element={<PressDEDach />} />
          <Route path="/press/en/search-guard-sales-dach/" element={<PressENDach />} />

          <Route path="/press/de/search-guard-alerting/" element={<PressDEAlerting />} />
          <Route path="/press/en/search-guard-alerting/" element={<PressENAlerting />} />

          <Route path="/press/de/elasticsearch-dsgvo/" element={<PressDECompliance />} />

          {/* Note: This is the HTML version of the sitemap. The XML one is generated by scripts/sitemap.js after the build process */}
          <Route path="/sitemap/" element={<HtmlSitemap />} />

          <Route path="/404/" element={<NotFound />} />

          <Route path="/preview/blogpost/:slug" element={<BlogPostArticlePreview />} />

          {/* Catch-all 404 - must be last */}
          <Route path="*" element={<Navigate to="/404/" replace />} />
        </Routes>
    </React.Fragment>
  );
};

export default AppRoutes;
