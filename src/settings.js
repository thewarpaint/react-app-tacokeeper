export const DEFAULT_SETTINGS = {
  screenName: '',
};

const SETTINGS_KEY = 'settings';

export function getSettings() {
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

export function setSettings(settings) {
  try {
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    // TODO: captureException using Sentry
  }
}