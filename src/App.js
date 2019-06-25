import React, { Component, Fragment } from 'react';
import debounce from 'lodash.debounce';

import Search from './components/Search';
import TweetLink from './components/TweetLink';
import TweetText from './components/TweetText';
import VarietyList from './components/VarietyList';
import {VARIETIES} from './varieties.config'
import './App.css';

const MAX_TACOS_AMOUNT = 99;
const SEARCH_DELAY = 200;

function normaliseString(string) {
  const normalisationMap = {
    'á': 'a',
    'é': 'e',
    'í': 'i',
    'ó': 'o',
    'ú': 'u',
    'ü': 'u',
    'ñ': 'n',
  };

  let normalisedString = string.toLowerCase();

  for (let key in normalisationMap) {
    normalisedString = normalisedString.replace(new RegExp(key, 'g'), normalisationMap[key]);
  }

  return normalisedString;
}

function sanitizeValue(stringValue) {
  let value = parseInt(stringValue, 10);

  if (isNaN(value)) {
    return 0;
  }

  if (value > MAX_TACOS_AMOUNT) {
    return MAX_TACOS_AMOUNT;
  }

  return value;
}

class App extends Component {
  state = {
    varieties: VARIETIES.map(variety => {
      variety.normalisedCategory = normaliseString(variety.category);
      variety.normalisedName = normaliseString(variety.name);
      variety.value = 0;
      variety.visible = true;

      return variety;
    })
  };

  handleChange = (varietyKey, varietyValue) => {
    const varietyIndex = this.state.varieties.findIndex(variety => variety.key === varietyKey);
    const varieties = [...this.state.varieties];

    varieties[varietyIndex] = {...varieties[varietyIndex]};
    varieties[varietyIndex].value = sanitizeValue(varietyValue);

    this.setState({
      varieties,
    });
  };

  handleSearch = debounce((searchTerm) => {
    const normalisedSearchTerm = normaliseString(searchTerm);

    const varieties = this.state.varieties.map(variety => {
      const isMatch =
        variety.normalisedName.indexOf(normalisedSearchTerm) !== -1 ||
        variety.normalisedCategory.indexOf(normalisedSearchTerm) !== -1;

      return {
        ...variety,
        visible: isMatch,
      };
    });

    this.setState({
      varieties,
    });
  }, SEARCH_DELAY);

  render() {
    return (
      <Fragment>
        <TweetText
          varieties={this.state.varieties}
        />

        <Search
          onSearch={this.handleSearch}
        />

        <VarietyList
          varieties={this.state.varieties}
          onChange={this.handleChange}
        />

        <TweetLink
          varieties={this.state.varieties}
        />
      </Fragment>
    );
  }
}

export default App;
