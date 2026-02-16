import React from 'react';
import { useTranslation } from 'react-i18next';
import ColumnedTile from "../../components/Tiles/ColumnedTile/ColumnedTile";
import shieldWheel from "../../images/shield-halved.svg";

const ComplianceFeatures = () => {
    const { t } = useTranslation('compliance');

    let complianceFeatures = [
        {
            headline: t('features.encryption.headline'),
            text: t('features.encryption.text'),
            image: {
                src: shieldWheel,
                width: 150,
                height: 150,
            },
        },
        {
            headline: t('features.anonymization.headline'),
            text: t('features.anonymization.text'),
            image: {
                src: shieldWheel,
                width: 150,
                height: 150,
            },
        },
        {
            headline: t('features.auditTrails.headline'),
            text: t('features.auditTrails.text'),
            image: {
                src: shieldWheel,
                width: 150,
                height: 150,
            },
        },
    ]

    return (
        <ColumnedTile colorschema="white" wrapperclass="default-padding-top-bottom" columns={complianceFeatures} />
    );
};

export default ComplianceFeatures;
