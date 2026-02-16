import TextTile from "../Tiles/TextTile/TextTile";
import ctaIcon from "../../images/icon-sg.svg";
import React from "react";
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '../../i18n/useLocalizedPath';

const CTAAIM = ({ colorschema }) => {
    const { t } = useTranslation('common');
    const lp = useLocalizedPath();

    return (
        <TextTile
            colorschema={colorschema}
            headline={t('cta.aim.headline')}
            text={t('cta.aim.text')}
            ctaText={t('cta.aim.button')}
            icon={ctaIcon}
            link="https://docs.search-guard.com/latest/automated-index-management"
            target="_blank"
        />
    )
}

export default CTAAIM;
