import React from 'react';
import {useTranslation} from 'react-i18next';
import Button from '../Button/Button';
import {ReactSVG} from 'react-svg';
import {getColorSchemaCSS, getColorSchemaCSSForSVG} from '../../utils/styleUtils';
// FA6 Free SVGs — download into src/images/ (see IMPLEMENTATION.md)
import rocket from '../../images/rocket-solid.svg';
import calendar from '../../images/calendar-check-solid.svg';
import signature from '../../images/file-signature-solid.svg';

const FinalCTA = ({colorschema = 'white'}) => {
    const { t } = useTranslation('home');

    const paths = [
        { icon: rocket,    key: 'try', link: '/search-guard-free-trial/' },
        { icon: calendar,  key: 'see', link: '/contacts/' },
        { icon: signature, key: 'buy', link: '/contacts/' },
    ];

    return (
        <div className={`${getColorSchemaCSS(colorschema)} default-padding-top-bottom final-cta`}>
            <div className="row">
                <div className="col s12">
                    <h2 className="section-headline">{t('finalcta.headline')}</h2>
                </div>
                {paths.map(({icon, key, link}) => (
                    <div className="col s12 m4 final-cta-card" key={key}>
                        <ReactSVG
                            src={icon}
                            className={getColorSchemaCSSForSVG(colorschema)}
                            beforeInjection={(svg) => {
                                svg.setAttribute('aria-hidden', 'true');
                                svg.setAttribute('width', '40');
                                svg.setAttribute('height', '40');
                            }}
                        />
                        <h3>{t(`finalcta.${key}.headline`)}</h3>
                        <p>{t(`finalcta.${key}.text`)}</p>
                        <Button text={t(`finalcta.${key}.button`)} link={link}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FinalCTA;
