import TextTile from "../Tiles/TextTile/TextTile";
import React from "react";
import envelope from "../../images/icon-envelope.svg";
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '../../i18n/useLocalizedPath';

const CTAContactUs = ({colorschema}) => {
    const { t } = useTranslation('common');
    const lp = useLocalizedPath();

    return (
        <TextTile
            colorschema={colorschema}
            headline={t('cta.contactUs.headline')}
            text={t('cta.contactUs.text')}
            ctaText={t('cta.contactUs.button')}
            icon={envelope}
            link={lp('/contacts/')}
        />
    )
}

export default CTAContactUs;
