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
        <label
          htmlFor="favouritesTextarea"
          className="share-to-instagram__label"
        >
          Por favor agrega el siguiente texto como descripción de tu publicación en Instagram:
        </label>

        <textarea
          id="favouritesTextarea"
          className="share-to-instagram__textarea"
          value={getText(varieties)}
          readonly
        />
      </div>

    </Fragment>
  );
}

export default ShareToInstagram;