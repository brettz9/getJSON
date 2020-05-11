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
function getBrowserDist ({format}) {
  return [{
    input: 'src/index.js',
    output: {
      sourcemap: true,
      file: `dist/index${format === 'es' ? '-es' : ''}.js`,
      format,
      name: 'getJSON'
    },
    plugins: [
      babel({
        babelHelpers: 'bundled'
      })
    ]
  }];
}

/**
 * @param {PlainObject} cfg
 * @param {"es"|"umd"} cfg.format
 * @returns {external:RollupConfig[]}
 */
function getNodeDist ({format}) {
  return [{
    input: 'src/index-node.mjs',
    external: ['path', 'node-fetch'],
    output: {
      sourcemap: true,
      file: `dist/index-node.${format === 'cjs' ? 'c' : 'm'}js`,
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
  }];
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  ...getBrowserDist({format: 'umd'}),
  ...getBrowserDist({format: 'es'}),
  ...getNodeDist({format: 'cjs'}),
  ...getNodeDist({format: 'es'})
];
