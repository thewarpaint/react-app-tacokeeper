import React, { Fragment } from 'react';

import Search from './Search';
import TweetLink from './TweetLink';
import TweetText from './TweetText';
import VarietyList from './VarietyList';

function CaptureSection({varieties, handleSearch, handleChange}) {
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
      />
    </Fragment>
  );
}

export default CaptureSection;