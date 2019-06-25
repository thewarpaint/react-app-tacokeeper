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

function getTweetHref(varieties) {
  const activeVarieties = getActiveVarieties(varieties);

  if (!activeVarieties.length) {
    return '#';
  }

  const tweetText = getTweetText(activeVarieties);
  const tacoKeeperData = getTacoKeeperData(activeVarieties);
  const tweetContent = `${tweetText} ${hashtagAndMention} ${tacoKeeperUrl}?t=${tacoKeeperData}`;

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

const TweetLink = ({onSuccess, varieties}) => {
  return (
    <div className="tweet-link-wrapper">
      <a
        href={getTweetHref(varieties)}
        className="tweet-link"
        target={hasActiveVarieties(varieties) ? '_blank' : ''}
        rel="noopener noreferrer"
        onClick={hasActiveVarieties(varieties) ? onSuccess : undefined}
      >
        Comparte en Twitter
      </a>
    </div>
  );
};

export default TweetLink;
