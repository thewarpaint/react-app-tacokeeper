import React, { Component, Fragment } from 'react';

import TweetText from './components/TweetText';
import VarietyList from './components/VarietyList';
import './App.css';

const VARIETIES = [
  {"key":"ACH","name":"achicalada","category":"carnitas","forms":{"singular":"de achicalada","plural":"de achicalada"}},
  {"key":"ADO","name":"adobada","category":"parrilla","forms":{"singular":"de adobada","plural":"de adobada"}},
  {"key":"AGU","name":"aguacate","category":"casero","forms":{"singular":"de aguacate","plural":"de aguacate"}},
  {"key":"ALA","name":"alambre","category":"guisado","forms":{"singular":"de alambre","plural":"de alambre"}},
  {"key":"ALV","name":"alambre","category":"vegano","forms":{"singular":"de alambre","plural":"de alambre"}},
];

class App extends Component {
  state = {
    varieties: VARIETIES.map(variety => {
      variety.value = 0;

      return variety;
    })
  };

  handleChange = (varietyKey, varietyValue) => {
    const varietyIndex = this.state.varieties.findIndex(variety => variety.key === varietyKey);
    const varieties = [...this.state.varieties];

    varieties[varietyIndex] = {...varieties[varietyIndex]};
    varieties[varietyIndex].value = varietyValue;

    this.setState({
      varieties,
    });
  };

  render() {
    return (
      <Fragment>
        <TweetText
          varieties={this.state.varieties}
        />

        <VarietyList
          varieties={this.state.varieties}
          onChange={this.handleChange}
        />
      </Fragment>
    );
  }
}

export default App;
