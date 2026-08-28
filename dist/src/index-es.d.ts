declare const getJSON: import("./buildGetJSONWithFetch.js").getJSONCallback;
/**
 * For polymorphism with Node.
 * @returns {typeof getJSON}
 */
declare const buildGetJSON: () => typeof getJSON;
export { getJSON, buildGetJSON };
//# sourceMappingURL=index-es.d.ts.map