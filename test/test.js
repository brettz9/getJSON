/* globals buildGetJSON */
/* eslint-disable node/no-unsupported-features/es-syntax */

import {buildGetJSONWithFetch} from '../src/buildGetJSONWithFetch.js';

const getJSON = buildGetJSON({
  baseURL: import.meta.url
});

if (typeof process !== 'undefined') {
  describe('buildGetJSON', function () {
    it('hasURLBasePath property (true)', function () {
      const getJSN = buildGetJSON({
        baseURL: 'http://example.com'
      });
      assert.ok(getJSN.hasURLBasePath);
    });
    it('hasURLBasePath property (false)', function () {
      const getJSN = buildGetJSON({
        cwd: '/explicit/cwd'
      });
      assert.notOk(getJSN.hasURLBasePath);
    });
    it('hasURLBasePath property (false) with default', function () {
      let getJSN = buildGetJSON();
      assert.notOk(getJSN.hasURLBasePath);

      getJSN = buildGetJSON({});
      assert.notOk(getJSN.hasURLBasePath);
    });
  });
  describe('_fetch', function () {
    it('_fetch property', function () {
      const getJSN = buildGetJSON({
        cwd: '/explicit/cwd'
      });
      assert.isFunction(getJSN._fetch);
    });

    it('_fetch property (global)', function () {
      global.fetch = () => {
        //
      };
      const getJSN = buildGetJSON({
        cwd: '/explicit/cwd'
      });
      assert.isFunction(getJSN._fetch);
      assert.equal(getJSN._fetch, global.fetch);
      delete global.fetch;
    });
  });
  describe('buildGetJSONWithFetch', function () {
    it('throws with no arguments and no `window.fetch`', function () {
      assert.throws(() => {
        buildGetJSONWithFetch();
      });
    });

    it('throws with empty object argument and no `window.fetch`', function () {
      assert.throws(() => {
        buildGetJSONWithFetch({});
      });
    });
  });
}

describe('getJSON', function (done) {
  it('Retrieve JSON result value - single string file (normal promise)', function () {
    // eslint-disable-next-line promise/always-return, promise/prefer-await-to-then
    return getJSON('test.json').then((result) => {
      assert.equal(5, result.key);
      // eslint-disable-next-line promise/prefer-await-to-callbacks
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      assert.ok(false, `Shouldn't get here`);
      return true;
    });
  });

  it('Retrieve JSON result value - single string file (await)', async function () {
    const result = await getJSON('test.json');
    assert.equal(5, result.key);
  });

  it('Retrieve JSON result value - single string URL (await)', async function () {
    this.timeout(30000);
    const result = await getJSON('https://raw.githubusercontent.com/brettz9/getJSON/master/test/test.json');
    assert.equal(5, result.key);
  });

  it('Retrieve JSON result value - single string file (callback)', async function () {
    await getJSON('test.json', (reslt) => {
      assert.equal(5, reslt.key);
    });
  });
  it('Caught nonexisting file error (errback)', async function () {
    let ranErrback = false;
    await getJSON('test-nonexisting.json', () => {
      assert.ok(false, `Shouldn't reach here`);
    }, (err) => {
      ranErrback = true;
      assert.include(err.message, ' (File: test-nonexisting.json)');
      // eslint-disable-next-line no-restricted-syntax
      assert.ok(err instanceof SyntaxError, 'Retrieving nonexisting file gives a syntax error (errback)');
    });
    assert.ok(ranErrback);
  });
  it('Retrieve JSON result value - single item array file', async function () {
    const resultArrOneFile = await getJSON(['test.json']);
    assert.equal(5, resultArrOneFile[0].key);
  });
  it('Retrieve JSON result value - multiple items', async function () {
    const resultArrMultipleFiles = await getJSON(['test.json', 'test2.json']);
    assert.equal(5, resultArrMultipleFiles[0].key, 'Retrieve JSON result value - multiple item array file 1');
    assert.equal('aString', resultArrMultipleFiles[1].aKey, 'Retrieve JSON result value - multiple item array file 2');
  });
  it('Retrieve JSON result value - multiple items (with callback)', function () {
    return getJSON(['test.json', 'test2.json'], (...resultArrMultipleFiles) => {
      assert.equal(5, resultArrMultipleFiles[0].key, 'Retrieve JSON result value - multiple item array file 1');
      assert.equal('aString', resultArrMultipleFiles[1].aKey, 'Retrieve JSON result value - multiple item array file 2');
    });
  });
  it('Caught nonexisting file error', async function () {
    try {
      await getJSON('test-nonexisting.json');
      assert.ok(false, `Shouldn't reach here`);
    } catch (err) {
      assert.include(err.message, ' (File: test-nonexisting.json)');
      // eslint-disable-next-line no-restricted-syntax
      assert.ok(err instanceof SyntaxError, 'Retrieving nonexisting file gives a syntax error');
    }
  });
  it('Caught badly formed JSON error', async function () {
    try {
      await getJSON('test-bad.json');
      assert.ok(false, `Shouldn't reach here`);
    } catch (err) {
      assert.include(err.message, ' (File: test-bad.json)');
      // eslint-disable-next-line no-restricted-syntax
      assert.ok(err instanceof SyntaxError, 'Badly formed JSON gives a syntax error');
    }
  });
  it('Caught badly formed JSON within array of files error', async function () {
    try {
      await getJSON(['test.json', 'test-bad.json']);
      assert.ok(false, `Shouldn't reach here`);
    } catch (err) {
      assert.include(err.message, ' (File: test-bad.json)');
      // eslint-disable-next-line no-restricted-syntax
      assert.ok(err instanceof SyntaxError, 'Badly formed JSON within array of files gives a syntax error');
    }
  });
});
