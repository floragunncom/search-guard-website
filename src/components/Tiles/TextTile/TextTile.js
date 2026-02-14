import React from 'react';
import Button from '../../Button/Button';
import {getColorSchemaCSS} from "../../../utils/styleUtils";

const TextTile = ({ colorschema, headline, text, ctaText, link, target }) => {

    let baseCSS = getColorSchemaCSS(colorschema);

    return (
        <div className={`${baseCSS} texttile-container default-padding-top-bottom`}>
            <div className="row texttile-row-wrapper">
                <div className="texttile-row col s12 m12">
                    <div className="texttile-text-container">
                        {headline &&
                            <h2 className="texttile-headline">{headline}</h2>
                        }
                        {text &&
                            <div className="body-din texttile-text">{text}</div>
                        }
                        {link && link.length > 0 && ctaText && ctaText.length > 0 &&
                            <Button text={ctaText}  link={link} target={target}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TextTile;
