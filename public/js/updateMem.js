$(function () {
    const title = $('#title').val().trim();
    const description = $('#description').val().trim();
    const date = $('#date').val().trim();
    const location = $('#location').val().trim();
    const userId = $('#userId').val().trim();
    const visibility = $('#visibility').val().trim();

    $('#update-mem').on(function (event) {
        event.preventDefault();
        
        if (title&&description&&date&&location&&userId&&visibility) {
            $('#error').hide();
            $('#login-form').trigger('reset');
        } else {
            $('#error').show();
            $('#username').on();
        }
    });
});