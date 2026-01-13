import TextTile from "../Tiles/TextTile/TextTile.jsx";
import ctaIcon from "../../images/icon-sg.svg";
import React from "react";

const CTATLSTool = ({ colorschema }) => {
    return (
        <TextTile
            colorschema={colorschema}
            headline="Download and use for free. Forever."
            text="Want to see how simple TLS setup can be? Download the Search Guard TLS Tool for Elasticsearch and Kibana and give it a try."
            ctaText="Download now."
            icon={ctaIcon}
            target="_blank"
            link="https://docs.search-guard.com/latest/offline-tls-tool"
        />)
}

export default CTATLSTool;