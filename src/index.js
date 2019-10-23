export default async function getJSON (jsonURL, cb, errBack) {
  try {
    if (Array.isArray(jsonURL)) {
      const arrResult = await Promise.all(jsonURL.map((url) => getJSON(url)));
      if (cb) {
        // eslint-disable-next-line callback-return, standard/no-callback-literal
        cb(...arrResult);
      }
      return arrResult;
    }
    const result = await fetch(jsonURL).then((r) => r.json());
    return typeof cb === 'function' ? cb(result) : result;
  } catch (e) {
    e.message += ` (File: ${jsonURL})`;
    if (errBack) {
      return errBack(e, jsonURL);
    }
    throw e;
  }
}
