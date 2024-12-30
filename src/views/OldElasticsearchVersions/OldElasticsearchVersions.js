import React, { useEffect } from 'react';
import '../Alerting/Alerting.scss';
import { Helmet } from 'react-helmet';
import { initGA, PageView } from '../../components/Tracking/Tracking';
import PreFooter from '../../components/PreFooter/PreFooter';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import ImageTextTile from '../../components/Tiles/ImageTextTile/ImageTextTile';
import Cta from '../../components/Cta/Cta';
import ctaIcon from '../../images/icon-sg.svg';
import security from '../../images/tile-icon-wheel.svg';
import oldversions from "../../images/icon-speaker.svg";
import jail from "../../images/icon-note.svg";


const OldElasticsearchVersions = () => {

    useEffect(() => {
    initGA();
    PageView();
  }, []);

    const breadcrumb = [
        { id: 1, anchor: '/', name: 'Home' },
        { id: 1, anchor: '/outdated-elasticsearch-versions-suppport/', name: 'Outdated Elasticsearch Versions Support' },
    ];

  return (
      <PageWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
            Support for Outdated Elasticsearch Versions | Search Guard
        </title>
        <link rel="canonical" href="https://search-guard.com/alerting/" />
        <meta
          name="description"
          content="Search Guard still supports and provides Security and Alerting for outdated Elasticsearch Versions."
        />
      </Helmet>

      <Title
        headline="Security for Elasticsearch 2, 5 and 6"
        text="Stuck on Elasticsearch 6? Or even version 5 or 2? Search guard provides versions of Security plugins for Elasticsearch 6 as well as version 5 and, yes, even version 2. "
        breadcrumb={breadcrumb}
      />

      <div id="concept">
        <ImageTextTile
          icon={oldversions}
          iconPosition="left"
          backgroundColor="light"
          headline="We provide security for ES2/5/6"
          text="Stuck on Elasticsearch 6, or even Elastic Search 5 or 2 without a viable migration path? Search Guard can help you migrate while providing core Enterprise security on older versions of Elasticsearch."
        />
      </div>
      <ImageTextTile
        icon={jail}
        iconPosition="right"
        backgroundColor="dark"
        headline="Get out of jail card "
        text="
            Older versions of Elasticsearch have a list of known issues. Search Guard can help you stabilize your security framework with enterprise level authz/authn and provide a way forward to upgrade to current versions of Elasticsearch and Search guard that are not End of life.
        "
      />
      <ImageTextTile
        icon={security}
        iconPosition="left"
        backgroundColor="light"
        headline="Stabilize your security framework"
        text="
            By deploying the relevant version of Search  Guard on Elasticsearch 6, 5 or even version 2, we can stabilize your security frameworks. Then you can migrate over time to current versions of Elasticsearch without compromising your security. Once you migrate you access all the bug fixes and updates that are accessible in later versions of Elasticsearch (and Search Guard) such as Version 8).
        "
      />

          <div className="alerting-wrapper" >

              <div className="row alerting">
                  <h2 className="alerting-headline">Search Guard is still available for older and outdated Elasticsearch Versions</h2>

                  <div className="alerting-section" >
                      <div className="alerting-content">
                          <div className="alerting-content-headline">
                              Stuck on an old Elasticsearch Version?
                          </div>
                          <div className="alerting-content-text">
                              Are you stuck on Elasticsearch 6? Or even version 5 or 2?
                              Elasticsearch’s older versions have a list of well known issues that are fixed in later versions as well as significant feature enhancements.
                              However many organizations implemented Elasticsearch sometime ago and find they don’t have the skills or knowledge to unpick the integrations built at the time.
                              <br/><br/>
                              As a result some organizations find that attempting to move forward can be very resource intensive and time consuming.
                              So some organizations prefer to stay on the older version of Elasticsearch but, of course, this can carry significant risks in particular with Security.

                          </div>
                      </div>
                  </div>

                  <div className="alerting-section" >
                      <div className="alerting-content">
                          <div className="alerting-content-headline">
                              We still provide security for Elasticsearch 2, 5 and 6
                          </div>
                          <div className="alerting-content-text">
                              Search Guard has been providing Enterprise security for Elasticsearch since Version 2.
                              Search guard still provides versions of our Security plugins for Elasticsearch 6 as well as version 5 and, yes, even version 2.
                              By implementing Search Guard you can stabilize your security particularly with Encryption in motion,
                              Authn and Authz. We can also provide guidance on how to migrate to more current versions of Elasticsearch (Paid service).
                          </div>
                      </div>
                  </div>
              </div>

          </div>

      <div id="tryit">
        <Cta
          headline="Interested? Drop us a note!"
          text="Curious to learn about your options with older versions of Elasticsearch? Just drop us a note!"
          ctaText="Contact Us"
          icon={ctaIcon}
          link="/contacts/"
        />
      </div>
      <PreFooter />
    </PageWrapper>
  );
};

export default OldElasticsearchVersions;
