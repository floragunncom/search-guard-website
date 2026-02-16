import TextTile from "../Tiles/TextTile/TextTile";
import React from "react";
import folderGlass from "../../images/folder-glass.svg";
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '../../i18n/useLocalizedPath';

const CTAResourceHub = ({colorschema}) => {
    const { t } = useTranslation('common');
    const lp = useLocalizedPath();

    return (
        <TextTile
            colorschema={colorschema}
            headline={t('cta.resourceHub.headline')}
            text={t('cta.resourceHub.text')}
            ctaText={t('cta.resourceHub.button')}
            icon={folderGlass}
            link={lp('/resource/')}
        />
    )
}

export default CTAResourceHub;
