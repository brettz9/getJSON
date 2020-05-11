/* eslint-disable node/no-unsupported-features/es-syntax */

/**
 * @callback getJSONCallback
 * @param {string|string[]} jsonURL
 * @param {SimpleJSONCallback} cb
 * @param {SimpleJSONErrback} errBack
 * @returns {Promise<JSON>}
 */

/**
 * @param {PlainObject} cfg
 * @param {fetch} cfg.fetch
 * @returns {getJSONCallback}
 */
function buildGetJSONWithFetch ({
  // eslint-disable-next-line no-shadow
  fetch = window.fetch
} = {}) {
  /**
  * @callback SimpleJSONCallback
  * @param {JSON} json
  * @returns {void}
  */

  /**
  * @callback SimpleJSONErrback
  * @param {Error} err
  * @param {string|string[]} jsonURL
  * @returns {void}
  */

  /**
  * @type {getJSONCallback}
  */
  return async function getJSON (jsonURL, cb, errBack) {
    try {
      if (Array.isArray(jsonURL)) {
        const arrResult = await Promise.all(jsonURL.map((url) => {
          return getJSON(url);
        }));
        if (cb) {
          // eslint-disable-next-line node/callback-return, standard/no-callback-literal, promise/prefer-await-to-callbacks
          cb(...arrResult);
        }
        return arrResult;
      }
      const resp = await fetch(jsonURL);
      const result = await resp.json();
      // eslint-disable-next-line promise/prefer-await-to-callbacks
      return typeof cb === 'function' ? cb(result) : result;
    } catch (e) {
      e.message += ` (File: ${jsonURL})`;
      if (errBack) {
        return errBack(e, jsonURL);
      }
      throw e;
    }
  };
}

export {buildGetJSONWithFetch};
