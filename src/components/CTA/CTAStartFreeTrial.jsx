import TextTile from "../Tiles/TextTile/TextTile.jsx";
import ctaIcon from "../../images/icon-sg.svg";
import React from "react";

const CTAStartFreeTrial = ({ colorschema }) => {
    return (
        <TextTile
            colorschema={colorschema}
            headline="Free 60-day Trial"
            text="Want to see how your company can benefit from Search Guard? Give our 60-day trial a spin, free of charge, no credit card required."
            ctaText="start free trial"
            icon={ctaIcon}
            link="/search-guard-free-trial/"
        />)
}

export default CTAStartFreeTrial;