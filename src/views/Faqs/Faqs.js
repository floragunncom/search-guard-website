import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Markdown from 'markdown-to-jsx';
import slugify from 'react-slugify';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import PreFooter from '../../components/PreFooter/PreFooter';
import Title from '../../components/Title/Title';
import CTAContactUs from '../../components/CTA/CTAContactUs';
import enFaq from '../../i18n/locales/en/faq.json';

// Anchor ids are derived from the ENGLISH question text in every locale, so that a
// /faq/#some-question link keeps working when the page is opened in de/es/fr.
const anchorIds = enFaq.categories.map((category) => category.entries.map((entry) => slugify(entry.question)));

// JSON-LD and microdata need plain text, not markdown source.
const toPlainText = (markdown) =>
  markdown
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

const Faqs = () => {
  const { t } = useTranslation('faq');
  // i18next returns the key itself when a lookup misses, so guard before mapping.
  const rawCategories = t('categories', { returnObjects: true });
  const categories = Array.isArray(rawCategories) ? rawCategories : [];
  const closingActions = [0, 1, 2].map((i) => ({
    label: t(`closing.actions.${i}.label`),
    text: t(`closing.actions.${i}.text`),
    link: t(`closing.actions.${i}.link`),
  }));

  // Every answer starts collapsed; several may be open at the same time.
  const [openAnswers, setOpenAnswers] = useState(() => ({}));

  const toggleAnswer = useCallback((anchorId) => {
    setOpenAnswers((open) => ({ ...open, [anchorId]: !open[anchorId] }));
  }, []);

  // Deep links (/faq/#some-question) expand and scroll to the target answer.
  // Runs after mount only, so the server-rendered markup and the first client
  // render stay identical.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.location.hash) return;
    const target = decodeURIComponent(window.location.hash.slice(1));
    if (!target) return;
    const isQuestion = anchorIds.some((ids) => ids.includes(target));
    if (isQuestion) {
      setOpenAnswers((open) => ({ ...open, [target]: true }));
    }
    const element = document.getElementById(target);
    if (element) {
      window.requestAnimationFrame(() => element.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
  }, []);

  const scrollToCategory = useCallback((event, categoryId) => {
    if (typeof document === 'undefined') return;
    const element = document.getElementById(categoryId);
    if (!element) return;
    event.preventDefault();
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${categoryId}`);
  }, []);

  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: categories.flatMap((category) =>
      category.entries.map((entry) => ({
        '@type': 'Question',
        name: entry.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: toPlainText(entry.answer),
        },
      }))
    ),
  };

  const breadcrumb = [
    { anchor: '/', name: t('breadcrumb.home') },
    { anchor: '/resource/', name: t('breadcrumb.resources') },
    { anchor: '/faq/', name: t('breadcrumb.faq') },
  ];

  return (
    <PageWrapper>
      <Helmet>
        <html itemScope itemType="https://schema.org/FAQPage" />
        <meta charSet="utf-8" />
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <script type="application/ld+json">{JSON.stringify(jsonld)}</script>
      </Helmet>
      <Title headline={t('title.headline')} text={t('title.text')} breadcrumb={breadcrumb} />

      <div className="row faq-row-wrapper">
        <div className="col s12 l4 faq-nav-col">
          {/* role="navigation" div rather than <nav>: Navbar.scss styles the bare `nav`
              element globally for the site navbar (dark background, 200px side padding),
              which would otherwise bleed into this sidebar. Same landmark semantics. */}
          <div className="faq-jumpto" role="navigation" aria-label={t('jumpTo')}>
            <div className="faq-jumpto-headline">{t('jumpTo')}</div>
            <ul className="faq-jumpto-list">
              {categories.map((category) => (
                <li key={category.id}>
                  <a href={`#${category.id}`} onClick={(event) => scrollToCategory(event, category.id)}>
                    {category.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col s12 l7 offset-l1 faq-answer-wrapper">
          <div className="faq-intro">
            <Markdown>{t('intro')}</Markdown>
          </div>

          {categories.map((category, categoryIndex) => (
            <section className="faq-answer-section" id={category.id} key={category.id}>
              <h2 className="faq-answer-section-headline">{category.title}</h2>

              {category.entries.map((entry, entryIndex) => {
                const anchorId = anchorIds[categoryIndex][entryIndex];
                const isOpen = Boolean(openAnswers[anchorId]);
                return (
                  <div
                    className={`faq-item ${isOpen ? 'is-open' : ''}`}
                    id={anchorId}
                    key={anchorId}
                    itemScope
                    itemProp="mainEntity"
                    itemType="https://schema.org/Question"
                  >
                    <h3 className="faq-question-heading">
                      <button
                        type="button"
                        className="faq-question-toggle"
                        aria-expanded={isOpen}
                        aria-controls={`${anchorId}-answer`}
                        onClick={() => toggleAnswer(anchorId)}
                      >
                        <span className="faq-question-label" itemProp="name">
                          {entry.question}
                        </span>
                        <span className="faq-question-icon" aria-hidden="true" />
                      </button>
                    </h3>
                    {/* Collapsed via CSS rather than the `hidden` attribute: the text stays in
                        the DOM for crawlers and the FAQPage markup, the panel can animate, and
                        visibility:hidden keeps it out of the accessibility tree while closed. */}
                    <div
                      className="faq-answer"
                      id={`${anchorId}-answer`}
                      itemScope
                      itemProp="acceptedAnswer"
                      itemType="https://schema.org/Answer"
                    >
                      <div className="faq-answer-text" itemProp="text">
                        <Markdown>{entry.answer}</Markdown>
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>
          ))}

          <section className="faq-closing">
            <h2 className="faq-closing-headline">{t('closing.headline')}</h2>
            <p className="faq-closing-text">{t('closing.text')}</p>
            <ul className="faq-closing-actions">
              {closingActions.map((action) => (
                <li key={action.label}>
                  <a className="faq-closing-action" href={action.link}>
                    <span className="faq-closing-action-label">{action.label} &rarr;</span>
                    <span className="faq-closing-action-text">{action.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <CTAContactUs colorschema="white" />
      <PreFooter />
    </PageWrapper>
  );
};

export default Faqs;
