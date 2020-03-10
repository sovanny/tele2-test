import axios from 'axios';

export function debounceEvent(callback, time) {
  let interval;
  return (...args) => {
    clearTimeout(interval);
    interval = setTimeout(() => {
      interval = null;

      callback(...args);
    }, time);
  };
}

export function apiReq(val) {
  return axios
    .get(`https://swapi.co/api/people/?search=${val}`)
    .catch(console.log);
}
