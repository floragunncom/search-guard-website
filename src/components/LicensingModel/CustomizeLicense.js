import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '../../i18n/useLocalizedPath';
import ColumnedTile from "../../components/Tiles/ColumnedTile/ColumnedTile";
import iconBook from '../../images/book-solid.svg';
import iconWheels from '../../images/gears-solid.svg';

const CustomizeLicense = () => {
    const { t } = useTranslation('license');
    const lp = useLocalizedPath();

    let customizelicense = [
        {
            headline: t('customizeLicense.academic.headline'),
            text: t('customizeLicense.academic.text'),
            image: {
                src: iconBook,
                width: 150,
                height: 150,
                alt: t('customizeLicense.academic.alt'),
            },
            button: {
                href: lp("/contacts/"),
                text: t('customizeLicense.academic.button'),
            },
        },
        {
            headline: t('customizeLicense.oem.headline'),
            text: t('customizeLicense.oem.text'),
            image: {
                src: iconWheels,
                width: 150,
                height: 150,
                alt: t('customizeLicense.oem.alt'),
            },
            button: {
                href: lp("/contacts/"),
                text: t('customizeLicense.oem.button'),
            },
        },
    ]


    return (
        <ColumnedTile colorschema="dark" wrapperclass="default-padding-top-bottom" columns={customizelicense} headline={t('customizeLicense.headline')} />
    );
};

export default CustomizeLicense;
