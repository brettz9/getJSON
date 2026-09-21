/* globals window, self -- Polyglot */
/* eslint-disable unicorn/prefer-global-this -- Easier */
import {buildGetJSONWithFetch} from './buildGetJSONWithFetch.js';
import {getDirectoryForURL, setDirname} from './getDirectoryForURL.js';

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
function buildGetJSON ({
  baseURL,
  cwd: basePath
} = {}) {
  const _fetch = typeof window !== 'undefined' || typeof self !== 'undefined'
    ? typeof window !== 'undefined' ? window.fetch : self.fetch
    // eslint-disable-next-line @stylistic/operator-linebreak -- TS
    : /**
       * @param {string} jsonURL
       * @returns {Promise<Response>}
       */
    async (jsonURL) => {
      if ((/^https?:/v).test(jsonURL)) {
        if (!nodeFetch) {
          nodeFetch = /** @type {{default: SimpleFetch}} */ (
            /** @type {unknown} */
            (await import('node-fetch'))
          );
        }
        return /** @type {SimpleFetch} */ (nodeFetch.default)(jsonURL);
      }

      if (!basePath) {
        await setDirname();
        basePath = baseURL
          ? getDirectoryForURL(baseURL)
          : typeof window === 'undefined' && process.cwd();
      }

      // Filed https://github.com/bergos/file-fetch/issues/12 to see
      //  about getting relative basePaths in `file-fetch` and using
      //  that better-tested package instead
      const localXMLHttpRequest = await import('local-xmlhttprequest');
      const XMLHttpRequest =

      /**
       * @type {{
       *   prototype: XMLHttpRequest;
       *   new(): XMLHttpRequest
       * }}
       */ (
        /** @type {unknown} */
          (localXMLHttpRequest.default({
            basePath
          }))
        ); // Don't change to an import as won't resolve for browser testing
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
            resolve(/** @type {Response} */ ({
              json: () => JSON.parse(response)
            }));
            return;
          }
          reject(new SyntaxError(
            'Failed to fetch URL: ' + jsonURL + 'state: ' +
            r.readyState + '; status: ' + r.status
          ));
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

export {getJSON, buildGetJSON};
