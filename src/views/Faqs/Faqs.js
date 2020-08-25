import React from 'react';
import { Helmet } from 'react-helmet';
import { HashLink as Anchor } from 'react-router-hash-link';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import PreFooter from '../../components/PreFooter/PreFooter';
import Cta from '../../components/Cta/Cta';
import Title from '../../components/Title/Title';
import envelope from '../../images/icon-envelope.svg';
import './Faqs.scss';
import sgLogo from "../../images/sg_dlic_small.png";

const faqItems = [
  {
    section: 'General',
    faq: [
      {
        question: 'What is Search Guard?',
        answer: `
          <p>
            Search Guard is an Enterprise Security Suite that encrypts and
            protects your data and data flows in the entire Elastic Stack,
            including Kibana, Logstash and Beats.
          </p>
        `,
        anchor: 'one',
      },
      {
        question: 'Who is using Search Guard?',
        answer: `
          <p>
            A wide variety of enterprises, from Fortune 500 companies to the
            most innovative start-ups around the world, are trusting in Search
            Guard to secure their environments. Our customers include leading
            companies from the finance, healthcare, telecommunications, big
            data, legal and aerospace sectors. We also work together with
            governmental agencies and provide security for scientific and
            educational institutions.
          </p>
        `,
        anchor: 'two',
      },
      {
        question: 'Is your code secure and audited?',
        answer: `
          <p>
            Yes, the complete code base of Search Guard is constantly audited
            for security issues by ourselves and independent security experts of
            our customers.
            <br />
            <br />
            Search Guard is also verified by CA Veracode. We use Veracode's
            patented static binary analysis technology that inspects software
            executables (compiled binaries or bytecode) for security flaws.
            Through advanced modeling, Veracode’s static engine detects flaws in
            the software's inputs and outputs that cannot be seen through
            penetration testing alone. Unlike source code review tools, this
            approach accurately detects issues in the core application and
            extends coverage to vulnerabilities found in 3rd party libraries,
            pre-packaged components, and code introduced by compiler or
            platform-specific interpretations.
          </p>
        `,
        anchor: 'three',
      },
    ],
  },
  {
    section: 'Support',
    faq: [
      {
        question: 'Do you offer support?',
        answer: `
          <p>
            Of course. We offer both free support for the 
            <a
              href="https://forum.search-guard.com/latest/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Search Guard community
            </a> 
            as well as paid support for our customers. As paying customer you
            get direct access to the core Search Guard developers and we also
            guarantee SLAs via our support portal.
          </p>
        `,
        anchor: 'four',
      },
      {
        question: 'Do you offer 24x7 support?',
        answer: `
          <p>
            Yes, we offer 24x7 support. Please get in contact with us to discuss
            a support plan that fits your requirements.
          </p>
        `,
        anchor: 'five',
      },
      {
        question: 'Do you offer Elastic Stack support?',
        answer: `
          <p>
            Yes, we offer support for the Elastic stack in collaboration with
            our authorized partners around the world. Please get in contact with
            us to discuss a support plan that fits your requirements.
          </p>
        `,
        anchor: 'six',
      },
    ],
  },
  {
    section: 'Features',
    faq: [
      {
        question: 'Does Search Guard support feature XYZ?',
        answer: `
          <p>
            Please refer to our feature matrix for an overview of our features.
            If you are missing a feature for your specific use case, please get
            in contact with us. We work closely together with our customers to
            make sure Search Guard meets their needs.
          </p>
        `,
        anchor: 'seven',
      },
      {
        question: 'Does Search Guard offer Alerting?',
        answer: `
          <p>
            Yes, we are offering alerting capabilities via our Signals for
            Elasticsearch plugin. Signals is included in any Enterprise license
            subscription and offers a free community as well.
          </p>
        `,
        anchor: 'eight',
      },
      {
        question: 'Does Search Guard offer Machine Learning?',
        answer: `<p>Not yet, but we are working on it.</p>`,
        anchor: 'nine',
      },
    ],
  },
  {
    section: 'Licensing model',
    faq: [
      {
        question: 'What is your licensing model?',
        answer: `
          <p>
            Search Guard is dual licensed. All basic security features in the
            Community Edition are free, while you need to obtain a license in
            order to use the Enterprise or Compliance Edition in production.
            <br /> We license Search Guard per production cluster, not number of
            nodes. The regular license has no limits regarding the number of
            nodes, so you can scale your cluster indefinitely without additional
            costs. All other systems, like development, staging, integration,
            test and the like are included in the license. Scale your cluster,
            not your cost!
            <br />
            We also offer discounted licenses for small installations with 5
            nodes or less. Get <a href="/contacts/">in contact with us</a> and
            we will work out a licensing model that fits your needs.
          </p>
        `,
        anchor: 'ten',
      },
      {
        question: 'My company is non-profit, do you offer any discounts?',
        answer: `
          <p>
            Absolutely. We want to give back to education and science and
            provide special discounts and free licenses for eligible
            institutions. <a href="/contacts/">Get in touch with us</a> to learn
            more about our education & scientific licensing.
          </p>
        `,
        anchor: 'eleven',
      },
    ],
  },
  {
    section: 'Compatibility',
    faq: [
      {
        question: 'Is Search Guard compatible with the complete Elastic Stack?',
        answer: `
          <p>
            Yes, Search Guard is compatible with the complete Elastic stack and
            can be used to secure Elasticseach, Kibana, Logstash and Beats. We
            are also compatible with the Elastic subscription based features
            like monitoring, alerting and machine learning.
          </p>
        `,
        anchor: 'twelve',
      },
      {
        question: 'Is Search Guard compatible with tool  XYZ?',
        answer: `
          <p>
            Search Guard is compatible with most third party plugins and tools,
            including Grafana, Cerebro and fluentd.
          </p>
        `,
        anchor: 'thirteen',
      },
    ],
  },
  {
    section: 'Getting started',
    faq: [
      {
        question: 'What is the easiest way to set up a PoC?',
        answer: `
          <p>
            The easiest way to set up a PoC and try out all Search Guard
            features is to use the Search Guard Demo Installer:
            <br />
            <br />
            <a
              href="https://docs.search-guard.com/latest/demo-installer"
              target="_blank"
              rel="noopener noreferrer"
            >
              Search Guard Demo Installer
            </a>
            <br />
            <br />
            The installer comes with a trial license that enables all Enterprise
            and Compliance features for 60 days. If you need to extend your
            Search Guard trial, just 
            <a href="/contacts/">get in contact with us</a> and we’re happy to
            provide you with an extended license.
          </p>
        `,
        anchor: 'fourteen',
      },
    ],
  },
  {
    section: 'Search Guard in production',
    faq: [
      {
        question: 'Can I run Search Guard on Kubernetes?',
        answer: `
          <p>
            Absolutely. We provide 
            <a
              href="https://docs.search-guard.com/latest/search-guard-kubernetes-helm"
              target="_blank"
              rel="noopener noreferrer"
            >
              K8s helm charts
            </a>
            for Kubernetes and also work on a Kubernetes operator.
          </p>
        `,
        anchor: 'fifteen',
      },
    ],
  },
];

