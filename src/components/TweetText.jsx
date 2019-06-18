import React from 'react';

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

function getText(varieties) {
  const initialText = 'Hoy comí';

  const activeVarieties = varieties.filter(variety => variety.value > 0);

  if (!activeVarieties.length) {
    return initialText + '...';
  }

  return `${initialText} ${formatList(activeVarieties.map(getPluralisedVariety))}`;
};

const TweetText = (props) => {
  return (
    <div id="tweet-text"
         className="tweet-text">
      {getText(props.varieties)}
    </div>
  );
};

export default TweetText;