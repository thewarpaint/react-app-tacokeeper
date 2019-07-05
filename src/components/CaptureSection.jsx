import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { appendToFavourites } from '../favourites';
import Search from './Search';
import TweetLink from './TweetLink';
import TweetText from './TweetText';
import VarietyList from './VarietyList';

function handleSuccess(history, varieties) {
  history.push('/success');

  appendToFavourites(
    varieties
      .filter(variety => variety.value > 0)
      .map(variety => ({ key: variety.key }))
  );
}

function CaptureSection({handleChange, handleSearch, history, settings, varieties}) {
  return (
    <Fragment>
      <TweetText
        varieties={varieties}
      />

      <Search
        onSearch={handleSearch}
      />

      <VarietyList
        varieties={varieties}
        onChange={handleChange}
      />

      <TweetLink
        onSuccess={() => handleSuccess(history, varieties)}
        screenName={settings.screenName}
        varieties={varieties}
      />

      <Link to="/settings">Configuración</Link>
    </Fragment>
  );
}

export default CaptureSection;