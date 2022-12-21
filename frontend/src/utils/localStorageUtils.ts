type AvailableKeys = 'token' | 'user';

export const setLocalStorageItem = (key: AvailableKeys, value: any): void => {
  localStorage.setItem(
    `@ReferaChallenge:${key}`,
    typeof value === 'string' ? value : JSON.stringify(value),
  );
};

export const getLocalStorageItem = (key: AvailableKeys): any => {
  return localStorage.getItem(`@ReferaChallenge:${key}`);
};

export const removeLocalStorageItem = (key: AvailableKeys): void => {
  localStorage.removeItem(`@ReferaChallenge:${key}`);
};
