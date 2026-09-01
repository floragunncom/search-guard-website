import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '../../i18n/useLocalizedPath';
import Button from '../Button/Button';
import { Badge } from '../Badge/Badge';
import checkmark from '../../images/checkmark-green.svg';

// Feature table redesign (redesign/feature-table-implementation-instructions.md):
// Block A lists everything included in every edition; the matrix below only
// contains rows where editions differ (plus the deliberate Community-forum
// exception). Inclusion semantics are copied 1:1 from the previous 51-row
// matrix — the restructure moves rows, it does not re-tier features.

// Documentation links — every URL verified against the live docs sitemap
// (docs.search-guard.com/latest/sitemap.xml); never guess slugs. Rows without
// an entry here have no dedicated docs page (custom backends, Kibana SSO) or
// are a service rather than a documented feature (SLA support). The forum row
// links to the forum itself. configuration-integrity covers both change-
// tracking rows (its content: Search Guard config tracking + Elasticsearch
// configuration monitoring).
const DOCS = {
  ldap: 'https://docs.search-guard.com/latest/active-directory-ldap',
  kerberos: 'https://docs.search-guard.com/latest/kerberos-spnego',
  jwt: 'https://docs.search-guard.com/latest/kibana-authentication-jwt',
  oidc: 'https://docs.search-guard.com/latest/kibana-authentication-openid-overview',
  saml: 'https://docs.search-guard.com/latest/kibana-authentication-saml-overview',
  dls: 'https://docs.search-guard.com/latest/document-level-security',
  fls: 'https://docs.search-guard.com/latest/field-level-security',
  multiTenancy: 'https://docs.search-guard.com/latest/kibana-multi-tenancy',
  anonymization: 'https://docs.search-guard.com/latest/field-anonymization',
  immutable: 'https://docs.search-guard.com/latest/immutable-indices',
  auditSecurity: 'https://docs.search-guard.com/latest/audit-logging-compliance',
  auditRead: 'https://docs.search-guard.com/latest/compliance-read-history',
  auditWrite: 'https://docs.search-guard.com/latest/compliance-write-history',
  configChange: 'https://docs.search-guard.com/latest/configuration-integrity',
  systemChange: 'https://docs.search-guard.com/latest/configuration-integrity',
  pagerduty: 'https://docs.search-guard.com/latest/elasticsearch-alerting-actions-pagerduty',
  jira: 'https://docs.search-guard.com/latest/elasticsearch-alerting-actions-jira',
  restApi: 'https://docs.search-guard.com/latest/rest-api',
  gui: 'https://docs.search-guard.com/latest/configuration-gui',
  forum: 'https://forum.search-guard.com/',
};

// incl: [Community, Enterprise, Compliance]; sub: has a *Sub i18n key.
const MATRIX = [
  {
    key: 'auth',
    rows: [
      { key: 'ldap', sub: true, docs: DOCS.ldap, incl: [false, true, true] },
      { key: 'kerberos', sub: true, docs: DOCS.kerberos, incl: [false, true, true] },
      { key: 'jwt', sub: true, docs: DOCS.jwt, incl: [false, true, true] },
      { key: 'oidc', sub: true, docs: DOCS.oidc, incl: [false, true, true] },
      { key: 'saml', sub: true, docs: DOCS.saml, incl: [false, true, true] },
      { key: 'custom', sub: true, incl: [false, true, true] },
      { key: 'kibanaSso', sub: true, incl: [false, true, true] },
    ],
  },
  {
    key: 'access',
    rows: [
      { key: 'dls', sub: true, docs: DOCS.dls, incl: [false, true, true] },
      { key: 'fls', sub: true, docs: DOCS.fls, incl: [false, true, true] },
      { key: 'multiTenancy', sub: true, docs: DOCS.multiTenancy, incl: [false, true, true] },
      { key: 'anonymization', sub: true, docs: DOCS.anonymization, incl: [false, false, true] },
      { key: 'immutable', sub: true, docs: DOCS.immutable, incl: [false, false, true] },
    ],
  },
  {
    key: 'audit',
    rows: [
      { key: 'security', sub: true, docs: DOCS.auditSecurity, incl: [false, true, true] },
      { key: 'read', sub: true, docs: DOCS.auditRead, incl: [false, false, true] },
      { key: 'write', sub: true, docs: DOCS.auditWrite, incl: [false, false, true] },
      { key: 'configChange', sub: true, docs: DOCS.configChange, incl: [false, false, true] },
      { key: 'systemChange', sub: true, docs: DOCS.systemChange, incl: [false, false, true] },
    ],
  },
  {
    key: 'alerting',
    rows: [
      { key: 'pagerduty', sub: true, docs: DOCS.pagerduty, incl: [false, true, true] },
      { key: 'jira', sub: true, docs: DOCS.jira, incl: [false, true, true] },
    ],
  },
  {
    key: 'ops',
    rows: [
      { key: 'restApi', sub: true, docs: DOCS.restApi, incl: [false, true, true] },
      { key: 'gui', sub: true, docs: DOCS.gui, incl: [false, true, true] },
    ],
  },
  {
    key: 'support',
    rows: [
      { key: 'forum', sub: true, docs: DOCS.forum, incl: [true, true, true] },
      { key: 'sla', sub: true, incl: [false, true, true] },
    ],
  },
];

