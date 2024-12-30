import React from 'react';
import "./ColumnedTile.scss";
import Button from "../../Button/Button";
import { getColorSchemaCSS  } from '../../../utils/styleUtils';
const ColumnedTile = ({colorschema, wrapperclass, headline, columns}) => {

    if (!columns || !Array.isArray(columns)) {
        throw new Error('The "columns" property is required and must be an array.');
    }

    let baseCss = getColorSchemaCSS(colorschema);
    let imageCss;

    // correct image color on dark bg
    if (colorschema === "dark") {
        imageCss = "image-on-dark-bg"
    }
    return (
        <div className={`columnedtile ${baseCss} ${wrapperclass}`}>
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
                                <img
                                    className={`${imageCss} columnedtile-icons`}
                                    loading="lazy"
                                    src={col.image.src}
                                    width={col.image.width}
                                    height={col.image.height}/>
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
                                buttonStyle="light-green-button"
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