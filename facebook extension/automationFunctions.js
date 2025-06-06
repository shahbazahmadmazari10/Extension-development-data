function setTextArea(input, text) {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set
    nativeInputValueSetter.call(input, text)

    const event = new Event('input', { bubbles: true })
    input.dispatchEvent(event)
}

function pasteText(div, text) {
    const dt = new DataTransfer()
    dt.setData('text/plain', text)

    const pasteEvent = new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true })
    div.dispatchEvent(pasteEvent)
}

const simulateMouseFocus = (element) => {
    ['mousedown', 'click', 'focus'].forEach(mouseEventType =>
        element.dispatchEvent(
            new MouseEvent(mouseEventType, {
                view: window,
                bubbles: true,
                cancelable: true,
                buttons: 1
            })
        )
    );
};

function checkElement(selector) {
    return new Promise((resolve) => {
        const intervalId = setInterval(() => {
            if (document.querySelector(selector)) {
                clearInterval(intervalId);
                resolve(true);
            }
        }, 100);
    });
}
function checkElementPosted(selector) {
    return new Promise((resolve) => {
        const intervalId = setInterval(() => {
            if (document.querySelector(selector).innerText.includes('processed')) {
                clearInterval(intervalId);
                resolve(true);
            }
        }, 100);
    });
}



function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


async function uploadImageFromLink(imageName) {
    try {

        const imagePath = chrome.runtime.getURL(`images/${imageName}`)
        console.log(imagePath);
        const res = await fetch(imagePath)


        const blob = await res.blob()
        console.log(blob)
        const file = new File([blob], 'image.jpeg', { type: blob.type });

        const inputElement = document.querySelector('input[type="file"]')
        if (!inputElement) {
            throw new Error('Input element not found');
        }

        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);

        // Assign the files to the input element
        inputElement.files = dataTransfer.files;
        const changeEvent = new Event('change', { bubbles: true });
        console.log(inputElement)
        inputElement.dispatchEvent(changeEvent);
        return true
    } catch (error) {
        console.log('Error uploading image:', error);
        return false;
    }
}
async function uploadVideoFromLink(videoName) {
    try {
        const videoPath = chrome.runtime.getURL(`videos/${videoName}`);
        console.log(videoPath);
        const res = await fetch(videoPath);

        const blob = await res.blob();
        console.log(blob);
        const file = new File([blob], 'video.mp4', { type: blob.type });

        const inputElement = document.querySelector('input[type="file"]');
        if (!inputElement) {
            throw new Error('Input element not found');
        }

        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);

        // Assign the files to the input element
        inputElement.files = dataTransfer.files;
        const changeEvent = new Event('change', { bubbles: true });
        console.log(inputElement);
        inputElement.dispatchEvent(changeEvent);
        const changeEvent2 = new Event('input', { bubbles: true });
        console.log(inputElement);
        inputElement.dispatchEvent(changeEvent2);
        return true;
    } catch (error) {
        console.log('Error uploading video:', error);
        return false;
    }
}
