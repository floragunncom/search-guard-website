import React from 'react';
import { useTranslation } from 'react-i18next';
import ColumnedTile from '../Tiles/ColumnedTile/ColumnedTile';
import sieMonster from '../../images/sie-monster.svg';
import wuerthPhoenix from '../../images/wuerth-phoenix.svg';
import redHat from '../../images/redHatNew.svg';
import objectRocket from '../../images/objectRocket.svg';
import mitratech from '../../images/mitratech.svg';
import siren from '../../images/siren.svg';
import kubedb from '../../images/kubedb.svg';

// Compact "integrators" block: logo + one sentence per partner, laid out as
// a ColumnedTile grid (4 per row, partial last row centered). Replaced the
// former logo-only Glide carousel (security page rebuild, issue #25).
// Logos keep their own colors: `raw` renders them as plain <img>, and
// svgcolor="none" skips the schema recoloring class.
const Integrators = ({ colorschema = 'white' }) => {
  const { t } = useTranslation('security');

  const integrators = [
    { key: 'redhat', pic: redHat },
    { key: 'objectrocket', pic: objectRocket },
    { key: 'wuerthphoenix', pic: wuerthPhoenix },
    { key: 'siemonster', pic: sieMonster },
    { key: 'mitratech', pic: mitratech },
    { key: 'kubedb', pic: kubedb },
    { key: 'siren', pic: siren },
  ];

  const columns = integrators.map(({ key, pic }) => ({
    text: t(`integrators.${key}.text`),
    image: {
      src: pic,
      raw: true,
      width: 140,
      height: 140,
      alt: t(`integrators.${key}.headline`),
    },
  }));

  return (
    <div id="integrators">
      <ColumnedTile
        colorschema={colorschema}
        svgcolor="none"
        wrapperclass="default-padding-top-bottom company-integrators"
        headline={t('integrators.headline')}
        subheadline={t('integrators.intro')}
        columns={columns}
        columnsPerRow={4}
      />
    </div>
  );
};

export default Integrators;
