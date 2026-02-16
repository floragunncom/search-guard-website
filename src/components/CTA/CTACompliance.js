import TextTile from "../Tiles/TextTile/TextTile";
import ctaIcon from "../../images/icon-sg.svg";
import React from "react";
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '../../i18n/useLocalizedPath';

const CTACompliance = ({colorschema}) => {
    const { t } = useTranslation('common');
    const lp = useLocalizedPath();

    return (
        <TextTile
            colorschema={colorschema}
            headline={t('cta.compliance.headline')}
            text={t('cta.compliance.text')}
            ctaText={t('cta.compliance.button')}
            icon={ctaIcon}
            link={lp('/search-guard-free-trial/')}
        />
    )
}

export default CTACompliance;
