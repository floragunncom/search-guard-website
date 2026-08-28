import React, { useCallback, useEffect, useState } from 'react';
import slugify from 'react-slugify';

/**
 * Reusable FAQ accordion.
 *
 * Renders the same markup and CSS classes as the FAQ page (styles live in
 * src/views/Faqs/Faqs.scss and are global), so inline FAQs on other pages look
 * and behave identically: collapsed by default, several items can be open,
 * deep links (#slug-of-question) expand and scroll to the target.
 *
 * items: [{ question, answer }] — plain text strings.
 * Structured data is the caller's job (e.g. FAQPage JSON-LD in Helmet); this
 * component deliberately emits no microdata to avoid double markup.
 */
const FaqAccordion = ({ items }) => {
  const entries = (items || []).map((item) => ({ ...item, anchorId: slugify(item.question) }));

  const [openAnswers, setOpenAnswers] = useState(() => ({}));

  const toggleAnswer = useCallback((anchorId) => {
    setOpenAnswers((open) => ({ ...open, [anchorId]: !open[anchorId] }));
  }, []);

  // Deep links expand and scroll to the target answer. Runs after mount only,
  // so server-rendered markup and the first client render stay identical.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.location.hash) return;
    const target = decodeURIComponent(window.location.hash.slice(1));
    if (!target || !entries.some((entry) => entry.anchorId === target)) return;
    setOpenAnswers((open) => ({ ...open, [target]: true }));
    const element = document.getElementById(target);
    if (element) {
      window.requestAnimationFrame(() => element.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="faq-accordion">
      {entries.map(({ question, answer, anchorId }) => {
        const isOpen = Boolean(openAnswers[anchorId]);
        return (
          <div className={`faq-item ${isOpen ? 'is-open' : ''}`} id={anchorId} key={anchorId}>
            <h3 className="faq-question-heading">
              <button
                type="button"
                className="faq-question-toggle"
                aria-expanded={isOpen}
                aria-controls={`${anchorId}-answer`}
                onClick={() => toggleAnswer(anchorId)}
              >
                <span className="faq-question-label">{question}</span>
                <span className="faq-question-icon" aria-hidden="true" />
              </button>
            </h3>
            <div className="faq-answer" id={`${anchorId}-answer`}>
              <div className="faq-answer-text">{answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;
