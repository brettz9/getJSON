/* eslint-disable node/no-unsupported-features/es-syntax */
import babel from '@rollup/plugin-babel';

import fileSize from 'rollup-plugin-filesize';
import {rollupPluginFilesizeBadger} from 'filesize-badger';

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
      fileSize({
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
 * @param {PlainObject} cfg
 * @param {"es"|"umd"} cfg.format
 * @returns {external:RollupConfig[]}
 */
function getNodeDist ({format}) {
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
    external: ['path', 'node-fetch', 'local-xmlhttprequest'],
    output,
    plugins: [
      fileSize({
        showBeforeSizes: 'release'
      }),
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
  ...getNodeDist({format: 'umd'}),
  ...getNodeDist({format: 'es'})
];
