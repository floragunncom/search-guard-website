import React from 'react';
import {ReactSVG} from 'react-svg';
import Button from "../../Button/Button";
import {getColorSchemaCSS, getColorSchemaCSSForSVG} from '../../../utils/styleUtils';

// columnsPerRow (optional): grid columns per row on medium+ screens. Defaults to
// one row holding all columns (12 / columns.length). Use it when the column
// count does not divide the 12-column grid (e.g. 5 items in rows of 3) — the
// flex row wraps and centers a partial last row.
// subheadline (optional): intro text rendered centered under the headline.
const ColumnedTile = ({colorschema, svgcolor, wrapperclass, headline, subheadline, columns, columnsPerRow}) => {

    if (!columns || !Array.isArray(columns)) {
        throw new Error('The "columns" property is required and must be an array.');
    }

    const colSize = 12 / (columnsPerRow || columns.length);

    let baseCss = getColorSchemaCSS(colorschema);

    // if SVG does not need a color set, use the color schema as default
    if (!svgcolor) {
        svgcolor = colorschema;
    }

    let imageCss = getColorSchemaCSSForSVG(svgcolor);

    const getInlineSvgColor = (imageCSS) => {
        if (imageCSS === 'color-schema-svg-light') {
            return '#02F0DD';
        }
        if (imageCSS === 'color-schema-svg-dark' || imageCSS === 'color-schema-svg-white') {
            return '#B0F8F2';
        }
        return null;
    };

    const resolveAssetSrc = (src) => {
        if (typeof src === 'string') {
            return src;
        }
        if (src && typeof src === 'object' && typeof src.src === 'string') {
            return src.src;
        }
        if (src && typeof src === 'object' && typeof src.default === 'string') {
            return src.default;
        }
        return '';
    };

    // Helper function to check if the image is SVG
    const isSVG = (src) => {
        const resolvedSrc = resolveAssetSrc(src);
        if (!resolvedSrc) {
            return false;
        }
        const normalizedSrc = resolvedSrc.split('?')[0].split('#')[0];
        return normalizedSrc.toLowerCase().endsWith('.svg');
    };

    const renderImage = (imageJSON, imageCSS, headline) => {
        const source = resolveAssetSrc(imageJSON.src);

        if (isSVG(imageJSON.src)) {
            return (
                <ReactSVG
                    src={source}
                    beforeInjection={(svg) => {
                        const inlineSvgColor = getInlineSvgColor(imageCSS);
                        svg.querySelectorAll('*').forEach((element) => {
                            element.removeAttribute('fill');
                            element.removeAttribute('stroke');
                            element.removeAttribute('style');
                            if (inlineSvgColor) {
                                element.setAttribute('fill', inlineSvgColor);
                                element.setAttribute('stroke', inlineSvgColor);
                            }
                        });
                        svg.setAttribute('width', imageJSON.width);
                        svg.setAttribute('height', imageJSON.height);
                        svg.setAttribute('class', imageCSS);
                        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
                        svg.setAttribute('aria-hidden', 'true');
                        if (inlineSvgColor) {
                            svg.setAttribute('fill', inlineSvgColor);
                            svg.setAttribute('stroke', inlineSvgColor);
                        }
                        svg.setAttribute('title', imageJSON.alt);
                    }
                    }
                />
            );
        } else {
            return (
                <img
                    src={source}
                    alt={imageJSON.alt}
                    width={imageJSON.width}
                    height={imageJSON.height}
                    className={`responsive-img ${imageCSS}`}
                />
            );
        }
    }

    return (
        <div className={`columnedtile default-padding-top-bottom ${baseCss} ${wrapperclass}`}>
            {headline && (
                <div className={`row ${baseCss}`}>
                    <h2 className="col s12 columnedtile-wrapper-headline">
                        {headline}
                    </h2>
                </div>
            )}

            {subheadline && (
                <div className={`row ${baseCss}`}>
                    <div className="col s12">
                        <div className="columnedtile-subheadline">{subheadline}</div>
                    </div>
                </div>
            )}

            <div className={`row columnedtile-row ${baseCss}`}>
                {columns.map((col, index) => (
                    <div key={index} className={`col s12 m${colSize} ${baseCss}`}>
                        <div className="columnedtile-container">
                            {col.image &&
                                <div className="columnedtile-icon-wrapper">
                                    {renderImage(col.image, imageCss, col.headline)}
                                </div>
                            }

                            {(col.headline || col.text) &&
                                <div className="columnedtile-text-wrapper">
                                    {col.headline &&
                                        <h2 className={`${baseCss} columnedtile-headline`}>{col.headline}</h2>
                                    }
                                    {col.text &&
                                        <div className="body1 columnedtile-content">
                                            {col.text}
                                        </div>
                                    }
                                </div>
                            }

                            {col.button && (
                                <div className="columnedtile-button-container">
                                    <Button
                                        text={col.button.text}
                                        link={col.button.href}
                                        target={col.button.target}
                                    />
                                </div>
                            )}

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ColumnedTile;
