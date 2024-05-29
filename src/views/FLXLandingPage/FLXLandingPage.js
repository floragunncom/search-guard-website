import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { initGA, PageView } from '../../components/Tracking/Tracking';
import PreFooter from '../../components/PreFooter/PreFooter';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import TileSimpleFLX from '../../components/TileSimpleFLX/TileSimpleFLX';
import control from '../../images/icon-searchguard-flx-control.svg';
import variables from '../../images/icon-searchguard-flx-variables.svg';
import kibana from '../../images/icon-searchguard-flx-multiauth.svg';
import PreFooterAnnouncement from "../../components/PreFooterAnnouncement/PreFooterAnnouncement";

const Security = () => {
  useEffect(() => {
    initGA();
    PageView();
  }, []);

  return (
    <PageWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Search Guard FLX | Securing your Elasticsearch cluster has never been easier
        </title>
        <link rel="canonical" href="https://search-guard.com/security/" />
        <meta
          name="description"
          content="Securing Elasticsearch and Kibana has never been easier with Search Guard FLX."
        />
      </Helmet>
      <Title
        headline="Search Guard FLX <br />Security for Elasticsearch has never been easier."
        text="New command line tool, built-in variable store and new configuration structure."
        titlestyle="flx"
        buttonstyle="sand-button"
        buttontext="View full documentation"
        buttonlink="https://docs.search-guard.com/latest/"
        buttontarget="_blank"
      />

      <div id="concept">
        <TileSimpleFLX
          icon={control}
          iconPosition="left"
          backgroundColor="control"
          headline="Improved Control: New Command Line Interface "
          text="Configuring security for Elasticsearch has never been easier. sgadmin becomes sgctl."
          linktext="Read more"
          linkurl="/sgctl-elasticsearch/"
        />
      </div>
      <TileSimpleFLX
        icon={variables}
        iconPosition="right"
        backgroundColor="variables"
        headline="Search Guard FLX Ships with Built-in Variables Store "
        text="With our new Variables Store you can now manage your sensitive configuration variables in a central place: Your Elasticsearch cluster."
        linktext="Read more"
        linkurl="/handling-configuration-variables-search-guard-flx/"
      />
      <TileSimpleFLX
        icon={kibana}
        iconPosition="left"
        backgroundColor="kibana"
        headline="Kibana multiauth: New Configuration Structure"
        text="All configuration settings stored in one central place. Hot-reloadable: change your frontend settings in real time without restarting Kibana. Support for multiple authentication types."
        linktext="Read more"
        linkurl="/kibana-multiple-authentication-search-guard/"
      />
        <PreFooterAnnouncement
            headline="Learn everything about Search Guard FLX"
        />
      <PreFooter />
    </PageWrapper>
  );
};

export default Security;
