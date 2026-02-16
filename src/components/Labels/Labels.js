import React from 'react';
import {useTranslation} from 'react-i18next';
import certificate from '../../images/clipboard-check-solid.svg';
import check from '../../images/thumbs-up-regular.svg';
import support from '../../images/headset-solid.svg';
import ColumnedTile from "../../components/Tiles/ColumnedTile/ColumnedTile";

const Labels = () => {
  const { t } = useTranslation('home');

  let content = [
    {
      headline: t('labels.certified.headline'),
      text: t('labels.certified.text'),
      image: {
        src: certificate,
        width: 150,
        height: 150,
      },
    },
    {
      headline: t('labels.support.headline'),
      text: t('labels.support.text'),
      image: {
        src: support,
        width: 150,
        height: 150,
      },
    },
    {
      headline: t('labels.trustedBy.headline'),
      text: t('labels.trustedBy.text'),
      image: {
        src: check,
        width: 150,
        height: 150,
      },
    },
  ]


  return (
      <ColumnedTile colorschema="white" wrapperclass="default-padding-top-bottom labels-section" columns={content} />
  );
};

export default Labels;
