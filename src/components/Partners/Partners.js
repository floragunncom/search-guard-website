import React from 'react';
import { useTranslation } from 'react-i18next';
import eliatra from '../../images/partner-eliatra.png';
import excelerate from '../../images/partner-xsys.png';
import sirenPartner from '../../images/partner-siren.jpg';
import ColumnedTile from "../Tiles/ColumnedTile/ColumnedTile";

const Partners = () => {
  const { t } = useTranslation('company');

  let partners = [
    {
      image: {
        src: eliatra,
        width: 350,
        height: 350,
        alt: "Eliatra - The OpenSearch Experts",
      },
    },
    {
      image: {
        src: excelerate,
        width: 350,
        height: 350,
        alt: "Search Guard Partner Excelerate Systems"
      },
    },
    {
      image: {
        src: sirenPartner,
        width: 350,
        height: 350,
        alt: "Search Guard Partner Siren Solutions"
      },
    },
  ]

  return (
      <ColumnedTile colorschema="white" svgcolor="none" wrapperclass="default-padding-top-bottom" columns={partners} headline={t('partners.headline')} />
  );
};

export default Partners;
