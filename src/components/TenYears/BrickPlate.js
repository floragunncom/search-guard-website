import React from 'react';

// Ten bricks that together form a big "10". The ten grid-area values below are
// hand-tuned so that the empty (ghost) outline already reads as a 10 at any
// size, and so that filling the bricks in array order fills the numeral
// bottom-up — gaps always land at the top. They are copied VERBATIM from the
// approved prototype (10y-handover/SG-10Y-quiz-prototype.html). Do not change a
// single brick in isolation: it breaks the numeral.
//
// The one thing intentionally NOT copied from the prototype is the colour: the
// prototype used a coral (#FF9B73) that does not exist in the site palette. The
// three tones below are re-derived from the site's own tokens in BrickPlate.scss.
export const BRICKS = [
  { id: 'e', area: '5 / 1 / 6 / 4', w: 3, tone: 'navy' }, // base of the 1
  { id: 'd', area: '4 / 2 / 5 / 3', w: 1, tone: 'cyan' },
  { id: 'c', area: '3 / 2 / 4 / 3', w: 1, tone: 'accent' },
  { id: 'b', area: '2 / 2 / 3 / 3', w: 1, tone: 'cyan' },
  { id: 'a', area: '1 / 1 / 2 / 3', w: 2, tone: 'accent' }, // cap of the 1
  { id: 'j', area: '5 / 5 / 6 / 9', w: 4, tone: 'navy' }, // base of the 0
  { id: 'h', area: '2 / 5 / 5 / 6', w: 1, tone: 'cyan' },
  { id: 'i', area: '2 / 8 / 5 / 9', w: 1, tone: 'cyan' },
  { id: 'f', area: '1 / 5 / 2 / 7', w: 2, tone: 'accent' },
  { id: 'g', area: '1 / 7 / 2 / 9', w: 2, tone: 'accent' },
];

const TONE_VAR = {
  navy: 'var(--brick-navy)',
  cyan: 'var(--brick-cyan)',
  accent: 'var(--brick-accent)',
};

/**
 * The brick plate. Renders all ten slots; the first `filled` bricks (in BRICKS
 * order) are set, the rest stay as ghost outlines.
 *
 * The plate itself is decorative (aria-hidden); progress is announced to
 * assistive tech through the live `tallyLabel` text below it.
 */
const BrickPlate = ({ filled = 0, complete = false, tallyLabel }) => (
  <div className="tenyears-build">
    <div
      className={`tenyears-plate${complete ? ' is-complete' : ''}`}
      aria-hidden="true"
    >
      {BRICKS.map((brick, i) => {
        const isSet = i < filled;
        return (
          <div
            key={brick.id}
            className={`tenyears-brick ${isSet ? 'is-set' : 'is-ghost'}`}
            style={{ gridArea: brick.area, '--brick': TONE_VAR[brick.tone] }}
          >
            <span className="tenyears-studs">
              {Array.from({ length: brick.w }).map((_, s) => (
                <i key={s} className="tenyears-stud" />
              ))}
            </span>
          </div>
        );
      })}
    </div>
    <p className="tenyears-tally" aria-live="polite">
      {tallyLabel}
    </p>
  </div>
);

export default BrickPlate;
