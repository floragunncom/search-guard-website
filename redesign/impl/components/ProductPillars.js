import React from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {ReactSVG} from 'react-svg';
import {getColorSchemaCSS, getColorSchemaCSSForSVG} from '../../utils/styleUtils';
// FA6 Free SVGs — download into src/images/ (see IMPLEMENTATION.md)
import shield from '../../images/shield-halved-solid.svg';
import bell from '../../images/bell-solid.svg';
import drive from '../../images/hard-drive-solid.svg';
import boxes from '../../images/boxes-stacked-solid.svg';
import wave from '../../images/wave-square-solid.svg';

const ProductPillars = ({colorschema = 'dark'}) => {
    const { t } = useTranslation('home');

    const pillars = [
        { icon: shield, key: 'security',        link: '/security/',          preview: false },
        { icon: bell,   key: 'alerting',        link: '/alerting/',          preview: false },
        { icon: drive,  key: 'encryption',      link: '/encryption-at-rest/', preview: false },
        { icon: boxes,  key: 'indexManagement', link: '/index-management/',  preview: true },
        { icon: wave,   key: 'anomalyDetection', link: '/anomaly-detection/', preview: true },
    ];

    return (
        <div className={`${getColorSchemaCSS(colorschema)} default-padding-top-bottom product-pillars`}>
            <div className="row">
                <div className="col s12">
                    <h2 className="section-headline">{t('pillars.headline')}</h2>
                    <p className="product-pillars-intro">{t('pillars.intro')}</p>
                </div>
                {pillars.map(({icon, key, link, preview}) => (
                    <div className="col s12 m6 l4 product-pillars-card" key={key}>
                        <Link to={link}>
                            <ReactSVG
                                src={icon}
                                className={getColorSchemaCSSForSVG(colorschema)}
                                beforeInjection={(svg) => {
                                    svg.setAttribute('aria-hidden', 'true');
                                    svg.setAttribute('width', '40');
                                    svg.setAttribute('height', '40');
                                }}
                            />
                            <h3>
                                {t(`pillars.${key}.headline`)}
                                {preview && <span className="preview-badge">{t('pillars.previewBadge')}</span>}
                            </h3>
                            <p>{t(`pillars.${key}.text`)}</p>
                        </Link>
                    </div>
                ))}
                <div className="col s12">
                    <p className="product-pillars-note">{t('pillars.previewNote')}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductPillars;
