export type SimpleFetch = (url: string) => Promise<Response>;
/**
 * @param {object} [cfg]
 * @param {string} [cfg.baseURL]
 * @param {string|false} [cfg.cwd]
 * @returns {import('./buildGetJSONWithFetch.js').getJSONCallback}
 */
declare function buildGetJSON({ baseURL, cwd: basePath }?: {
    baseURL?: string;
    cwd?: string | false;
}): import('./buildGetJSONWithFetch.js').getJSONCallback;
declare const getJSON: import("./buildGetJSONWithFetch.js").getJSONCallback;
export { getJSON, buildGetJSON };
//# sourceMappingURL=index-polyglot.d.ts.map