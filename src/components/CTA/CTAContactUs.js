import TextTile from "../Tiles/TextTile/TextTile";
import React from "react";
import envelope from "../../images/icon-envelope.svg";

const CTAContactUs = ({colorschema}) => {
    return (
        <TextTile
            colorschema={colorschema}
            headline="Can’t find what you’re looking for?"
            text="No worries, maybe we can help you find the answer."
            ctaText="contact us"
            icon={envelope}
            link="/contacts/"
        />
    )
}

export default CTAContactUs;