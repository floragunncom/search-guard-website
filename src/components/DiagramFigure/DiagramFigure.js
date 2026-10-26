import React from 'react';
import { ReactSVG } from 'react-svg';
import { useTranslation } from 'react-i18next';
import { assetUrl } from '../../utils/assetUrl';

// Shared diagram / illustration slot (extracted from the Compliance page).
//
// Rules baked in — keep them when touching this component:
// - Always full content width with the text above it (never two columns).
// - The SVG is injected INLINE (ReactSVG) so its text picks up the site's
//   loaded fonts; the smallest label must stay >= 11px at a 1280px viewport.
// - No beforeInjection recoloring: diagrams keep their own brand colors.
// - Accessible name comes from the SVG's own <title>/<desc>.
// - The wrapping link is inert on desktop and active on mobile only (SCSS),
//   where it opens the raw SVG in a new tab for zooming.
//
// Props:
//   src            imported SVG asset. Falsy -> AssetPlaceholder is rendered.
//   headline       optional small h3 directly above the figure.
//   dark           set on dark (color-schema-dark) sections; flips the
//                  "tap to enlarge" caption color so it stays visible.
//   mat            draw a light-grey "figure mat" card around the artwork
//                  (gallery pattern: separates page copy from UI mock text).
//   placeholderAlt alt/aria-label for the placeholder while the asset does
//                  not exist yet — use the final alt text.
//   className      extra class on the outer wrapper.

export const AssetPlaceholder = ({ alt }) => (
    <div className="diagram-figure-placeholder" role="img" aria-label={alt}>
        <span>Image slot: {alt}</span>
    </div>
);

const DiagramFigure = ({ src, headline, dark, mat, placeholderAlt, className }) => {
    const { t } = useTranslation('common');

    const wrapperClass = ['diagram-figure', dark ? 'diagram-figure--dark' : '', className || '']
        .filter(Boolean)
        .join(' ');

    return (
        <div className={wrapperClass}>
            {headline && <h3 className="diagram-figure-headline">{headline}</h3>}
            {src ? (
                <>
                    <a
                        className={`diagram-figure-link${mat ? ' diagram-figure-link--mat' : ''}`}
                        href={assetUrl(src)}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <ReactSVG src={src} className="diagram-figure-svg" />
                    </a>
                    <p className="diagram-figure-enlarge" aria-hidden="true">{t('diagram.tapToEnlarge')}</p>
                </>
            ) : (
                <AssetPlaceholder alt={placeholderAlt} />
            )}
        </div>
    );
};

export default DiagramFigure;
