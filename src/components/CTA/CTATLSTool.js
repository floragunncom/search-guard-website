import TextTile from "../Tiles/TextTile/TextTile";
import ctaIcon from "../../images/icon-sg.svg";
import React from "react";
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '../../i18n/useLocalizedPath';

const CTATLSTool = ({ colorschema }) => {
    const { t } = useTranslation('common');
    const lp = useLocalizedPath();

    return (
        <TextTile
            colorschema={colorschema}
            headline={t('cta.tlsTool.headline')}
            text={t('cta.tlsTool.text')}
            ctaText={t('cta.tlsTool.button')}
            icon={ctaIcon}
            target="_blank"
            link="https://docs.search-guard.com/latest/offline-tls-tool"
        />)
}

export default CTATLSTool;
