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

function _await$2(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }
  if (!value || !value.then) {
    value = Promise.resolve(value);
  }
  return then ? value.then(then) : value;
}
function _invoke$1(body, then) {
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
  fetch = typeof window !== 'undefined' ? window.fetch : self.fetch
} = {}) {
  /**
  * @type {getJSONCallback}
  */
  return function getJSON(jsonURL, cb, errBack) {
    try {
      let _exit = false;
      return _await$2(_catch(function () {
        return _invoke$1(function () {
          if (Array.isArray(jsonURL)) {
            return _await$2(Promise.all(jsonURL.map(url => {
              return (/** @type {getJSONCallback} */getJSON(url)
              );
            })), function (arrResult) {
              if (cb) {
                // eslint-disable-next-line n/callback-return, n/no-callback-literal, promise/prefer-await-to-callbacks
                cb(...arrResult);
              }
              _exit = true;
              return arrResult;
            });
          }
        }, function (_result) {
          return _exit ? _result : _await$2(fetch(jsonURL), function (resp) {
            return _await$2(resp.json(), function (result) {
              return typeof cb === 'function'
              // eslint-disable-next-line promise/prefer-await-to-callbacks
              ? cb(result) : result;
              // https://github.com/bcoe/c8/issues/135
              /* c8 ignore next */
            });
          });
        });
      }, function (err) {
        const e = /** @type {Error} */err;
        e.message += ` (File: ${jsonURL})`;
        if (errBack) {
          return errBack(e, jsonURL);
        }
        throw e;
        // https://github.com/bcoe/c8/issues/135
        /* c8 ignore next */
      }));
      /* c8 ignore next */
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

function _await$1(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }
  if (!value || !value.then) {
    value = Promise.resolve(value);
  }
  return then ? value.then(then) : value;
}
/* eslint-disable compat/compat */

// Needed for polyglot support (no `path` in browser); even if
//  polyglot using dynamic `import` not supported by Rollup (complaining
//  of inability to do tree-shaking in UMD builds), still useful to delay
//  path import for our testing, so that test can import this file in
//  the browser without compilation without it choking

/**
 * @type {(directory: string) => string}
 */
let dirname;

/** @type {boolean} */

function _empty() {}
let isWindows;
function _invokeIgnored(body) {
  var result = body();
  if (result && result.then) {
    return result.then(_empty);
  }
} /**
   * @param {string} path
   * @returns {string}
   */

function _async$1(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }
    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}
const setDirname = _async$1(function () {
  return _invokeIgnored(function () {
    if (!dirname) {
      return _await$1(import('node:path'), function (_import) {
        ({
          dirname
        } = _import);
      });
    }
  });
});
function fixWindowsPath(path) {
  if (!isWindows) {
    isWindows = process.platform === 'win32';
  }
  return path.slice(
  // https://github.com/bcoe/c8/issues/135
  /* c8 ignore next */
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
  return fixWindowsPath(dirname(new URL(url).pathname));
}

/**
 * @typedef {(url: string) => Promise<Response>} SimpleFetch
 */

/** @type {{default: SimpleFetch}} */

function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }
  if (!value || !value.then) {
    value = Promise.resolve(value);
  }
  return then ? value.then(then) : value;
}
let nodeFetch;
/**
 * @param {object} [cfg]
 * @param {string} [cfg.baseURL]
 * @param {string|false} [cfg.cwd]
 * @returns {import('./buildGetJSONWithFetch.js').getJSONCallback}
 */

function _invoke(body, then) {
  var result = body();
  if (result && result.then) {
    return result.then(then);
  }
  return then(result);
}
function _call(body, then, direct) {
  if (direct) {
    return then ? then(body()) : body();
  }
  try {
    var result = Promise.resolve(body());
    return then ? result.then(then) : result;
  } catch (e) {
    return Promise.reject(e);
  }
}
function _async(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }
    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}
function buildGetJSON({
  baseURL,
  cwd: basePath
} = {}) {
  const _fetch = typeof window !== 'undefined' || typeof self !== 'undefined' ? typeof window !== 'undefined' ? window.fetch : self.fetch
  // eslint-disable-next-line @stylistic/operator-linebreak -- TS
  :
  /**
  * @param {string} jsonURL
  * @returns {Promise<Response>}
  */
  _async(function (jsonURL) {
    let _exit = false;
    return _invoke(function () {
      if (/^https?:/u.test(jsonURL)) {
        return _invoke(function () {
          if (!nodeFetch) {
            return _await(import('node-fetch'), function (
            /** @type {{default: SimpleFetch}} */
            /** @type {unknown} */
            _import) {
              nodeFetch = _import;
            });
          }
        }, function () {
          const _nodeFetch$default = /** @type {SimpleFetch} */nodeFetch.default(jsonURL);
          _exit = true;
          return _nodeFetch$default;
        });
      }
    }, function (_result) {
      return _exit ? _result : _invoke(function () {
        if (!basePath) {
          return _call(setDirname, function () {
            basePath = baseURL ? getDirectoryForURL(baseURL) : typeof window === 'undefined' && process.cwd();
          });
        }
      }, function () {
        // Filed https://github.com/bergos/file-fetch/issues/12 to see
        //  about getting relative basePaths in `file-fetch` and using
        //  that better-tested package instead
        // @ts-expect-error Todo
        // eslint-disable-next-line no-shadow
        // Don't change to an import as won't resolve for browser testing
        // eslint-disable-next-line promise/avoid-new
        /* c8 ignore next */
        return _await(import('local-xmlhttprequest'), function (localXMLHttpRequest) {
          const XMLHttpRequest = /* eslint-disable jsdoc/valid-types -- Bug */
          /**
           * @type {{
           *   prototype: XMLHttpRequest;
           *   new(): XMLHttpRequest
           * }}
           */localXMLHttpRequest.default({
            /* eslint-enable jsdoc/valid-types -- Bug */
            basePath
          });
          return new Promise((resolve, reject) => {
            const r = new XMLHttpRequest();
            r.open('GET', jsonURL, true);
            // r.responseType = 'json';
            // eslint-disable-next-line unicorn/prefer-add-event-listener -- May not be available
            r.onreadystatechange = function () {
              // Not sure how to simulate `if`
              /* c8 ignore next 3 */
              if (r.readyState !== 4) {
                return;
              }
              if (r.status === 200) {
                // var json = r.json;
                const response = r.responseText;
                resolve( /** @type {Response} */{
                  json: () => JSON.parse(response)
                });
                return;
              }
              reject(new SyntaxError('Failed to fetch URL: ' + jsonURL + 'state: ' + r.readyState + '; status: ' + r.status));
            };
            r.send();
            // https://github.com/bcoe/c8/issues/135
            /* c8 ignore next */
          });
        });
      });
    });
  });

  const ret = buildGetJSONWithFetch({
    fetch: _fetch
  });
  ret._fetch = _fetch;
  ret.hasURLBasePath = Boolean(baseURL);
  ret.basePath = basePath;
  return ret;
}
const getJSON = buildGetJSON();

export { buildGetJSON, getJSON };
//# sourceMappingURL=index-polyglot.mjs.map
