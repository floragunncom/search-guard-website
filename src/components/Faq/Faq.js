import React from 'react';
import { useTranslation } from 'react-i18next';
import Markdown from 'markdown-to-jsx';
import Button from '../Button/Button';
import enFaq from '../../i18n/locales/en/faq.json';

// The Resource page teases the entries marked with "featured": true in
// en/faq.json. Like the FAQ anchor ids, the ENGLISH file is the source of
// truth for the selection (entries are index-aligned across locales), while
// the displayed text comes from the active locale. The first three marked
// entries win, in file order.
const TEASER_POSITIONS = enFaq.categories
  .flatMap((category, categoryIndex) =>
    category.entries
      .map((entry, entryIndex) => (entry.featured ? [categoryIndex, entryIndex] : null))
      .filter(Boolean)
  )
  .slice(0, 3);

// Safety net: never render an empty section if no entry is marked.
const FALLBACK_POSITIONS = [
  [0, 0],
  [1, 0],
  [2, 0],
];

const Faq = () => {
  const { t } = useTranslation('faq');
  const rawCategories = t('categories', { returnObjects: true });
  const categories = Array.isArray(rawCategories) ? rawCategories : [];

  const positions = TEASER_POSITIONS.length > 0 ? TEASER_POSITIONS : FALLBACK_POSITIONS;
  const teasers = positions
    .map(([categoryIndex, entryIndex]) => {
      const category = categories[categoryIndex];
      return category && category.entries[entryIndex];
    })
    .filter(Boolean);

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
