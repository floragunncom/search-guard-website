import React, { useEffect } from 'react';
import ColumnedTile from "../../components/Tiles/ColumnedTile/ColumnedTile";
import dharma from "../../images/dharmachakra-solid.svg";
import eye from "../../images/eye-slash-solid.svg";

const CVEDisclosure = ({colorschema}) => {
    let style = "dark";
    if (colorschema) {
        style = colorschema;
    }

    let cveDisclosure = [
        {
            headline: "CVE advisory",
            text: "We are the official CVE numbering authority for Search Guard. Browse the list of known issues..",
            image: {
                src: dharma,
                width: 150,
                height: 150,
            },
            button: {
                text: "Find out more",
                href: "/cve-advisory/",
            },
        },
        {
            headline: "Disclosure Policy",
            text: "If you have found a security related issue, please read our disclosure policy.",
            image: {
                src: eye,
                width: 150,
                height: 150,
            },
            button: {
                text: "Find out more",
                href: "/disclosure-policy/",
            },
        },
    ]

    return (
        <ColumnedTile colorschema={style} wrapperclass="default-padding-top-bottom" columns={cveDisclosure} />
    );
};

export default CVEDisclosure;
