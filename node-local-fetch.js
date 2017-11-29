/* eslint-env node */
module.exports = (jsonURL) => {
    return new Promise((resolve, reject) => {
        const r = new (require('local-xmlhttprequest').XMLHttpRequest)();
        r.open('GET', jsonURL, true);
        // r.responseType = 'json';
        r.onreadystatechange = function () {
            if (r.readyState !== 4) { return; }
            if (r.status === 200) {
                // var json = r.json;
                const response = r.responseText;
                resolve({
                    json: () => JSON.parse(response)
                });
                return;
            }
            reject(new SyntaxError(
                'Failed to fetch URL: ' + jsonURL + 'state: ' +
                r.readyState + '; status: ' + r.status
            ));
        };
        r.send();
    });
};
