import React from 'react';
import { Link } from 'react-router-dom';

import { getTextContent, TWITTER_INTENT_URL } from '../social';

function getActiveVarieties(varieties) {
  return varieties.filter(variety => variety.value > 0);
}

function hasActiveVarieties(varieties) {
  return getActiveVarieties(varieties).length > 0;
}

function getTweetHref(userScreenName, varieties) {
  const activeVarieties = getActiveVarieties(varieties);

  if (!activeVarieties.length) {
    return '#';
  }

  const tweetContent = getTextContent(activeVarieties, userScreenName, 'twitter');

  return `${TWITTER_INTENT_URL}?text=${encodeURIComponent(tweetContent)}`;
}

const SocialLinks = ({onSuccess, screenName, varieties}) => {
  return (
    <div className="social-links-wrapper">
      <a
        href={getTweetHref(screenName, varieties)}
        className={'social-link social-link--twitter' + (hasActiveVarieties(varieties) ? '' : ' social-link--disabled')}
        target={hasActiveVarieties(varieties) ? '_blank' : ''}
        rel="noopener noreferrer"
        onClick={hasActiveVarieties(varieties) ? onSuccess : undefined}
      >
        Twitter
      </a>

      <Link
        to="/instagram"
        className={'social-link social-link--instagram' + (hasActiveVarieties(varieties) ? '' : ' social-link--disabled')}
      >
        Instagram
      </Link>
    </div>
  );
};

export default SocialLinks;
