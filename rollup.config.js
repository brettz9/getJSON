import async from 'rollup-plugin-async';
import nodeGlobals from 'rollup-plugin-node-globals';

export default {
    input: 'index-es2017.js',
    output: {
        file: 'index.js',
        format: 'umd',
        name: 'getJSON'
    },
    plugins: [
        async(), nodeGlobals()
    ]
};
