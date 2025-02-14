import TextTile from "../Tiles/TextTile/TextTile";
import ctaIcon from "../../images/icon-sg.svg";
import React from "react";

const CTAAIM = ({ colorschema }) => {
    return (
        <TextTile
            colorschema={colorschema}
            headline="Give AIM a spin!"
            text="Follow these simple steps to install AIM to your Elasticsearch cluster for free. "
            ctaText="Documentation"
            icon={ctaIcon}
            link="https://docs.search-guard.com/latest/automated-index-management"
            target="_blank"
        />
    )
}

export default CTAAIM;