/**
 * @typedef {JSONValue[]} JSONArray
 */
/**
 * @typedef {null|boolean|number|string|JSONArray|{[key: string]: JSONValue}} JSONValue
 */

/**
 * @callback SimpleJSONCallback
 * @param {...JSONValue[]} json
 * @returns {void}
 */

/**
 * @callback SimpleJSONErrback
 * @param {Error} err
 * @param {string|string[]} jsonURL
 * @returns {JSONValue}
 */

/**
 * @typedef {((
 *   jsonURL: string|string[],
 *   cb?: SimpleJSONCallback,
 *   errBack?: SimpleJSONErrback
 * ) => Promise<JSONValue>) & {
 *   _fetch?: import('./index-polyglot.js').SimpleFetch,
 *   hasURLBasePath?: boolean,
 *   basePath?: string|false
 * }} getJSONCallback
 */

/**
 * @param {object} [cfg]
 * @param {import('./index-polyglot.js').SimpleFetch} [cfg.fetch]
 * @returns {getJSONCallback}
 */
function buildGetJSONWithFetch({
  // eslint-disable-next-line no-shadow, no-undef, unicorn/prefer-global-this -- This is a polyfill
  fetch = typeof window !== 'undefined' ? window.fetch : self.fetch
} = {}) {
  /**
   * @type {getJSONCallback}
   */
  return async function getJSON(jsonURL, cb, errBack) {
    try {
      if (Array.isArray(jsonURL)) {
        const arrResult = await Promise.all(jsonURL.map(url => {
          return /** @type {getJSONCallback} */getJSON(url);
        }));
        if (cb) {
          // eslint-disable-next-line promise/prefer-await-to-callbacks -- Old-style API
          cb(...arrResult);
        }
        return arrResult;
      }
      const resp = await fetch(jsonURL);
      const result = await resp.json();
      return typeof cb === 'function'
      // eslint-disable-next-line promise/prefer-await-to-callbacks -- Old-style API
      ? cb(result) : result;
      /* c8 ignore next -- https://github.com/bcoe/c8/issues/135 */
    } catch (err) {
      const e = /** @type {Error} */err;
      e.message += ` (File: ${jsonURL})`;
      if (errBack) {
        return errBack(e, jsonURL);
      }
      throw e;
      /* c8 ignore next -- https://github.com/bcoe/c8/issues/135 */
    }
    /* c8 ignore next -- See above? */
  };
}

/* globals process -- Node */

// Needed for polyglot support (no `path` in browser); even if
//  polyglot using dynamic `import` not supported by Rollup (complaining
//  of inability to do tree-shaking in UMD builds), still useful to delay
//  path import for our testing, so that test can import this file in
//  the browser without compilation without it choking

/**
 * @type {(directory: string) => string}
 */
let dirname;

/** @type {boolean} */
let isWindows;
const setDirname = async () => {
  if (!dirname) {
    ({
      dirname
    } = await import('node:path'));
  }
};

/**
 * @param {string} path
 * @returns {string}
 */
function fixWindowsPath(path) {
  if (!isWindows) {
    isWindows = process.platform === 'win32';
  }
  return path.slice(/* c8 ignore next -- https://github.com/bcoe/c8/issues/135 */
  isWindows ? 1 : 0);
}

/**
 * @param {string} url
 * @returns {string}
 */
function getDirectoryForURL(url) {
  // Node should be ok with this, but transpiling
  //  to `require` doesn't work, so detect Windows
  //  to remove slash instead
  // "file://" +
  return fixWindowsPath(dirname(new URL(url).pathname));
}

/* globals window, self -- Polyglot */
/* eslint-disable unicorn/prefer-global-this -- Easier */

/**
 * @typedef {(url: string) => Promise<Response>} SimpleFetch
 */

/** @type {{default: SimpleFetch}} */
let nodeFetch;
/**
 * @param {object} [cfg]
 * @param {string} [cfg.baseURL]
 * @param {string|false} [cfg.cwd]
 * @returns {import('./buildGetJSONWithFetch.js').getJSONCallback}
 */
function buildGetJSON({
  baseURL,
  cwd: basePath
} = {}) {
  const _fetch = typeof window !== 'undefined' || typeof self !== 'undefined' ? typeof window !== 'undefined' ? window.fetch : self.fetch
  // eslint-disable-next-line @stylistic/operator-linebreak -- TS
  :
  /**
   * @param {string} jsonURL
   * @returns {Promise<Response>}
   */
  async jsonURL => {
    if (/^https?:/v.test(jsonURL)) {
      if (!nodeFetch) {
        nodeFetch = /** @type {{default: SimpleFetch}} */
        /** @type {unknown} */
        await import('node-fetch');
      }
      return /** @type {SimpleFetch} */nodeFetch.default(jsonURL);
    }
    if (!basePath) {
      await setDirname();
      basePath = baseURL ? getDirectoryForURL(baseURL) : typeof window === 'undefined' && process.cwd();
    }

    // Filed https://github.com/bergos/file-fetch/issues/12 to see
    //  about getting relative basePaths in `file-fetch` and using
    //  that better-tested package instead
    // @ts-expect-error Todo
    const localXMLHttpRequest = await import('local-xmlhttprequest');
    const XMLHttpRequest =
    /**
     * @type {{
     *   prototype: XMLHttpRequest;
     *   new(): XMLHttpRequest
     * }}
     */
    localXMLHttpRequest.default({
      basePath
    }); // Don't change to an import as won't resolve for browser testing
    // eslint-disable-next-line promise/avoid-new -- own API
    return new Promise((resolve, reject) => {
      const r = new XMLHttpRequest();
      r.open('GET', jsonURL, true);
      // r.responseType = 'json';
      // eslint-disable-next-line unicorn/prefer-add-event-listener -- May not be available
      r.onreadystatechange = function () {
        /* c8 ignore next 3 -- Not sure how to simulate `if` */
        if (r.readyState !== 4) {
          return;
        }
        if (r.status === 200) {
          // var json = r.json;
          const response = r.responseText;
          resolve(/** @type {Response} */{
            json: () => JSON.parse(response)
          });
          return;
        }
        reject(new SyntaxError('Failed to fetch URL: ' + jsonURL + 'state: ' + r.readyState + '; status: ' + r.status));
      };
      r.send();
      /* c8 ignore next -- https://github.com/bcoe/c8/issues/135 */
    });
    /* c8 ignore next -- See above? */
  };
  const ret = buildGetJSONWithFetch({
    fetch: _fetch
  });
  ret._fetch = _fetch;
  ret.hasURLBasePath = Boolean(baseURL);
  ret.basePath = basePath;
  return ret;
}
const getJSON = buildGetJSON();

export { buildGetJSON, getJSON };
//# sourceMappingURL=index-polyglot.mjs.map
