import React from 'react';
import certificate from '../../images/clipboard-check-solid.svg';
import check from '../../images/thumbs-up-regular.svg';
import support from '../../images/headset-solid.svg';
import './Labels.scss';
import ColumnedTile from "../../components/Tiles/ColumnedTile/ColumnedTile";

const Labels = () => {

  let content = [
    {
      headline: "Certified",
      text: "Since 2013, Search Guard has been pushing the boundaries of Elastic Stack security.",
      image: {
        src: certificate,
        width: 150,
        height: 150,
      },
    },
    {
      headline: "Priority support",
      text: "Our customers enjoy priority support with guaranteed service-level agreements and direct access to the Search Guard developer team.",
      image: {
        src: support,
        width: 150,
        height: 150,
      },
    },
    {
      headline: "Trusted by",
      text: "Our clients span the globe, from Fortune 500s and federal entities to groundbreaking start-ups. They trust us with their most important projects - no matter the size or type.",
      image: {
        src: check,
        width: 150,
        height: 150,
      },
    },
  ]


  return (
      <ColumnedTile colorschema="white" wrapperclass="default-padding-top-bottom" columns={content} />
  );
};

export default Labels;
