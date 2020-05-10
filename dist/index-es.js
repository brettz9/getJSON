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
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
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
function getJSON(_x, _x2, _x3) {
  return _getJSON.apply(this, arguments);
}

function _getJSON() {
  _getJSON = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(jsonURL, cb, errBack) {
    var arrResult, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (!Array.isArray(jsonURL)) {
              _context.next = 7;
              break;
            }

            _context.next = 4;
            return Promise.all(jsonURL.map(function (url) {
              return getJSON(url);
            }));

          case 4:
            arrResult = _context.sent;

            if (cb) {
              // eslint-disable-next-line node/callback-return, standard/no-callback-literal, promise/prefer-await-to-callbacks
              cb.apply(void 0, _toConsumableArray(arrResult));
            }

            return _context.abrupt("return", arrResult);

          case 7:
            _context.next = 9;
            return fetch(jsonURL).then(function (r) {
              return r.json();
            });

          case 9:
            result = _context.sent;
            return _context.abrupt("return", typeof cb === 'function' ? cb(result) : result);

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);
            _context.t0.message += " (File: ".concat(jsonURL, ")");

            if (!errBack) {
              _context.next = 18;
              break;
            }

            return _context.abrupt("return", errBack(_context.t0, jsonURL));

          case 18:
            throw _context.t0;

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 13]]);
  }));
  return _getJSON.apply(this, arguments);
}

export default getJSON;
