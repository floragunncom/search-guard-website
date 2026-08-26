import React from 'react';
import {useTranslation} from 'react-i18next';
import ColumnedTile from "../../components/Tiles/ColumnedTile/ColumnedTile";
// FA6 Free SVGs (see redesign/impl/IMPLEMENTATION.md)
import shield from '../../images/shield-halved-solid.svg';
import scale from '../../images/scale-balanced-solid.svg';
import layers from '../../images/layer-group-solid.svg';
import headset from '../../images/headset-solid.svg';

// "Why teams choose Search Guard" (redesign Task 2) — built on ColumnedTile so
// the cards share the icon/headline alignment of the other tile sections.
const WhySearchGuard = ({colorschema = 'light'}) => {
    const { t } = useTranslation('home');

    const cards = [
        { icon: shield,  key: 'card1' },
        { icon: scale,   key: 'card2' },
        { icon: layers,  key: 'card3' },
        { icon: headset, key: 'card4' },
    ];

    const columns = cards.map(({icon, key}) => ({
        headline: t(`why.${key}.headline`),
        text: t(`why.${key}.text`),
        image: {
            src: icon,
            width: 100,
            height: 100,
        },
    }));

    return (
        <ColumnedTile
            colorschema={colorschema}
            wrapperclass="why-searchguard"
            headline={t('why.headline')}
            columns={columns}
        />
    );
};

export default WhySearchGuard;
