import React from 'react';
import { useTranslation } from 'react-i18next';
import ColumnedTile from "../../components/Tiles/ColumnedTile/ColumnedTile";

const AlertingBenefits = () => {
    const { t } = useTranslation('alerting');

    let benefits = [
        {
            headline: t('benefits.free.headline'),
            text: t('benefits.free.text'),
            button: {
                text: t('benefits.free.button'),
                href: "https://git.floragunn.com/search-guard/search-guard-suite-enterprise",
                target: "_blank"
            }
        },
        {
            headline: t('benefits.integrated.headline'),
            text: t('benefits.integrated.text'),
            button: {
                text: t('benefits.integrated.button'),
                href: "https://docs.search-guard.com/latest/elasticsearch-alerting-security-overview",
                target: "_blank"
            }
        },
        {
            headline: t('benefits.install.headline'),
            text: t('benefits.install.text'),
            button: {
                text: t('benefits.install.button'),
                href: "https://docs.search-guard.com/latest/search-guard-versions",
                target: "_blank"
            }
        },

    ]


    return (
        <ColumnedTile
            colorschema="light"
            wrapperclass="default-padding-top-bottom"
            columns={benefits}
            headline={t('benefits.headline')}/>
    );
};

export default AlertingBenefits;
