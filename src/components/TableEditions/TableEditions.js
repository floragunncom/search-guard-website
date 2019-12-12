import React from 'react';
import './TableEditions.scss';
import compliance from '../../images/checkmark-red.svg';
import enterprise from '../../images/checkmark-green.svg';
import community from '../../images/checkmark-gold.svg';

const TableEditions = () => {
  const matrixContent = [
    {
      name: 'Encryption',
      content: [
        {
          type: 'REST encryption',
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'Inter-node encryption',
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'PEM and JKS support',
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'OpenSLL support',
          community: true,
          enterprise: true,
          compliance: true,
        },
      ],
    },
    {
      name: 'Access control',
      content: [
        {
          type: 'Role-based access control',
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'Transport- and HTTP access control',
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'Cluster-level access control',
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'Index-level access control',
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'Document-level access control',
          community: false,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'Field-level access control',
          community: false,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'Field anonymization',
          community: false,
          enterprise: false,
          compliance: true,
        },
        {
          type: 'Immutable indices',
          community: false,
          enterprise: false,
          compliance: true,
        },
      ],
    },
    {
      name: 'Authentication',
      content: [
        {
          type: 'Internal user management',
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'HTTP Basic authentication',
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'PKI authentication',
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'Proxy authentication',
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'LDAP / Active Directory',
          community: false,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'Kerberos / SPNEGO',
          community: false,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'JSON web tokens',
          community: false,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'OpenID Connect',
          community: false,
          enterprise: true,
          compliance: true,
        },
        { type: 'SAML', community: false, enterprise: true, compliance: true },
        {
          type: 'Custom implementations',
          community: false,
          enterprise: true,
          compliance: true,
        },
      ],
    },
    {
      name: 'Authorization',
      content: [
        {
          type: 'Internal group managemet',
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'Proxy headers',
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'LDAP / Active Directory',
          community: false,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'JSON web tokens',
          community: false,
          enterprise: true,
          compliance: true,
        },
        { type: 'SAML', community: false, enterprise: true, compliance: true },
      ],
    },
    {
      name: 'Audit logging and compliance',
      content: [
        {
          type: 'Security audit logging',
          community: false,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'Read-access audit logging',
          community: false,
          enterprise: false,
          compliance: true,
        },
        {
          type: 'Write-access audit logging',
          community: false,
          enterprise: false,
          compliance: true,
        },
        {
          type: 'Configuration change tracking',
          community: false,
          enterprise: false,
          compliance: true,
        },
        {
          type: 'System change tracking',
          community: false,
          enterprise: false,
          compliance: true,
        },
      ],
    },
    {
      name: 'Alerting',
      content: [
        {
          type: 'Elasticsearch data sources',
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'External data sources',
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'Escalation levels',
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'Throttling and Acknowledgement',
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'Email, Slack and Webhook actions',
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'PagerDuty action',
          community: false,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'JIRA action',
          community: false,
          enterprise: true,
          compliance: true,
        },
      ],
    },
    {
      name: 'Configuration',
      content: [
        {
          type: 'No cluster reboot',
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'REST management API',
          community: false,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'Configuration GUI',
          community: false,
          enterprise: true,
          compliance: true,
        },
      ],
    },
    {
      name: 'Kibana',
      content: [
        {
          type: 'Kibana access control',
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'Kibana feature control',
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'Single Sign On',
          community: false,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'Multi tenancy',
          community: false,
          enterprise: true,
          compliance: true,
        },
      ],
    },
    {
      name: 'Compatibility',
      content: [
        {
          type: 'Kibana, logstash and beats',
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'Cross-cluster search',
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'Cross-cluster replication',
          community: true,
          enterprise: true,
          compliance: true,
        },
        { type: 'SIEM', community: true, enterprise: true, compliance: true },
        {
          type: 'Elastic Stack Monitoring',
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'Elastic Stack Alerting',
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: 'Elastic Stack Machine Learning',
          community: true,
          enterprise: true,
          compliance: true,
        },
      ],
    },
    {
      name: 'Certifications',
      content: [
        {
          type: 'CA Veracode Verified',
          community: true,
          enterprise: true,
          compliance: true,
        },
      ],
    },
  ];

  return (
    <div className="licensing-table-wrapper">
      <table className="centered highlight hide-on-med-and-down">
        <thead className="licensing-table-head">
          <tr>
            <th>
              <div className="licensing-table-left">feature</div>
            </th>
            <th>community edition</th>
            <th>enterprise edition</th>
            <th>Compliance edition</th>
          </tr>
        </thead>
        {matrixContent.map(service => {
          return (
            <tbody className="licensing-table-body">
              <tr style={{ backgroundColor: '#E8ECED' }}>
                <td>
                  <div className="licensing-table-subheadline">
                    {service.name}
                  </div>
                </td>
                <td />
                <td />
                <td />
              </tr>
              {service.content.map(serviceItem => {
                return (
                  <tr>
                    <td>
                      <div
                        className="licensing-table-left"
                        data-position="right"
                      >
                        {serviceItem.type}
                      </div>
                    </td>
                    {serviceItem.community ? (
                      <td className="licensing-checkmark">
                        <img src={community} alt="checkmark icon" />
                      </td>
                    ) : (
                      <td />
                    )}
                    {serviceItem.enterprise ? (
                      <td className="licensing-checkmark">
                        <img src={enterprise} alt="checkmark icon" />
                      </td>
                    ) : (
                      <td />
                    )}
                    {serviceItem.compliance ? (
                      <td className="licensing-checkmark">
                        <img src={compliance} alt="checkmark icon" />
                      </td>
                    ) : (
                      <td />
                    )}
                  </tr>
                );
              })}
            </tbody>
          );
        })}
      </table>

      <div className="row hide-on-large-only">
        <div className="licensing-overview-headline">Community Edition</div>
        {matrixContent.map(service => {
          return (
            <div className="col s12 m6 licensing-overview-content">
              <div className="licensing-overview-content-box">
                <div className="licensing-overview-content-headline">
                  {service.name}
                </div>
                {service.content.map(serviceItem => {
                  return (
                    <div className="licensing-overview-content-text">
                      {serviceItem.community ? serviceItem.type : null}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="row hide-on-large-only">
        <div className="licensing-overview-headline">Enterprise Edition</div>
        {matrixContent.map(service => {
          return (
            <div className="col s12 m6 licensing-overview-content">
              <div className="licensing-overview-content-box">
                <div className="licensing-overview-content-headline">
                  {service.name}
                </div>
                {service.content.map(serviceItem => {
                  return (
                    <div className="licensing-overview-content-text">
                      {serviceItem.enterprise ? serviceItem.type : null}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="row hide-on-large-only">
        <div className="licensing-overview-headline">Compliance Edition</div>
        {matrixContent.map(service => {
          return (
            <div className="col s12 m6 licensing-overview-content">
              <div className="licensing-overview-content-box">
                <div className="licensing-overview-content-headline">
                  {service.name}
                </div>
                {service.content.map(serviceItem => {
                  return (
                    <div className="licensing-overview-content-text">
                      {serviceItem.compliance ? serviceItem.type : null}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TableEditions;
