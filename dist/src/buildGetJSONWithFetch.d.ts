export type JSONArray = JSONValue[];
export type JSONValue = null | boolean | number | string | JSONArray | {
    [key: string]: JSONValue;
};
export type SimpleJSONCallback = (...json: JSONValue[]) => void;
export type SimpleJSONErrback = (err: Error, jsonURL: string | string[]) => JSONValue;
export type getJSONCallback = ((jsonURL: string | string[], cb?: SimpleJSONCallback, errBack?: SimpleJSONErrback) => Promise<JSONValue>) & {
    _fetch?: import("./index-polyglot.js").SimpleFetch;
    hasURLBasePath?: boolean;
    basePath?: string | false;
};
/**
 * @typedef {JSONValue[]} JSONArray
 */
/**
 * @typedef {null|boolean|number|string|JSONArray|{[key: string]: JSONValue}} JSONValue
 */
/**
* @callback SimpleJSONCallback
* @param {...JSONValue} json
* @returns {void}
*/
/**
* @callback SimpleJSONErrback
* @param {Error} err
* @param {string|string[]} jsonURL
* @returns {JSONValue}
*/
/**
 * @typedef {((
 *   jsonURL: string|string[],
 *   cb?: SimpleJSONCallback,
 *   errBack?: SimpleJSONErrback
 * ) => Promise<JSONValue>) & {
 *   _fetch?: import('./index-polyglot.js').SimpleFetch,
 *   hasURLBasePath?: boolean,
 *   basePath?: string|false
 * }} getJSONCallback
 */
/**
 * @param {object} [cfg]
 * @param {import('./index-polyglot.js').SimpleFetch} [cfg.fetch]
 * @returns {getJSONCallback}
 */
export function buildGetJSONWithFetch({ fetch }?: {
    fetch?: import("./index-polyglot.js").SimpleFetch | undefined;
} | undefined): getJSONCallback;
//# sourceMappingURL=buildGetJSONWithFetch.d.ts.map