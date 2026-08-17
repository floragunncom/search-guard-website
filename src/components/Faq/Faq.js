import React from 'react';
import { useTranslation } from 'react-i18next';
import Markdown from 'markdown-to-jsx';
import Button from '../Button/Button';

// Which questions the Resource page teases, as [categoryId, entryIndex] pairs.
// The text itself lives in src/i18n/locales/<lang>/faq.json.
const TEASER_ENTRIES = [
  ['about', 0],
  ['pricing', 0],
  ['trial', 0],
];

const Faq = () => {
  const { t } = useTranslation('faq');
  const rawCategories = t('categories', { returnObjects: true });
  const categories = Array.isArray(rawCategories) ? rawCategories : [];

  const teasers = TEASER_ENTRIES.map(([categoryId, entryIndex]) => {
    const category = categories.find((item) => item.id === categoryId);
    return category && category.entries[entryIndex];
  }).filter(Boolean);

  if (!teasers.length) return null;

  return (
    <div className="faq-wrapper" id="faq">
      <div className="row faq-row">
        <h3 className="faq-headline">{t('teaser.headline')}</h3>
        <div className="faq-info-boxes">
          {teasers.map((faq) => (
            <div className="faq-info-box" key={faq.question}>
              <div className="faq-info-box-headline">{faq.question}</div>
              <div className="faq-info-box-text">
                <Markdown>{faq.answer}</Markdown>
              </div>
            </div>
          ))}
        </div>
        <div className="faq-button">
          <Button text={t('teaser.button')} link="/faq/" />
        </div>
      </div>
    </div>
  );
};

export default Faq;
