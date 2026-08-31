import React from 'react';
import {useTranslation} from 'react-i18next';
import ColumnedTile from "../../components/Tiles/ColumnedTile/ColumnedTile";
import {getColorSchemaCSS} from '../../utils/styleUtils';
// FA6 Free SVGs (see redesign/impl/IMPLEMENTATION.md)
import shield from '../../images/shield-halved-solid.svg';
import bell from '../../images/bell-solid.svg';
import drive from '../../images/hard-drive-solid.svg';
import boxes from '../../images/boxes-stacked-solid.svg';
import wave from '../../images/wave-square-solid.svg';

// Product pillars (redesign Task 3) — built on ColumnedTile: five cards in
// rows of three (columnsPerRow), a centered partial last row, and the
// standard per-column button linking to each product page.
const ProductPillars = ({colorschema = 'dark'}) => {
    const { t } = useTranslation('home');

    const pillars = [
        { icon: shield, key: 'security',         link: '/security/',           preview: false },
        { icon: bell,   key: 'alerting',         link: '/alerting/',           preview: false },
        { icon: drive,  key: 'encryption',       link: '/encryption-at-rest/', preview: false },
        { icon: boxes,  key: 'indexManagement',  link: '/indexmanagement/',    preview: true },
        { icon: wave,   key: 'anomalyDetection', link: '/anomaly-detection/',  preview: true },
    ];

    const columns = pillars.map(({icon, key, link, preview}) => ({
        headline: (
            <>
                {t(`pillars.${key}.headline`)}
                {preview && <span className="preview-badge">{t('pillars.previewBadge')}</span>}
            </>
        ),
        text: t(`pillars.${key}.text`),
        image: {
            src: icon,
            width: 100,
            height: 100,
        },
        button: {
            text: t('pillars.button'),
            href: link,
        },
    }));

    return (
        <>
            <ColumnedTile
                colorschema={colorschema}
                wrapperclass="product-pillars"
                headline={t('pillars.headline')}
                subheadline={t('pillars.intro')}
                columns={columns}
                columnsPerRow={3}
            />
            <div className={`${getColorSchemaCSS(colorschema)} product-pillars-note-wrapper`}>
                <p className="product-pillars-note">{t('pillars.previewNote')}</p>
            </div>
        </>
    );
};

export default ProductPillars;
