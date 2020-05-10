/* eslint-disable node/no-unsupported-features/es-syntax */
import babel from '@rollup/plugin-babel';

/**
 * @external RollupConfig
 */

/**
 * @param {PlainObject} cfg
 * @param {"es"|"umd"} cfg.format
 * @returns {external:RollupConfig[]}
 */
function getDist ({format}) {
  return [{
    input: 'src/index.js',
    output: {
      file: `dist/index${format === 'es' ? '-es' : ''}.js`,
      format,
      name: 'getJSON'
    },
    plugins: [
      babel({
        babelHelpers: 'bundled'
      })
    ]
  }, {
    input: 'src/index-polyglot.js',
    output: {
      file: `dist/index-polyglot${format === 'es' ? '-es' : ''}.js`,
      format,
      name: 'getJSONPolyglot'
    },
    plugins: [
      babel({
        babelHelpers: 'bundled'
      })
    ]
  }];
}

// eslint-disable-next-line import/no-anonymous-default-export
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
        babelHelpers: 'bundled',
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
