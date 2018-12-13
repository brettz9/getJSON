import babel from 'rollup-plugin-babel';

function getDist ({format}) {
    return [{
        input: 'src/index.js',
        output: {
            file: `dist/index${format === 'es' ? '-es' : ''}.js`,
            format,
            name: 'getJSON'
        },
        plugins: [
            babel()
        ]
    }, {
        input: 'src/index-polyglot.js',
        output: {
            file: `dist/index-polyglot${format === 'es' ? '-es' : ''}.js`,
            format,
            name: 'getJSONPolyglot'
        },
        plugins: [
            babel()
        ]
    }];
}
export default [
    ...getDist({format: 'umd'}),
    ...getDist({format: 'es'}),
    {
        input: 'src/index-polyglot.js',
        output: {
            file: `dist/index-cjs.js`,
            format: 'cjs'
        },
        plugins: [
            babel({
                presets: [
                    ['@babel/env', {
                        targets: {
                            node: true
                        }
                    }]
                ]
            })
        ]
    }
];
