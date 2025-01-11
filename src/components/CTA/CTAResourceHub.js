import TextTile from "../Tiles/TextTile/TextTile";
import React from "react";
import folderGlass from "../../images/folder-glass.svg";

const CTAResourceHub = ({colorschema}) => {
    return (
        <TextTile
            colorschema={colorschema}
            headline="Explore the resource hub"
            text="From documentation and blog posts, to FAQs and more about our TLS certificate generator, take a look at our resource hub."
            ctaText="see ressource hub"
            icon={folderGlass}
            link="/resource/"
        />
    )
}

export default CTAResourceHub;