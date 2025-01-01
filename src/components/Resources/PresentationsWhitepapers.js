import React, { useEffect } from 'react';
import ColumnedTile from "../../components/Tiles/ColumnedTile/ColumnedTile";
import chalkboard from "../../images/person-chalkboard-solid.svg";
import file from "../../images/file-lines-regular.svg";

const PresentationsWhitepapers = () => {

    let presentationsWhitepapers = [
        {
            headline: "Presentations",
            text: "Browse our library of presentations on all Search Guard features.",
            image: {
                src: chalkboard,
                width: 150,
                height: 150,
            },
            button: {
                text: "Find out more",
                href: "/presentations/",
            },
        },
        {
            headline: "White Papers",
            text: "Download our whitepapers on Search Guard use cases and implementation examples.",
            image: {
                src: file,
                width: 150,
                height: 150,
            },
            button: {
                text: "Find out more",
                href: "/whitepapers/",
            },
        },
    ]

    return (
        <ColumnedTile colorschema="dark" wrapperclass="default-padding-top-bottom" columns={presentationsWhitepapers} />
    );
};

export default PresentationsWhitepapers;
