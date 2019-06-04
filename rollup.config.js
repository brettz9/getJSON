/* eslint-disable node/no-unsupported-features/es-syntax */
import babel from 'rollup-plugin-babel';

/**
 * @external RollupConfig
 * @type {PlainObject}
 * @see {@link https://rollupjs.org/guide/en#big-list-of-options}
 */

/**
 * @param {PlainObject} config
 * @param {boolean} [config.minifying]
 * @param {string} [config.format='umd'} = {}]
 * @returns {external:RollupConfig}
 */
function getDist ({format, minifying}) {
  return {
    input: 'src/index.js',
    output: {
      // eslint-disable-next-line max-len
      file: `dist/index${format === 'es' ? '-es' : ''}${minifying ? '.min' : ''}.js`,
      format,
      sourcemap: minifying,
      name: 'getJSON'
    },
    plugins: [
      babel()
    ],
    external: ['node-fetch']
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  getDist({format: 'umd'}),
  getDist({format: 'es'}),
  {
    input: 'src/index.js',
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
    ],
    external: ['node-fetch']
  }
];