const Faqs = () => {

    var htmlTags = /(<([^>]+)>)/ig;
    var newlines = /(\r\n|\n|\r)/gm;
    var whitespaces = /  +/g;
    let jsonld = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": []
    };

    faqItems.map(category => {
        category.faq.map(faqItem => {
           let faqLd = {
               "@type": "Question"
           };

           faqLd["name"] = faqItem.question;

           let answer = {
                "@type": "Answer"
           };

           answer["text"] = faqItem.answer.toString().replace(htmlTags, "").replace(newlines, "").replace(whitespaces, "");
            faqLd["acceptedAnswer"] = answer;
            jsonld.mainEntity.push(faqLd);
        });
    })
    return (
    <PageWrapper>
      <Helmet>
        <html lang="en" itemScope itemType="https://schema.org/FAQPage" />
        <meta charSet="utf-8" />
        <title>
          Frequently asked questions | Search Guard | Security for Elasticsearch
        </title>
        <link rel="canonical" href="https://search-guard.com/faq/" />
        <meta
          name="description"
          content="Find answers to frequently asked questions about Search Guard, the rock-solid and battle proven security suite for Elasticsearch."
        />
      </Helmet>
      <Title
        headline="Frequently asked questions"
        text="Find answers to the most frequently asked questions about Search Guard and Signals."
      />
      <div className="row faq-row-wrapper">
        <div className="col s12 l4">
          {faqItems.map(category => {
            return (
              <div className="faq-question-section">
                <div className="faq-question-headline">{category.section}</div>
                {category.faq.map(faq => {
                  return (
                    <div className="faq-question-text">
                      <Anchor to={`/faq/#${faq.anchor}`}>{faq.question}</Anchor>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="col s12 l7 offset-l1 faq-answer-wrapper">
          {faqItems.map(category => {
            return (
              <div className="faq-answer-section">
                <div className="faq-answer-section-headline">
                  {category.section}
                </div>
                {category.faq.map(faq => {
                  return (
                    <div
                      id={`${faq.anchor}`}
                      itemScope
                      itemProp="mainEntity"
                      itemType="https://schema.org/Question"
                    >
                      <div
                        className={`faq-answer-headline ${faq.paddingClass}`}
                        itemProp="name"
                      >
                        {faq.question}
                      </div>
                      <div
                        itemScope
                        itemProp="acceptedAnswer"
                        itemType="https://schema.org/Answer"
                      >
                        <div className="faq-answer-text" itemProp="text" dangerouslySetInnerHTML={ {__html: faq.answer} }></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <Cta
        headline="Can’t find what you’re looking for?"
        text="No worries, maybe we can help you find the answer."
        ctaText="contact us"
        icon={envelope}
        link="/contacts/"
      />
      <PreFooter />
    </PageWrapper>
  );
};

export default Faqs;
