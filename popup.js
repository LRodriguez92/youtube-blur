document.addEventListener('DOMContentLoaded', () => {

    const blurSwitch = document.querySelector("#blur-input")

    // Checks if there's already a "checked" property in storage
    chrome.storage.sync.get(['checked'], result => {

        chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
            if (result !== null) {
                chrome.tabs.sendMessage(tabs[0].id, result)
                blurSwitch.checked = result.checked
            }
        })
    })

    blurSwitch.addEventListener('click', () => {
        chrome.storage.sync.set({checked: blurSwitch.checked}, () => {
            
            chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, blurSwitch.checked)
            })

        })
    }, false)

}, false)