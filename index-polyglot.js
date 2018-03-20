(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.getJSONPolyglot = factory());
}(this, (function () { 'use strict';

    function __async(g) {
      return new Promise(function (s, j) {
        function c(a, x) {
          try {
            var r = g[x ? "throw" : "next"](a);
          } catch (e) {
            j(e);return;
          }r.done ? s(r.value) : Promise.resolve(r.value).then(c, d);
        }function d(e) {
          c(e, 1);
        }c();
      });
    }

    function getJSON(jsonURL, cb, errBack) {
        return __async( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
                                cb.apply(null, arrResult);
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

                            _context.t0.message += " (File: " + jsonURL + ")";

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
            }, _callee, this, [[0, 13]]);
        })());
    }

    /* globals global, require */
    if (typeof fetch === 'undefined') {
        global.fetch = function (jsonURL) {
            return new Promise(function (resolve, reject) {
                var _require = require('local-xmlhttprequest'),
                    XMLHttpRequest = _require.XMLHttpRequest; // Don't change to an import as won't resolve for browser testing


                var r = new XMLHttpRequest();
                r.open('GET', jsonURL, true);
                // r.responseType = 'json';
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

    return getJSON;

})));
