/* eslint-disable node/no-unsupported-features/es-syntax,
  node/no-unsupported-features/es-builtins */
const write = (...msgs) => {
  if (typeof document !== 'undefined') {
    document.body.append(
      ...msgs, ...Array.from({length: 2}, () => document.createElement('br'))
    );
  } else {
    // eslint-disable-next-line no-console
    console.log(...msgs);
  }
};
const assert = {
  equals (expected, actual, msg) {
    if (expected === actual) {
      write(`${msg || 'Result'}: OK`);
    } else {
      write(`${msg}: FAILED; expected: ${expected}; actual: ${actual}`);
    }
  },
  includes (expected, actual, msg) {
    if (actual.includes(expected)) {
      write(`${msg || 'Result'}: OK`);
    } else {
      write(`${msg}: FAILED; expected: ${expected}; actual: ${actual}`);
    }
  },
  true (actual, msg) {
    return this.equals(true, actual, msg);
  }
};
export {assert, write};
