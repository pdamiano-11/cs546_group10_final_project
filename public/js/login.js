$(function() {
    $('#login-form').submit(function(event) {
        event.preventDefault();
       const username = $('#username').val().trim()
       const password = $('#password').val().trim()
        if (username && password) {
            $('#error').hide();
            $('#login-form').trigger('reset');
        } else {
           $('#error').show();
           $('#username').focus(); 			
        }
   });
});