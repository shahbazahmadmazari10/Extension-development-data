chrome.runtime.onInstalled.addListener(async function () {
    // chrome.tabs.create({ url: await getvideos() })
    chrome.storage.local.set({ status: false });
    chrome.storage.local.set({ count: 0 })
});

async function getvideos() {

    let response = await fetch('https://opensheet.elk.sh/1raruAc_QTZgHZ2LBwkC98eENJ19m1e3LhvovyXyUMw8/Sheet1')
    let data = await response.json()
    if (data) {
        console.log(data);
        data = data
            .map(item => {
                return {
                    username: item["videos"]
                };
            });
        // console.log(data[0].username);

        return data[0].username

    } else {
        return false;
    }
}


