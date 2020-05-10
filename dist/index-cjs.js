'use strict';

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
async function getJSON(jsonURL, cb, errBack) {
  try {
    if (Array.isArray(jsonURL)) {
      const arrResult = await Promise.all(jsonURL.map(url => getJSON(url)));

      if (cb) {
        // eslint-disable-next-line node/callback-return, standard/no-callback-literal, promise/prefer-await-to-callbacks
        cb(...arrResult);
      }

      return arrResult;
    }

    const result = await fetch(jsonURL).then(r => r.json()); // eslint-disable-next-line promise/prefer-await-to-callbacks

    return typeof cb === 'function' ? cb(result) : result;
  } catch (e) {
    e.message += ` (File: ${jsonURL})`;

    if (errBack) {
      return errBack(e, jsonURL);
    }

    throw e;
  }
}

/* eslint-disable node/no-unsupported-features/es-syntax */

if (typeof fetch === 'undefined') {
  global.fetch = jsonURL => {
    // eslint-disable-next-line promise/avoid-new
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line node/global-require, no-shadow
      const XMLHttpRequest = require('local-xmlhttprequest')({
        basePath: __dirname
      }); // Don't change to an import as won't resolve for browser testing


      const r = new XMLHttpRequest();
      r.open('GET', jsonURL, true); // r.responseType = 'json';

      r.onreadystatechange = function () {
        if (r.readyState !== 4) {
          return;
        }

        if (r.status === 200) {
          // var json = r.json;
          const response = r.responseText;
          resolve({
            json: () => JSON.parse(response)
          });
          return;
        }

        reject(new SyntaxError('Failed to fetch URL: ' + jsonURL + 'state: ' + r.readyState + '; status: ' + r.status));
      };

      r.send();
    });
  };
}

module.exports = getJSON;
