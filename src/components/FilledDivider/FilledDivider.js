import React from 'react';
import {ReactSVG} from 'react-svg';
import {getColorSchemaCSS, getColorSchemaCSSForSVG} from "../../utils/styleUtils";
import bg_arrow from '../../images/arrows_group.svg';

const FilledDivider = ( {colorschema} ) => {

    let baseCss = getColorSchemaCSS(colorschema);
    let imageCss = getColorSchemaCSSForSVG(colorschema);

    return (
        <div className={baseCss}>
            <div className="row ">
                <div className="col s12 m12 center default-margin-top-bottom">
                    <ReactSVG
                        src={bg_arrow}
                        className={`${imageCss}`}
                        alt="background arrows"
                        beforeInjection={(svg) => {
                            svg.querySelectorAll('*').forEach((element) => {
                                element.removeAttribute('fill');
                                element.removeAttribute('stroke');
                                element.removeAttribute('filter');
                                element.removeAttribute('mask');
                            });
                            svg.setAttribute('width', "100%");
                            svg.setAttribute('height', "auto");
                            svg.setAttribute('class', imageCss);
                        }}
                    />
                </div>
            </div>
        </div>
    )
};

export default FilledDivider;