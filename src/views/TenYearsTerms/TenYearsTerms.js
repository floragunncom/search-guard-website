import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';

// Terms & Conditions for the /10-years anniversary prize draw.
//
// Source: 10y-handover / marketing "SG-10Y-Gewinnspiel-Teilnahmebedingungen".
// Only the publishable §1–§9 are rendered here — the draft warning and the
// INTERNAL table from the source document are intentionally omitted ("nicht Teil
// der veröffentlichten Bedingungen"). The legal text is English-only by request.
//
// NOTE: the source is marked a DRAFT pending legal review; confirm sign-off
// before this reaches production.
const breadcrumb = [
  { anchor: '/', name: 'Home' },
  { anchor: '/10-years/', name: '10 Years' },
  { anchor: '/10-years-terms/', name: 'Prize Draw Terms' },
];

const TenYearsTerms = () => (
  <PageWrapper>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Prize Draw Terms &amp; Conditions — Search Guard 10 Years</title>
      <link rel="canonical" href="https://search-guard.com/10-years-terms/" />
      <meta
        name="description"
        content="Terms and conditions of the Search Guard '10 Years' anniversary prize draw."
      />
      <meta name="robots" content="noindex, follow" />
    </Helmet>

    <Title
      headline='Prize Draw — Terms &amp; Conditions'
      text='Search Guard &ldquo;10 Years&rdquo; Prize Draw.'
      breadcrumb={breadcrumb}
    />

    <div className="row">
      <div className="col s12 l8 offset-l2">
        <div className="imprint-wrapper">

          <div className="imprint-headline">§ 1 Organiser</div>
          <div className="imprint-text">
            The organiser of the &ldquo;10 Years of Search Guard&rdquo; prize draw
            (the &ldquo;Prize Draw&rdquo;) is <strong>floragunn GmbH</strong>,
            Tempelhofer Ufer 16, 10963 Berlin, Germany, registered with the Local
            Court (Amtsgericht) of Charlottenburg under HRB 147010 B, represented
            by its managing directors Claudia Kressin and Jochen Kressin
            (hereinafter &ldquo;floragunn GmbH&rdquo;, &ldquo;we&rdquo; or
            &ldquo;us&rdquo;).
            <br />
            <br />
            The Prize Draw is not associated with, sponsored, endorsed or
            organised by any social network. Any questions about the Prize Draw
            should be directed solely to floragunn GmbH at{' '}
            <a href="mailto:anniversary@search-guard.com">anniversary@search-guard.com</a>.
          </div>

          <div className="imprint-headline">§ 2 Eligibility</div>
          <div className="imprint-text">
            (1) The Prize Draw is open to natural persons who are 18 years or
            older at the time of entry and who reside in a country where LEGO
            offers e-gift cards through its official online shop (lego.com) —
            including, among others, Germany, the United Kingdom, the United
            States and Canada. Participation is void where it is prohibited under
            the law applicable at the participant&rsquo;s place of residence.
            <br />
            <br />
            (2) Employees of floragunn GmbH and its affiliated companies, and
            their relatives, are excluded from participation.
            <br />
            <br />
            (3) Only one entry per person is permitted. Multiple entries — for
            example using several email addresses — are not allowed and lead to
            disqualification.
            <br />
            <br />
            (4) floragunn GmbH reserves the right to exclude participants who
            breach these terms, who manipulate or attempt to manipulate the Prize
            Draw, or who use unauthorised tools (such as automated scripts). In
            such cases, prizes may also be withdrawn and reclaimed after the fact.
          </div>

          <div className="imprint-headline">§ 3 Entry and process</div>
          <div className="imprint-text">
            (1) Entry is made exclusively online, via the campaign page at
            search-guard.com/10-years, within the entry period.
            <br />
            <br />
            (2) <strong>The closing date is 20 October 2026, 23:59 (CEST).</strong>{' '}
            The time of receipt by floragunn GmbH is decisive.
            <br />
            <br />
            (3) To enter, the participant plays the &ldquo;Search Guard Time
            Machine&rdquo; quiz and then submits a valid email address in the
            field provided. Submitting this email address constitutes a binding
            entry into the Prize Draw.
            <br />
            <br />
            (4){' '}
            <strong>The quiz score has no bearing on the chance of winning.</strong>{' '}
            Entry and the chance of winning depend solely on the submission of a
            valid email address; the number of correct answers is irrelevant.
            <br />
            <br />
            (5) Entry is free of charge and is not conditional on the purchase of
            any product or service, or on subscribing to the newsletter (see §
            6(4)).
          </div>

          <div className="imprint-headline">§ 4 Prize</div>
          <div className="imprint-text">
            (1) The prize is a{' '}
            <strong>LEGO e-gift card worth EUR 110.00</strong>, or the equivalent
            amount in the currency of the LEGO online shop for the winner&rsquo;s
            country of residence (converted at the time of purchase). Because LEGO
            gift cards can only be redeemed in the country in which they were
            purchased, floragunn GmbH issues the gift card for the LEGO online
            shop of the winner&rsquo;s country of residence and sends it to the
            winner by email after the draw. Redemption is governed solely by the
            issuer&rsquo;s (LEGO&rsquo;s) redemption and validity terms, for which
            floragunn GmbH accepts no responsibility.
            <br />
            <br />
            (2) There is one prize. It cannot be paid out in cash, exchanged or
            substituted for anything else, and it is non-transferable.
            <br />
            <br />
            (3) <strong>Not part of the Prize Draw:</strong> the &ldquo;Search
            Guard Cookbook&rdquo;, made available for download to everyone who
            submits an email address during the campaign, is not a prize within
            the meaning of these terms but a generally available welcome gift. It
            is provided independently of the draw and independently of the quiz
            score.
          </div>

          <div className="imprint-headline">§ 5 Winner selection and notification</div>
          <div className="imprint-text">
            (1) The winner is determined after the closing date by lot from among
            all valid entries. The draw is carried out internally at floragunn
            GmbH.
            <br />
            <br />
            (2) The winner is notified promptly after the draw at the email
            address provided on entry. The winner is also announced on 22 October
            2026 in the Search Guard October newsletter, where only the
            winner&rsquo;s first name is published.
            <br />
            <br />
            (3) If the winner does not respond within 14 days of notification with
            the details required to hand over the prize, the claim to the prize
            lapses. In that case, floragunn GmbH reserves the right to draw a
            replacement winner.
            <br />
            <br />
            (4) The prize is delivered digitally by email only; there is no
            physical shipment. Any taxes or duties payable on the prize in the
            winner&rsquo;s country of residence are the winner&rsquo;s
            responsibility.
          </div>

          <div className="imprint-headline">§ 6 Data protection</div>
          <div className="imprint-text">
            (1) floragunn GmbH processes the email address submitted on entry, and
            the optionally provided first name, solely for the purpose of running
            the Prize Draw (entry, draw, notification) and providing the Cookbook.
            <br />
            <br />
            (2) The legal basis for the processing is Art. 6(1)(b) GDPR
            (performance of the entry relationship) and Art. 6(1)(f) GDPR
            (legitimate interest in the proper conduct of the Prize Draw).
            <br />
            <br />
            (3) The data collected on entry is deleted after the Prize Draw has
            ended and once any statutory retention periods have expired, at the
            latest three months after the winner is announced, unless further
            consent (for example to the newsletter, see paragraph 4) has been
            given.
            <br />
            <br />
            (4) <strong>Separation from the newsletter (no bundling):</strong>{' '}
            participation in the Prize Draw and receipt of the Cookbook are{' '}
            <strong>not</strong> conditional on subscribing to the newsletter.
            Newsletter subscription is optional, is made via a separate,
            un-pre-ticked checkbox, and is based on separate consent under Art.
            6(1)(a) GDPR in conjunction with § 7 UWG. This consent can be
            withdrawn at any time with effect for the future; subscription is
            confirmed by a double opt-in.
            <br />
            <br />
            (5) Further information on the processing of personal data, on
            data-subject rights (access, rectification, erasure, restriction,
            objection, data portability) and on how to contact us can be found in
            the privacy notice at{' '}
            <a href="/dataprotection/">search-guard.com/dataprotection</a>.
          </div>

          <div className="imprint-headline">§ 7 Early termination and changes</div>
          <div className="imprint-text">
            floragunn GmbH reserves the right to suspend, amend or end the Prize
            Draw at any time, in whole or in part and without prior notice, if its
            proper conduct cannot be ensured for technical reasons (for example
            manipulation, software errors, unauthorised interference) or legal
            reasons. No claims arise for participants from this.
          </div>

          <div className="imprint-headline">§ 8 Liability</div>
          <div className="imprint-text">
            (1) floragunn GmbH is liable without limitation for damages arising
            from injury to life, body or health that result from a negligent or
            intentional breach of duty, and for other damages caused by
            intentional or grossly negligent conduct.
            <br />
            <br />
            (2) For slightly negligent breaches of duty, floragunn GmbH is liable
            only where a material contractual obligation (cardinal obligation) has
            been breached, and only up to the foreseeable damage typical of this
            type of arrangement.
            <br />
            <br />
            (3) Any further liability of floragunn GmbH is excluded. This applies
            in particular to technically caused failures, transmission delays or
            data losses for which floragunn GmbH is not responsible.
          </div>

          <div className="imprint-headline">§ 9 Final provisions</div>
          <div className="imprint-text">
            (1) The law of the Federal Republic of Germany applies, excluding the
            UN Convention on Contracts for the International Sale of Goods (CISG).
            <br />
            <br />
            (2) Should individual provisions of these terms be or become invalid,
            the validity of the remaining provisions is not affected.
            <br />
            <br />
            (3) Recourse to the courts is excluded.
          </div>

          <div className="imprint-text">
            <br />
            <strong>As of:</strong> September 2026.
          </div>

        </div>
      </div>
    </div>
  </PageWrapper>
);

export default TenYearsTerms;
