export const TWITTER_INTENT_URL = 'https://twitter.com/intent/tweet';

const HASHTAG = '#tacokeeper';
const TACOKEEPER_URL = 'https://tacokeeper.com/';

const USERNAMES = {
  instagram: '@tacokeeper',
  twitter: '@tacokeeperbot',
};

export function getTextContent(activeVarieties, userScreenName, socialNetwork) {
  const mention = USERNAMES[socialNetwork] || '';
  const shareText = getShareText(activeVarieties);
  const tacoKeeperData = getTacoKeeperData(activeVarieties);

  return `${shareText} ${HASHTAG} ${mention} ${TACOKEEPER_URL}${userScreenName}?t=${tacoKeeperData}`;
}

export function getShareText(varieties) {
  const initialText = 'Hoy comí';

  const activeVarieties = varieties.filter(variety => variety.value > 0);

  if (!activeVarieties.length) {
    return initialText + '...';
  }

  return `${initialText} ${formatList(activeVarieties.map(getPluralisedVariety))}`;
}

function formatList(terms) {
  const conjunctionText = ' y ';

  // Works for arrays with length 0 (empty string), 1 ('first'), or 2 ('first and second')
  if (terms.length < 3) {
    return terms.join(conjunctionText);
  }

  return terms.slice(0, terms.length - 1).join(', ') + conjunctionText + terms.slice(-1);
}

function getPluralisedVariety(variety) {
  return variety.value +
    (variety.value === 1
      ? ' taco ' + variety.forms.singular
      : ' tacos ' + variety.forms.plural);
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