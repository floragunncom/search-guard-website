import React from 'react';
import {Helmet} from 'react-helmet';
import './Presentations.scss';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import presentations from '../../Api/presentations.json';
import Button from "../../components/Button/Button";

const breadcrumb = [
  { anchor: '/', name: 'Home' },
  { anchor: '/resource/', name: 'Resources' },
  { anchor: '/presentations/', name: 'Presentations' },
];



const Presentations = () => {
  return (
    <PageWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Search Guard Security and Alerting Slide Decks for Elasticsearch
        </title>
        <link rel="canonical" href="https://search-guard.com/presentations/" />
        <meta
          name="description"
          content="Search Guard slide decks regarding various topics around security and alerting for Elasticsearch"
        />
      </Helmet>
      <Title
        headline="Presentations"
        text="Search Guard slide decks regarding various topics around security and alerting for Elasticsearch"
        breadcrumb={breadcrumb}
      />
      <div className="row presentations-wrapper color-schema-white">
        {presentations.map(item => {
          return (
            <div className="col m6 s12 presentations-item">
              <img
                src={item.image}
                className="presentations-image"
                alt={item.headline}
              />
              <div className="presentations-headline">{item.headline}</div>
              <div className="presentations-text">{item.text}</div>
              <div className="presenations-download presentations-button">

                  <Button
                      
                      text="Download PDF"
                      link={item.link}
                      target="_blank"

                  />
              </div>
            </div>
          );
        })}
      </div>
      <PreFooter />
    </PageWrapper>
  );
};

export default Presentations;
