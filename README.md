[![npm](https://img.shields.io/npm/v/simple-get-json.svg)](https://www.npmjs.com/package/simple-get-json)
[![Dependencies](https://img.shields.io/david/brettz9/getJSON.svg)](https://david-dm.org/brettz9/getJSON)
[![devDependencies](https://img.shields.io/david/dev/brettz9/getJSON.svg)](https://david-dm.org/brettz9/getJSON?type=dev)

[![eslint badge](https://raw.githubusercontent.com/brettz9/getJSON/master/badges/eslint-badge.svg?sanitize=true)](badges/eslint-badge.svg)
[![eslint 3rd party badge](https://raw.githubusercontent.com/brettz9/getJSON/master/badges/eslint-third-party.svg?sanitize=true)](badges/eslint-third-party.svg)

[![testing badge](https://raw.githubusercontent.com/brettz9/getJSON/master/badges/tests-badge.svg?sanitize=true)](badges/tests-badge.svg)
[![coverage badge](https://raw.githubusercontent.com/brettz9/getJSON/master/badges/coverage-badge.svg?sanitize=true)](badges/coverage-badge.svg)

[![Known Vulnerabilities](https://snyk.io/test/github/brettz9/getJSON/badge.svg)](https://snyk.io/test/github/brettz9/getJSON)
[![Total Alerts](https://img.shields.io/lgtm/alerts/g/brettz9/getJSON.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/brettz9/getJSON/alerts)
[![Code Quality: Javascript](https://img.shields.io/lgtm/grade/javascript/g/brettz9/getJSON.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/brettz9/getJSON/context:javascript)

[![Filesize badge (UMD)](https://raw.githubusercontent.com/brettz9/getJSON/master/badges/filesize-browser-umd.svg?sanitize=true)](badges/filesize-browser-umd.svg)
[![Filesize badge (ESM)](https://raw.githubusercontent.com/brettz9/getJSON/master/badges/filesize-browser-esm.svg?sanitize=true)](badges/filesize-browser-esm.svg)
<!--[![License](https://img.shields.io/npm/l/getJSON.svg)](LICENSE-MIT.txt)-->
[![Licenses badge](https://raw.githubusercontent.com/brettz9/getJSON/master/badges/licenses-badge.svg?sanitize=true)](badges/licenses-badge.svg)

(see also [licenses for dev. deps.](https://raw.githubusercontent.com/brettz9/getJSON/master/badges/licenses-badge-dev.svg?sanitize=true))

[![issuehunt-to-marktext](https://issuehunt.io/static/embed/issuehunt-button-v1.svg)](https://issuehunt.io/r/brettz9/getJSON)

# getJSON

getJSON function similar to that of jQuery's.

If no callback or error-back is provided (or when an array of URLs is
supplied), a promise will be returned. If an array is provided along with
a callback, that callback will be executed before the promise is resolved.

You may use the file `index-es.js` to use the ES2017 `await` keyword for
Promise results, as well as take advantage of ES6 Module import:

```js
(async () => {

try {
  const [urlObj1, urlObj2] = await getJSON([url1, url2]);
} catch (err) {
  // Handle errors here
}

})();
```

`simple-get-json` also accepts an array of URLs (waiting for all to load):

```js
(async () => {
const [obj1, obj2] = await getJSON([url1, url2]);
// Do something with "obj1" and "obj2"
})();
```

Alternatively, you can use regular `then` Promises:

```js
getJSON([url1, url2]).then(function (objsArr) {
  // Do something with "objsArr" array
}, function (err) {
  // Handle any errors here
  console.log('err', err);
});
```

Or use the old callback style.

```js
getJSON(url, function (data) {
  // Do something with "data"
});
```

An optional third argument can be provided as an error-back (which will
be supplied the error message and originally supplied URL).

## Install

```
npm install simple-get-json
```

## Setup

### Browser

```html
<!--
For older browser support
<script src="node_modules/core-js-bundle/minified.js"></script>
-->
<script src="node_modules/simple-get-json/dist/index.js"></script>
```

```js
getJSON(...args);
```

or for ESM:

1. Direct use:

```js
import {getJSON} from './node_modules/simple-get-json/dist/index-es.js';
```

2. With a bundler:

```js
import {getJSON} from 'simple-get-json';
```


### Node (CJS)

```js
const {getJSON} = require('simple-get-json');
```

See below for `buildGetJSON` usage.

### Node (ESM)

In ESM Node, you can:

1. Directly import the module (for use relative to the current working
    directory):

```js
import {getJSON} from 'simple-get-json';
```

2. Build a version of `getJSON` which works relative to the current file
    (or some other URL):

```js
import {buildGetJSON} from 'simple-get-json';

const getJSON = buildGetJSON({
  baseURL: import.meta.url
});
```

OR:

3. Build a version of `getJSON` which works relative to a specific file
    directory:

```js
import {buildGetJSON} from 'simple-get-json';

const getJSON = buildGetJSON({
  cwd: '/some/current/working/directory'
});
```

## Todo

- Support named parameters ala jQuery
- Support rest of jQuery API
- Make local or URL loading optional for Node

## See also

- [postJSON](https://github.com/brettz9/postJSON)
