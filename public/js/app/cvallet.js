$(document).ready(function () {
    const download_file = document.getElementById('download_file')
    download_file.addEventListener('click', (e) => {
        e.preventDefault();

        const fileId = download_file.parentElement.parentElement.parentElement.id
        const savePath = ""
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                const saveResults = JSON.parse(this.responseText)
                if(saveResults['saveStatus']) alert("Successfully Downloaded.")
            }
        });
        xhr.open("GET", "/api/file/download/?fileId="+fileId + "&savePath=" + savePath);
        xhr.send();
    });
});

function b64_to_utf8( str ) {
    return decodeURIComponent(escape(window.atob( str )));
}
function utf8_to_b64( str ) {
    return window.btoa(unescape(encodeURIComponent( str )));
}

async function getDir() {
    const dirHandle = await window.showDirectoryPicker();
    return dirHandle
    // run code for dirHandle
}
