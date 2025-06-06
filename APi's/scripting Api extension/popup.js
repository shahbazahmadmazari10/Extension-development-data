
window.addEventListener('DOMContentLoaded', function() {

document.getElementById('executeScriptBtn').addEventListener('click',async()=>{
let tabs = await chrome.tabs.query({active : true ,currentWindow: true})
let tabId = tabs[0].id;
try{

await chrome.scripting.executeScript({
    target:{tabId:tabId},
    files:['script.js']
})
}catch(e){
    console.log("error executing Script : ",e);
}

})

document.getElementById('insertCSSBtn').addEventListener('click',async()=>{
let tabs = await chrome.tabs.query({active : true ,currentWindow: true})
let tabId = tabs[0].id;

try {
    chrome.scripting.insertCSS({
        target:{tabId:tabId},
       css:" body {background-color: #333 !important;color: #fff !important;}"
    })
    console.log("css injucted!!");
} catch (error) {
    console.log("Error inserting CSS:", error);
    
}
 
})


document.getElementById('removeCSSBtn').addEventListener('click',async()=>{
    let tabs = await chrome.tabs.query({active : true ,currentWindow: true})
    let tabId = tabs[0].id; 
    try {
        await chrome.scripting.removeCSS({
            target:{tabId:tabId},
           css:" body {background-color: #333 !important;color: #fff !important;}"
        })
        console.log(" Removed CSS ");
    } catch (error) {
        console.log("Error Removing :", error);
    }

})

document.getElementById('registerScriptsBtn').addEventListener('click', async () => {
    try {
      chrome.scripting.registerContentScripts({
        id: "my_Script",
        matches: ["<all_urls>"],
        js: ["content.js"],
        runAt: "document_idle",
        allFrames: true,
        world: "MAIN"
      })
      console.log("Content script registered");
    } catch (error) {
      console.log("Error registering content script:", error);
    }
  })
  
  document.getElementById('unregisterScriptsBtn').addEventListener('click', async () => {
    try {
      const scripts = await chrome.scripting.getRegisteredContentScripts();
      console.log(scripts);
      const scriptIds = scripts.map(script => script.id);
      console.log(scriptIds);
      chrome.scripting.unregisterContentScripts({ ids: scriptIds });
      console.log("Content script unregistered");
    } catch (error) {
      console.log("Error UnRegistering content script:", error);
    }
  })
})