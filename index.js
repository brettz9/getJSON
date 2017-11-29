(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.getJSON = factory());
}(this, (function () { 'use strict';

var __dirname = '/Users/brett/getJSON';

var global$1 = typeof global !== "undefined" ? global :
            typeof self !== "undefined" ? self :
            typeof window !== "undefined" ? window : {};

function __async(g){return new Promise(function(s,j){function c(a,x){try{var r=g[x?"throw":"next"](a);}catch(e){j(e);return}r.done?s(r.value):Promise.resolve(r.value).then(c,d);}function d(e){c(e,1);}c();})}

/* globals require, global, __dirname */
if (typeof require !== 'undefined') {
    global$1.fetch = require(require('path').join(__dirname, './node-local-fetch.js'));
}
function getJSON (jsonURL, cb, errBack) {return __async(function*(){
    try {
        if (Array.isArray(jsonURL)) {
            const arrResult = yield Promise.all(jsonURL.map((url) => getJSON(url)));
            if (cb) {
                cb.apply(null, arrResult);
            }
            return arrResult;
        }
        const result = yield fetch(jsonURL).then((r) => r.json());
        return typeof cb === 'function' ? cb(result) : result;
    } catch (e) {
        e.message += ` (File: ${jsonURL})`;
        if (errBack) {
            return errBack(e, jsonURL);
        }
        throw e;
    }
}())}

return getJSON;

})));
