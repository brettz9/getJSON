/* eslint-disable node/no-unsupported-features/node-builtins,
  node/no-unsupported-features/es-syntax, compat/compat */

import {dirname} from 'path';

const isWindows = process.platform === 'win32';

/**
 * @param {string} path
 * @returns {string}
 */
function fixWindowsPath (path) {
  return path.slice(
    // istanbul ignore next
    isWindows ? 1 : 0
  );
}

/**
 * @param {string} url
 * @returns {string}
 */
function getDirectoryForURL (url) {
  // Node should be ok with this, but transpiling
  //  to `require` doesn't work, so detect Windows
  //  to remove slash instead
  // "file://" +
  return fixWindowsPath(
    dirname(new URL(url).pathname)
  );
}

export {getDirectoryForURL};
