$(document).ready(function () {
    const submit = document.querySelector('form');
    submit.addEventListener('submit', (e) => {
        e.preventDefault();
        const fileInput = document.getElementById('files')
        const data = new FormData();
        const file = fileInput.files[0]
        data.append("file",file , file.name);
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                alert(JSON.parse(this.responseText)['filename'] + " has been successfully uploaded.");
            }
        });
        // const ENDPOINT = process
        xhr.open("POST", "/api/file/upload");
        xhr.send(data);
    });

    // show public key
    $('select').on('change', function(e){
        document.getElementById('uni_pk').setAttribute('value',this.value)
    });
});
