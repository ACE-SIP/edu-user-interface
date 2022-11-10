$(document).ready(function() {
    const submit = document.querySelector('form');
    submit.addEventListener('submit', (e)=>{
        e.preventDefault();
        const email = document.querySelector('#inputEmail').value;
        const password = document.querySelector('#inputPassword').value;
        const request = $.ajax(
            {
                'url': '/api/user',
                'method': 'POST',
                'timeout': 0,
                'headers': {
                    'Content-Type': 'application/json',
                },
                'data': JSON.stringify({'email': email, 'password': password}),
            },
        );
        request.done(function(response) {
            if (response.user && response.token) {
                localStorage.setItem('user', response.user);
                localStorage.setItem('token', response.token);
                localStorage.setItem('expire',
                    parseInt(new Date().getTime()/1000) + 24 * 60 * 60);
                console.log('successfully');
                alert( 'Success');
                window.location.href = '/';
            }
        });
        request.fail(function( jqXHR, textStatus ) {
            alert( 'Request failed: ' + textStatus );
        });

    });
});
