(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.getJSON = factory());
})(this, (function () { 'use strict';

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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

  function buildGetJSONWithFetch() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$fetch = _ref.fetch,
        fetch = _ref$fetch === void 0 ? typeof window !== 'undefined' ? window.fetch : self.fetch : _ref$fetch;

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
        var _exit2 = false;
        return _await(_catch(function () {
          return _invoke(function () {
            if (Array.isArray(jsonURL)) {
              return _await(Promise.all(jsonURL.map(function (url) {
                return getJSON(url);
              })), function (arrResult) {
                if (cb) {
                  // eslint-disable-next-line node/callback-return, node/no-callback-literal, promise/prefer-await-to-callbacks
                  cb.apply(void 0, _toConsumableArray(arrResult));
                }

                _exit2 = true;
                return arrResult;
              });
            }
          }, function (_result) {
            return _exit2 ? _result : _await(fetch(jsonURL), function (resp) {
              return _await(resp.json(), function (result) {
                return typeof cb === 'function' // eslint-disable-next-line promise/prefer-await-to-callbacks
                ? cb(result) : result; // https://github.com/bcoe/c8/issues/135

                /* c8 ignore next */
              });
            });
          });
        }, function (e) {
          e.message += " (File: ".concat(jsonURL, ")");

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

  /* eslint-disable node/no-unsupported-features/es-syntax */
  var getJSON = buildGetJSONWithFetch();

  return getJSON;

}));
//# sourceMappingURL=index.js.map
