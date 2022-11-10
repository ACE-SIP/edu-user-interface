$(document).ready(function () {
    const submit = document.querySelector('form');
    let learner_id = ""
    submit.addEventListener('submit', (e) => {
        e.preventDefault();
        const fileInput = document.getElementById('files')
        const issuer = document.getElementById('issuer_btn').name
        const data = new FormData();
        const file = fileInput.files[0]
        // const ENDPOINT = "https://credential-mgt-server.herokuapp.com/"
        // const ENDPOINT = "http://127.0.0.1:8000/"
        data.append("file",file , file.name);
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                alert(JSON.parse(this.responseText)['filename'] + " has been successfully uploaded.");
            }
        });

        xhr.open("POST", "/api/file/issuing/?issuer="+issuer + "&learner=" + learner_id);
        xhr.send(data);
    });

    // show public key
    $('select').on('change', function(e){
        learner_id = this.value
    });
});
