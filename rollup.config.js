import babel from 'rollup-plugin-babel';
import async from 'rollup-plugin-async';

export default [{
    input: 'index-es2017.js',
    output: {
        file: 'index.js',
        format: 'umd',
        name: 'getJSON'
    },
    plugins: [
        async(), babel()
    ]
}, {
    input: 'index-es2017-polyglot.js',
    output: {
        file: 'index-polyglot.js',
        format: 'umd',
        name: 'getJSONPolyglot'
    },
    plugins: [
        async(), babel()
    ]
}];
