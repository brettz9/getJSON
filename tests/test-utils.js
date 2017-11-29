const write = (...msgs) => {
    document.body.append(
        ...msgs, ...Array.from({length: 2}, () => document.createElement('br'))
    );
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
