/*global require, module*/
/*jslint vars: true*/
(function () {'use strict';

function getJSON (jsonURL, cb, errBack) {
    if (Array.isArray(jsonURL)) {
        return Promise.all(jsonURL.map(getJSON)).then(function (arr) {
            cb.apply(null, arr);
        }).catch(function (err) {
            errBack(err, jsonURL);
        });
    }
    if (typeof cb !== 'function' && typeof errBack !== 'function') { // Do typeof checks to allow for easier array promise usage of getJSON (as above)
        return new Promise(getJSON.bind(null, jsonURL));
    }
    try {
        // Todo: use fetch API for greater elegance
        var r = typeof require === 'undefined' ? new XMLHttpRequest() : new (require('local-xmlhttprequest').XMLHttpRequest);

        r.open('GET', jsonURL, true);
        //r.responseType = 'json';
        r.onreadystatechange = function () {
            if (r.readyState !== 4) {return;}
            if (r.status === 200) {
                //var json = r.json;
                var response = r.responseText;
                
                var json = JSON.parse(response);
                cb(json);
                return;
            }
            // Request failed
            throw "Failed to fetch URL: " + jsonURL + 'state: ' + r.readyState + '; status: ' + r.status;
        };
        r.send();
    }
    catch (e) {
        if (errBack) {
            return errBack(e, jsonURL);
        }
        throw e + ' (' + jsonURL + ')';
    }
}

if (typeof module !== 'undefined') {
    module.exports = getJSON;
}
else {
    window.getJSON = getJSON;
}

}());
