// Checks "checked" value in storage
chrome.storage.sync.get(['checked'], result => {

    if(result.checked) {
        blurThumbnails()
    } else {
        showThumbnails()
    }
});

// Checks for messages being sent
chrome.runtime.onMessage.addListener((request) => {  
    if (request.checked === false || request === false) {
        showThumbnails()
        window.removeEventListener("scroll", blurThumbnails)
        window.addEventListener("scroll", showThumbnails)
    } else {
        blurThumbnails()
        window.removeEventListener("scroll", showThumbnails)
        window.addEventListener("scroll", blurThumbnails)
    }
})
    
    
const blurThumbnails = () => {
    
    const images = document.querySelectorAll("#thumbnail, #avatar")
    const textBlocks = document.querySelectorAll(".yt-formatted-string, #video-title, .ytd-video-meta-block, .ytd-rich-shelf-renderer")
    const badges = document.querySelectorAll(".badge-style-type-live-now, .ytd-badge-supported-renderer")
        
    images.forEach(image => {
        if(image.id === "avatar") {
            image.style.filter = "blur(5px)"
        } else {
            image.style.filter = "blur(30px)"
        }
    })

    textBlocks.forEach(text => {
        text.style.color = "transparent"
        text.style.textShadow = "0 0 8px #fff"
    })

    badges.forEach(badge => {
        badge.style.display = "none"
    })
}

const showThumbnails = () => {
    
    const images = document.querySelectorAll("#thumbnail, #avatar")
    const textBlocks = document.querySelectorAll(".yt-formatted-string, #video-title, .ytd-video-meta-block, .ytd-rich-shelf-renderer")
    const badges = document.querySelectorAll(".badge-style-type-live-now, .ytd-badge-supported-renderer")


    images.forEach(image => {
        if(image.id === "avatar") {
            image.style.filter = "blur(0)"
        } else {
            image.style.filter = "blur(0)"
        }
    })

    textBlocks.forEach(text => {
        text.style.color = "#fff"
        text.style.textShadow = "none"
    })

    badges.forEach(badge => {
        badge.style.display = "block"
    })
}

