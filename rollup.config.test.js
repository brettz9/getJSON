import async from 'rollup-plugin-async';
import nodeGlobals from 'rollup-plugin-node-globals';

export default {
    input: 'tests/test.js',
    output: {
        file: 'tests/test-node.js',
        format: 'umd',
        name: 'testJSON'
    },
    plugins: [
        async(), nodeGlobals()
    ]
};
