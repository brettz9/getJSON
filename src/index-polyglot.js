/* eslint-disable node/no-unsupported-features/es-syntax */
import {buildGetJSONWithFetch} from './buildGetJSONWithFetch.js';
import {getDirectoryForURL, setDirname} from './getDirectoryForURL.js';

let nodeFetch;
/**
 * @param {PlainObject} cfg
 * @param {string} cfg.baseURL
 * @param {string} cfg.cwd
 * @returns {getJSONCallback}
 */
function buildGetJSON ({
  baseURL,
  cwd: basePath
} = {}) {
  const _fetch = typeof fetch !== 'undefined'
    ? fetch
    : async (jsonURL) => {
      if ((/^https?:/u).test(jsonURL)) {
        if (!nodeFetch) {
          nodeFetch = await import('node-fetch');
        }
        return nodeFetch.default(jsonURL);
      }

      if (!basePath) {
        await setDirname();
        basePath = baseURL
          ? getDirectoryForURL(baseURL)
          : typeof fetch === 'undefined' && process.cwd();
      }

      // Filed https://github.com/bergos/file-fetch/issues/12 to see
      //  about getting relative basePaths in `file-fetch` and using
      //  that better-tested package instead
      const localXMLHttpRequest = await import('local-xmlhttprequest');
      // eslint-disable-next-line no-shadow
      const XMLHttpRequest = localXMLHttpRequest.default({
        basePath
      }); // Don't change to an import as won't resolve for browser testing
      // eslint-disable-next-line promise/avoid-new
      return new Promise((resolve, reject) => {
        const r = new XMLHttpRequest();
        r.open('GET', jsonURL, true);
        // r.responseType = 'json';
        // eslint-disable-next-line unicorn/prefer-add-event-listener -- May not be available
        r.onreadystatechange = function () {
          // Not sure how to simulate `if`
          /* c8 ignore next */
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
      // https://github.com/bcoe/c8/issues/135
      /* c8 ignore next */
      });
    /* c8 ignore next */
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
