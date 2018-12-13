'use strict';

async function getJSON(jsonURL, cb, errBack) {
  try {
    if (Array.isArray(jsonURL)) {
      const arrResult = await Promise.all(jsonURL.map(url => getJSON(url)));

      if (cb) {
        cb.apply(null, arrResult);
      }

      return arrResult;
    }

    const result = await fetch(jsonURL).then(r => r.json());
    return typeof cb === 'function' ? cb(result) : result;
  } catch (e) {
    e.message += ` (File: ${jsonURL})`;

    if (errBack) {
      return errBack(e, jsonURL);
    }

    throw e;
  }
}

/* eslint-env node */

if (typeof fetch === 'undefined') {
  global.fetch = jsonURL => {
    return new Promise((resolve, reject) => {
      const XMLHttpRequest = require('local-xmlhttprequest')({
        basePath: __dirname
      }); // Don't change to an import as won't resolve for browser testing


      const r = new XMLHttpRequest();
      r.open('GET', jsonURL, true); // r.responseType = 'json';

      r.onreadystatechange = function () {
        if (r.readyState !== 4) {
          return;
        }

        if (r.status === 200) {
          // var json = r.json;
          const response = r.responseText;
          resolve({
            json: () => JSON.parse(response)
          });
          return;
        }

        reject(new SyntaxError('Failed to fetch URL: ' + jsonURL + 'state: ' + r.readyState + '; status: ' + r.status));
      };

      r.send();
    });
  };
}

module.exports = getJSON;
