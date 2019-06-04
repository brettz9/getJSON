function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

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
var fetchShim = typeof fetch !== 'undefined' ? fetch : null;
/**
 * @returns {void}
 */

function getFetchShim() {
  return _getFetchShim.apply(this, arguments);
}

function _getFetchShim() {
  _getFetchShim = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!fetchShim) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", fetchShim);

          case 2:
            if (!(typeof module === 'undefined')) {
              _context.next = 4;
              break;
            }

            throw new TypeError('Your environment does not support `fetch`.');

          case 4:
            _context.next = 6;
            return Promise.resolve(require('node-fetch'));

          case 6:
            fetchShim = _context.sent;
            return _context.abrupt("return", fetchShim);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getFetchShim.apply(this, arguments);
}

getFetchShim();

var dirname = function dirname(path) {
  return path.match(/((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)[\/\\]/)[1] || '';
};
/**
 *
 * @param {string} jsonURL
 * @param {getJSONCallback} cb
 * @param {getJSONErrBack} errBack
 * @returns {Promise<JSON|JSON[]|Any>} Will resolve to `Any` if the callback is
 *   used (or if there is an error and the `errBack` is used)
 */


function getJSON(_x, _x2, _x3) {
  return _getJSON.apply(this, arguments);
}

function _getJSON() {
  _getJSON = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(jsonURL, cb, errBack) {
    var arrResult, isRelativePath, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;

            if (!Array.isArray(jsonURL)) {
              _context2.next = 7;
              break;
            }

            _context2.next = 4;
            return Promise.all(jsonURL.map(function (url) {
              return getJSON(url);
            }));

          case 4:
            arrResult = _context2.sent;

            if (cb) {
              // eslint-disable-next-line max-len
              // eslint-disable-next-line promise/prefer-await-to-callbacks, callback-return, standard/no-callback-literal
              cb.apply(void 0, _toConsumableArray(arrResult));
            }

            return _context2.abrupt("return", arrResult);

          case 7:
            isRelativePath = /(?:https?|file):/.test(jsonURL);

            if (!isRelativePath) {
              jsonURL = 'file://' + dirname(process.argv[1]) + '/' + jsonURL;
            }

            _context2.next = 11;
            return getFetchShim();

          case 11:
            _context2.t0 = _context2.sent;
            _context2.t1 = jsonURL;

            _context2.t2 = function (r) {
              return r.json();
            };

            _context2.next = 16;
            return (0, _context2.t0)(_context2.t1).then(_context2.t2);

          case 16:
            result = _context2.sent;
            return _context2.abrupt("return", typeof cb === 'function' ? cb(result) : result);

          case 20:
            _context2.prev = 20;
            _context2.t3 = _context2["catch"](0);
            _context2.t3.message += " (File: ".concat(jsonURL, ")");

            if (!errBack) {
              _context2.next = 25;
              break;
            }

            return _context2.abrupt("return", errBack(_context2.t3, jsonURL));

          case 25:
            throw _context2.t3;

          case 26:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 20]]);
  }));
  return _getJSON.apply(this, arguments);
}

export default getJSON;
