/* eslint-disable node/no-unsupported-features/es-syntax */
import {buildGetJSONWithFetch} from './buildGetJSONWithFetch.js';

const getJSON = buildGetJSONWithFetch();

/**
 * For polymorphism with Node.
 * @returns {getJSON}
 */
const buildGetJSON = () => {
  return getJSON;
};

export {getJSON, buildGetJSON};
