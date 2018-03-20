# 3.2.3

- npm: Switch babel-polyfill to dependency to ensure present for inheriting
    projects

# 3.2.2

- npm: Add `babel-polyfill`
- npm: Update devDeps and update builds

# 3.2.1

- Fix `.npmignore`

# 3.2.0

- Build: Add yarn
- npm: Use `babel-preset-env` instead of `babel-env` (former
    was also causing problems in Travis environment (and
    rebuilding `.babelrc`))
- npm: Update dev deps

# 3.1.0

- Build: Rename Node file to polyglot as is UMD
- Enhancement (npm): Point to polyglot file from `module`
    property (workable in Node as well as browser)
- Enhancement: Check for an undefined `fetch` rather than a
    defined `module` (should be safer in more environments)

# 3.0.3

- Build: Fix for Node

# 3.0.2

- Build: Fix for Node
- npm: Add ESLint script

# 3.0.1

- Build: Properly apply Babel

# 3.0.0

- Breaking change: Assume `fetch` support or polyfill in browser
- Refactoring: Build `index.js` (for Node or browser) from source
    (using Rollup with rollup.config.js, applying to tests for restoring
    Node testing support)

# 2.1.0

- Use [Rollup](https://github.com/rollup/rollup)-friendly `module` tool.

# 2.0.0

- Breaking change: Return error objects instead of strings in both files
- Breaking change: Add URL to error message passed to errBack as well as to Promise catch
- Enhancement: Within new `index-es2017.js` file, export as ES6 module, refactoring to leverage ES2017 `await`

# 1.1.0

-   Allow omission of callback when passing an array
    of URLs (can instead use Promises chain)

# 1.0.1

-   Throw errors properly when jsonURL is an array and errBack is not present

# 1.0.0

-   Added support for array of resources as first argument
-   Returns a `Promise` when the second and third
    arguments are not functions (or are absent)
-   Allow `errBack` for third argument
-   Requires `Array.isArray`, `Function.prototype.bind`,
    and `Promise` polyfills if using on older environments

# 0.3.2

-   Last initial version
