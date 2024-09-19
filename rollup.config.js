import {babel} from '@rollup/plugin-babel';

import fileSize from 'rollup-plugin-filesize';

// @ts-expect-error Todo
import {rollupPluginFilesizeBadger} from 'filesize-badger';

/**
 * @typedef {import('rollup').RollupOptions} RollupConfig
 */

/**
 * @param {object} cfg
 * @param {"esm"|"umd"} cfg.format
 * @returns {RollupConfig[]}
 */
function getBrowserDist ({format}) {
  return [{
    input: `src/index${format === 'esm' ? '-es' : ''}.js`,
    output: {
      sourcemap: true,
      file: `dist/index${format === 'esm' ? '-es' : ''}.js`,
      format,
      name: 'getJSON'
    },
    plugins: [
      /** @type {import('rollup-plugin-filesize').default} */
      (fileSize)({
        showBeforeSizes: 'release',
        reporter: ['boxen', rollupPluginFilesizeBadger({
          outputPath: `badges/filesize-browser-${format}.svg`
        })]
      }),
      babel({
        babelHelpers: 'bundled'
      })
    ]
  }];
}

/**
 * @param {object} cfg
 * @param {"esm"|"umd"} cfg.format
 * @returns {RollupConfig[]}
 */
function getNodeDist ({format}) {
  /** @type {import('rollup').OutputOptions} */
  const output = {
    format,
    sourcemap: true,
    name: 'getJSON',
    // Use cjs extension, as we're using for Node too
    file: `dist/index-polyglot.${format === 'umd' ? 'c' : 'm'}js`
  };
  if (format === 'umd') {
    // Despite the Rollup warning about possibly needing path builtins,
    //  we don't actually need to increase the package size by including
    //  it, as the browser build is not supposed to use `baseURL` (which
    //  prompts `cwd` to default to `getDirectoryForURL` instead of ignoring
    //  the value when a global `fetch` is defined as in the browser)
    output.globals = {
      // Not for actual use
      'node-fetch': 'nodeFetch',
      path: 'path'
    };
  }
  return [{
    input: 'src/index-polyglot.js',
    external: ['node:path', 'node-fetch', 'local-xmlhttprequest'],
    output,
    plugins: [
      /** @type {import('rollup-plugin-filesize').default} */
      (fileSize)({
        showBeforeSizes: 'release'
      }),
      babel({
        babelHelpers: 'bundled',
        plugins: [
          ...(format === 'umd' ? [['babel-plugin-dynamic-import-node']] : []),
          ['babel-plugin-transform-import-meta'],
          ['babel-plugin-transform-async-to-promises']
        ],
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

export default [
  ...getBrowserDist({format: 'umd'}),
  ...getBrowserDist({format: 'esm'}),
  ...getNodeDist({format: 'umd'}),
  ...getNodeDist({format: 'esm'})
];
