# 1.0.0
- Added support for array of resources as first argument
- Returns a `Promise` when the second and third arguments are not functions (or are absent)
- Allow `errBack` for third argument
- Requires `Array.isArray`, `Function.prototype.bind`, and `Promise` polyfills if using on older environments

# 0.3.2
- Last initial version