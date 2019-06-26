import React, { Component, Fragment } from 'react';

import { getFavouritesFromLocalStorage } from '../favourites';

const SETTINGS_KEY = 'settings';
const DEFAULT_SETTINGS = {
  screenName: '',
};

function getSettings() {
  try {
    const settingsString = window.localStorage.getItem(SETTINGS_KEY);

    if (settingsString == null) {
      return DEFAULT_SETTINGS;
    }

    return JSON.parse(settingsString);
  } catch (e) {
    // TODO: captureException using Sentry
    return DEFAULT_SETTINGS;
  }
}

function setSettings(settings) {
  try {
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    // TODO: captureException using Sentry
  }
}

class Settings extends Component {
  constructor() {
    super();

    this.state = {
      settings: DEFAULT_SETTINGS,
    };
  }

  componentDidMount() {
    this.setState({
      settings: getSettings(),
    });
  }

  handleScreenNameChange = (screenName) => {
    const settings = {...this.state.settings};
    settings.screenName = screenName;

    setSettings(settings);

    this.setState({
      settings,
    });
  };

  render() {
    return (
      <Fragment>
        <h2>Configuración</h2>

        <div>
          <label htmlFor="screenNameInput">
            Usuario de Twitter
          </label>

          <input
            id="screenNameInput"
            value={this.state.settings.screenName}
            onChange={event => this.handleScreenNameChange(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="favouritesTextarea">
            Favoritos
          </label>

          <textarea
            id="favouritesTextarea"
            value={getFavouritesFromLocalStorage()}
            disabled
          />
        </div>

      </Fragment>
    );
  }
}

export default Settings;