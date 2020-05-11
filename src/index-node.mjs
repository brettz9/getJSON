/* eslint-disable node/no-unsupported-features/es-syntax */
import nodeFetch from 'node-fetch';
import {buildGetJSONWithFetch} from './buildGetJSONWithFetch.js';
import {getDirectoryForURL} from './getDirectoryForURL.js';

/**
 * @param {PlainObject} cfg
 * @param {string} cfg.baseURL
 * @param {string} cfg.cwd
 * @returns {getJSONCallback}
 */
function buildGetJSON ({
  baseURL,
  cwd: basePath = baseURL
    ? getDirectoryForURL(baseURL)
    : process.cwd()
} = {}) {
  const _fetch = typeof fetch !== 'undefined'
    ? fetch
    : (jsonURL) => {
      if ((/^https?:/u).test(jsonURL)) {
        return nodeFetch(jsonURL);
      }
      // Filed https://github.com/bergos/file-fetch/issues/12 to see
      //  about getting relative basePaths in `file-fetch` and using
      //  that better-tested package instead
      // eslint-disable-next-line promise/avoid-new
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line node/global-require, no-shadow
        const XMLHttpRequest = require('local-xmlhttprequest')({
          basePath
        }); // Don't change to an import as won't resolve for browser testing
        const r = new XMLHttpRequest();
        r.open('GET', jsonURL, true);
        // r.responseType = 'json';
        r.onreadystatechange = function () {
          // Not sure how to simulate
          // istanbul ignore if
          if (r.readyState !== 4) { return; }
          if (r.status === 200) {
            // var json = r.json;
            const response = r.responseText;
            resolve({
              json: () => JSON.parse(response)
            });
            return;
          }
          reject(new SyntaxError(
            'Failed to fetch URL: ' + jsonURL + 'state: ' +
            r.readyState + '; status: ' + r.status
          ));
        };
        r.send();
      });
    };

  const ret = buildGetJSONWithFetch({
    fetch: _fetch
  });

  ret._fetch = _fetch;
  ret.hasURLBasePath = Boolean(baseURL);
  ret.basePath = basePath;

  return ret;
}

const getJSON = buildGetJSON();

export {getJSON, buildGetJSON};
