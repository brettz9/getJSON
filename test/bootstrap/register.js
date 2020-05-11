/* globals require */
/* eslint-disable import/unambiguous, import/no-commonjs */

// Need our own Babel here as source maps are otherwise messed up when using
//  our regular `.babelrc.json`
require('@babel/register')({
  babelrc: false,
  sourceMaps: true,
  presets: [
    ['@babel/env', {
      targets: {
        node: '10.0.0'
      }
    }]
  ],
  plugins: [
    ['babel-plugin-transform-import-meta']
  ]
});
