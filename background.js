chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    chrome.tabs.get(tabId, current_tab_info => {

        // Checks if there's already a "checked" property in storage
        chrome.storage.sync.get(['checked'], result => {

            chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
                if (result !== null) {
                    // Checks if you're on the homepage and the switch in on
                    if (current_tab_info.url === "https://www.youtube.com/" && result.checked) {
                        
                        chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
                            chrome.tabs.sendMessage(tabs[0].id, true)
                        })
                    } else {
                        // Runs when not in the homepage
                        chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
                            chrome.tabs.sendMessage(tabs[0].id, false)
                        })
                    }
                }
            })
        })


        
    })
})