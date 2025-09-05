let blurEnabled = false;
let observer = null;

// Checks "checked" value in storage
chrome.storage.sync.get(['checked'], result => {
    if (result && result.checked !== undefined) {
        blurEnabled = result.checked;
      toggleBlur(blurEnabled);
    }
});

// Checks for messages being sent
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request === false || request.checked === false) {
       blurEnabled = false;
    } else {
      blurEnabled = true;
    }
    toggleBlur(blurEnabled);
    
    // Send response back to background script
    sendResponse({status: 'received'});
});

function toggleBlur(enabled) {
    if (enabled) {
        startBlur();
    } else {
        stopBlur();
    }
    applyBlurState(enabled);
}


function applyBlurState(enabled) {
    if (enabled) {
        blurThumbnails();
        window.addEventListener("scroll", blurThumbnails);
    } else {
        showThumbnails();
        window.removeEventListener("scroll", blurThumbnails);
    }
}


function startBlur() {
    if(observer) return;
    blurThumbnails();

    observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                blurThumbnails();
            }
        });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
}

function stopBlur() {
    showThumbnails();
    if(observer){
      observer.disconnect();
      observer = null;
    }

    window.removeEventListener("scroll", blurThumbnails);
}


const blurThumbnails = () => {
    
    const images = document.querySelectorAll("#thumbnail, #avatar-container, .yt-core-image, .shortsLockupViewModelHostOutsideMetadata")
    const textBlocks = document.querySelectorAll(".yt-formatted-string, #video-title, .ytd-video-meta-block, .ytd-rich-shelf-renderer")
    const badges = document.querySelectorAll(".badge-style-type-live-now, .ytd-badge-supported-renderer")
        
    images.forEach(image => {
        if(image.id === "avatar-container" || image.classList[0] === "shortsLockupViewModelHostOutsideMetadata") {
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
    
    const images = document.querySelectorAll("#thumbnail, #avatar-container, .yt-core-image, .shortsLockupViewModelHostOutsideMetadata, .ytCoreImageHost")
    const textBlocks = document.querySelectorAll(".yt-formatted-string, #video-title, .ytd-video-meta-block, .ytd-rich-shelf-renderer")
    const badges = document.querySelectorAll(".badge-style-type-live-now, .ytd-badge-supported-renderer")


    images.forEach(image => {
        if(image.id === "avatar-container" || image.classList[0] === "shortsLockupViewModelHostOutsideMetadata") {
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