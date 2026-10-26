import React from 'react';

// Plain text link to documentation or an internal route. External (http)
// targets open in a new tab with the usual rel hardening; internal paths
// stay in-tab. Pass already-localized internal paths (useLocalizedPath).
export const docLink = (href, label) => (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
        {label}
    </a>
);

const DocLink = ({ href, children }) => docLink(href, children);

export default DocLink;
