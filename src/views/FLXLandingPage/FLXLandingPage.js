
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import './FLXLandingPage.scss';
import { initGA, PageView } from '../../components/Tracking/Tracking';
import PreFooter from '../../components/PreFooter/PreFooter';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import Button from "../../components/Button/Button";

const FLXLandingPage = () => {
  useEffect(() => {
    initGA();
    PageView();
  }, []);

const breadcrumb = [
  { id: 1, anchor: '/', name: 'Home' },
  { id: 1, anchor: '/search-guard-flx//', name: 'Search Guard FLX' },
];

  return (
      <PageWrapper>
        <Helmet>
            <meta charSet="utf-8" />
            <title>
                Search Guard FLX for Elasticsearch and OpenSearch | Search Guard
            </title>
            <link rel="canonical" href="https://search-guard.com/search-guard-flx/" />
            <meta
            name="description"
            content="Search Guard FLX for Elasticsearch and OpenSearch brings big improvements in terms of both flexibility and user orientation."
            />
        </Helmet>
        <Title
            headline="Search Guard FLX - Security for Elasticsearch and OpenSearch – Better Than Ever"
            text="Search Guard FLX brings big improvements in terms of both flexibility, performance and user orientation."
            breadcrumb={breadcrumb}
            buttonstyle="sand-button"
            buttontext="Try it out for free"
            buttontarget="_blank"
            buttonlink="https://docs.search-guard.com/flx/"
        />

          <div className="flx-wrapper" >

              <div className="row flx">
                  <h2 className="flx-headline">Highlights</h2>

                  <div className="flx-section" >
                      <div className="flx-content">
                          <div className="flx-content-headline">
                              Clear, Concise and Consistent: The New Configuration Format
                          </div>
                          <div className="flx-content-text">
                              The new configuration format is more coherent, more flexible and much more powerful.
                              It requires less boilerplate and clutter, and is far easier to understand and maintain.
                          </div>
                      </div>
                  </div>

                  <div className="flx-section" >
                      <div className="flx-content">
                          <div className="flx-content-headline">
                              Administration
                          </div>
                          <div className="flx-content-text">
                              Our new administration tool sgctl replaces the outdated and more complicated sgadmin.
                              It makes connecting to your cluster easier than ever before. Define connection profiles once and use them later.
                              No more multi-line CLI commands for administering Search Guard.
                          </div>
                      </div>
                  </div>

                  <div className="flx-section" >
                      <div className="flx-content">
                          <div className="flx-content-headline">
                              Security Settings
                          </div>
                          <div className="flx-content-text">
                              The new sgctl tool makes it very easy to change your security configuration with just a single command.
                              Just want to add a user? Use sgctl add-user. Want to update the complete configuration?
                              Use sgctl update-config. Want to create a complete backup of your security settings? Use sgctl.sh get-config.
                          </div>
                      </div>
                  </div>

                  <div className="flx-section" >
                      <div className="flx-content">
                          <div className="flx-content-headline">
                              Secrets Handling
                          </div>
                          <div className="flx-content-text">
                              Search Guard FLX is able to manage all your configuration secrets securely and encrypted.
                              Say goodbye to environment variables which need to be kept in sync on all nodes.
                              Instead, just add a secret to Search Guard like sgctl.sh add-var ldap_password secret123.
                              You can then use it later on in all configuration settings.
                          </div>
                      </div>
                  </div>

                  <div className="flx-section" >
                      <div className="flx-content">
                          <div className="flx-content-headline">
                              Multiple Authentication Methods for Kibana
                          </div>
                          <div className="flx-content-text">
                              The Kibana plugin now supports multiple authentication methods for a single Kibana installation at the same time.
                              Users need to be able to log in with either Okta, Active Directory or TLS client certificates.
                              Search Guard FLX supports it all.
                          </div>
                      </div>
                  </div>

                  <div className="flx-section" >
                      <div className="flx-content">
                          <div className="flx-content-headline">
                              Kibana Session Handling
                          </div>
                          <div className="flx-content-text">
                              The session handling for Kibana and OpenSearch Dashboards has also been greatly improved.
                              Users and administrators now get an actual server-side session, which unifies session handling across many different
                              authentication methods.
                          </div>
                      </div>
                  </div>

                  <div className="flx-section" >
                      <div className="flx-content">
                          <div className="flx-content-headline">
                              Unified Elasticsearch and Kibana Configuration
                          </div>
                          <div className="flx-content-text">
                              Most of the security configuration for Kibana has been integrated with the configuration of
                              Elasticsearch. You can change the settings in one place, and the changes will take effect
                              for Elasticsearch and Kibana at the same time.
                          </div>
                      </div>
                  </div>

                  <div className="flx-section" >
                      <div className="flx-content">

                          <div className="col s4 offset-s4 flx-button-wrapper">
                              <Button
                                  text="Try it out for free"
                                  buttonStyle="sand-button"
                                  link="https://docs.search-guard.com/flx/"
                                  target="_blank"
                              />
                          </div>

                      </div>
                  </div>

              </div>

          </div>

        <PreFooter />

    </PageWrapper>
  );
};

export default FLXLandingPage;
