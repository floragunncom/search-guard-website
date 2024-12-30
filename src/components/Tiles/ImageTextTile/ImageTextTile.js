import React from 'react';
import './ImageTextTile.scss';
import {LazyLoadImage} from "react-lazy-load-image-component";

const ImageTextTile = ({
                        backgroundColor,
                        iconPosition,
                        icon,
                        iconClass,
                        headline,
                        text,
                    }) => {
    let tilePosition;
    let wrapperStyle;
    let iconStyle;
    let contentStyle;
    let textStyle;

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
            <div className={wrapperStyle}>
                <div className="row tile-row">
                    <div className="col s12 l6 tilesimple-icon-wrapper-left">
                        <LazyLoadImage
                            src={icon} className={`${iconStyle} ${iconClass}`} alt="tile icon"
                        />
                    </div>
                    <div className="col s12 l6">
                        <div className={contentStyle}>
                            <h3 className={`${textStyle} tilesimple-headline`}>{headline}</h3>
                            <div className={`${textStyle} tilesimple-text`}>{text}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        tilePosition = (
            <div className={wrapperStyle}>
                <div className="row tilesimple-change-order tile-row">
                    <div className="col s12 push-l6 l6 tilesimple-icon-wrapper-right">
                        <LazyLoadImage
                            src={icon} className={`${iconStyle} ${iconClass}`} alt="tile icon"
                        />
                    </div>
                    <div className="col s12 pull-l6 l6">
                        <div className={contentStyle}>
                            <h3 className={`${textStyle} tilesimple-headline`}>{headline}</h3>
                            <div className={`${textStyle} tilesimple-text`}>{text}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <div>{tilePosition}</div>;
};

export default ImageTextTile;
