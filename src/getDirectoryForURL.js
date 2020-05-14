/* eslint-disable node/no-unsupported-features/node-builtins,
  node/no-unsupported-features/es-syntax, compat/compat */

// Needed for polyglot support (no `path` in browser); even if
//  polyglot using dynamic `import` not supported by Rollup (complaining
//  of inability to do tree-shaking in UMD builds), still useful to delay
//  path import for our testing, so that test can import this file in
//  the browser without compilation without it choking
let dirname, isWindows;
export const setDirname = async () => {
  if (!dirname) {
    ({dirname} = await import('path'));
  }
};

/**
 * @param {string} path
 * @returns {string}
 */
function fixWindowsPath (path) {
  if (!isWindows) {
    isWindows = process.platform === 'win32';
  }
  return path.slice(
    // https://github.com/bcoe/c8/issues/135
    /* c8 ignore next */
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
