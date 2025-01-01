import React, { useEffect } from 'react';
import ColumnedTile from "../../components/Tiles/ColumnedTile/ColumnedTile";
import nl from "../../images/envelope-open-text-solid.svg";
import file from "../../images/file-lines-regular.svg";

const SourceCodeNewsletter = () => {

    let sourceCodeNewsletter = [
        {
            headline: "Source Code",
            text: "Access, download and inspect all our code on Gitlab, report any issue you find or request a feature.",
            image: {
                src: file,
                width: 150,
                height: 150,
            },
            button: {
                text: "Find out more",
                href: "https://git.floragunn.com/public/",
                target: "_blank",
            },
        },
        {
            headline: "Newsletter",
            text: "Join our Newsletter and get the latest updates on Search Guard.",
            image: {
                src: nl,
                width: 150,
                height: 150,
            },
            button: {
                text: "Find out more",
                href: "/newsletter/",
            },
        },
    ]

    return (
        <ColumnedTile colorschema="dark" wrapperclass="default-padding-top-bottom" columns={sourceCodeNewsletter} />
    );
};

export default SourceCodeNewsletter;
