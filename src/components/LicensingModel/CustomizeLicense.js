import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalizedPath } from '../../i18n/useLocalizedPath';
import ColumnedTile from "../../components/Tiles/ColumnedTile/ColumnedTile";
import iconBook from '../../images/book-solid.svg';
import iconWheels from '../../images/gears-solid.svg';

// colorschema and buttonHref are optional; defaults preserve the historical
// rendering (dark band, buttons to the contact page). The pricing page passes
// buttonHref="#quote" so both blocks lead to the on-page quote form.
const CustomizeLicense = ({ colorschema = 'dark', buttonHref }) => {
    const { t } = useTranslation('license');
    const lp = useLocalizedPath();
    const href = buttonHref || lp('/contacts/');

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
                href,
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
                href,
                text: t('customizeLicense.oem.button'),
            },
        },
    ]


    return (
        <ColumnedTile colorschema={colorschema} wrapperclass="default-padding-top-bottom" columns={customizelicense} headline={t('customizeLicense.headline')} />
    );
};

export default CustomizeLicense;
