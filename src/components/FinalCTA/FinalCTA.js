import React from 'react';
import {useTranslation} from 'react-i18next';
import ColumnedTile from "../../components/Tiles/ColumnedTile/ColumnedTile";
// FA6 Free SVGs (see redesign/impl/IMPLEMENTATION.md)
import rocket from '../../images/rocket-solid.svg';
import calendar from '../../images/calendar-check-solid.svg';
import signature from '../../images/file-signature-solid.svg';

// Final CTA (redesign Task 8) — built on ColumnedTile: equal-height cards,
// copy aligned via the reserved headline block (see finalcta-section styles),
// buttons bottom-anchored by the tile's button container.
const FinalCTA = ({colorschema = 'white'}) => {
    const { t } = useTranslation('home');

    const paths = [
        { icon: rocket,    key: 'try', link: '/search-guard-free-trial/' },
        { icon: calendar,  key: 'see', link: '/contacts/' },
        { icon: signature, key: 'buy', link: '/contacts/' },
    ];

    const columns = paths.map(({icon, key, link}) => ({
        headline: t(`finalcta.${key}.headline`),
        text: t(`finalcta.${key}.text`),
        image: {
            src: icon,
            width: 100,
            height: 100,
        },
        button: {
            text: t(`finalcta.${key}.button`),
            href: link,
        },
    }));

    return (
        <ColumnedTile
            colorschema={colorschema}
            wrapperclass="default-padding-top-bottom finalcta-section"
            alignedHeadlines
            headline={t('finalcta.headline')}
            columns={columns}
        />
    );
};

export default FinalCTA;
