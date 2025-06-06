// popup.js
document.getElementById('executeScriptBtn').addEventListener('click', executeScriptExample);
document.getElementById('insertCSSBtn').addEventListener('click', insertCSSExample);
document.getElementById('removeCSSBtn').addEventListener('click', removeCSSExample);
document.getElementById('registerScriptsBtn').addEventListener('click', registerScriptsExample);
document.getElementById('unregisterScriptsBtn').addEventListener('click', unregisterScriptsExample);
async function executeScriptExample() {
    let tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    let tabId = tabs[0].id;

    try {
        // Injecting a function with arguments
        const results = await chrome.scripting.executeScript({
            target: { tabId: tabId },
            function: (arg1, arg2) => {
                console.log("Injected function called with:", arg1, arg2);
                return document.title + " - " + arg1 + arg2; // Return a value
            },
            args: ["Hello", 123],
            
        });

        console.log("executeScript Results:", results);  // Log the returned value

        // Injecting from a file (script.js must exist in your extension)
        // await chrome.scripting.executeScript({
        //     target: { tabId: tabId },
        //     files: ["script.js"]
        // });

    } catch (error) {
        console.error("Error executing script:", error);
    }
}

async function insertCSSExample() {
    let tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    let tabId = tabs[0].id;

    try {
        await chrome.scripting.insertCSS({
            target: { tabId: tabId },
            css: "body { background-color: lightblue !important; }" // !important is often needed to override existing page styles.
        });
        console.log("CSS injected");
    } catch (error) {
        console.error("Error inserting CSS:", error);
    }
}

async function removeCSSExample() {
    let tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    let tabId = tabs[0].id;

    try {
        // To remove CSS, you need to provide the EXACT same CSS that was injected.
        await chrome.scripting.removeCSS({
            target: { tabId: tabId },
            css: "body { background-color: lightblue !important; }"
        });
        console.log("CSS removed");
    } catch (error) {
        console.error("Error removing CSS:", error);
    }
}


async function registerScriptsExample() {
    try {
        await chrome.scripting.registerContentScripts([
            {
                id: "my-script",  // Give it a unique ID
                matches: ["<all_urls>"], // Or more specific patterns
                js: ["content.js"],  // content.js must exist
                runAt: "document_idle",
                allFrames: true, // Inject into all frames
                world: "MAIN" // Run in main world
            }
        ]);
        console.log("Content script registered");
    } catch (error) {
        console.error("Error registering content script:", error);
    }
}

async function unregisterScriptsExample() {
    try {
        // const scripts = await chrome.scripting.getRegisteredContentScripts();
        // console.log(scripts);
        // const scriptIds = scripts.map(script => script.id);
        // console.log(scriptIds)
        const scripts = await chrome.scripting.getRegisteredContentScripts();
        console.log(scripts);
        const scriptIds = scripts.map(script => script.id);
        console.log(scriptIds);

        // Correct way to unregister by IDs:
        await chrome.scripting.unregisterContentScripts({ ids: scriptIds }); // Pass an object with the ids property

        // OR, if you want to unregister ALL dynamic scripts:
        // await chrome.scripting.unregisterContentScripts(); // No arguments

        console.log("Content script(s) unregistered");
        // console.log("Content script unregistered");
    } catch (error) {
        console.error("Error unregistering content script:", error);
    }
}
