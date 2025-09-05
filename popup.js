document.addEventListener('DOMContentLoaded', () => {

    const blurSwitch = document.querySelector("#blur-input")

    // Checks if there's already a "checked" property in storage
    chrome.storage.sync.get(['checked'], result => {

        chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
            if (result !== null) {
                // Add error handling for sendMessage
                chrome.tabs.sendMessage(tabs[0].id, result, (response) => {
                    if (chrome.runtime.lastError) {
                        console.log('Content script not ready from popup:', chrome.runtime.lastError.message);
                    }
                });
                blurSwitch.checked = result.checked
            }
        })
    })

    blurSwitch.addEventListener('click', () => {
        chrome.storage.sync.set({checked: blurSwitch.checked}, () => {
            
            chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
                // Add error handling for sendMessage
                chrome.tabs.sendMessage(tabs[0].id, blurSwitch.checked, (response) => {
                    if (chrome.runtime.lastError) {
                        console.log('Content script not ready from popup:', chrome.runtime.lastError.message);
                    }
                });
            })

        })
    }, false)

}, false)