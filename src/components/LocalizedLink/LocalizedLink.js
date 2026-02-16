import React from 'react';
import { useLocalizedPath } from '../../i18n/useLocalizedPath';

/**
 * An <a> tag wrapper that automatically prepends the current locale prefix
 * to internal hrefs. External URLs and anchors are passed through unchanged.
 */
const LocalizedLink = ({ href, children, ...rest }) => {
  const lp = useLocalizedPath();
  return (
    <a href={lp(href)} {...rest}>
      {children}
    </a>
  );
};

export default LocalizedLink;
