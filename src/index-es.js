import {buildGetJSONWithFetch} from './buildGetJSONWithFetch.js';

const getJSON = buildGetJSONWithFetch();

/**
 * For polymorphism with Node.
 * @returns {typeof getJSON}
 */
const buildGetJSON = () => {
  return getJSON;
};

export {getJSON, buildGetJSON};
