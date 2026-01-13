import React from 'react';
import './ImageTextTile.scss';
import {getColorSchemaCSS, getColorSchemaCSSForSVG} from "../../../utils/styleUtils";
import {ReactSVG} from "react-svg";

const TileSimple = ({
                        colorschema,
                        svgcolor,
                        iconPosition,
                        icon,
                        headline,
                        text,
                    }) => {

    let baseCSS = getColorSchemaCSS(colorschema);

    // if SVG does not need a color set, use the color schema as default
    if (!svgcolor) {
        svgcolor = colorschema;
    }

    // CSS for the SVG
    let imageCSS = getColorSchemaCSSForSVG(svgcolor);

    // if iconposition is right we need to change the text/image order
    let columndefinitionImage = "col s12 l6"; // default for left image
    let columndefinitionText = "col s12 l6"; // default for right text

    if (iconPosition === 'right') {
        columndefinitionImage = "col s12 push-m6 m6";
        columndefinitionText = "col s12 pull-m6 m6";
    }

    return (
        <div>
            <div className={baseCSS}>
                <div className="row tile-row">
                    <div className={`${columndefinitionImage} texttile-icon-wrapper`}>
                        <ReactSVG
                            src={icon}
                            title="Title"
                            beforeInjection={(svg) => {
                                svg.querySelectorAll('*').forEach((element) => {
                                    element.removeAttribute('fill');
                                    element.removeAttribute('stroke');
                                    element.removeAttribute('filter');
                                    element.removeAttribute('mask');
                                    element.removeAttribute('style');
                                    element.removeAttribute('class');
                                });
                                svg.setAttribute('width', "100%");
                                svg.setAttribute('height', "auto");
                                svg.setAttribute('preserveAspectRatio', "xMidYMid meet");
                                svg.setAttribute('title', headline);
                                svg.setAttribute('class', imageCSS);
                            }}
                        />
                    </div>
                    <div className={columndefinitionText}>
                        <div className="texttile-content-wrapper">
                            <h3 className={`${baseCSS} texttile-headline`}>{headline}</h3>
                            <div>{text}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TileSimple;
