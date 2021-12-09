$(function () {
    const username = $('#username').val().trim();
    const firstName = $('#firstName').val().trim();
    const lastName = $('#lastName').val().trim();
    const email = $('#email').val().trim();
    const gender = $('#gender').val().trim();
    const age = $('#age').val().trim();
    const password = $('#password').val().trim();

    $('#signup-form').on(function (event) {
        event.preventDefault();
        
        if (username && password && firstName &&lastName && email &&gender&&age) {
            $('#error').hide();
            $('#login-form').trigger('reset');
        } else {
            $('#error').show();
            $('#username').on();
        }
    });
});
