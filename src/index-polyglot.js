/* eslint-disable node/no-unsupported-features/es-syntax */
import getJSON from './index.js';

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
export default getJSON;
