# CHANGES for simple-get-json

## ?

- npm: Bump `node-fetch`
- Testing: Switch to stable version of `mocha-multi-reporters`

## 8.0.3

- Fix: Worker compatibility

## 8.0.2

- Fix: Resume with default export for UMD browser build

## 8.0.1

- Build: Ensure transforming `import` for CJS

## 8.0.0

- Breaking change: Make as proper native Node ESM module
- Breaking change: Add back `module` to `package.json`
- Breaking change: Rename again as polyglot (even if not
supported by Rollup)
- Enhancement: Add `browser` to `package.json`
- Fix: ESM Rollup format wasn't being specified properly
- Docs: Add badges
- Linting: Check hidden files
- Testing: Move to c8 for native Node coverage

## 7.0.2

- Fix: For polyglot capability, export as UMD

## 7.0.1

- Fix: At least make no-op so Node file can be polyglot

## 7.0.0

- Breaking change: Make as named rather than default export
- Breaking change: Remove polyglot file (in favor of browser or Node being
  auto-selected appropriately)
- Breaking change: Point to different `dist` paths for `main`;
  remove `browser` in favor of `exports.browser`; add `exports` with CJS
  and MJS files
- Breaking change: Indicate `engines` as 0.12.0 minimum (requires
    `Promise`)
- Breaking change (Node): Fix bug with base directory, making it now
  by default resolve relative to `process.cwd`; Node version now also
  adds ability to read URLs
- Build: Use "json" extension with RC file
- Enhancement: Add `buildGetJSON` export for baking in base path or base URL
  (e.g., for use with `import.meta.url`)
- Enhancement: Add `getDirectoryForURL` module (used by `index-node`)
- Linting: As per latest ash-nazg/ESLint 7; apply sauron-node
- Testing: Switch to default Mocha `test` directory; build tests with
  `@babel/register`
- Testing: Switch to Mocha + Chai + Babel + nyc
- npm: Avoid opening file in start script
- npm: Avoid linting with rollup script
- npm: Update `rollup-plugin-babel` to `@rollup/plugin-babel`
  and make explicit `babelHelpers` as `bundled`
- npm: Update devDeps

## 6.0.0

- npm: Update devDeps
- yarn: Remove `yarn.lock`

## 5.0.1

- npm: Update devDeps

## 5.0.0

- Linting: Switch to `eslint-config-ash-nazg`; apply to HTML/Markdown JS
- Build: Drop `@babel/polyfill` dep.
- npm: Change deprecated `opn-cli`->`open-cli`
- npm: Update devDeps

## 4.1.0

- Build: Ensure has CommonJS build without need for
    polyfill/regenerator-runtime
- Linting (Markdown): Fix `.remarkrc` format
- npm: Update devDeps

## 4.0.0

- Breaking change: Add ES distributed build and move distribution files to
    `dist` (and source files to `src`) and update `package.json` `main`,
    `browser` and `module` fields
- Breaking change: Remove file for Bower (now that it is deprecated)
- Breaking change: Change from `babel-polyfill` to `@babel/polyfill`
- Linting (ESLint): Override "standard" for `object-curly-spacing`; avoid Node
    usage of pseudo-deprecated `url.parse`
- Build: Avoid need for `rollup-plugin-async`
- Docs: Add reference to @babel/polyfill
- npm: Update to Babel7; rename "build" script to "rollup"; update other
    devDeps and local-xmlhttprequest dep

## 3.2.3

- npm: Switch babel-polyfill to dependency to ensure present for inheriting
    projects

## 3.2.2

- npm: Add `babel-polyfill`
- npm: Update devDeps and update builds

## 3.2.1

- Fix `.npmignore`

## 3.2.0

- Build: Add yarn
- npm: Use `babel-preset-env` instead of `babel-env` (former
    was also causing problems in Travis environment (and
    rebuilding `.babelrc`))
- npm: Update dev deps

## 3.1.0

- Build: Rename Node file to polyglot as is UMD
- Enhancement (npm): Point to polyglot file from `module`
    property (workable in Node as well as browser)
- Enhancement: Check for an undefined `fetch` rather than a
    defined `module` (should be safer in more environments)

## 3.0.3

- Build: Fix for Node

## 3.0.2

- Build: Fix for Node
- npm: Add ESLint script

## 3.0.1

- Build: Properly apply Babel

## 3.0.0

- Breaking change: Assume `fetch` support or polyfill in browser
- Refactoring: Build `index.js` (for Node or browser) from source
    (using Rollup with rollup.config.js, applying to tests for restoring
    Node testing support)

## 2.1.0

- Use [Rollup](https://github.com/rollup/rollup)-friendly `module` tool.

## 2.0.0

- Breaking change: Return error objects instead of strings in both files
- Breaking change: Add URL to error message passed to errBack as well as to Promise catch
- Enhancement: Within new `index-es2017.js` file, export as ES6 module, refactoring to leverage ES2017 `await`

## 1.1.0

-   Allow omission of callback when passing an array
    of URLs (can instead use Promises chain)

## 1.0.1

-   Throw errors properly when jsonURL is an array and errBack is not present

## 1.0.0

-   Added support for array of resources as first argument
-   Returns a `Promise` when the second and third
    arguments are not functions (or are absent)
-   Allow `errBack` for third argument
-   Requires `Array.isArray`, `Function.prototype.bind`,
    and `Promise` polyfills if using on older environments

## 0.3.2

-   Last initial version
