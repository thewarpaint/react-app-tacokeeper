import React, { Fragment } from 'react';

import { getTextContent } from '../social';

function getText(varieties) {
  const activeVarieties = varieties.filter(variety => variety.value > 0);

  return getTextContent(activeVarieties, '', 'instagram');
}

const ShareToInstagram = ({varieties}) => {
  return (
    <Fragment>
      <h2>Compartir en Instagram</h2>

      <div>
        <label htmlFor="favouritesTextarea">
          Texto
        </label>

        <textarea
          id="favouritesTextarea"
          value={getText(varieties)}
          disabled
        />
      </div>

    </Fragment>
  );
}

export default ShareToInstagram;