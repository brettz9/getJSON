(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

function __async(g){return new Promise(function(s,j){function c(a,x){try{var r=g[x?"throw":"next"](a);}catch(e){j(e);return}r.done?s(r.value):Promise.resolve(r.value).then(c,d);}function d(e){c(e,1);}c();})}

const write = (...msgs) => {
    if (typeof document !== 'undefined') {
        document.body.append(
            ...msgs, ...Array.from({length: 2}, () => document.createElement('br'))
        );
    } else {
        console.log(...msgs);
    }
};
const assert = {
    equals (expected, actual, msg) {
        if (expected === actual) {
            write(`${msg || 'Result'}: OK`);
        } else {
            write(`${msg}: FAILED; expected: ${expected}; actual: ${actual}`);
        }
    },
    includes (expected, actual, msg) {
        if (actual.includes(expected)) {
            write(`${msg || 'Result'}: OK`);
        } else {
            write(`${msg}: FAILED; expected: ${expected}; actual: ${actual}`);
        }
    },
    true (actual, msg) {
        return this.equals(true, actual, msg);
    }
};

var __dirname = '/Users/brett/getJSON';

var global$1 = typeof global !== "undefined" ? global :
            typeof self !== "undefined" ? self :
            typeof window !== "undefined" ? window : {};

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

/* eslint-disable handle-callback-err */
getJSON('test.json').then((result) => {
    assert.equals(5, result.key, 'Retrieve JSON result value - single string URL (normal promise)');
}).catch((err) => {
    assert.true(false, `Shouldn't get here`);
});

(() => __async(function*(){
const result = yield getJSON('test.json');
assert.equals(5, result.key, 'Retrieve JSON result value - single string URL (await)');

yield getJSON('test.json', (result) => {
    assert.equals(5, result.key, 'Retrieve JSON result value - single string URL (callback)');
});

yield getJSON('test-nonexisting.json', () => {
    assert.true(false, `Shouldn't reach here`);
}, (err) => {
    assert.includes(' (File: test-nonexisting.json)', err.message, 'Caught nonexisting file error (errback)');
    assert.true(err instanceof SyntaxError, 'Retrieving nonexisting file gives a syntax error (errback)');
});

const resultArrOneURL = yield getJSON(['test.json']);
assert.equals(5, resultArrOneURL[0].key, 'Retrieve JSON result value - single item array URL');

const resultArrMultipleURLs = yield getJSON(['test.json', 'test2.json']);
assert.equals(5, resultArrMultipleURLs[0].key, 'Retrieve JSON result value - multiple item array URL 1');
assert.equals('aString', resultArrMultipleURLs[1].aKey, 'Retrieve JSON result value - multiple item array URL 2');

try {
    yield getJSON('test-nonexisting.json');
    assert.true(false, `Shouldn't reach here`);
} catch (err) {
    assert.includes(' (File: test-nonexisting.json)', err.message, 'Caught nonexisting file error');
    assert.true(err instanceof SyntaxError, 'Retrieving nonexisting file gives a syntax error');
}

try {
    yield getJSON('test-bad.json');
    assert.true(false, `Shouldn't reach here`);
} catch (err) {
    assert.includes(' (File: test-bad.json)', err.message, 'Caught badly formed JSON error');
    assert.true(err instanceof SyntaxError, 'Badly formed JSON gives a syntax error');
}

try {
    yield getJSON(['test.json', 'test-bad.json']);
    assert.true(false, `Shouldn't reach here`);
} catch (err) {
    assert.includes(' (File: test-bad.json)', err.message, 'Caught badly formed JSON within array of URLs error');
    assert.true(err instanceof SyntaxError, 'Badly formed JSON within array of URLs gives a syntax error');
}
}()))();

})));
