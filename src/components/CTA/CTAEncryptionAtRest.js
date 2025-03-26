import React from "react";
import TextTile from "../Tiles/TextTile/TextTile";
import envelope from "../../images/icon-envelope.svg";

const CTAEncryptionAtRest = ({ colorschema }) => {
    return (
        <TextTile
            colorschema={colorschema}
            headline="Interested? Just contact us!"
            text="Contact us and we will send you a download link and installation instructions"
            ctaText="contact us"
            icon={envelope}
            link="/contacts/"
        />)
}

export default CTAEncryptionAtRest;