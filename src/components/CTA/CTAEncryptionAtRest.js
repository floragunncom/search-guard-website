import React from "react";
import TextTile from "../Tiles/TextTile/TextTile";
import envelope from "../../images/icon-envelope.svg";
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '../../i18n/useLocalizedPath';

const CTAEncryptionAtRest = ({ colorschema }) => {
    const { t } = useTranslation('common');
    const lp = useLocalizedPath();

    return (
        <TextTile
            colorschema={colorschema}
            headline={t('cta.encryptionAtRest.headline')}
            text={t('cta.encryptionAtRest.text')}
            ctaText={t('cta.encryptionAtRest.button')}
            icon={envelope}
            link={lp('/contacts/')}
        />)
}

export default CTAEncryptionAtRest;
