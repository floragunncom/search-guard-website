import React from 'react';
import PreFooter from '../../components/PreFooter/PreFooter';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import Button from '../../components/Button/Button';
import Cta from '../../components/Cta/Cta';
import ctaIcon from '../../images/cta-banner-arrow.svg';
import Title from '../../components/Title/Title';
import arrowDown from '../../images/arrow-down-green.svg';
import claudia from '../../images/claudia.svg';
import jochen from '../../images/jochen.svg';
import hendrik from '../../images/hendrik.svg';
import mechthild from '../../images/mechthild.svg';
import fabian from '../../images/fabian.svg';
import paulo from '../../images/paulo.svg';
import iconIn from '../../images/icon-in-loud.svg';
import ref1 from '../../images/ref1.svg';
import ref2 from '../../images/ref2.svg';
import ref3 from '../../images/ref3.svg';
import sieMonster from '../../images/sie-monster.svg';
import pivotal from '../../images/pivotal.svg';
import wuerthPhoenix from '../../images/wuerth-phoenix.svg';
import redHat from '../../images/red-hat.svg';
import mitratech from '../../images/mitratech.svg';
import siren from '../../images/siren.svg';
import kubedb from '../../images/kubedb.svg';
import './Company.scss';

const Company = () => {
  const team = [
    { name: 'Claudia Kressin', position: 'Founder & CEO', pic: claudia },
    { name: 'Jochen Kressin', position: 'Founder & CEO', pic: jochen },
    { name: 'Hendrik Saly', position: 'CTO', pic: hendrik },
    { name: 'Mechthild Wetekam', position: 'COO', pic: mechthild },
    { name: 'Fabian Michalsen', position: 'CBO', pic: fabian },
    { name: 'Paulo Melo', position: 'CMO', pic: paulo },
  ];

  const integrators = [
    {
      headline: 'Red Hat® OpenShift',
      text:
        'Red Hat® OpenShift is a container application platform that brings docker and Kubernetes to the enterprise. OpenShift includes Kubernetes for container orchestration and management.',
      pic: redHat,
      link: 'https://www.google.com',
    },
    {
      headline: 'Würth Phoenix',
      text:
        'Würth Phoenix is a software company belonging to the Würth-Group, world market leader in the trade of assembly and fastening materials, offering business software for ERP, CRM and IT System Management. With its Unified monitoring solution NetEye, the company developed a best-of-breed approach of tried-and-trusted open source tools with external cloud applications that can be monitored just easily as services in data centers or hybrid services. Würth Phoenix completes its service offer with project planning, consulting, implementation and continuous assistance – combining thought leadership, experience, and newest technologies.',
      pic: wuerthPhoenix,
      link: 'https://www.google.com',
    },
    {
      headline: 'Pivotal Cloud Foundry',
      text:
        'Pivotal Cloud Foundry (PCF) is the proven solution for companies seeking software-led digital transformation. The platform enables the continuous delivery of any app to every cloud empowering developers to be more productive and operators to be more efficient—accelerating feature delivery and deployment across clouds without downtime. Altoros Elasticsearch for PCF abstracts away the complexity of deploying and scaling a real-time distributed document store, search and analytics service. The integration deploys an enterprise-ready Elasticsearch cluster that can be shared among multiple PCF users.',
      pic: pivotal,
      link: 'https://www.google.com',
    },
    {
      headline: 'SIEMonster',
      text:
        'SIEMonster is a turnkey, open source, Enterprise grade Security Information and Event Management (SIEM), built on scalable, non-licensed components, fully documented and developed by the community and SIEMonster team. The product is free, fully documented, and there are no data or node limitations.',
      pic: sieMonster,
      link: 'https://www.google.com',
    },
    {
      headline: 'Mitratech TeamConnect',
      text:
        'The TeamConnect Enterprise Legal Management (ELM) platform consistently meets the complex operational needs of large, global legal departments. Whether your staff is managing litigation, contracts, intellectual property, product claims, compliance matters, or legal team projects, TeamConnect offers a market-proven, unified approach to managing all legal operations. With a completely redesigned interface and optimised user experience, TeamConnect is a solution your legal team will want to use.',
      pic: mitratech,
      link: 'https://www.google.com',
    },
    {
      headline: 'KubeDB by AppsCode',
      text:
        'KubeDB by AppsCode makes it easy to run production-grade databases on Kubernetes. KubeDB provides a uniform declarative api to manage life-cycle of a datastore. Currently KubeDB includes support for following datastores: Elasticsearch, Postgres, MySQL, MongoDB, Redis and Memcached.',
      pic: kubedb,
      link: 'https://www.google.com',
    },
    {
      headline: 'Siren',
      text:
        'Siren is a team of enormously passionate data discovery and advanced search experts, scientists and engineers. They offer a unique combination of search, business intelligence, big graph and knowledge representation, which they define as Data Intelligence. With this concept Siren addresses some of the world’s most important problems.',
      pic: siren,
      link: 'https://www.google.com',
    },
  ];

  return (
    <div>
      <NavBar />
      <Title
        headline="company"
        text="Suspendisse potenti. Nunc imperdiet molestie elit, a auctor enim vestibulum rutrum. Aliquam non tempus elit. Mauris ut accumsan libero."
      />
      <div className="product-anchor-container">
        <div className="row">
          <div className="product-anchor-wrapper">
            <div className="product-anchor-item">
              <a href="#test" className="product-anchor-link">
                <img
                  src={arrowDown}
                  alt="arrow-down"
                  className="product-anchor-img"
                />
                mission
              </a>
            </div>
            <div className="product-anchor-item">
              <a href="" className="product-anchor-link">
                <img
                  src={arrowDown}
                  alt="arrow-down"
                  className="product-anchor-img"
                />
                management team
              </a>
            </div>
            <div className="product-anchor-item">
              <a href="" className="product-anchor-link">
                <img
                  src={arrowDown}
                  alt="arrow-down"
                  className="product-anchor-img"
                />
                partners
              </a>
            </div>
            <div className="product-anchor-item">
              <a href="" className="product-anchor-link">
                <img
                  src={arrowDown}
                  alt="arrow-down"
                  className="product-anchor-img"
                />
                integrators
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="company-team-wrapper">
        <div className="row">
          <div className="company-team-headline">Mangement team</div>
          {team.map(person => {
            return (
              <div className="col s6 m4 company-team-profile">
                <img src={person.pic} alt="icon" className="profile-pic" />
                <div className="profile-name">{person.name}</div>
                <div className="profile-position">{person.position}</div>
                <div className="profile-link">
                  <a href="www.linkedin.com" target="_blank">
                    <img src={iconIn} alt="icon" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="company-partners-wrapper">
        <div className="row">
          <div className="company-partners-headline">Partners</div>
          <div className="company-partners-pic-wrapper">
            <div className="col s12 m4 company-partners-pic">
              <img src={ref1} alt="icon" />{' '}
            </div>
            <div className="col s12 m4 company-partners-pic">
              <img src={ref2} alt="icon" />{' '}
            </div>
            <div className="col s12 m4 company-partners-pic">
              <img src={ref3} alt="icon" />{' '}
            </div>
          </div>
        </div>
      </div>
      <div className="company-integrators-wrapper">
        <div className="row company-integrators">
          <div className="company-integrators-headline">Integrators</div>
          {integrators.map(profile => {
            return (
              <div className="company-integrators-section">
                <div className="integrators-pic">
                  <img src={profile.pic} alt="logo" />
                </div>
                <div className="integrators-content">
                  <div className="integrators-content-headline">
                    {profile.headline}
                  </div>
                  <div className="integrators-content-text">{profile.text}</div>
                  <div className="integrators-content-button">
                    <Button text="visit website" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Cta
        headline="Free 60-day trial"
        text="Want to see how your company can benefit from our Compliance edition? Sign up to our 60-day trial, completely free of charge."
        ctaText="start free trial"
        icon={ctaIcon}
      />
      <PreFooter />
      <Footer />
    </div>
  );
};

export default Company;
