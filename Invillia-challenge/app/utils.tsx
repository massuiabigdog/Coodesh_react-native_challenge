export const emailIsValid = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const colors = {
  primary: 'blue.500',
};

export const localStorageKeys = {
  storeWord: "@StoreWord",
  favoriteWords: "@FavoriteWords",
  historyWords: "@HistoryWords",
};