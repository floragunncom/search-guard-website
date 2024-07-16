import React from 'react';
import { Helmet } from 'react-helmet';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import './TlsGenerator.scss';

const TlsGenerator = () => {

    const breadcrumb = [
        { anchor: '/', name: 'Home' },
        { anchor: '/resource/', name: 'Resource Hub' },
        { anchor: '/tls-certificate-generator/', name: 'TLS certificate generator' },
    ];

  return (
    <PageWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>TLS Certificate Generator - Search Guard</title>
        <link
          rel="canonical"
          href="https://preview.search-guard.com/tls-certificate-generator/"
        />
        <meta
          name="description"
          content="Search Guard is an Open Source security plugin for Elasticsearch and the entire ELK stack. Search Guard offers encryption, authentification, authorization, audit logging, multitenancy and compliance features (for regulations like GDPR, HIPAA, PCI DSS or SOX)."
        />
      </Helmet>
      <Title
        headline="TLS Certificate Generator"
        text="Use our generator service to create all certificates required for configuring Search Guard."
        breadcrumb={breadcrumb}
      />
      <div className="row">
        <div className="col s12 l8 offset-l2" id="tls">
          <div className="tls-wrapper">
            <div className="tls-headline">This service has been discontinued</div>
            <div className="tls-text">
              If you want to generate production-ready
              certificates, please use our offline TLS tool.
              <br />
              <br />
                <br />
                <div className="row">
                    <div className="col s12 l6">
                        <Button
                            text="Download TLS Tool"
                            link="https://search-guard.com/docs/latest/offline-tls-tool"
                            target="_blank"
                        />
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default TlsGenerator;
