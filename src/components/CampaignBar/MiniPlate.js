import React from 'react';
import { BRICKS } from '../TenYears/BrickPlate';

/**
 * A small, static version of the quiz's brick "10", for the campaign bar and
 * the corner badge.
 *
 * It reuses BRICKS from BrickPlate so the numeral can never drift from the one
 * on the quiz page — the grid areas there are hand-tuned and must not be edited
 * brick by brick. What it deliberately does not reuse is BrickPlate itself:
 * that component carries the quiz's fill state, drop animation and live tally
 * label, none of which belong in a banner.
 *
 * `filled` leaves the last bricks as ghost outlines, so the numeral reads as a
 * game still in progress rather than a finished logo. Purely decorative, hence
 * aria-hidden: the surrounding link already says where it goes.
 */
const MiniPlate = ({ filled = BRICKS.length, onDark = false }) => (
  <span
    className={`campaign-plate${onDark ? ' campaign-plate--on-dark' : ''}`}
    aria-hidden="true"
  >
    {BRICKS.map((brick, index) => (
      <span
        key={brick.id}
        className={`campaign-plate__brick${
          index < filled ? ` campaign-plate__brick--${brick.tone}` : ' campaign-plate__brick--ghost'
        }`}
        style={{ gridArea: brick.area }}
      />
    ))}
  </span>
);

export default MiniPlate;
