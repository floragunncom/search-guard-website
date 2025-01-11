import React from 'react';
import {ReactSVG} from 'react-svg';
import "./ColumnedTile.scss";
import Button from "../../Button/Button";
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
                                    <ReactSVG
                                        src={col.image.src}
                                        beforeInjection={(svg) => {
                                            svg.setAttribute('width', col.image.width);
                                            svg.setAttribute('height', col.image.height);
                                            svg.setAttribute('class', imageCss);
                                            svg.setAttribute('title', col.headline);
                                        }
                                        }
                                    />
                                </div>
                            }

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

                            <div className="columnedtile-button-container">
                                {col.button && (
                                    <Button
                                        text={col.button.text}
                                        link={col.button.href}
                                        target={col.button.target}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ColumnedTile;