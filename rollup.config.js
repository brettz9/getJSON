import nodeGlobals from 'rollup-plugin-node-globals';
import babel from 'rollup-plugin-babel';
import async from 'rollup-plugin-async';

export default {
    input: 'index-es2017.js',
    output: {
        file: 'index.js',
        format: 'umd',
        name: 'getJSON'
    },
    plugins: [
        async(), babel(), nodeGlobals()
    ]
};
