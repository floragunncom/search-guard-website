import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import '../FreeTrial/FreeTrial.scss';
import './Compliance.scss';
import { initGA, PageView } from '../../components/Tracking/Tracking';
import PreFooter from '../../components/PreFooter/PreFooter';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import ComplianceFeatures from '../../components/Compliance/ComplianceFeatures';
import ImageTextTile from '../../components/Tiles/ImageTextTile/ImageTextTile';
import Cta from '../../components/Cta/Cta';
import ctaIcon from '../../images/icon-sg.svg';
import complianceDataChanges from '../../images/compliance_change_tracking.svg';
import complianceAnon from '../../images/compliance_anon.svg';
import complianceForgotten from '../../images/compliance_forgotten.svg';
import multilevel from '../../images/multilevel-security.svg';
import shieldWheel from "../../images/shield-wheel.svg";
import lock from '../../images/tile-icon-wheel.svg';
import ContactFormSlimOnly from "../../components/ContactFormSuperSlimOnly";

const breadcrumb = [
    { anchor: '/', name: 'Home' },
    { anchor: '/compliance/', name: 'Compliance' }

];

const Compliance = () => {
  useEffect(() => {
    initGA();
    PageView();
  }, []);

  return (
      <PageWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
            Elasticsearch Compliance | Stay compliant with GDPR, HIPAA, PCI, SOX and ISO
        </title>
        <link rel="canonical" href="https://search-guard.com/compliance/" />
        <meta
          name="description"
          content="Keep your Elasticsearch and Kibana stack compliant with regulations like GDPR, PCI, SOX, HIPAA and ISO by using Search Guard"
        />
      </Helmet>
      <Title
        headline="Compliance for Elasticsearch"
        text="Keep Elasticsearch and Kibana compliant with regulations like GDPR, PCI, SOX, HIPAA and ISO"
        breadcrumb={breadcrumb}
      />

          <div className="compliance-wrapper" id="concept">

              <div className="row compliance">
                  <h3 className="compliance-headline">Search Guard Compliance Edition</h3>

                  <div className="subtitle compliance-content-headline">
                      The challenges of data compliance
                  </div>
                  <div className="compliance-content-text">
                    While the importance of data privacy and compliance is ever increasing, the burden that compliance regulations like
                    GDPR, PCI, HIPAA or SOX put on CISOs and IT operators is high. The regulations cover topics such as data encryption,
                    data integrity, access control, data anonymization, access tracking, data retention and many more.
                    Failure to implement those regulations can lead to fines and damages, and actual data breaches may have a permanent
                    impact on the reputation and business of any company.
                  </div>

                  <div className="subtitle compliance-content-headline">
                      Search Guard Compliance Edition
                  </div>
                  <div className="compliance-content-text">
                      The Search Guard Compliance Edition offers features that make it easy to implement compliance regulations for
                       Elasticsearch, Kibana and the entire Elastic Stack. Sophisticated tools like document change tracking, document integrity protection
                      and field anonymization significantly ease the pain of adhering to GDPR, PCI, HIPAA or SOX.
                  </div>
              </div>
          </div>

          <div id="features">
              <ImageTextTile
                  icon={lock}
                  iconPosition="right"
                  backgroundColor="light"
                  headline="Data encryption"
                  text="
                    Search Guard enforces TLS encryption for all data in transit. This ensures data protection and data integrity, and makes sure only
                    trusted parties are able to read sensitive data. Search Guard also supports like dm-crypt, EcryptFS for encryption at rest."
              />
          </div>

          <div id="concept">
              <ImageTextTile
                  icon={multilevel}
                  iconPosition="left"
                  backgroundColor="dark"
                  headline="Fine-grained access control to all data"
                  text="
            Search Guard blocks any unauthorized access to any information inside Elasticsearch. With our fine-grained role-based
            access control system you are always in control over who is able to read and modify data. This applies to indices, documents, and even single fields.
          "
              />
          </div>
          <ImageTextTile
              icon={complianceDataChanges}
              iconPosition="right"
              backgroundColor="light"
              headline="Data access tracking and change tracking"
              text="
                Search Guard produces and audit trail that records who has created, accessed and modified senstive data. In an compliance audit you can
                exactly state when, by whom and why this data has been entered and processed.
              "
          />
          <ImageTextTile
              icon={complianceAnon}
              iconPosition="left"
              backgroundColor="dark"
              headline="Data anonymization"
              text="
                Not all data that is being recorded has to present for everyone to see in clear text at all times. Search Guard supports on-the-fly data
                anonymization on a per-role basis. At any time you decide who is allowed to see clear text data and who should see anonymized data only. All
                Elasticsearch data aggregation and analysis features continue to work also on anonymized data.
        "
          />
          <ImageTextTile
              icon={complianceForgotten}
              iconPosition="right"
              backgroundColor="light"
              headline="Right to be forgotten"
              text="
                Customers can demand that PII data that is not required for ongoing business activites must be deleted. With the Search Guard Compliance
                Edition you can now record any PII data deletion for future proof this 'right to be forgotten has' been applied correctly.
        "
          />

          <div className="securityinfo-wrapper" id="highlights">
              <ComplianceFeatures />
          </div>

          <div className="row free-trial">
              <div className="subtitle compliance-headline-form" id="contact">
                  Questions? Contact Us!
              </div>

              <div className="free-trial-section" >
                  <div className="free-trial-content">
                      <div className="free-trial-content-text">
                          <ContactFormSlimOnly/>
                      </div>
                  </div>
              </div>
          </div>

      <div id="tryit">
        <Cta
          headline="Give the Search Guard Compliance Edition a spin!"
          text="Follow these simple steps to install Search Guard on your Elasticsearch cluster. "
          ctaText="Installation"
          icon={ctaIcon}
          link="/search-guard-free-trial/"
        />
      </div>
      <PreFooter />
    </PageWrapper>
  );
};

export default Compliance;
