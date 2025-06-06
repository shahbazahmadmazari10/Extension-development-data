let videosData = undefined
chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    console.log(request);
    if (request.message == 'start') {
        const systemDate = new Date();
        const targetDate = new Date("2025-02-15");

        // if (systemDate < targetDate) {
        videosData = await getData()
        console.log(videosData);
        const video = videosData.shift()
        console.log(video);
        post(video);
        // }
    }

});

async function post(video) {
    const postButton = document.querySelectorAll('[aria-label="Create a post"]>div>[role="button"]')[2]
    // simulateMouseFocus(postButton);
    postButton.click()
    await new Promise((rs, rj) => setTimeout(rs, 1000))
    // postButton.click()
    await checkElement('[aria-label*=" on your mind"]')
    const inputTextField = document.querySelector('[aria-label*=" on your mind"]')
    setTimeout(() => {
    pasteText(inputTextField, video['Caption'])
        
    }, 1000);
        const uploaded = await uploadVideoFromLink(video['video Name'])
        console.log(uploaded);
        if (uploaded) {
            
            
            await checkElement('[role="dialog"] video')
            console.log('uploaded');
            await new Promise((rs, rj) => setTimeout(rs, 2000))
            
            document.querySelector('[aria-label="Post"]').click()

       await new Promise((rs, rj) => setTimeout(rs, 1000))
       
        await checkElementPosted('ul>li div[role = "alert"]>span>span')
       console.log('removed');
       
       let { count } =  chrome.storage.local.get('count')
       count++
       chrome.storage.local.set({ count })
       await new Promise((rs, rj) => setTimeout(rs, 3000))
       
        console.log(videosData)
        const data = videosData.shift()
        console.log(data);
        let {status} = await chrome.storage.local.get('status');
        if (data && status ) {
            post(data)
        } else {
            chrome.storage.local.set({ status: false })
            alert('All videos uploaded successfully')
        }

    } 
    else {
        console.log('not uploaded moving next upload');
        console.log(videosData)
        const data = videosData.shift()
        console.log(data);
        // await new Promise((rs, rj) => setTimeout(rs, 2000))

        if (data) {
            console.log('post this data');
            console.log(data);
            post(data)
        } else {
            chrome.storage.local.set({ status: false })
            alert('All videos uploaded successfully')
        }
    }
}





async function getData() {
    try {
        const filePath = chrome.runtime.getURL("videosData.xlsx");
        console.log(filePath);

        // Fetch the file and convert it to an array buffer
        const response = await fetch(filePath);
        const data = await response.arrayBuffer();

        // Read the Excel workbook
        const workbook = XLSX.read(data, { type: "array" });

        // Assuming the first sheet contains the data
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const range = { s: { r: 0, c: 0 }, e: { r: 1300, c: 4 } };

        // Parse data from the worksheet
        let jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 2, range });
        console.log(jsonData);

        // Flatten and process the data
        jsonData = jsonData.flat(Infinity);
        console.log(jsonData);
        console.log(jsonData);

        return jsonData; // Return the processed data
    } catch (error) {
        console.error("Error loading the Excel file:", error);
    }
}

