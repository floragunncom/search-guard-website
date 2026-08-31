import React from 'react';
import {useTranslation} from 'react-i18next';
import {ReactSVG} from 'react-svg';
import {getColorSchemaCSS, getColorSchemaCSSForSVG} from '../../utils/styleUtils';
// FA6 Free SVGs — download into src/images/ (see IMPLEMENTATION.md)
import shield from '../../images/shield-halved-solid.svg';
import scale from '../../images/scale-balanced-solid.svg';
import layers from '../../images/layer-group-solid.svg';
import headset from '../../images/headset-solid.svg'; // already in repo

const WhySearchGuard = ({colorschema = 'light'}) => {
    const { t } = useTranslation('home');

    const cards = [
        { icon: shield,  key: 'card1' },
        { icon: scale,   key: 'card2' },
        { icon: layers,  key: 'card3' },
        { icon: headset, key: 'card4' },
    ];

    return (
        <div className={`${getColorSchemaCSS(colorschema)} default-padding-top-bottom why-searchguard`}>
            <div className="row">
                <div className="col s12">
                    <h2 className="section-headline">{t('why.headline')}</h2>
                </div>
                {cards.map(({icon, key}) => (
                    <div className="col s12 m6 why-searchguard-card" key={key}>
                        <ReactSVG
                            src={icon}
                            className={getColorSchemaCSSForSVG(colorschema)}
                            beforeInjection={(svg) => {
                                svg.setAttribute('aria-hidden', 'true');
                                svg.setAttribute('width', '48');
                                svg.setAttribute('height', '48');
                            }}
                        />
                        <h3>{t(`why.${key}.headline`)}</h3>
                        <p>{t(`why.${key}.text`)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhySearchGuard;
