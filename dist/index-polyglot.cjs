(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.getJSON = {}));
})(this, (function (exports) { 'use strict';

  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function (nodeInterop) {
      return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }

  function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }

    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return {
        default: obj
      };
    }

    var cache = _getRequireWildcardCache(nodeInterop);

    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }

    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }

    newObj.default = obj;

    if (cache) {
      cache.set(obj, newObj);
    }

    return newObj;
  }

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
        return _await$2(_catch(function () {
          return _invoke$1(function () {
            if (Array.isArray(jsonURL)) {
              return _await$2(Promise.all(jsonURL.map(url => {
                return getJSON(url);
              })), function (arrResult) {
                if (cb) {
                  // eslint-disable-next-line node/callback-return, node/no-callback-literal, promise/prefer-await-to-callbacks
                  cb(...arrResult);
                }

                _exit = true;
                return arrResult;
              });
            }
          }, function (_result) {
            return _exit ? _result : _await$2(fetch(jsonURL), function (resp) {
              return _await$2(resp.json(), function (result) {
                return typeof cb === 'function' // eslint-disable-next-line promise/prefer-await-to-callbacks
                ? cb(result) : result; // https://github.com/bcoe/c8/issues/135

                /* c8 ignore next */
              });
            });
          });
        }, function (e) {
          e.message += ` (File: ${jsonURL})`;

          if (errBack) {
            return errBack(e, jsonURL);
          }

          throw e; // https://github.com/bcoe/c8/issues/135

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

  /* eslint-disable node/no-unsupported-features/node-builtins,
    node/no-unsupported-features/es-syntax, compat/compat */
  // Needed for polyglot support (no `path` in browser); even if
  //  polyglot using dynamic `import` not supported by Rollup (complaining
  //  of inability to do tree-shaking in UMD builds), still useful to delay
  //  path import for our testing, so that test can import this file in
  //  the browser without compilation without it choking
  let dirname, isWindows;

  function _empty() {}
  /**
   * @param {string} path
   * @returns {string}
   */


  function _invokeIgnored(body) {
    var result = body();

    if (result && result.then) {
      return result.then(_empty);
    }
  }

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
        return _await$1(Promise.resolve().then(() => _interopRequireWildcard(require('path'))), function (_import) {
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

    return path.slice( // https://github.com/bcoe/c8/issues/135

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
   * @param {PlainObject} cfg
   * @param {string} cfg.baseURL
   * @param {string} cfg.cwd
   * @returns {getJSONCallback}
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
    const _fetch = typeof fetch !== 'undefined' ? fetch : _async(function (jsonURL) {
      let _exit = false;
      return _invoke(function () {
        if (/^https?:/u.test(jsonURL)) {
          return _invoke(function () {
            if (!nodeFetch) {
              return _await(Promise.resolve().then(() => _interopRequireWildcard(require('node-fetch'))), function (_import) {
                nodeFetch = _import;
              });
            }
          }, function () {
            const _nodeFetch$default = nodeFetch.default(jsonURL);

            _exit = true;
            return _nodeFetch$default;
          });
        }
      }, function (_result) {
        return _exit ? _result : _invoke(function () {
          if (!basePath) {
            return _call(setDirname, function () {
              basePath = baseURL ? getDirectoryForURL(baseURL) : typeof fetch === 'undefined' && process.cwd();
            });
          }
        }, function () {
          // Filed https://github.com/bergos/file-fetch/issues/12 to see
          //  about getting relative basePaths in `file-fetch` and using
          //  that better-tested package instead
          return _await(Promise.resolve().then(() => _interopRequireWildcard(require('local-xmlhttprequest'))), function (localXMLHttpRequest) {
            // eslint-disable-next-line no-shadow
            const XMLHttpRequest = localXMLHttpRequest.default({
              basePath
            }); // Don't change to an import as won't resolve for browser testing
            // eslint-disable-next-line promise/avoid-new

            return new Promise((resolve, reject) => {
              const r = new XMLHttpRequest();
              r.open('GET', jsonURL, true); // r.responseType = 'json';
              // eslint-disable-next-line unicorn/prefer-add-event-listener -- May not be available

              r.onreadystatechange = function () {
                // Not sure how to simulate `if`

                /* c8 ignore next */
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

              r.send(); // https://github.com/bcoe/c8/issues/135

              /* c8 ignore next */
            });
            /* c8 ignore next */
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

  exports.buildGetJSON = buildGetJSON;
  exports.getJSON = getJSON;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index-polyglot.cjs.map
