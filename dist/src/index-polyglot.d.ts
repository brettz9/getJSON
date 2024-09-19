export type SimpleFetch = (url: string) => Promise<Response>;
export const getJSON: import("./buildGetJSONWithFetch.js").getJSONCallback;
/**
 * @param {object} [cfg]
 * @param {string} [cfg.baseURL]
 * @param {string|false} [cfg.cwd]
 * @returns {import('./buildGetJSONWithFetch.js').getJSONCallback}
 */
export function buildGetJSON({ baseURL, cwd: basePath }?: {
    baseURL?: string | undefined;
    cwd?: string | false | undefined;
} | undefined): import("./buildGetJSONWithFetch.js").getJSONCallback;
//# sourceMappingURL=index-polyglot.d.ts.map