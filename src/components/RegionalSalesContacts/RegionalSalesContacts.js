import React from 'react';

// Region-first sales contacts listing, shared by the contact form variants so
// the entries can never diverge between pages.
//
// Deliberate choices — do not "optimize" them away:
// - The South America entry (victor.pichardo@) is kept for legal reasons.
// - Street addresses are omitted here; the "Search Guard Headquarters" block
//   rendered above this component keeps the full postal address.
// - Team members' organization lines read "Search Guard", the partners'
//   lines read their company names.
const CONTACTS = [
  {
    region: 'North America (USA & Canada)',
    name: 'David Bennett · Excelerate Systems',
    email: 'david.bennett@exceleratesystems.net',
  },
  {
    region: 'South America',
    name: 'Victor Pichardo · Excelerate Systems',
    email: 'victor.pichardo@exceleratesystems.net',
  },
  {
    region: 'Germany, Austria & Switzerland',
    name: 'Thomas Mahler · Search Guard',
    email: 'tmahler@search-guard.com',
  },
  {
    region: 'France & North Africa',
    name: 'Ian Quackenbos · Search Guard',
    email: 'iquackenbos@search-guard.com',
  },
];

// headingTag: matches the heading element the host layout uses for
// "Search Guard Headquarters" (h4 in ContactForm, p in ContactFormSuperSlim).
// otherRegionsHref/-LinkText: the "All other regions" row links to the on-page
// form by default; a host where the anchor doesn't work can pass a mailto.
const RegionalSalesContacts = ({
  headingTag: HeadingTag = 'h4',
  otherRegionsHref = '#contact',
  otherRegionsLinkText = 'Use the contact form →',
}) => (
  <>
    <HeadingTag className="company-information-header">
      Sales Contacts
    </HeadingTag>
    {CONTACTS.map(({ region, name, email }) => (
      <p className="company-information-text" key={region}>
        <b className="subtitle">{region}</b>
        <br />
        {name}
        <br />
        <a href={`mailto:${email}`}>{email}</a>
      </p>
    ))}
    <p className="company-information-text">
      <b className="subtitle">All other regions</b>
      <br />
      Search Guard HQ, Berlin
      <br />
      <a href={otherRegionsHref}>{otherRegionsLinkText}</a>
    </p>
  </>
);

export default RegionalSalesContacts;
