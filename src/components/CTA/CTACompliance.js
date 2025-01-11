import TextTile from "../Tiles/TextTile/TextTile";
import ctaIcon from "../../images/icon-sg.svg";
import React from "react";

const CTACompliance = ({colorschema}) => {
    return (
        <TextTile
            colorschema={colorschema}
            headline="Give the Search Guard Compliance Edition a spin!"
            text="Follow these simple steps to install Search Guard on your Elasticsearch cluster. "
            ctaText="Installation"
            icon={ctaIcon}
            link="/search-guard-free-trial/"
        />
    )
}

export default CTACompliance;