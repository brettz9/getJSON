/* eslint-disable handle-callback-err,
  node/no-unsupported-features/es-syntax */
import {assert} from './test-utils.js';

(async () => {
// eslint-disable-next-line promise/prefer-await-to-then
getJSON('test.json').then((result) => {
  assert.equals(
    5,
    result.key,
    'Retrieve JSON result value - single string URL (normal promise)'
  );
  return undefined;
// eslint-disable-next-line promise/prefer-await-to-callbacks
}).catch((err) => {
  assert.true(false, `Shouldn't get here`);
});

const result = await getJSON('test.json');
assert.equals(
  5, result.key, 'Retrieve JSON result value - single string URL (await)'
);

await getJSON('test.json', (res) => {
  assert.equals(
    5, res.key, 'Retrieve JSON result value - single string URL (callback)'
  );
});

await getJSON('test-nonexisting.json', () => {
  assert.true(false, `Shouldn't reach here`);
}, (err) => {
  assert.includes(
    ' (File: test-nonexisting.json)',
    err.message,
    'Caught nonexisting file error (errback)'
  );
  assert.true(
    err.name === SyntaxError,
    'Retrieving nonexisting file gives a syntax error (errback)'
  );
});

const resultArrOneURL = await getJSON(['test.json']);
assert.equals(
  5,
  resultArrOneURL[0].key,
  'Retrieve JSON result value - single item array URL'
);

const resultArrMultipleURLs = await getJSON(['test.json', 'test2.json']);
assert.equals(
  5,
  resultArrMultipleURLs[0].key,
  'Retrieve JSON result value - multiple item array URL 1'
);
assert.equals(
  'aString',
  resultArrMultipleURLs[1].aKey,
  'Retrieve JSON result value - multiple item array URL 2'
);

try {
  await getJSON('test-nonexisting.json');
  assert.true(false, `Shouldn't reach here`);
} catch (err) {
  assert.includes(
    ' (File: test-nonexisting.json)',
    err.message,
    'Caught nonexisting file error'
  );
  assert.true(
    err.name === SyntaxError,
    'Retrieving nonexisting file gives a syntax error'
  );
}

try {
  await getJSON('test-bad.json');
  assert.true(false, `Shouldn't reach here`);
} catch (err) {
  assert.includes(
    ' (File: test-bad.json)',
    err.message,
    'Caught badly formed JSON error'
  );
  assert.true(
    err.name === SyntaxError,
    'Badly formed JSON gives a syntax error'
  );
}

try {
  await getJSON(['test.json', 'test-bad.json']);
  assert.true(false, `Shouldn't reach here`);
} catch (err) {
  assert.includes(
    ' (File: test-bad.json)',
    err.message,
    'Caught badly formed JSON within array of URLs error'
  );
  assert.true(
    err.name === SyntaxError,
    'Badly formed JSON within array of URLs gives a syntax error'
  );
}
})();
