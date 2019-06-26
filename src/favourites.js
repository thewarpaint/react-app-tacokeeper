const FAVOURITES_KEY = 'favourites';

export function getFavouritesFromLocalStorage() {
  return window.localStorage.getItem(FAVOURITES_KEY);
}

export function getFavourites() {
  try {
    const favouritesString = getFavouritesFromLocalStorage();

    if (favouritesString == null) {
      return [];
    }

    return JSON.parse(favouritesString);
  } catch (e) {
    // TODO: captureException using Sentry
    return [];
  }
}

function setFavourites(favourites) {
  try {
    window.localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
  } catch (e) {
    // TODO: captureException using Sentry
  }
}

export function appendToFavourites(newFavourites) {
  const favourites = getFavourites();
  const favouritesKeys = favourites.map(favourite => favourite.key);

  setFavourites(favourites.concat(
    newFavourites.filter(newFavourite => !favouritesKeys.includes(newFavourite.key))
  ));
}
