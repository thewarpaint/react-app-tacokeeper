import React from 'react';

import {getShareText} from '../social';

const TweetText = (props) => {
  return (
    <div className="tweet-text">
      {getShareText(props.varieties)}
    </div>
  );
};

export default TweetText;