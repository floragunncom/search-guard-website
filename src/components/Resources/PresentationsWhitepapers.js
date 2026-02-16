import React from 'react';
import { useTranslation } from 'react-i18next';
import ColumnedTile from "../../components/Tiles/ColumnedTile/ColumnedTile";
import chalkboard from "../../images/person-chalkboard-solid.svg";
import file from "../../images/file-lines-regular.svg";

const PresentationsWhitepapers = () => {
    const { t } = useTranslation('resource');

    let presentationsWhitepapers = [
        {
            headline: t('presentations.headline'),
            text: t('presentations.text'),
            image: {
                src: chalkboard,
                width: 150,
                height: 150,
            },
            button: {
                text: t('presentations.button'),
                href: "/presentations/",
            },
        },
        {
            headline: t('whitepapers.headline'),
            text: t('whitepapers.text'),
            image: {
                src: file,
                width: 150,
                height: 150,
            },
            button: {
                text: t('whitepapers.button'),
                href: "/whitepapers/",
            },
        },
    ]

    return (
        <ColumnedTile colorschema="dark" wrapperclass="default-padding-top-bottom" columns={presentationsWhitepapers} />
    );
};

export default PresentationsWhitepapers;
