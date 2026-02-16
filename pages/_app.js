import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import '../src/i18n/config';
import '../styles/main.scss';

const normalizeAssetProp = (value) => {
  if (!value || typeof value !== 'object') {
    return value;
  }

  if (typeof value.src === 'string') {
    return value.src;
  }

  if (typeof value.default === 'string') {
    return value.default;
  }

  return value;
};

if (!React.__SG_ASSET_PATCHED__) {
  const originalCreateElement = React.createElement;

  React.createElement = (type, props, ...children) => {
    if (!props) {
      return originalCreateElement(type, props, ...children);
    }

    let nextProps = props;
    const normalizedSrc = normalizeAssetProp(props.src);
    if (normalizedSrc !== props.src) {
      nextProps = { ...nextProps, src: normalizedSrc };
    }

    return originalCreateElement(type, nextProps, ...children);
  };

  React.__SG_ASSET_PATCHED__ = true;
}

export default function App({ Component, pageProps }) {
  if (typeof window === 'undefined') {
    return <Component {...pageProps} />;
  }

  return (
    <HelmetProvider>
      <Component {...pageProps} />
    </HelmetProvider>
  );
}
