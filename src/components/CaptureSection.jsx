import React, { Fragment } from 'react';

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

function CaptureSection({history, varieties, handleSearch, handleChange}) {
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
        varieties={varieties}
        onSuccess={() => handleSuccess(history, varieties)}
      />
    </Fragment>
  );
}

export default CaptureSection;