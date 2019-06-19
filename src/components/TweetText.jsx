import React from 'react';

import {getTweetText} from '../tweetHelpers';

const TweetText = (props) => {
  return (
    <div className="tweet-text">
      {getTweetText(props.varieties)}
    </div>
  );
};

export default TweetText;