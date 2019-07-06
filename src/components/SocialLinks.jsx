import React from 'react';

import {getTweetText} from '../tweetHelpers';

const hashtagAndMention = '#tacokeeper @tacokeeperbot';
const tacoKeeperUrl = 'https://tacokeeper.com/';
const twitterIntentUrl = 'https://twitter.com/intent/tweet';

function getActiveVarieties(varieties) {
  return varieties.filter(variety => variety.value > 0);
}

function hasActiveVarieties(varieties) {
  return getActiveVarieties(varieties).length > 0;
}

function getTweetHref(screenName, varieties) {
  const activeVarieties = getActiveVarieties(varieties);

  if (!activeVarieties.length) {
    return '#';
  }

  const tweetText = getTweetText(activeVarieties);
  const tacoKeeperData = getTacoKeeperData(activeVarieties);
  const tweetContent = `${tweetText} ${hashtagAndMention} ${tacoKeeperUrl}${screenName}?t=${tacoKeeperData}`;

  return `${twitterIntentUrl}?text=${encodeURIComponent(tweetContent)}`;
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
        className="social-link social-link--twitter"
        target={hasActiveVarieties(varieties) ? '_blank' : ''}
        rel="noopener noreferrer"
        onClick={hasActiveVarieties(varieties) ? onSuccess : undefined}
      >
        Twitter
      </a>

      <a
        href="https://tacokeeper.com/"
        className="social-link social-link--instagram"
      >
        Instagram
      </a>
    </div>
  );
};

export default SocialLinks;