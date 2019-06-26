import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import debounce from 'lodash.debounce';

import CaptureSection from './components/CaptureSection';
import { VARIETIES } from './varieties.config';
import './App.css';

const BASENAME = process.env.PUBLIC_URL;
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

function getFavourites() {
  try {
    const favouritesString = window.localStorage.getItem('favourites');

    if (favouritesString == null) {
      return [];
    }

    return JSON.parse(favouritesString);
  } catch (e) {
    // TODO: captureException using Sentry
    return [];
  }
}

function processVarieties(varieties) {
  const favouriteKeys = getFavourites().map(favourite => favourite.key);

  return varieties
    .reduce((acc, variety) => {
      favouriteKeys.includes(variety.key)
        ? acc[0].push(variety)
        : acc[1].push(variety);

      return acc;
    }, [[], []])
    .flat()
    .map(variety => ({
      ...variety,
      normalisedCategory: normaliseString(variety.category),
      normalisedName: normaliseString(variety.name),
      value: 0,
      visible: true,
      favourite: favouriteKeys.includes(variety.key),
    }));
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      varieties: processVarieties(VARIETIES),
    };
  }

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
      <Router
        basename={BASENAME}
      >
        <Route
          exact
          path="/"
          render={(routerProps) => {
            return (
              <CaptureSection
                {...routerProps}
                varieties={this.state.varieties}
                handleSearch={this.handleSearch}
                handleChange={this.handleChange}
              />
            );
          }}
        />

        <Route
          path="/success"
          render={() => {
            return <h2>Success!</h2>;
          }}
        />
      </Router>
    );
  }
}

export default App;
