import React from 'react';

import { getTextContent, TWITTER_INTENT_URL } from '../social';
import { getTweetText } from '../tweetHelpers';

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

  const tweetText = getTweetText(activeVarieties);
  const tacoKeeperData = getTacoKeeperData(activeVarieties);
  const tweetContent = getTextContent(tweetText, userScreenName, tacoKeeperData, 'twitter');

  return `${TWITTER_INTENT_URL}?text=${encodeURIComponent(tweetContent)}`;
}

function getTacoKeeperData(activeVarieties) {
  return activeVarieties
    .map(variety => variety.key + zeroPad(variety.value))
    .join('');
}

function zeroPad(number) {
  if (number <= 9) {
    return '0' + number.toString();
  }

  return number.toString();
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

      <a
        href="https://tacokeeper.com/"
        className={'social-link social-link--instagram' + (hasActiveVarieties(varieties) ? '' : ' social-link--disabled')}
      >
        Instagram
      </a>
    </div>
  );
};

export default SocialLinks;
