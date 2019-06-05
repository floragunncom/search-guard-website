import React from 'react';
import './Advisory.scss';
import NavBar from '../../components/NavBar/NavBar';
import Title from '../../components/Title/Title';
import PreFooter from '../../components/PreFooter/PreFooter';
import Cta from '../../components/Cta/Cta';
import Footer from '../../components/Footer/Footer';
import folderGlass from '../../images/folder-glass.svg';

const Advisory = () => {
  const bugs = [
    {
      id: 'SISG 16',
      cve: '',
      date: '2019-03-19',
      vul:
        'When Cross Cluster Search (CCS) is enabled, authenticated users can gain read access to data they are not authorized to see',
      rem: 'Update',
      fix: '6.x-24.3',
      report: 'floragunn',
    },
    {
      id: 'SISG 15',
      cve: '',
      date: '2018-12-13',
      vul:
        'Field caps and mapping API leak field names (not values) for fields which are not allowed for the user because FLS was activated',
      rem: 'Update',
      fix: '6.x-24.0',
      report: 'floragunn',
    },
    {
      id: 'SISG 14',
      cve: '',
      date: '2018-12-13',
      vul: 'Values of string arrays in data are not properly anonymized',
      rem: 'Update',
      fix: '6.x-24.0',
      report: 'floragunn',
    },
    {
      id: 'SISG 13',
      cve: '',
      date: '2019-03-19',
      vul: 'Possible URL injection on login page when basePath is set',
      rem: 'Update',
      fix: 'Kibana plugin 6.x-16',
      report: 'floragunn',
    },
    {
      id: 'SISG 12',
      cve: 'SYSS-2018-025',
      date: '2018-08-24',
      vul: 'REST API leak password hashes (not cleartext) for users endpoint',
      rem: 'Update',
      fix: '6.x-23.1',
      report: 'Thorsten Lutz, SySS GmbH',
    },
  ];

  return (
    <div>
      <NavBar />
      <Title
        headline="cve advisory"
        text="Suspendisse potenti. Nunc imperdiet molestie elit, a auctor enim vestibulum rutrum. Aliquam non tempus elit. Mauris ut accumsan libero."
      />
      <div className="row advisory-wrapper">
        <div className="col s12 l8 offset-l2 advisory-info-wrapper">
          <div className="advisory-info-headline">
            About Search Guard Security Advisories
          </div>
          <div className="advisory-info-text">
            An Search Guard Security Advisory (“SGSA”) is a notice from Search
            Guard/floragunn GmbH to its users of security issues with the Search
            Guard products. Search Guard/floragunn assigns both a <a href="/">CVE</a> and an
            SGSA identifier to each advisory along with a summary and
            remediation and mitigation details.
            <br /><br />
            For how to report a security issue please see <a href="/">Disclosure Policy</a>.
          </div>
        </div>
        <div className="col s12 advisory-table-wrapper">
          <table className="stripped bordered">
            <thead className="advisory-table-head">
              <tr>
                <th className="advisory-table-first">SGSA ID (formerly SISG)</th>
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
        link={'/security'}
      />
      <PreFooter />
      <Footer />
    </div>
  );
};

export default Advisory;
