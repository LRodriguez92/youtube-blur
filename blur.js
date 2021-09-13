console.log("connected!")

chrome.runtime.onMessage.addListener((request) => {
    console.log("Request: ", request)
    if (request) {
        blurThumbnails()
        window.addEventListener("scroll", blurThumbnails)
    } 
})

const blurThumbnails = () => {
    console.log("blurring!")
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
        text.style.textShadow = "0 0 8px #FFF"
    })

    badges.forEach(badge => {
        badge.style.display = "none"
    })
}

