/**
 * @typedef {JSONValue[]} JSONArray
 */
/**
 * @typedef {null|boolean|number|string|JSONArray|{[key: string]: JSONValue}} JSONValue
 */

/**
* @callback SimpleJSONCallback
* @param {...JSONValue} json
* @returns {void}
*/

/**
* @callback SimpleJSONErrback
* @param {Error} err
* @param {string|string[]} jsonURL
* @returns {JSONValue}
*/

/**
 * @typedef {((
 *   jsonURL: string|string[],
 *   cb?: SimpleJSONCallback,
 *   errBack?: SimpleJSONErrback
 * ) => Promise<JSONValue>) & {
 *   _fetch?: import('./index-polyglot.js').SimpleFetch,
 *   hasURLBasePath?: boolean,
 *   basePath?: string|false
 * }} getJSONCallback
 */

/**
 * @param {object} [cfg]
 * @param {import('./index-polyglot.js').SimpleFetch} [cfg.fetch]
 * @returns {getJSONCallback}
 */
function buildGetJSONWithFetch ({
  // eslint-disable-next-line no-shadow, no-undef -- This is a polyfill
  fetch = typeof window !== 'undefined' ? window.fetch : self.fetch
} = {}) {
  /**
  * @type {getJSONCallback}
  */
  return async function getJSON (jsonURL, cb, errBack) {
    try {
      if (Array.isArray(jsonURL)) {
        const arrResult = await Promise.all(jsonURL.map((url) => {
          return /** @type {getJSONCallback} */ (getJSON)(url);
        }));
        if (cb) {
          // eslint-disable-next-line promise/prefer-await-to-callbacks -- Old-style API
          cb(...arrResult);
        }
        return arrResult;
      }
      const resp = await fetch(jsonURL);
      const result = await resp.json();
      return typeof cb === 'function'
        // eslint-disable-next-line promise/prefer-await-to-callbacks -- Old-style API
        ? cb(result)
        : result;
    // https://github.com/bcoe/c8/issues/135
    /* c8 ignore next */
    } catch (err) {
      const e = /** @type {Error} */ (err);
      e.message += ` (File: ${jsonURL})`;
      if (errBack) {
        return errBack(e, jsonURL);
      }
      throw e;
    // https://github.com/bcoe/c8/issues/135
    /* c8 ignore next */
    }
  /* c8 ignore next */
  };
}

export {buildGetJSONWithFetch};
