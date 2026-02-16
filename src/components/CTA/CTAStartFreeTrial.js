import TextTile from "../Tiles/TextTile/TextTile";
import ctaIcon from "../../images/icon-sg.svg";
import React from "react";
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '../../i18n/useLocalizedPath';

const CTAStartFreeTrial = ({ colorschema }) => {
    const { t } = useTranslation('common');
    const lp = useLocalizedPath();

    return (
        <TextTile
            colorschema={colorschema}
            headline={t('cta.freeTrial.headline')}
            text={t('cta.freeTrial.text')}
            ctaText={t('cta.freeTrial.button')}
            icon={ctaIcon}
            link={lp('/search-guard-free-trial/')}
        />)
}

export default CTAStartFreeTrial;
