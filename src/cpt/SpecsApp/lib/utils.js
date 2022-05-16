import React from 'react';

export const capitalizeFirst = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1);

export const getReducerType = (str) => `set${capitalizeFirst(str)}`;

export const selectOnFocus = (event) => event.target.select();

const enc = encodeURIComponent;

export const queryHref = (query, params = {}) => {
  return Object.keys(params).reduce(
    (qs, param) =>
      `${qs}&${enc(`$${param}`)}=${enc(JSON.stringify(params[param]))}`,
    `?query=${enc(query)}`
  );
};

export function useStickyState(defaultValue, key) {
  const [value, setValue] = React.useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

// State & LocalStorage helper
