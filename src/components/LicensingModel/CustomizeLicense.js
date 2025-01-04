import React from 'react';
import ColumnedTile from "../../components/Tiles/ColumnedTile/ColumnedTile";
import iconBook from '../../images/book-solid.svg';
import iconWheels from '../../images/gears-solid.svg';

const CustomizeLicense = () => {

    let customizelicense = [
        {
            headline: "Academic & Scientific Programme",
            text: "We want to give back to education and science and provide free licenses and special discounts for eligible institutions. Get in touch with us to learn more.",
            image: {
                src: iconBook,
                width: 150,
                height: 150,
            },
            button: {
                href: "/contacts/",
                text: "Find out more",
            },
        },
        {
            headline: "OEM, Integrators & Resellers",
            text: "We provide tailor made custom licenses for system integrators, OEM partners and resellers.",
            image: {
                src: iconWheels,
                width: 150,
                height: 150,
            },
            button: {
                href: "/contacts/",
                text: "Find out more",
            },
        },
    ]


    return (
        <ColumnedTile colorschema="dark" wrapperclass="default-padding-top-bottom" columns={customizelicense} headline="Customize your license" />
    );
};

export default CustomizeLicense;
