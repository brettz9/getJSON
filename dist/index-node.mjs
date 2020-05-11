'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var nodeFetch = _interopDefault(require('node-fetch'));
var path = require('path');

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
function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

function _invoke(body, then) {
  var result = body();

  if (result && result.then) {
    return result.then(then);
  }

  return then(result);
}

function _catch(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }

  if (result && result.then) {
    return result.then(void 0, recover);
  }

  return result;
}

function buildGetJSONWithFetch({
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
  return function getJSON(jsonURL, cb, errBack) {
    try {
      let _exit = false;
      return _catch(function () {
        return _invoke(function () {
          if (Array.isArray(jsonURL)) {
            return _await(Promise.all(jsonURL.map(url => {
              return getJSON(url);
            })), function (arrResult) {
              if (cb) {
                // eslint-disable-next-line node/callback-return, standard/no-callback-literal, promise/prefer-await-to-callbacks
                cb(...arrResult);
              }

              _exit = true;
              return arrResult;
            });
          }
        }, function (_result) {
          return _exit ? _result : _await(fetch(jsonURL), function (resp) {
            return _await(resp.json(), function (result) {
              // eslint-disable-next-line promise/prefer-await-to-callbacks
              return typeof cb === 'function' ? cb(result) : result;
            });
          });
        });
      }, function (e) {
        e.message += ` (File: ${jsonURL})`;

        if (errBack) {
          return errBack(e, jsonURL);
        }

        throw e;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

/* eslint-disable node/no-unsupported-features/node-builtins,
  node/no-unsupported-features/es-syntax, compat/compat */
const isWindows = process.platform === 'win32';
/**
 * @param {string} path
 * @returns {string}
 */

function fixWindowsPath(path) {
  return path.slice( // istanbul ignore next
  isWindows ? 1 : 0);
}
/**
 * @param {string} url
 * @returns {string}
 */


function getDirectoryForURL(url) {
  // Node should be ok with this, but transpiling
  //  to `require` doesn't work, so detect Windows
  //  to remove slash instead
  // "file://" +
  return fixWindowsPath(path.dirname(new URL(url).pathname));
}

/* eslint-disable node/no-unsupported-features/es-syntax */
/**
 * @param {PlainObject} cfg
 * @param {string} cfg.baseURL
 * @param {string} cfg.cwd
 * @returns {getJSONCallback}
 */

function buildGetJSON({
  baseURL,
  cwd: basePath = baseURL ? getDirectoryForURL(baseURL) : typeof fetch === 'undefined' && process.cwd()
} = {}) {
  const _fetch = typeof fetch !== 'undefined' ? fetch : jsonURL => {
    if (/^https?:/u.test(jsonURL)) {
      return nodeFetch(jsonURL);
    } // Filed https://github.com/bergos/file-fetch/issues/12 to see
    //  about getting relative basePaths in `file-fetch` and using
    //  that better-tested package instead
    // eslint-disable-next-line promise/avoid-new


    return new Promise((resolve, reject) => {
      // eslint-disable-next-line node/global-require, no-shadow
      const XMLHttpRequest = require('local-xmlhttprequest')({
        basePath
      }); // Don't change to an import as won't resolve for browser testing


      const r = new XMLHttpRequest();
      r.open('GET', jsonURL, true); // r.responseType = 'json';

      r.onreadystatechange = function () {
        // Not sure how to simulate
        // istanbul ignore if
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

  const ret = buildGetJSONWithFetch({
    fetch: _fetch
  });
  ret._fetch = _fetch;
  ret.hasURLBasePath = Boolean(baseURL);
  ret.basePath = basePath;
  return ret;
}

const getJSON = buildGetJSON();

exports.buildGetJSON = buildGetJSON;
exports.getJSON = getJSON;
//# sourceMappingURL=index-node.mjs.map
