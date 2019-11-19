import React, { Component, Fragment } from 'react';

import { getFavouritesFromLocalStorage } from '../favourites';
import { DEFAULT_SETTINGS, getSettings, setSettings } from '../settings';

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