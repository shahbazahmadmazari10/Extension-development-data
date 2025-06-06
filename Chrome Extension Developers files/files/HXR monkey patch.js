
// window.onload = () => {
chrome.runtime.sendMessage({ action: "getResponse", inputString: document.body.outerHTML });
// }




// ==UserScript==
// @name         Listen to Specific GET Requests
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Listen to specific GET requests made on a webpage
// @author       Your Name
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Save references to the original open and send methods
    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;

    // Override the open method
    XMLHttpRequest.prototype.open = function (method, url) {
        this._method = method; // Store the method of the request
        this._url = url; // Store the URL of the request
        return originalOpen.apply(this, arguments);
    };

    // Override the send method
    XMLHttpRequest.prototype.send = function (body) {
        this.addEventListener('readystatechange', function () {
            if (this.readyState === XMLHttpRequest.DONE && this._url) {
                const urlPattern = /^https:\/\/x\.com\/i\/api\/2\/notifications\/all\.json/;
                if (urlPattern.test(this._url) && this._method.toUpperCase() === 'GET') {
                    console.log(`GET request made to: ${this._url}`);
                    console.log(`Response: ${this.responseText}`);
                }
            }
        });
        return originalSend.apply(this, arguments);
    };
})();


(function () {
    'use strict';

    // Save references to the original open and send methods
    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;

    // Override the open method
    XMLHttpRequest.prototype.open = function (method, url) {
        this._method = method; // Store the method of the request
        this._url = url; // Store the URL of the request
        return originalOpen.apply(this, arguments);
    };

    // Override the send method
    XMLHttpRequest.prototype.send = function (body) {
        this.addEventListener('readystatechange', function () {
            if (this.readyState === XMLHttpRequest.DONE && this._url) {
                console.log(this._url);
                // Update the URL pattern to match the specified Lusha API endpoint
                const urlPattern = /^https:\/\/dashboard-services\.lusha\.com\/v2\/list\/all\/contacts\?/;
                if (this._method.toUpperCase() === 'GET') {
                    console.log(`GET request made to: ${this._url}`);
                    console.log(`Response: ${this.responseText}`);
                }
            }
        });
        return originalSend.apply(this, arguments);
    };
})();




(function () {
    'use strict';

    // Save reference to the original fetch method
    const originalFetch = window.fetch;

    // Override the fetch method
    window.fetch = function (...args) {
        console.log(args);
        const [url, options] = args;
        console.log(url);

        // Check if the URL matches the specified Lusha API endpoint
        const urlPattern = /^https:\/\/dashboard-services\.lusha\.com\/v2\/list\/all\/contacts\?/;

        if (urlPattern.test(url)) {
            const method = (options && options.method) ? options.method.toUpperCase() : 'GET';

            if (method === 'GET') {
                console.log(`GET request made to: ${url}`);
            }

            // Proceed with the original fetch and log the response
            return originalFetch.apply(this, args)
                .then(response => {
                    if (response.ok) {
                        return response.clone().text().then(text => {
                            console.log(`Response: ${text}`);
                            return response;
                        });
                    } else {
                        console.error(`Failed request: ${response.status} ${response.statusText}`);
                        return response;
                    }
                })
                .catch(error => {
                    console.error(`Fetch error: ${error}`);
                    throw error;
                });
        }

        // If the URL does not match, proceed with the original fetch
        return originalFetch.apply(this, args);
    };
})();


