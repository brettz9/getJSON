'use strict';

/* globals fetch */

/* eslint-disable node/no-unsupported-features/es-syntax,
  node/no-unsupported-features/es-builtins */

/**
* @typedef {null|boolean|number|string|GenericArray|PlainObject} JSON
*/

/**
* @callback getJSONCallback
* @param {...JSON} result
* @returns {Any} Will determine the `getJSON` Promise resolution
*/

/**
* @callback getJSONErrBack
* @param {Error} err
* @param {string} jsonURL
* @returns {Any} Will determine the `getJSON` Promise resolution upon an error
*/
let fetchShim = typeof fetch !== 'undefined' ? fetch : null;
/**
 * @returns {void}
 */

async function getFetchShim() {
  if (fetchShim) {
    return fetchShim;
  }

  if (typeof module === 'undefined') {
    throw new TypeError('Your environment does not support `fetch`.');
  } // Rollup only converts this to `require` in cjs format, but we need
  //   in others
  // fetchShim = await import('node-fetch');
  // eslint-disable-next-line global-require, no-undef


  fetchShim = await Promise.resolve(require('node-fetch'));
  return fetchShim;
}

getFetchShim();

const dirname = path => {
  return path.match(/(.*)[/\\]/u)[1] || '';
};
/**
 *
 * @param {string} jsonURL
 * @param {getJSONCallback} cb
 * @param {getJSONErrBack} errBack
 * @returns {Promise<JSON|JSON[]|Any>} Will resolve to `Any` if the callback is
 *   used (or if there is an error and the `errBack` is used)
 */


async function getJSON(jsonURL, cb, errBack) {
  try {
    if (Array.isArray(jsonURL)) {
      const arrResult = await Promise.all(jsonURL.map(url => getJSON(url)));

      if (cb) {
        // eslint-disable-next-line max-len
        // eslint-disable-next-line promise/prefer-await-to-callbacks, callback-return, standard/no-callback-literal
        cb(...arrResult);
      }

      return arrResult;
    }

    const isRelativePath = /(?:https?|file):/u.test(jsonURL);

    if (!isRelativePath) {
      jsonURL = 'file://' + dirname(process.argv[1]) + '/' + jsonURL;
    }

    const result = await (await getFetchShim())(jsonURL).then(r => r.json()); // eslint-disable-next-line promise/prefer-await-to-callbacks

    return typeof cb === 'function' ? cb(result) : result;
  } catch (e) {
    e.message += ` (File: ${jsonURL})`;

    if (errBack) {
      return errBack(e, jsonURL);
    }

    throw e;
  }
}

module.exports = getJSON;
