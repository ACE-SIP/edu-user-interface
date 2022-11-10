$(document).ready(function () {
    // verify the document
    const submit = document.querySelector('form');
    let pk = null
    submit.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fileInput = document.getElementById('verify_file')
        const fileId = document.getElementById('file_obj_id').value
        const data = new FormData();
        const file = fileInput.files[0]
        data.append("file",file , file.name);
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                console.log(this.responseText);
                alert("Verify Results:" + JSON.parse(this.responseText)['verifyStatus'])
            }
        });
        xhr.open("POST", "http://127.0.0.1:8000/api/file/verify?fileId=" + fileId);
        xhr.send(data);
    });
    // show public key
    $('select').on('change', function(e){
        pk = this.value
        document.getElementById('uni_pk').setAttribute('value',this.value)
    });
});
