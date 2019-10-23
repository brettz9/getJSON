# getJSON

getJSON function similar to that of jQuery's.

```js
getJSON(url, function (data) {
  // Do something with "data"
});
```

An optional third argument can be provided as an error-back (which will
be supplied the error message and originally supplied URL).

Also accepts an array of URLs (waiting for all to load):

```js
getJSON([url1, url2], function (obj1, obj2) {
  // Do something with "obj1" and "obj2"
});
```

If no callback or error-back is provided (or when an array of URLs is
supplied), a promise will be returned. If an array is provided along with
a callback, that callback will be executed before the promise is resolved.

You can thus use Promises as follows:

```js
getJSON([url1, url2]).then(function (objsArr) {
  // Do something with "objsArr" array
}, function (err) {
  // Handle any errors here
});
```

You may use the file `index-es.js` to use the ES2017 `await` keyword for Promise results,
as well as take advantage of ES6 Module import:

```js
(async () => {

try {
  const [urlObj1, urlObj2] = await getJSON([url1, url2]);
} catch (err) {
  // Handle errors here
}

})();
```

# Install

```
npm install simple-get-json regenerator-runtime
```

# Setup

```html
<script src="node_modules/core-js-bundle/minified.js"></script>
<script src="node_modules/regenerator-runtime/runtime.js"></script>
<script src="node_modules/simple-get-json/dist/index.js"></script>
```

```js
getJSON(...args);
```

or:

```js
// Works in Browser only
import getJSON from './node_modules/simple-get-json/dist/index-es.js';
```

```js
// Or for Polyglot Node and Browser
import getJSON from './node_modules/simple-get-json/dist/index-polyglot-es.js';
```

# Todo

- Support named parameters ala jQuery
- Support rest of jQuery API
- Make local loading optional

# See also

- [postJSON](https://github.com/brettz9/postJSON)
