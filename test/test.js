/* globals buildGetJSON -- Polyglot */

import {buildGetJSON as buildGetJSONNode} from '../src/index-polyglot.js';
import {buildGetJSONWithFetch} from '../src/buildGetJSONWithFetch.js';

// Todo: When Mocha may support `--require` with native ESM, put this
//  in bootstrap file instead; see
//  https://github.com/mochajs/mocha/issues/4281
if (typeof buildGetJSON === 'undefined') {
  globalThis.buildGetJSON = buildGetJSONNode;
}
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
    it('hasURLBasePath property (false) with default', async function () {
      let getJSN = buildGetJSON();
      assert.notOk(getJSN.hasURLBasePath);
      const result = await getJSN('test/test.json');
      assert.equal(result.key, 5);

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

    // Now that there is a global fetch, we don't want this behavior
    // it('_fetch property (global)', function () {
    //   global.fetch = () => {
    //     //
    //   };
    //   const getJSN = buildGetJSON({
    //     cwd: '/explicit/cwd'
    //   });
    //   assert.isFunction(getJSN._fetch);
    //   assert.equal(getJSN._fetch, global.fetch);
    //   delete global.fetch;
    // });

    it('_fetch property (global window)', function () {
      globalThis.window = globalThis; // This is key here
      globalThis.fetch = () => {
        //
      };
      const getJSN = buildGetJSON({
        cwd: '/explicit/cwd'
      });
      assert.isFunction(getJSN._fetch);
      assert.equal(getJSN._fetch, globalThis.fetch);
      delete globalThis.fetch;
      delete globalThis.window;
    });

    it('_fetch property (global self)', function () {
      globalThis.self = globalThis; // This is key here
      globalThis.fetch = () => {
        //
      };
      const getJSN = buildGetJSON({
        cwd: '/explicit/cwd'
      });
      assert.isFunction(getJSN._fetch);
      assert.equal(getJSN._fetch, globalThis.fetch);
      delete globalThis.fetch;
      delete globalThis.self;
    });
  });
  describe('buildGetJSONWithFetch', function () {
    it('_fetch property (window)', function () {
      globalThis.window = {
        fetch () {
          //
        }
      };
      assert.doesNotThrow(() => {
        buildGetJSONWithFetch();
      });
      delete globalThis.window;
    });
    it('throws with no arguments and no `self.fetch`', function () {
      assert.throws(() => {
        buildGetJSONWithFetch();
      });
    });

    it('throws with empty object argument and no `self.fetch`', function () {
      assert.throws(() => {
        buildGetJSONWithFetch({});
      });
    });
  });
}

describe('getJSON', function () {
  it('Retrieve JSON result value - single string file (normal promise)', function () {
    // eslint-disable-next-line promise/always-return, promise/prefer-await-to-then -- Testing API
    return getJSON('test.json').then((result) => {
      assert.equal(result.key, 5);
      // eslint-disable-next-line promise/prefer-await-to-callbacks, promise/prefer-await-to-then -- Testing API
    }).catch((err) => {
      // eslint-disable-next-line no-console -- Testing error
      console.log(err);
      assert.ok(false, `Shouldn't get here`);
      return true;
    });
  });

  it('Retrieve JSON result value - single string file (await)', async function () {
    const result = await getJSON('test.json');
    assert.equal(result.key, 5);
  });

  it('Retrieve JSON result value - single string URL (await)', async function () {
    this.timeout(30000);
    const result = await getJSON('https://raw.githubusercontent.com/brettz9/getJSON/master/test/test.json');
    assert.equal(result.key, 5);
  });

  it('Retrieve JSON result value - single string file (callback)', async function () {
    await getJSON('test.json', (reslt) => {
      assert.equal(reslt.key, 5);
    });
  });
  it('Caught nonexisting file error (errback)', async function () {
    let ranErrback = false;
    await getJSON('test-nonexisting.json', () => {
      assert.ok(false, `Shouldn't reach here`);
    }, (err) => {
      ranErrback = true;
      assert.include(err.message, ' (File: test-nonexisting.json)');
      // eslint-disable-next-line no-restricted-syntax -- Testing for error type
      assert.ok(err instanceof SyntaxError, 'Retrieving nonexisting file gives a syntax error (errback)');
    });
    assert.ok(ranErrback);
  });
  it('Retrieve JSON result value - single item array file', async function () {
    const resultArrOneFile = await getJSON(['test.json']);
    assert.equal(resultArrOneFile[0].key, 5);
  });
  it('Retrieve JSON result value - multiple items', async function () {
    const resultArrMultipleFiles = await getJSON(['test.json', 'test2.json']);
    assert.equal(resultArrMultipleFiles[0].key, 5, 'Retrieve JSON result value - multiple item array file 1');
    assert.equal(resultArrMultipleFiles[1].aKey, 'aString', 'Retrieve JSON result value - multiple item array file 2');
  });
  it('Retrieve JSON result value - multiple items (with callback)', function () {
    return getJSON(['test.json', 'test2.json'], (...resultArrMultipleFiles) => {
      assert.equal(resultArrMultipleFiles[0].key, 5, 'Retrieve JSON result value - multiple item array file 1');
      assert.equal(resultArrMultipleFiles[1].aKey, 'aString', 'Retrieve JSON result value - multiple item array file 2');
    });
  });
  it('Caught nonexisting file error', async function () {
    try {
      await getJSON('test-nonexisting.json');
      assert.ok(false, `Shouldn't reach here`);
    } catch (err) {
      assert.include(err.message, ' (File: test-nonexisting.json)');
      // eslint-disable-next-line no-restricted-syntax -- Testing for error type
      assert.ok(err instanceof SyntaxError, 'Retrieving nonexisting file gives a syntax error');
    }
  });
  it('Caught badly formed JSON error', async function () {
    try {
      await getJSON('test-bad.json');
      assert.ok(false, `Shouldn't reach here`);
    } catch (err) {
      assert.include(err.message, ' (File: test-bad.json)');
      // eslint-disable-next-line no-restricted-syntax -- Testing for error type
      assert.ok(err instanceof SyntaxError, 'Badly formed JSON gives a syntax error');
    }
  });
  it('Caught badly formed JSON within array of files error', async function () {
    try {
      await getJSON(['test.json', 'test-bad.json']);
      assert.ok(false, `Shouldn't reach here`);
    } catch (err) {
      assert.include(err.message, ' (File: test-bad.json)');
      // eslint-disable-next-line no-restricted-syntax -- Testing for error type
      assert.ok(err instanceof SyntaxError, 'Badly formed JSON within array of files gives a syntax error');
    }
  });
});
