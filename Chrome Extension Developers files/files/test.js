const totalWebsiteData = []
async function getPageData() {

    const mainSection = document.querySelector("#grid-search-results")
    const properties = mainSection.querySelectorAll('[class*="ListItem"]')
    for (let property = 0; property < properties.length; property++) {
        const price = properties[property].querySelector(`[data-test="property-card-price"]`)?.innerText?.split(' ')[0] || 'N/A'
        const address = properties[property].querySelector(`[data-test="property-card-addr"]`)?.innerText || 'N/A'
        const firstInventoryPrice = properties[property].querySelector(`[class*="property-card-inventory-set"]>a  [class*="PropertyCardInventoryBox__PriceText"]`)?.innerText || 'N/A'
        const firstInventoryBed = properties[property].querySelector(`[class*="property-card-inventory-set"]>a  [class*="PropertyCardInventoryBox__BedText"]`)?.innerText || 'N/A'
        const badgeSelector = properties[property].querySelectorAll(`[class*="StyledPropertyCardBadgeArea"] span`)
        const badge = badgeSelector[badgeSelector.length - 1]?.innerText || 'N/A'

        console.log(property)
        console.log(price, address, firstInventoryPrice, firstInventoryBed, badge)
        let data = { price, address, firstInventoryPrice, firstInventoryBed, badge }
        totalWebsiteData.push(data)

    }

    console.log(document.querySelectorAll('[class*="PaginationJumpItem"]>a')[1])
    scrollToElement(document.querySelectorAll('[class*="PaginationJumpItem"]>a')[1])
    await new Promise((rs, rj) => setTimeout(rs, 2000))
    if (document.querySelectorAll('[class*="PaginationJumpItem"]>a')[1].getAttribute('disabled') != '' || totalWebsiteData.length != 100) {
        document.querySelectorAll('[class*="PaginationJumpItem"]>a')[1]?.click()
        // await new Promise((rs, rj) => setTimeout(rs, 5000))
        // getPageData()
    } else {
        jsonToCsv(totalWebsiteData)
    }

}

getPageData()

function scrollToElement(element) {
    element?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// let data = [{ name: 'Adeel' }, { name: "fawad" }]

// jsonToCsv(data)


function convertToCSV(jsonArray) {
    console.log(jsonArray);
    const headers = new Set();
    jsonArray.forEach(obj => Object.keys(obj).forEach(key => headers.add(key)));
    const headerArray = Array.from(headers);

    const csvRows = [];
    csvRows.push(headerArray.join(','));

    jsonArray.forEach(obj => {
        const row = headerArray.map(header => {
            const cell = obj[header] !== undefined ? obj[header] : '';
            return `"${cell}"`;
        });
        csvRows.push(row.join(','));
    });

    console.log(csvRows.join('\n'));

    return csvRows.join('\n');
}


async function jsonToCsv(jsonData) {

    const csv = convertToCSV(jsonData)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'data.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }


}


// Select the target node
const targetNode = document.getElementById("grid-search-results");

if (targetNode) {
    const observer = new MutationObserver((mutationsList) => {
        mutationsList.forEach((mutation) => {
            if (mutation.type === "childList") {
                // Check for added nodes
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1 && node.classList.contains("list-loading-message-cover")) {
                        console.log("Loading message added.");
                        node.dataset.observed = "true"; // Mark for tracking
                    }
                });

                // Check for removed nodes
                mutation.removedNodes.forEach((node) => {
                    if (node.nodeType === 1 && node.classList.contains("list-loading-message-cover") && node.dataset.observed) {
                        console.log("Loading message removed.");
                        getPageData()
                    }
                });
            }
        });
    });

    // Start observing the target node
    observer.observe(targetNode, { childList: true, subtree: true });

    console.log("MutationObserver started.");
} else {
    console.error("Element #grid-search-results not found.");
}
