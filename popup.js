document.addEventListener('DOMContentLoaded', () => {
    const blurSwitch = document.querySelector("#blur-input")
    
    blurSwitch.addEventListener('click', () => {
        chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, blurSwitch.checked)
        })
    }, false)

}, false)