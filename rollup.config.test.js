import async from 'rollup-plugin-async';

export default {
    input: 'tests/test.js',
    output: {
        file: 'tests/test-node.js',
        format: 'umd',
        name: 'testJSON'
    },
    plugins: [
        async()
    ]
};
