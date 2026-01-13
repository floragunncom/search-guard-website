import React from 'react';
import {ReactSVG} from 'react-svg';
import "./ColumnedTile.scss";
import Button from "../../Button/Button.jsx";
import {getColorSchemaCSS, getColorSchemaCSSForSVG} from '../../../utils/styleUtils';

const ColumnedTile = ({colorschema, svgcolor, wrapperclass, headline, columns}) => {

    if (!columns || !Array.isArray(columns)) {
        throw new Error('The "columns" property is required and must be an array.');
    }

    let baseCss = getColorSchemaCSS(colorschema);

    // if SVG does not need a color set, use the color schema as default
    if (!svgcolor) {
        svgcolor = colorschema;
    }

    let imageCss = getColorSchemaCSSForSVG(svgcolor);

    // Helper function to check if the image is SVG
    const isSVG = (src) => {
        return src.toLowerCase().endsWith('.svg');
    };

    const renderImage = (imageJSON, imageCSS, headline) => {
        if (isSVG(imageJSON.src)) {
            return (
                <ReactSVG
                    src={imageJSON.src}
                    className={imageCSS}
                    beforeInjection={(svg) => {
                        svg.setAttribute('width', imageJSON.width);
                        svg.setAttribute('height', imageJSON.height);
                        svg.setAttribute('title', imageJSON.alt);
                    }}
                />
            );
        } else {
            return (
                <img
                    src={imageJSON.src}
                    alt={imageJSON.alt}
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

            <div className={`row columnedtile-row ${baseCss}`}>
                {columns.map((col, index) => (
                    <div key={index} className={`col s12 m${12 / columns.length} ${baseCss}`}>
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