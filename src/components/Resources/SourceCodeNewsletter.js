import React from 'react';
import { useTranslation } from 'react-i18next';
import ColumnedTile from "../../components/Tiles/ColumnedTile/ColumnedTile";
import nl from "../../images/envelope-open-text-solid.svg";
import file from "../../images/file-lines-regular.svg";

const SourceCodeNewsletter = () => {
    const { t } = useTranslation('resource');

    let sourceCodeNewsletter = [
        {
            headline: t('sourceCode.headline'),
            text: t('sourceCode.text'),
            image: {
                src: file,
                width: 150,
                height: 150,
            },
            button: {
                text: t('sourceCode.button'),
                href: "https://git.floragunn.com/public/",
                target: "_blank",
            },
        },
        {
            headline: t('newsletter.headline'),
            text: t('newsletter.text'),
            image: {
                src: nl,
                width: 150,
                height: 150,
            },
            button: {
                text: t('newsletter.button'),
                href: "/newsletter/",
            },
        },
    ]

    return (
        <ColumnedTile colorschema="dark" wrapperclass="default-padding-top-bottom" columns={sourceCodeNewsletter} />
    );
};

export default SourceCodeNewsletter;
