import React from 'react';
import { useTranslation } from 'react-i18next';
// Single checkmark style for every column ("included"); an em-dash marks
// "not included". Both carry accessible labels.
import checkmark from '../../images/checkmark-green.svg';

const FeatureBreakdown = () => {
  const { t } = useTranslation('license');

  const matrixContent = [
    {
      name: t('featureBreakdown.encryption.name'),
      content: [
        {
          type: t('featureBreakdown.encryption.rest'),
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.encryption.internode'),
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.encryption.pem'),
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.encryption.openssl'),
          community: true,
          enterprise: true,
          compliance: true,
        },
      ],
    },
    {
      name: t('featureBreakdown.accessControl.name'),
      content: [
        {
          type: t('featureBreakdown.accessControl.role'),
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.accessControl.transport'),
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.accessControl.cluster'),
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.accessControl.index'),
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.accessControl.document'),
          community: false,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.accessControl.field'),
          community: false,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.accessControl.anonymization'),
          community: false,
          enterprise: false,
          compliance: true,
        },
        {
          type: t('featureBreakdown.accessControl.immutable'),
          community: false,
          enterprise: false,
          compliance: true,
        },
      ],
    },
    {
      name: t('featureBreakdown.authentication.name'),
      content: [
        {
          type: t('featureBreakdown.authentication.internal'),
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.authentication.basic'),
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.authentication.pki'),
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.authentication.proxy'),
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.authentication.ldap'),
          community: false,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.authentication.kerberos'),
          community: false,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.authentication.jwt'),
          community: false,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.authentication.oidc'),
          community: false,
          enterprise: true,
          compliance: true,
        },
        { type: t('featureBreakdown.authentication.saml'), community: false, enterprise: true, compliance: true },
        {
          type: t('featureBreakdown.authentication.custom'),
          community: false,
          enterprise: true,
          compliance: true,
        },
      ],
    },
    {
      name: t('featureBreakdown.authorization.name'),
      content: [
        {
          type: t('featureBreakdown.authorization.internal'),
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.authorization.proxy'),
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.authorization.ldap'),
          community: false,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.authorization.jwt'),
          community: false,
          enterprise: true,
          compliance: true,
        },
        { type: t('featureBreakdown.authorization.saml'), community: false, enterprise: true, compliance: true },
      ],
    },
    {
      name: t('featureBreakdown.audit.name'),
      content: [
        {
          type: t('featureBreakdown.audit.security'),
          community: false,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.audit.read'),
          community: false,
          enterprise: false,
          compliance: true,
        },
        {
          type: t('featureBreakdown.audit.write'),
          community: false,
          enterprise: false,
          compliance: true,
        },
        {
          type: t('featureBreakdown.audit.configChange'),
          community: false,
          enterprise: false,
          compliance: true,
        },
        {
          type: t('featureBreakdown.audit.systemChange'),
          community: false,
          enterprise: false,
          compliance: true,
        },
      ],
    },
    {
      name: t('featureBreakdown.alerting.name'),
      content: [
        {
          type: t('featureBreakdown.alerting.elasticsearch'),
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.alerting.external'),
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.alerting.escalation'),
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.alerting.throttling'),
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.alerting.emailSlack'),
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.alerting.pagerduty'),
          community: false,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.alerting.jira'),
          community: false,
          enterprise: true,
          compliance: true,
        },
      ],
    },
    {
      name: t('featureBreakdown.configuration.name'),
      content: [
        {
          type: t('featureBreakdown.configuration.noReboot'),
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.configuration.restApi'),
          community: false,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.configuration.gui'),
          community: false,
          enterprise: true,
          compliance: true,
        },
      ],
    },
    {
      name: t('featureBreakdown.kibana.name'),
      content: [
        {
          type: t('featureBreakdown.kibana.accessControl'),
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.kibana.featureControl'),
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.kibana.sso'),
          community: false,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.kibana.multiTenancy'),
          community: false,
          enterprise: true,
          compliance: true,
        },
      ],
    },
    {
      name: t('featureBreakdown.compatibility.name'),
      content: [
        {
          type: t('featureBreakdown.compatibility.kibanaLogstash'),
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.compatibility.crossClusterSearch'),
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.compatibility.crossClusterReplication'),
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.compatibility.monitoring'),
          community: true,
          enterprise: true,
          compliance: true,
        },
        {
          type: t('featureBreakdown.compatibility.machineLearning'),
          community: true,
          enterprise: true,
          compliance: true,
        },
      ],
    },
  ];

  return (
    <div className="licensing-table-wrapper">
      <table className="centered highlight">
        <thead className="licensing-table-head">
          <tr>
            <th>
              <div className="licensing-table-left">{t('featureBreakdown.column.feature')}</div>
            </th>
            <th>{t('featureBreakdown.column.community')}</th>
            <th>{t('featureBreakdown.column.enterprise')}</th>
            <th>{t('featureBreakdown.column.compliance')}</th>
          </tr>
        </thead>
        {matrixContent.map(service => {
          return (
            <tbody className="licensing-table-body" key={service.name}>
              <tr className="licensing-table-row-heading">
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
                  <tr key={serviceItem.type}>
                    <td>
                      <div
                        className="licensing-table-left"
                        data-position="right"
                      >
                        {serviceItem.type}
                      </div>
                    </td>
                    {[serviceItem.community, serviceItem.enterprise, serviceItem.compliance].map(
                      (included, columnIndex) =>
                        included ? (
                          <td className="licensing-checkmark" key={columnIndex}>
                            <img
                              loading="lazy"
                              src={checkmark}
                              alt={t('featureBreakdown.included')}
                              width="12px"
                              height="12px"
                            />
                          </td>
                        ) : (
                          <td className="licensing-not-included" key={columnIndex}>
                            <span aria-label={t('featureBreakdown.notIncluded')} role="img">
                              &ndash;
                            </span>
                          </td>
                        )
                    )}
                  </tr>
                );
              })}
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default FeatureBreakdown;
