document.addEventListener('DOMContentLoaded', () => {
    const blurSwitch = document.querySelector("#blur-input")
    chrome.storage.sync.get(['checked'], result => {
        chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
            if (result !== null) {
                chrome.tabs.sendMessage(tabs[0].id, result)
                blurSwitch.checked = result.checked
            }
        })
        console.log(`Checked currently is: ${result}`)
    })

    
    blurSwitch.addEventListener('click', () => {
        chrome.storage.sync.set({checked: blurSwitch.checked}, () => {
            console.log(`Checked value set to: ${blurSwitch.checked}`)
            chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, blurSwitch.checked)
            })
        })
    }, false)

}, false)