const EVERYWHERE_ITEMS = [1, 2, 3, 4, 5, 6, 7, 8];
const EDITIONS = ['community', 'enterprise', 'compliance'];

const FeatureBreakdown = () => {
  const { t } = useTranslation('license');
  const lp = useLocalizedPath();
  const [showEverything, setShowEverything] = useState(false);
  const [activeTab, setActiveTab] = useState('enterprise');

  const inclCell = (included, editionIndex) => (
    <td
      key={editionIndex}
      className={`feature-matrix-cell${editionIndex === 1 ? ' feature-col-enterprise' : ''}`}
    >
      {included ? (
        <img src={checkmark} alt={t('featureBreakdown.included')} width="14px" height="14px" loading="lazy" />
      ) : (
        <span className="feature-matrix-dash" role="img" aria-label={t('featureBreakdown.notIncluded')}>
          &ndash;
        </span>
      )}
    </td>
  );

  const rowLabel = (categoryKey, row) => {
    const label = t(`featureBreakdown.matrix.${categoryKey}.${row.key}`);
    return (
      <>
        {row.docs ? (
          <a href={row.docs} target="_blank" rel="noopener noreferrer" className="feature-matrix-doclink">
            {label}
          </a>
        ) : (
          label
        )}
        {row.sub && (
          <div className="feature-matrix-sub">{t(`featureBreakdown.matrix.${categoryKey}.${row.key}Sub`)}</div>
        )}
      </>
    );
  };

  const editionHeader = (edition, editionIndex) => (
    <th
      scope="col"
      key={edition}
      className={`feature-matrix-th${editionIndex === 1 ? ' feature-col-enterprise' : ''}`}
    >
      <div className="feature-matrix-th-name">{t(`featureBreakdown.columns.${edition}.name`)}</div>
      <div className="feature-matrix-th-badge">
        {edition === 'enterprise' && (
          <Badge text={t('featureBreakdown.columns.badge')} bgColor="#02F0DD" textColor="#184962" />
        )}
      </div>
      <div className="feature-matrix-th-sub">{t(`featureBreakdown.columns.${edition}.sub`)}</div>
      <div className="feature-matrix-th-button">
        <Button text={t(`featureBreakdown.columns.${edition}.button`)} link={lp('/search-guard-free-trial/')} />
      </div>
    </th>
  );

  // Mobile tab content: additive checklists.
  const tabItems = {
    community: EVERYWHERE_ITEMS.map((i) => t(`featureBreakdown.everywhere.item${i}`)),
    enterprise: MATRIX.flatMap((category) =>
      category.rows
        .filter((row) => row.incl[1] && !row.incl[0])
        .map((row) => t(`featureBreakdown.matrix.${category.key}.${row.key}`))
    ),
    compliance: MATRIX.flatMap((category) =>
      category.rows
        .filter((row) => row.incl[2] && !row.incl[1])
        .map((row) => t(`featureBreakdown.matrix.${category.key}.${row.key}`))
    ),
  };
  const tabPlusLine = {
    community: null,
    enterprise: t('featureBreakdown.tabs.plusCommunity'),
    compliance: t('featureBreakdown.tabs.plusEnterprise'),
  };

  return (
    <div className="feature-breakdown">
      {/* Block A — included in every edition */}
      <div className="feature-everywhere">
        <h3 className="feature-everywhere-heading">{t('featureBreakdown.everywhere.heading')}</h3>
        <ul className="feature-everywhere-grid">
          {EVERYWHERE_ITEMS.map((i) => (
            <li key={i}>
              <img src={checkmark} alt="" aria-hidden="true" width="14px" height="14px" loading="lazy" />
              <span>{t(`featureBreakdown.everywhere.item${i}`)}</span>
            </li>
          ))}
        </ul>
        <p className="feature-everywhere-compat">{t('featureBreakdown.everywhere.compat')}</p>
      </div>

      {/* Desktop: differences toggle + decision matrix */}
      <div className="feature-matrix-desktop">
        <div className="feature-matrix-toggle" role="group">
          <button
            type="button"
            className={showEverything ? 'licensing-button' : 'licensing-button-active'}
            aria-pressed={!showEverything}
            onClick={() => setShowEverything(false)}
          >
            {t('featureBreakdown.toggle.differences')}
          </button>
          <button
            type="button"
            className={showEverything ? 'licensing-button-active' : 'licensing-button'}
            aria-pressed={showEverything}
            onClick={() => setShowEverything(true)}
          >
            {t('featureBreakdown.toggle.everything')}
          </button>
        </div>

        <div className="licensing-table-wrapper">
          <table className="feature-matrix-table">
            <caption className="visually-hidden">{t('featureBreakdown.caption')}</caption>
            <thead className="feature-matrix-head">
              <tr>
                <th scope="col" className="feature-matrix-th feature-matrix-th-feature">
                  <span className="visually-hidden">{t('featureBreakdown.columns.feature')}</span>
                </th>
                {EDITIONS.map((edition, i) => editionHeader(edition, i))}
              </tr>
            </thead>
            {showEverything && (
              <tbody className="feature-matrix-body">
                <tr className="feature-matrix-category">
                  <th colSpan={4} scope="colgroup">{t('featureBreakdown.everywhere.heading')}</th>
                </tr>
                {EVERYWHERE_ITEMS.map((i) => (
                  <tr key={i}>
                    <th scope="row" className="feature-matrix-rowlabel">
                      {t(`featureBreakdown.everywhere.item${i}`)}
                    </th>
                    {[0, 1, 2].map((editionIndex) => inclCell(true, editionIndex))}
                  </tr>
                ))}
              </tbody>
            )}
            {MATRIX.map((category) => (
              <tbody className="feature-matrix-body" key={category.key}>
                <tr className="feature-matrix-category">
                  <th colSpan={4} scope="colgroup">{t(`featureBreakdown.matrix.${category.key}.name`)}</th>
                </tr>
                {category.rows.map((row) => (
                  <tr key={row.key}>
                    <th scope="row" className="feature-matrix-rowlabel">
                      {rowLabel(category.key, row)}
                    </th>
                    {row.incl.map((included, editionIndex) => inclCell(included, editionIndex))}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </div>

      {/* Mobile: edition tabs with additive checklists */}
      <div className="feature-matrix-mobile">
        <div className="licensing-buttons button-large feature-matrix-tabbar" role="tablist">
          {EDITIONS.map((edition) => (
            <button
              type="button"
              key={edition}
              role="tab"
              id={`feature-tab-${edition}`}
              aria-selected={activeTab === edition}
              aria-controls={`feature-tabpanel-${edition}`}
              className={activeTab === edition ? 'licensing-button-active' : 'licensing-button'}
              onClick={() => setActiveTab(edition)}
            >
              {t(`featureBreakdown.columns.${edition}.name`)}
            </button>
          ))}
        </div>
        {EDITIONS.map((edition) => (
          <div
            key={edition}
            role="tabpanel"
            id={`feature-tabpanel-${edition}`}
            aria-labelledby={`feature-tab-${edition}`}
            hidden={activeTab !== edition}
            className="feature-matrix-tabpanel"
          >
            <div className="feature-matrix-th-sub">{t(`featureBreakdown.columns.${edition}.sub`)}</div>
            <div className="feature-matrix-th-button">
              <Button text={t(`featureBreakdown.columns.${edition}.button`)} link={lp('/search-guard-free-trial/')} />
            </div>
            {tabPlusLine[edition] && <p className="feature-matrix-plusline">{tabPlusLine[edition]}</p>}
            <ul className="feature-matrix-tablist">
              {tabItems[edition].map((item) => (
                <li key={item}>
                  <img src={checkmark} alt="" aria-hidden="true" width="14px" height="14px" loading="lazy" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureBreakdown;
