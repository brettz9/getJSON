/* eslint-disable node/no-unsupported-features/es-syntax */

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
 * @param {string|string[]} jsonURL
 * @param {SimpleJSONCallback} cb
 * @param {SimpleJSONErrback} errBack
 * @returns {Promise<JSON>}
 */
export default async function getJSON (jsonURL, cb, errBack) {
  try {
    if (Array.isArray(jsonURL)) {
      const arrResult = await Promise.all(jsonURL.map((url) => getJSON(url)));
      if (cb) {
        // eslint-disable-next-line node/callback-return, standard/no-callback-literal, promise/prefer-await-to-callbacks
        cb(...arrResult);
      }
      return arrResult;
    }
    const result = await fetch(jsonURL).then((r) => r.json());
    // eslint-disable-next-line promise/prefer-await-to-callbacks
    return typeof cb === 'function' ? cb(result) : result;
  } catch (e) {
    e.message += ` (File: ${jsonURL})`;
    if (errBack) {
      return errBack(e, jsonURL);
    }
    throw e;
  }
}
