import React from 'react';
import './ImageTextTile.scss';
import {getColorSchemaCSS, getColorSchemaCSSForSVG} from "../../../utils/styleUtils";
import {ReactSVG} from "react-svg";

const ImageTextTile = ({
                           colorschema,
                           svgcolor,
                           backgroundColor,
                           iconPosition,
                           icon,
                           headline,
                           text,
                       }) => {
    let tilePosition;
    let wrapperStyle;
    let iconStyle;
    let contentStyle;
    let textStyle;
    let baseCSS;
    let imageCSS;


    baseCSS = getColorSchemaCSS(colorschema);

    // if SVG does not need a color set, use the color schema as default
    if (!svgcolor) {
        svgcolor = colorschema;
    }

    imageCSS = getColorSchemaCSSForSVG(svgcolor);

    if (backgroundColor === 'dark') {
        wrapperStyle = 'tilesimple-wrapper-dark';
        textStyle = 'tilesimple-text-dark';
    }

    if (backgroundColor === 'light') {
        wrapperStyle = 'tilesimple-wrapper-light';
        textStyle = 'tilesimple-text-light';
    }

    if (backgroundColor === 'white') {
        wrapperStyle = 'tilesimple-wrapper-white';
        textStyle = 'tilesimple-text-white';
    }

    if (iconPosition === 'left') {
        iconStyle = 'tilesimple-icon-style-left';
        contentStyle = 'tilesimple-content-wrapper-left';
    } else {
        iconStyle = 'tilesimple-icon-style-right';
        contentStyle = 'tilesimple-content-wrapper-right';
    }


    if (iconPosition === 'left') {
        tilePosition = (
            <div className={baseCSS}>
                <div className="row tile-row">
                    <div className="col s12 l6 tilesimple-icon-wrapper-left tilesimple-icon-style-left ">
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
                                svg.setAttribute('max-height', "320px");
                                svg.setAttribute('class', imageCSS );
                                svg.setAttribute('title', headline );
                            }}
                        />
                    </div>
                    <div className="col s12 l6">
                        <div className={contentStyle}>
                            <h3 className={`${baseCSS} tilesimple-headline`}>{headline}</h3>
                            <div className={`${baseCSS} tilesimple-text`}>{text}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        tilePosition = (
            <div className={baseCSS}>
                <div className="row tilesimple-change-order tile-row">
                    <div className="col s12 push-l6 l6 tilesimple-icon-wrapper-right">
                        <ReactSVG
                            src={icon}
                            alt="background arrows"
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
                                svg.setAttribute('max-height', "320px");
                                svg.setAttribute('class', imageCSS );
                                svg.setAttribute('title', headline );
                            }}
                        />
                    </div>
                    <div className="col s12 pull-l6 l6">
                        <div className={contentStyle}>
                            <h3 className={`${baseCSS} tilesimple-headline`}>{headline}</h3>
                            <div className={`${baseCSS} tilesimple-text`}>{text}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <div>{tilePosition}</div>;
};

export default ImageTextTile