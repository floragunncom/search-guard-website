import React, { useEffect } from 'react';
import ColumnedTile from "../../components/Tiles/ColumnedTile/ColumnedTile";
import people from "../../images/people-arrows-solid.svg";
import book from "../../images/book-solid.svg";

const DocumentationForum = () => {

    let documentationForum = [
        {
            headline: "Documentation",
            text: "Get the official technical documentation for all Search Guard versions.",
            image: {
                src: book,
                width: 150,
                height: 150,
            },
            button: {
                text: "Find out more",
                href: "https://docs.search-guard.com/",
                target: "_blank",
            },
        },
        {
            headline: "Community forum",
            text: "Any questions on installation or configuration? Ask our community forum.",
            image: {
                src: people,
                width: 150,
                height: 150,
            },
            button: {
                text: "Find out more",
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
