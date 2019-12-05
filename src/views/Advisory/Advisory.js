import React from 'react';
import './Advisory.scss';
import { Helmet } from 'react-helmet';
import NavBar from '../../components/NavBar/NavBar';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import Cta from '../../components/Cta/Cta';
import Footer from '../../components/Footer/Footer';
import folderGlass from '../../images/folder-glass.svg';

const Advisory = () => {
  const bugs = [
    {
      id: 'SGSA 16',
      cve: (
        <div>
          <a
            href="https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-13416"
            target="_blank"
            rel="noopener noreferrer"
          >
            CVE-2019-13416
          </a>
          <br />
          <br />
          <a
            href="https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-13415"
            target="_blank"
            rel="noopener noreferrer"
          >
            CVE-2019-13415
          </a>
        </div>
      ),
      date: '2019-03-19',
      vul:
        'When Cross Cluster Search (CCS) is enabled, authenticated users can gain read access to data they are not authorized to see',
      rem: 'Update',
      fix: '6.x-24.3',
      report: 'floragunn',
    },
    {
      id: 'SGSA 15',
      cve: (
        <div>
          <a
            href="https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-13417"
            target="_blank"
            rel="noopener noreferrer"
          >
            CVE-2019-13417
          </a>
        </div>
      ),
      date: '2018-12-13',
      vul:
        'Field caps and mapping API leak field names (not values) for fields which are not allowed for the user because FLS was activated',
      rem: 'Update',
      fix: '6.x-24.0',
      report: 'floragunn',
    },
    {
      id: 'SGSA 14',
      cve: (
        <div>
          <a
            href="https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-13418"
            target="_blank"
            rel="noopener noreferrer"
          >
            CVE-2019-13418
          </a>
        </div>
      ),
      date: '2018-12-13',
      vul: 'Values of string arrays in data are not properly anonymized',
      rem: 'Update',
      fix: '6.x-24.0',
      report: 'floragunn',
    },
    {
      id: 'SGSA 13',
      cve: (
        <div>
          <a
            href="https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-20698"
            target="_blank"
            rel="noopener noreferrer"
          >
            CVE-2018-20698
          </a>
        </div>
      ),
      date: '2018-03-19',
      vul: 'Possible URL injection on login page when basePath is set',
      rem: 'Update',
      fix: 'Kibana plugin 6.x-16',
      report: 'floragunn',
    },
    {
      id: 'SGSA 12',
      cve: (
        <div>
          <a
            href="https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-13421"
            target="_blank"
            rel="noopener noreferrer"
          >
            CVE-2019-13421
          </a>
          <br />
          <br />
          SYSS-2018-025
        </div>
      ),
      date: '2018-08-24',
      vul: 'REST API leak password hashes (not cleartext) for users endpoint',
      rem: 'Update',
      fix: '6.x-23.1',
      report: 'Thorsten Lutz, SySS GmbH',
    },
    {
      id: 'SGSA 11',
      cve: (
        <div>
          <a
            href="https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-13419"
            target="_blank"
            rel="noopener noreferrer"
          >
            CVE-2019-13419
          </a>
        </div>
      ),
      date: '2018-09-14',
      vul:
        'For aggregations, clear text values of anonymised fields were leaked',
      rem: 'Update',
      fix: '6.x-23.1',
      report: 'floragunn',
    },
    {
      id: 'SGSA 10',
      cve: (
        <div>
          <a
            href="https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-CVE-2019-13420"
            target="_blank"
            rel="noopener noreferrer"
          >
            CVE-2019-13420
          </a>
        </div>
      ),
      date: '2018-01-18',
      vul: 'Password dependent timing side channel in AuthCredentials',
      rem: 'Update',
      fix: '6.x-21.0',
      report: '@madblobfish',
    },
    {
      id: 'SGSA 9',
      cve: (
        <div>
          <a
            href="https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-13423"
            target="_blank"
            rel="noopener noreferrer"
          >
            CVE-2019-13423
          </a>
        </div>
      ),
      date: '2018-04-09',
      vul:
        'A Kibana user could impersonate as kibanaserver user when providing wrong credentials',
      rem: 'Update',
      fix: 'Kibana Plugin 5.6.8-7 and Kibana Plugin 6.x-12',
      report: 'Guy Moller',
    },
    {
      id: 'SGSA 8',
      cve: (
        <div>
          <a
            href="https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-13422"
            target="_blank"
            rel="noopener noreferrer"
          >
            CVE-2019-13422
          </a>
        </div>
      ),
      date: '2018-04-04',
      vul: 'Redirect and XSS vulnerability in Kibana plugin',
      rem: 'Update',
      fix: 'Kibana Plugin 5.6.8-7 and Kibana Plugin 6.x-12',
      report: 'Vineet Kumar',
    },
    {
      id: 'SGSA 7',
      cve: 'n/a',
      date: '2017-08-10',
      vul:
        'DLS/FLS leaking information when multitenancy module is installed and “do not fail on forbidden” is activated',
      rem: 'Update or deactivate “do not fail on forbidden”',
      fix: 'SG v15',
      report: 'Guy Moller',
    },
    {
      id: 'SGSA 6',
      cve: 'n/a',
      date: '2017-02-13',
      vul: 'FLS/DLS not working for regex index patterns',
      rem: 'Update or avoid regex patterns',
      fix: 'SG v11 and DLS/FLS module v6',
      report: 'Guy Moller',
    },
    {
      id: 'SGSA 5',
      cve: 'n/a',
      date: '2017-01-13',
      vul: 'Auditlog does not log all security relevant events',
      rem: 'Update',
      fix: 'SG V10',
      report: 'Guy Moller',
    },
    {
      id: 'SGSA 4',
      cve: 'n/a',
      date: '2017-01-05',
      vul: 'FLS/DLS not working for index patterns',
      rem: 'Update',
      fix: 'SG v10 and DLS/FLS module v5',
      report: 'Matej Zerovnik',
    },
    {
      id: 'SGSA 3',
      cve: 'n/a',
      date: '2016-11-27',
      vul: 'Wrong permissions resolution for certain index/type combinations',
      rem: 'Update',
      fix: '6.x-23.1',
      report: 'Lucas Bremgartner',
    },
    {
      id: 'SGSA 2',
      cve: 'n/a',
      date: '2016-11-25',
      vul: 'DLS not picked up when getting documents by ID',
      rem: 'Update',
      fix: 'SG v9 and DLS/FLS module v5',
      report: 'Fabio Corneti',
    },
    {
      id: 'SGSA 1',
      cve: 'n/a',
      date: '2016-07-28',
      vul: 'Authentication cache lead to password hashcode vulnerability',
      rem: 'Update',
      fix: 'SG V4',
      report: 'Vladimir Gordiychuk',
    },
  ];

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>CVE - advisory - Search Guard</title>
        <meta
          name="description"
          content="Search Guard is an Open Source security plugin for Elasticsearch and the entire ELK stack. Search Guard offers encryption, authentification, authorization, audit logging, multitenancy and compliance features (for regulations like GDPR, HIPAA, PCI DSS or SOX)."
        />
      </Helmet>
      <NavBar />
      <Title
        headline="cve advisory"
        text="floragunn GmbH is the official CVE numbering authority for Search Guard. Any security related issue is published here."
      />
      <div className="row advisory-wrapper">
        <div className="col s12 l8 offset-l2 advisory-info-wrapper">
          <div className="advisory-info-headline">
            About Search Guard Security Advisories
          </div>
          <div className="advisory-info-text">
            An Search Guard Security Advisory (“SGSA”) is a notice from Search
            Guard/floragunn GmbH to its users of security issues with the Search
            Guard products. Search Guard/floragunn assigns both a{' '}
            <a href="/">CVE</a> and an SGSA identifier to each advisory along
            with a summary and remediation and mitigation details.
            <br />
            <br />
            For how to report a security issue please see{' '}
            <a href="/disclosure-policy">Disclosure Policy</a>.
          </div>
        </div>
        <div className="col s12 advisory-table-wrapper">
          <table className="stripped bordered">
            <thead className="advisory-table-head">
              <tr>
                <th className="advisory-table-first">
                  SGSA ID (formerly SGSA)
                </th>
                <th className="advisory-table-second">CVE</th>
                <th>date disclosed</th>
                <th>Vulnerability Summary</th>
                <th>Remediation Summary</th>
                <th>fixed with</th>
                <th>reported by</th>
              </tr>
            </thead>
            <tbody className="advisory-table-body">
              {bugs.map(row => {
                return (
                  <tr className="advisory-table-row">
                    <td>{row.id}</td>
                    <td>{row.cve}</td>
                    <td>{row.date}</td>
                    <td>{row.vul}</td>
                    <td>{row.rem}</td>
                    <td>{row.fix}</td>
                    <td>{row.report}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Cta
        headline="Search Guard Security Information"
        text="Access public keys, CVE advisory and disclosure policy."
        ctaText="see security information"
        icon={folderGlass}
        link="/security/"
      />
      <PreFooter />
      <Footer />
    </div>
  );
};

export default Advisory;
