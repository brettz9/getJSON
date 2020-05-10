(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  /* eslint-disable node/no-unsupported-features/es-syntax,
    node/no-unsupported-features/es-builtins */
  const write = (...msgs) => {
    if (typeof document !== 'undefined') {
      document.body.append(
        ...msgs, ...Array.from({length: 2}, () => document.createElement('br'))
      );
    } else {
      // eslint-disable-next-line no-console
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
  async function getJSON (jsonURL, cb, errBack) {
    try {
      if (Array.isArray(jsonURL)) {
        const arrResult = await Promise.all(jsonURL.map((url) => getJSON(url)));
        if (cb) {
          // eslint-disable-next-line node/callback-return, standard/no-callback-literal, promise/prefer-await-to-callbacks
          cb(...arrResult);
        }
        return arrResult;
      }
      const result = await fetch(jsonURL).then((r) => r.json());
      // eslint-disable-next-line promise/prefer-await-to-callbacks
      return typeof cb === 'function' ? cb(result) : result;
    } catch (e) {
      e.message += ` (File: ${jsonURL})`;
      if (errBack) {
        return errBack(e, jsonURL);
      }
      throw e;
    }
  }

  /* eslint-disable node/no-unsupported-features/es-syntax */

  if (typeof fetch === 'undefined') {
    global.fetch = (jsonURL) => {
      // eslint-disable-next-line promise/avoid-new
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line node/global-require, no-shadow
        const XMLHttpRequest = require('local-xmlhttprequest')({
          basePath: __dirname
        }); // Don't change to an import as won't resolve for browser testing
        const r = new XMLHttpRequest();
        r.open('GET', jsonURL, true);
        // r.responseType = 'json';
        r.onreadystatechange = function () {
          if (r.readyState !== 4) { return; }
          if (r.status === 200) {
            // var json = r.json;
            const response = r.responseText;
            resolve({
              json: () => JSON.parse(response)
            });
            return;
          }
          reject(new SyntaxError(
            'Failed to fetch URL: ' + jsonURL + 'state: ' +
            r.readyState + '; status: ' + r.status
          ));
        };
        r.send();
      });
    };
  }

  /* eslint-disable node/no-unsupported-features/es-syntax */

  const getJSON$1 = typeof module === 'undefined' ? getJSON : getJSON;

  // eslint-disable-next-line promise/always-return
  getJSON$1('test.json').then((result) => {
    assert.equals(5, result.key, 'Retrieve JSON result value - single string URL (normal promise)');
    // eslint-disable-next-line promise/prefer-await-to-callbacks
  }).catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
    assert.true(false, `Shouldn't get here`);
    return true;
  });

  (async () => {
  const result = await getJSON$1('test.json');
  assert.equals(5, result.key, 'Retrieve JSON result value - single string URL (await)');

  await getJSON$1('test.json', (reslt) => {
    assert.equals(5, reslt.key, 'Retrieve JSON result value - single string URL (callback)');
  });

  await getJSON$1('test-nonexisting.json', () => {
    assert.true(false, `Shouldn't reach here`);
  }, (err) => {
    assert.includes(' (File: test-nonexisting.json)', err.message, 'Caught nonexisting file error (errback)');
    // eslint-disable-next-line no-restricted-syntax
    assert.true(err instanceof SyntaxError, 'Retrieving nonexisting file gives a syntax error (errback)');
  });

  const resultArrOneURL = await getJSON$1(['test.json']);
  assert.equals(5, resultArrOneURL[0].key, 'Retrieve JSON result value - single item array URL');

  const resultArrMultipleURLs = await getJSON$1(['test.json', 'test2.json']);
  assert.equals(5, resultArrMultipleURLs[0].key, 'Retrieve JSON result value - multiple item array URL 1');
  assert.equals('aString', resultArrMultipleURLs[1].aKey, 'Retrieve JSON result value - multiple item array URL 2');

  try {
    await getJSON$1('test-nonexisting.json');
    assert.true(false, `Shouldn't reach here`);
  } catch (err) {
    assert.includes(' (File: test-nonexisting.json)', err.message, 'Caught nonexisting file error');
    // eslint-disable-next-line no-restricted-syntax
    assert.true(err instanceof SyntaxError, 'Retrieving nonexisting file gives a syntax error');
  }

  try {
    await getJSON$1('test-bad.json');
    assert.true(false, `Shouldn't reach here`);
  } catch (err) {
    assert.includes(' (File: test-bad.json)', err.message, 'Caught badly formed JSON error');
    // eslint-disable-next-line no-restricted-syntax
    assert.true(err instanceof SyntaxError, 'Badly formed JSON gives a syntax error');
  }

  try {
    await getJSON$1(['test.json', 'test-bad.json']);
    assert.true(false, `Shouldn't reach here`);
  } catch (err) {
    assert.includes(' (File: test-bad.json)', err.message, 'Caught badly formed JSON within array of URLs error');
    // eslint-disable-next-line no-restricted-syntax
    assert.true(err instanceof SyntaxError, 'Badly formed JSON within array of URLs gives a syntax error');
  }
  })();

})));
