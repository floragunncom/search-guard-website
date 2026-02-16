import React from 'react';
import { useTranslation } from 'react-i18next';
import ColumnedTile from "../../components/Tiles/ColumnedTile/ColumnedTile";
import dharma from "../../images/dharmachakra-solid.svg";
import eye from "../../images/eye-slash-solid.svg";

const CVEDisclosure = ({colorschema}) => {
    const { t } = useTranslation('resource');
    let style = "dark";
    if (colorschema) {
        style = colorschema;
    }

    let cveDisclosure = [
        {
            headline: t('cveAdvisory.headline'),
            text: t('cveAdvisory.text'),
            image: {
                src: dharma,
                width: 150,
                height: 150,
            },
            button: {
                text: t('cveAdvisory.button'),
                href: "/cve-advisory/",
            },
        },
        {
            headline: t('disclosurePolicy.headline'),
            text: t('disclosurePolicy.text'),
            image: {
                src: eye,
                width: 150,
                height: 150,
            },
            button: {
                text: t('disclosurePolicy.button'),
                href: "/disclosure-policy/",
            },
        },
    ]

    return (
        <ColumnedTile colorschema={style} wrapperclass="default-padding-top-bottom" columns={cveDisclosure} />
    );
};

export default CVEDisclosure;
