import React from 'react';
import { useTranslation } from 'react-i18next';
import ColumnedTile from "../../components/Tiles/ColumnedTile/ColumnedTile";
import people from "../../images/people-arrows-solid.svg";
import book from "../../images/book-solid.svg";

const DocumentationForum = () => {
    const { t } = useTranslation('resource');

    let documentationForum = [
        {
            headline: t('documentation.headline'),
            text: t('documentation.text'),
            image: {
                src: book,
                width: 150,
                height: 150,
            },
            button: {
                text: t('documentation.button'),
                href: "https://docs.search-guard.com/",
                target: "_blank",
            },
        },
        {
            headline: t('forum.headline'),
            text: t('forum.text'),
            image: {
                src: people,
                width: 150,
                height: 150,
            },
            button: {
                text: t('forum.button'),
                href: "https://forum.search-guard.com/",
                target: "_blank",
            },
        },
    ]

    return (
        <ColumnedTile colorschema="dark" wrapperclass="default-padding-top-bottom" columns={documentationForum} />
    );
};

export default DocumentationForum;
