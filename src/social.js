export const TWITTER_INTENT_URL = 'https://twitter.com/intent/tweet';

const HASHTAG = '#tacokeeper';
const TACOKEEPER_URL = 'https://tacokeeper.com/';

const USERNAMES = {
  instagram: '@tacokeeper',
  twitter: '@tacokeeperbot',
};

export function getTextContent(tweetText, userScreenName, tacoKeeperData, socialNetwork) {
  const mention = USERNAMES[socialNetwork] || '';

  return `${tweetText} ${HASHTAG} ${mention} ${TACOKEEPER_URL}${userScreenName}?t=${tacoKeeperData}`;
}