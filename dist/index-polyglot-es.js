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

function getJSON(_x, _x2, _x3) {
  return _getJSON.apply(this, arguments);
}

function _getJSON() {
  _getJSON = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(jsonURL, cb, errBack) {
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
              // eslint-disable-next-line callback-return, standard/no-callback-literal
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

/* eslint-env node */

if (typeof fetch === 'undefined') {
  global.fetch = function (jsonURL) {
    return new Promise(function (resolve, reject) {
      // eslint-disable-next-line global-require
      var XMLHttpRequest = require('local-xmlhttprequest')({
        basePath: __dirname
      }); // Don't change to an import as won't resolve for browser testing


      var r = new XMLHttpRequest();
      r.open('GET', jsonURL, true); // r.responseType = 'json';

      r.onreadystatechange = function () {
        if (r.readyState !== 4) {
          return;
        }

        if (r.status === 200) {
          // var json = r.json;
          var response = r.responseText;
          resolve({
            json: function json() {
              return JSON.parse(response);
            }
          });
          return;
        }

        reject(new SyntaxError('Failed to fetch URL: ' + jsonURL + 'state: ' + r.readyState + '; status: ' + r.status));
      };

      r.send();
    });
  };
}

export default getJSON;
