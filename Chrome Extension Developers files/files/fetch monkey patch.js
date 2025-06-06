
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


