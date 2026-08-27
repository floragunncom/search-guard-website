import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import { useLocalizedPath } from '../../i18n/useLocalizedPath';
import iconSearchGuard from '../../images/icon-search-guard.svg';
import Button from '../Button/Button';
import { Badge } from '../Badge/Badge';

// Opt-in props (default off, so the homepage and Heise usages are unchanged):
// - popularBadge (string): renders a badge on the Enterprise card headline.
// - quoteButton ({ text, href }): renders a secondary ghost-style link under
//   the primary button on the Enterprise and Compliance cards.
// - colorschema: section background schema; defaults to the historical 'light'.
// - headlineTag: heading element for the section headline; defaults to the
//   historical 'h3' (the pricing page passes 'h2' for a sequential outline).
const LicensingModel = ({ tableView, plain, topButtons, headline, subheadline, popularBadge, quoteButton, colorschema = 'light', headlineTag: HeadlineTag = 'h3' }) => {
  const { t } = useTranslation('license');
  const lp = useLocalizedPath();
  const [standardButton, setStandardButton] = useState(true);

  const renderQuoteLink = quoteButton ? (
    <div className="licensing-quote-link-wrapper">
      <a className="licensing-quote-link" href={quoteButton.href}>
        {quoteButton.text}
      </a>
    </div>
  ) : null;

  const onButtonPress = () => {
    setStandardButton(!standardButton);
  };

  let infoButton;
  if (topButtons) {
    infoButton = (
      <div className="licensing-info-wrapper">
        <div className="licensing-info-text">
          {t('editions.infoText.prefix')}{' '}
          <div style={{ fontWeight: 'bold', display: 'inline' }}>
            {t('editions.infoText.academic')}
          </div>
          {' '}{t('editions.infoText.middle')}{' '}
          <div style={{ fontWeight: 'bold', display: 'inline' }}>
            {t('editions.infoText.custom')}
          </div>{' '}
          {t('editions.infoText.suffix')}
        </div>
        <div className="liccensing-info-button">
          <Button  text={t('editions.infoButton')} link={lp('/licensing/')} />
        </div>
      </div>
    );
  }
  let renderContent;

  if (standardButton) {
    renderContent = (
      <div className="licensing-editions-wrapper">
        <div className="row">
          <div className="col s12 l4 licensing-right-border">
            <div className="licensing-edition">
              <div className="licensing-editions-icon">
                <img
                  src={iconSearchGuard}
                  alt="community icon"
                  className="licensing-icon"
                  width="145px" height="145px"
                />
              </div>
              <h5 className="licensing-editions-headline">
                {t('editions.community.headline')}
              </h5>
              <ul className="licensing-editions-text-wrapper">
                <li className="licensing-editions-text">
                  {t('editions.community.feature1')}
                </li>
                <li className="licensing-editions-text">
                  {t('editions.community.feature2')}
                </li>
                <li className="licensing-editions-text">
                  {t('editions.community.feature3')}
                </li>
              </ul>
              <div className="licensing-editions-button">
                <Button
                  text={t('editions.community.button')}

                  link={lp('/search-guard-free-trial/')}
                />
              </div>
            </div>
          </div>
          <div className="col s12 l4 licensing-right-border">
            <div className="licensing-edition">
              <div className="licensing-editions-icon">
                <img
                  src={iconSearchGuard}
                  alt="enterprise icon"
                  className="licensing-icon"
                  width="145px" height="145px"
                />
              </div>
              {popularBadge && (
                <div className="licensing-popular-badge">
                  <Badge text={popularBadge} bgColor="#02F0DD" textColor="#184962" />
                </div>
              )}
              <h5 className="licensing-editions-headline">
                {t('editions.enterprise.headline')}
              </h5>
              <ul className="licensing-editions-text-wrapper">
                <li className="licensing-editions-text">
                  {t('editions.enterprise.feature1')}
                </li>
                <li className="licensing-editions-text">
                  {t('editions.enterprise.feature2')}
                </li>
                <li className="licensing-editions-text">
                  {t('editions.enterprise.feature3')}
                </li>
              </ul>
              <div className="licensing-editions-button">
                <Button
                  text={t('editions.enterprise.button')}

                  link={lp('/search-guard-free-trial/')}
                />
              </div>
              {renderQuoteLink}
            </div>
          </div>
          <div className="col s12 l4 licensing-right-border">
            <div className="licensing-edition">
              <div className="licensing-editions-icon">
                <img
                  src={iconSearchGuard}
                  alt="compliance icon"
                  className="licensing-icon"
                  width="145px" height="145px"
                />
              </div>
              <h5 className="licensing-editions-headline">
                {t('editions.compliance.headline')}
              </h5>
              <ul className="licensing-editions-text-wrapper">
                <li className="licensing-editions-text">
                  {t('editions.compliance.feature1')}
                </li>
                <li className="licensing-editions-text">
                  {t('editions.compliance.feature2')}
                </li>
                <li className="licensing-editions-text">
                  {t('editions.compliance.feature3')}
                </li>
              </ul>
              <div className="licensing-editions-button">
                <Button
                  text={t('editions.compliance.button')}

                  link={lp('/search-guard-free-trial/')}
                />
              </div>
              {renderQuoteLink}
            </div>
            {infoButton}
          </div>
        </div>
      </div>
    );
  } else {
    renderContent = (
      <div className="licensing-editions-wrapper">
        <div className="row">
          <div className="col s12 l6 licensing-right-border">
            <div className="licensing-edition" id="custom-edition">
              <div className="licensing-editions-icon">
                <img
                  src={iconSearchGuard}
                  alt="academic icon"
                  className="licensing-icon"
                  width="145px" height="145px"
                />
              </div>
              <h5 className="licensing-editions-headline">
                {t('editions.academic.headline')}
              </h5>
              <ul className="licensing-editions-text-wrapper">
                <li className="licensing-editions-text">
                  {t('editions.academic.feature1')}
                </li>
                <li className="licensing-editions-text">
                  {t('editions.academic.feature2')}
                </li>
                <li className="licensing-editions-text">
                  {t('editions.academic.feature3')}
                </li>
              </ul>
              <div className="licensing-editions-button">
                <Button
                  text={t('editions.academic.button')}

                  link={lp('/contacts/')}
                />
              </div>
            </div>
          </div>
          <div className="col s12 l6 licensing-right-border">
            <div className="licensing-edition">
              <div className="licensing-editions-icon">
                <img
                  src={iconSearchGuard}
                  alt="custom icon"
                  className="licensing-icon"
                  width="145px" height="145px"
                />
              </div>
              <h5 className="licensing-editions-headline">
                {t('editions.custom.headline')}
              </h5>
              <ul className="licensing-editions-text-wrapper">
                <li className="licensing-editions-text">
                  {t('editions.custom.feature1')}
                </li>
                <li className="licensing-editions-text">
                  {t('editions.custom.feature2')}
                </li>
                <li className="licensing-editions-text">
                  {t('editions.custom.feature3')}
                </li>
              </ul>
              <div className="licensing-editions-button">
                <Button
                  text={t('editions.custom.button')}

                  link={lp('/contacts/')}
                />
              </div>
            </div>
            {infoButton}
          </div>
        </div>
      </div>
    );
  }

  let buttons;
  let renderTableView;

  if (topButtons) {
    buttons = (
      <div className="licensing-buttons button-large">
        <div
          className={
            standardButton ? 'licensing-button-active' : 'licensing-button'
          }
          onClick={onButtonPress}
        >
          {t('editions.tabs.standard')}
        </div>
        <div
          className={
            standardButton ? 'licensing-button' : 'licensing-button-active'
          }
          onClick={onButtonPress}
        >
          {t('editions.tabs.academic')}
        </div>
      </div>
    );
  }

  return (
    <div className={`color-schema-${colorschema}`}>
      <div
        className={
          tableView ? 'licensing-wrapper-expanded' : plain ? '' : 'licensing-wrapper'
        }
        id="standard"
      >
        <div className="row">
          <div className="col s12">
            <HeadlineTag className="licensing-headline">{headline}</HeadlineTag>
            {subheadline ? <div className="licensing-subheadline">{subheadline}</div> : null}
            {buttons}
            {renderContent}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col s12">{renderTableView}</div>
      </div>
    </div>
  );
};

export default LicensingModel;
