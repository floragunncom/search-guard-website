import React from 'react';
import { useTranslation } from 'react-i18next';
import BrickPlate from './BrickPlate';
import QuizGate from './QuizGate';
import { isDrawOpen } from '../../config/tenYears';

// Correct-answer indices live in the component, NOT in the translatable strings
// (the build brief keeps indices and brick geometry out of i18n). The option
// arrays in the `tenyears` namespace are authored in a fixed, pre-shuffled order
// so the correct answer sits at a varied position per question — done here at
// author time rather than shuffling at render time, because a random shuffle
// would differ between the static (SSR) HTML and client hydration and trip a
// hydration mismatch. If you re-order an option array, update its index here.
const CORRECT = [1, 2, 1, 0, 2, 1, 2, 0, 1, 1];

const SCREENS = {
  INTRO: 'intro',
  QUESTION: 'question',
  SCORE: 'score',
  CONFIRM: 'confirm',
};

const Quiz = () => {
  // Whether the prize draw is still running. Starts true and is corrected on
  // mount — reading the clock during render would disagree with the static
  // HTML (built whenever CI last ran) and trip a hydration mismatch. Once the
  // draw closes the quiz carries on as a cookbook giveaway; see
  // DRAW_CLOSES_AT in src/config/tenYears.js.
  const [drawOpen, setDrawOpen] = React.useState(true);

  React.useEffect(() => {
    setDrawOpen(isDrawOpen());
  }, []);

  const { t } = useTranslation('tenyears');

  const questions = t('questions', { returnObjects: true });
  const list = Array.isArray(questions) ? questions : [];
  const lastIndex = list.length - 1;

  const [screen, setScreen] = React.useState(SCREENS.INTRO);
  const [idx, setIdx] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [picked, setPicked] = React.useState(null); // chosen option index, or null

  const answered = picked !== null;
  const current = list[idx];
  const correctIndex = CORRECT[idx];

  const tallyLabel = (
    <span
      dangerouslySetInnerHTML={{ __html: t('tally', { score: `<b>${score}</b>` }) }}
    />
  );

  const start = () => {
    setScore(0);
    setIdx(0);
    setPicked(null);
    setScreen(SCREENS.QUESTION);
  };

  const restart = () => {
    setScore(0);
    setIdx(0);
    setPicked(null);
    setScreen(SCREENS.INTRO);
  };

  const answer = (choice) => {
    if (answered) {
      return;
    }
    setPicked(choice);
    if (choice === correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const advance = () => {
    if (idx === lastIndex) {
      setPicked(null);
      setScreen(SCREENS.SCORE);
      return;
    }
    setIdx((i) => i + 1);
    setPicked(null);
  };

  const renderOptions = () => (
    <div className="tenyears-options" role="group" aria-label={current.q}>
      {current.opts.map((text, i) => {
        let state = '';
        if (answered) {
          if (i === correctIndex) {
            state = ' is-right';
          } else if (i === picked) {
            state = ' is-wrong';
          } else {
            state = ' is-dim';
          }
        }
        return (
          <button
            key={i}
            type="button"
            className={`tenyears-opt${state}`}
            disabled={answered}
            onClick={() => answer(i)}
          >
            <span className="tenyears-key">{'ABC'[i]}</span>
            <span>{text}</span>
          </button>
        );
      })}
    </div>
  );

  const renderHint = () => {
    if (!current.hint) {
      return null;
    }
    return (
      <p className="tenyears-hint">
        <a href="/company/#journey" target="_blank" rel="noopener noreferrer">
          {current.hint}
        </a>
      </p>
    );
  };

  const renderReveal = () => {
    const right = picked === correctIndex;
    const nextLabel = idx === lastIndex ? t('buttons.last') : t('buttons.next');
    return (
      <div className="tenyears-after">
        <div className={`tenyears-reveal${right ? '' : ' is-wrong'}`}>
          <p className={`tenyears-verdict${right ? '' : ' is-no'}`}>
            {right ? t('verdict.right') : t('verdict.wrong')}
          </p>
          <p dangerouslySetInnerHTML={{ __html: current.reveal }} />
        </div>
        <div className="tenyears-actions">
          <button className="tenyears-btn" type="button" onClick={advance}>
            {nextLabel}
          </button>
        </div>
      </div>
    );
  };

  const renderIntro = () => (
    <div className="tenyears-panel">
      <p className="tenyears-eyebrow">{t('intro.eyebrow')}</p>
      <p className="tenyears-lede">{t('intro.instruction')}</p>
      <p className="tenyears-cookbook">{t('intro.cookbook')}</p>
      {drawOpen ? <p className="tenyears-prize-line">{t('intro.prize')}</p> : null}
      <p className="tenyears-meta">{t('intro.meta')}</p>
      <div className="tenyears-actions">
        <button className="tenyears-btn" type="button" onClick={start}>
          {t('intro.start')}
        </button>
      </div>
    </div>
  );

  const renderQuestion = () => (
    <div className="tenyears-panel">
      <p className="tenyears-eyebrow">
        {t('progress', { year: current.year, index: idx + 1 })}
      </p>
      <h2 className="tenyears-h2">{current.q}</h2>
      {renderOptions()}
      {answered ? null : renderHint()}
      {answered ? renderReveal() : null}
    </div>
  );

  const renderRecap = () => {
    const rows = list.map((item, i) => ({
      year: item.year,
      text: item.opts[CORRECT[i]],
    }));
    return (
      <div className="tenyears-recap">
        <h3 className="tenyears-recap-heading">{t('score.recapHeading')}</h3>
        <ul>
          {rows.map((row) => (
            <li key={row.year}>
              <span className="tenyears-recap-year">{row.year}</span>
              <span>{row.text}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderScore = () => {
    return (
      <div className="tenyears-panel">
        <p className="tenyears-eyebrow">{t('score.eyebrow')}</p>
        <h2 className="tenyears-h1 tenyears-score-number">{t('score.headline', { score })}</h2>
        <p className="tenyears-lede">{t(`score.lines.${score}`)}</p>

        {renderRecap()}

        <div className="tenyears-gate">
          <h3 className="tenyears-h2">{t('gate.heading')}</h3>
          <p className="tenyears-lede">
            {drawOpen
              ? t(score === 10 ? 'gate.bodyDraw' : 'gate.bodyNoDraw')
              : t('gate.bodyClosed')}
          </p>
          <QuizGate score={score} onDone={() => setScreen(SCREENS.CONFIRM)} />
        </div>

        <div className="tenyears-actions tenyears-replay">
          <button className="tenyears-btn is-ghost" type="button" onClick={restart}>
            {t('buttons.playAgain')}
          </button>
        </div>
      </div>
    );
  };

  const renderConfirm = () => (
    <div className="tenyears-panel">
      <p className="tenyears-eyebrow">{t('confirm.eyebrow')}</p>
      <h2 className="tenyears-h1">{t('confirm.heading')}</h2>
      <p className="tenyears-lede">
        {t(drawOpen ? 'confirm.body' : 'confirm.bodyClosed')}
      </p>
      <div className="tenyears-actions">
        <a className="tenyears-btn" href="/company/">
          {t('confirm.button')}
        </a>
      </div>
    </div>
  );

  const renderPanel = () => {
    switch (screen) {
      case SCREENS.INTRO:
        return renderIntro();
      case SCREENS.SCORE:
        return renderScore();
      case SCREENS.CONFIRM:
        return renderConfirm();
      default:
        return renderQuestion();
    }
  };

  return (
    <div className="tenyears-quiz color-schema-white">
      <div className="tenyears-stage">
        <BrickPlate filled={score} complete={score === 10} tallyLabel={tallyLabel} />
        {renderPanel()}
      </div>
    </div>
  );
};

export default Quiz;
