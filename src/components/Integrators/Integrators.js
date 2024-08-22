import React from 'react';
import sieMonster from '../../images/sie-monster.svg';
import pivotal from '../../images/pivotal.svg';
import wuerthPhoenix from '../../images/wuerth-phoenix.svg';
import redHat from '../../images/redHatNew.svg';
import objectRocket from '../../images/objectRocket.svg';
import mitratech from '../../images/mitratech.svg';
import siren from '../../images/siren.svg';
import kubedb from '../../images/kubedb.svg';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import './Integrators.scss';

const Integrators = () => {
  const integrators = [
    {
      headline: 'Red Hat® OpenShift',
      text:
        'Red Hat® OpenShift is a container application platform that brings docker and Kubernetes to the enterprise. OpenShift includes Kubernetes for container orchestration and management.',
      pic: redHat,
      link: 'https://www.redhat.com',
    },
    {
      headline: 'ObjectRocket',
      text:
        'ObjectRocket uses Search Guard to secure their next-generation Kubernetes-based managed Elasticsearch service.',
      pic: objectRocket,
      link: 'https://www.objectrocket.com/managed-elasticsearch/',
    },
    {
      headline: 'Würth Phoenix',
      text:
        'Würth Phoenix is a software company belonging to the Würth-Group, world market leader in the trade of assembly and fastening materials, offering business software for ERP, CRM and IT System Management. With its Unified monitoring solution NetEye, the company developed a best-of-breed approach of tried-and-trusted open source tools with external cloud applications that can be monitored just easily as services in data centers or hybrid services. ',
      pic: wuerthPhoenix,
      link: 'https://wuerth-phoenix.com/en/',
    },
    {
      headline: 'Pivotal Cloud Foundry',
      text:
        'Pivotal Cloud Foundry (PCF) is the proven solution for companies seeking software-led digital transformation. The platform enables the continuous delivery of any app to every cloud empowering developers to be more productive and operators to be more efficient—accelerating feature delivery and deployment across clouds without downtime. Altoros Elasticsearch for PCF abstracts away the complexity of deploying and scaling a real-time distributed document store, search and analytics service. The integration deploys an enterprise-ready Elasticsearch cluster that can be shared among multiple PCF users.',
      pic: pivotal,
      link: 'https://pivotal.io/platform',
    },
    {
      headline: 'SIEMonster',
      text:
        'SIEMonster is a turnkey, open source, Enterprise grade Security Information and Event Management (SIEM), built on scalable, non-licensed components, fully documented and developed by the community and SIEMonster team. The product is free, fully documented, and there are no data or node limitations.',
      pic: sieMonster,
      link: 'https://siemonster.com/',
    },
    {
      headline: 'Mitratech TeamConnect',
      text:
        'The TeamConnect Enterprise Legal Management (ELM) platform consistently meets the complex operational needs of large, global legal departments. Whether your staff is managing litigation, contracts, intellectual property, product claims, compliance matters, or legal team projects, TeamConnect offers a market-proven, unified approach to managing all legal operations. With a completely redesigned interface and optimised user experience, TeamConnect is a solution your legal team will want to use.',
      pic: mitratech,
      link: 'https://www.mitratech.com/',
    },
    {
      headline: 'KubeDB by AppsCode',
      text:
        'KubeDB by AppsCode makes it easy to run production-grade databases on Kubernetes. KubeDB provides a uniform declarative api to manage life-cycle of a datastore. Currently KubeDB includes support for following datastores: Elasticsearch, Postgres, MySQL, MongoDB, Redis and Memcached.',
      pic: kubedb,
      link: 'https://kubedb.com/',
    },
    {
      headline: 'Siren',
      text:
        'Siren is a team of enormously passionate data discovery and advanced search experts, scientists and engineers. They offer a unique combination of search, business intelligence, big graph and knowledge representation, which they define as Data Intelligence. With this concept Siren addresses some of the world’s most important problems.',
      pic: siren,
      link: 'https://siren.io',
    },
  ];

  const responsiveCarouselBreakpoints= {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 4,
      partialVisibilityGutter: 180
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0
      },
      items: 2,
      partialVisibilityGutter: 30
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464
      },
      items: 2,
      partialVisibilityGutter: 30
    }
  };

  return (
    <div className="company-integrators-wrapper" id="integrators">
      <div className="row company-integrators">
        <h4 className="company-integrators-headline">Integrators</h4>

        <Carousel
            additionalTransfrom={0}
            arrows={false}
            autoPlay
            autoPlaySpeed={2000}
            centerMode={false}
            className=""
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover={false}
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={responsiveCarouselBreakpoints}
            showDots={false}
            slidesToSlide={2}
        >

        {integrators.map((profile, index) => {
          return (
              <div className="col s12 m6 l4" key={index}>
                <div className="">
                  <img loading="lazy" src={profile.pic} alt={profile.headline} width="165px" height="165px" />
                </div>
              </div>
          );
        })}

        </Carousel>
      </div>
    </div>
  );
};

export default Integrators;
